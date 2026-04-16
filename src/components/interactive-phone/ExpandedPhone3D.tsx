import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Same iPhone GLB as DockedPhone3D — visual continuity preserved.
// Pose: flat-on facing camera (rotated 180° on Y so screen faces camera).
//
// Architecture decision: scrollable content is NOT rendered via <Html transform>
// because drei's CSS3D scale math fights with parent group scale and produced
// unreliable sizing across iterations. Instead, the HTML email content is
// rendered as a standard fixed-position overlay (in InteractivePhone.tsx),
// sized in vh units to land exactly on the iPhone screen rect. This works
// because the expanded phone is face-on and static — no perspective warping
// needed. Result: sharp text, native scroll, reliable sizing.
//
// Built per /3d-landing-pages skill (Technique 8: Loaded GLB Model).

interface ExpandedPhone3DProps {
  onClose: () => void;
}

// Native model: 0.31 × 0.64 × 0.05 units.
// We discovered empirically that the GLB's screen face is at LOCAL z = -0.025
// (the model's "front" is on -Z, "back" with camera bumps on +Z).
// Rotation Y = π flips it so screen faces the camera at +Z.
// At BASE_SCALE 3 with camera z=4 fov=35, phone ≈ 76% of viewport height.
const BASE_SCALE = 3;

function FlatIPhone() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/iphone.glb");

  useEffect(() => {
    if (!group.current) return;
    // Start small + slightly tilted, then lerp to face-on
    group.current.scale.set(BASE_SCALE * 0.4, BASE_SCALE * 0.4, BASE_SCALE * 0.4);
    group.current.rotation.set(-0.1, Math.PI - 0.4, 0);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    // Lerp to face-camera (rotation Y = π so screen faces +Z = camera)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.07);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.PI, 0.07);
    group.current.scale.lerp(new THREE.Vector3(BASE_SCALE, BASE_SCALE, BASE_SCALE), 0.07);
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

export default function ExpandedPhone3D({ onClose }: ExpandedPhone3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "fixed", inset: 0, zIndex: 200 }}
      onPointerMissed={onClose}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
        <spotLight position={[0, 8, 2]} angle={0.4} penumbra={0.8} intensity={2.5} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} color="#D4A853" intensity={1.4} distance={14} />
        <pointLight position={[3, 0, -3]} color="#F5F0EB" intensity={1.0} distance={12} />

        <FlatIPhone />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.35}
          scale={8}
          blur={2.4}
          color="#0A0A0A"
        />
        <Environment preset="studio" />

        <EffectComposer>
          <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.18} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
