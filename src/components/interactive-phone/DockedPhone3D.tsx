import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, ContactShadows, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Built per /3d-landing-pages skill — Technique 8 (Loaded GLB Model) +
// Technique 11 (Interactive Hover) + Lighting for Dark Themes block.
// Pattern adapted from ~/Desktop/Examples/3d-landing-demo/src/Techniques.tsx
// IPhoneModel (line 378) + IPhoneScene (line 408).

interface DockedPhone3DProps {
  onClick: () => void;
}

// Sized for a portrait container narrower than the demo's wide hero —
// scale reduced 500→250 and camera pulled back so the phone reads as a phone,
// not a black wall filling the viewport.
const BASE_SCALE = 250;

function IPhoneModel({ onClick }: { onClick: () => void }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/iphone.glb");
  const [hovered, setHovered] = useState(false);

  // Debug once on mount: log the raw GLB bounding box so we know the
  // model's native size and can sanity-check scale.
  useState(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    console.log("[iphone.glb] native size:", size.toArray());
    return null;
  });

  useFrame((state) => {
    if (!group.current) return;
    // Gentle continuous rotation
    group.current.rotation.y = state.clock.elapsedTime * 0.3;
    // Slight tilt oscillation
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.1;
    // Hover scale lerp — 1.0 → 1.1, smooth not snap
    const target = hovered ? 1.1 : 1;
    group.current.scale.lerp(
      new THREE.Vector3(target * BASE_SCALE, target * BASE_SCALE, target * BASE_SCALE),
      0.08,
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={group}
        scale={BASE_SCALE}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
}

export default function DockedPhone3D({ onClick }: DockedPhone3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        {/* Lighting per skill — slightly warmer to match cream/gold deck palette */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
        <spotLight position={[0, 8, 2]} angle={0.4} penumbra={0.8} intensity={2.5} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} color="#D4A853" intensity={1.6} distance={12} />
        <pointLight position={[3, 0, -3]} color="#F5F0EB" intensity={1.2} distance={10} />

        <IPhoneModel onClick={onClick} />

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.35}
          scale={10}
          blur={2.4}
          color="#0A0A0A"
        />
        <Environment preset="studio" />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.25} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

// Preload at module level (per skill recommendation)
useGLTF.preload("/models/iphone.glb");
