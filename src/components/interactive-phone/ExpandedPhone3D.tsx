import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Html, ContactShadows, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import PhoneContent from "./PhoneContent";

// Same iPhone GLB as DockedPhone3D — visual continuity preserved.
// Pose: flat-on facing camera (rotated 180° on Y so screen faces camera).
// Scrollable content rendered ONTO screen face via drei <Html transform>.
//
// Built per /3d-landing-pages skill (Technique 8 + drei Html transform).

interface ExpandedPhone3DProps {
  onClose: () => void;
}

// Native model is 0.31 wide × 0.64 tall × 0.05 deep.
// Scale 5 → 1.55 × 3.2 × 0.25 units. Camera at z=4 with fov=35 →
// visible height ≈ 2.52 units, so phone fills ~80% of viewport height.
const BASE_SCALE = 5;

// Screen rect on native iPhone GLB (estimated from typical iPhone 15 Pro Max
// proportions): screen is roughly 92% of the height, 90% of the width,
// inset slightly from the front face. With native size 0.31×0.64,
// screen ≈ 0.28 × 0.59. Half-thickness ≈ 0.025, so screen face Z = +0.025.

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

      {/* HTML overlay sits in FRONT of the screen face.
          Because we rotate the model 180° on Y, the screen normal points
          toward +Z (toward camera), so position Html slightly in +Z.
          But the Html is a child of the rotated group → it inherits that
          rotation, so we counter-rotate it 180° on Y so its content faces
          camera correctly.

          Screen rect ≈ 0.28w × 0.59h native units. distanceFactor 0.18
          gives a comfortable readable resolution. */}
      <Html
        transform
        position={[0, 0.005, 0.028]}
        rotation={[0, Math.PI, 0]}
        distanceFactor={0.18}
        occlude={false}
        zIndexRange={[0, 0]}
        style={{
          width: "280px",
          height: "590px",
          background: "transparent",
          pointerEvents: "auto",
        }}
      >
        <div
          className="w-full h-full overflow-y-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            borderRadius: "32px",
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <PhoneContent scrollable={true} />
        </div>
      </Html>
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
