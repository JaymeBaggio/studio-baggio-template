import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Html, ContactShadows, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import PhoneContent from "./PhoneContent";

// Built per /3d-landing-pages skill — same iPhone GLB as DockedPhone3D so the
// expanded view IS the docked phone, scaled up and rotated flat. Scrollable
// HTML content rendered ONTO the screen face via drei's <Html transform>.
//
// Why this exists: the previous DOM-based expanded phone looked like a flat
// cardboard cutout next to the premium 3D docked phone. Visually jarring.
// This keeps the expanded view in 3D so the same model enlarges smoothly.

interface ExpandedPhone3DProps {
  onClose: () => void;
}

const BASE_SCALE = 8; // ~2x the docked scale (4) — large but leaves screen-edge breathing room

function FlatIPhone() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/iphone.glb");

  // Lerp into a flat-on, face-the-camera orientation.
  // Brief subtle entrance from a tilted state for life.
  useEffect(() => {
    if (!group.current) return;
    group.current.rotation.set(-0.15, 0.4, 0);
    group.current.scale.set(0.1, 0.1, 0.1);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    // Smoothly lerp toward face-forward + target scale
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.06);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0, 0.06);
    group.current.scale.lerp(new THREE.Vector3(BASE_SCALE, BASE_SCALE, BASE_SCALE), 0.06);
  });

  return (
    <group ref={group}>
      <primitive object={scene} />

      {/* Screen content rendered ONTO the phone screen face.
          Native screen rect (measured): roughly 0.27 wide x 0.57 tall.
          Positioned slightly in front of the screen face (z > 0).
          distanceFactor controls effective resolution. */}
      <Html
        transform
        position={[0, 0.01, 0.027]}
        rotation={[0, 0, 0]}
        distanceFactor={0.2}
        occlude="blending"
        style={{
          width: "260px",
          height: "555px",
          background: "transparent",
          pointerEvents: "auto",
        }}
        wrapperClass="phone-html-wrapper"
      >
        <div
          className="w-full h-full overflow-y-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            borderRadius: "24px",
            // stop wheel from bubbling out to R3F orbit / page scroll
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
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
      camera={{ position: [0, 0, 6], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "fixed", inset: 0, zIndex: 200 }}
      onPointerMissed={onClose}
    >
      <Suspense fallback={null}>
        {/* Lighting matches DockedPhone3D — same warm cream/gold tint */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
        <spotLight position={[0, 8, 2]} angle={0.4} penumbra={0.8} intensity={2.5} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} color="#D4A853" intensity={1.4} distance={14} />
        <pointLight position={[3, 0, -3]} color="#F5F0EB" intensity={1.0} distance={12} />

        <FlatIPhone />

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.35}
          scale={12}
          blur={2.4}
          color="#0A0A0A"
        />
        <Environment preset="studio" />

        <EffectComposer>
          <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.2} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
