import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Built per /3d-landing-pages skill — Technique 8 + 11 + Lighting block.
//
// Behaviour: phone sits in a fixed slightly-side-on resting pose (no auto
// rotation). User can drag to rotate freely (OrbitControls). Hover scales
// up smoothly. Click (without drag) expands.
//
// Native GLB faces -Z (camera bumps on +Z), so we rotate the model 180°
// on Y so the screen faces the camera. Then a small offset rotation gives
// the "side-on" product-showcase pose.

interface DockedPhone3DProps {
  onClick: () => void;
}

const BASE_SCALE = 4;

// Rest pose: screen faces camera, slightly rotated to one side and tilted
// down — like a product photo, showing screen + side bezel + a hint of back.
const REST_ROTATION_Y = Math.PI - 0.45; // ~155°, slightly side-on
const REST_ROTATION_X = -0.15; // tip top toward camera slightly

function IPhoneModel({ onClick }: { onClick: () => void }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/iphone.glb");
  const [hovered, setHovered] = useState(false);

  // Click-vs-drag detection: pointer-down position cached, only fire
  // onClick if pointer-up is within a small distance (otherwise it was
  // a drag-to-rotate gesture).
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);
  const CLICK_DRAG_THRESHOLD = 5; // px

  useFrame(() => {
    if (!group.current) return;
    // Only the hover-scale lerp animates each frame; rest pose is static.
    const target = hovered ? 1.08 : 1;
    group.current.scale.lerp(
      new THREE.Vector3(target * BASE_SCALE, target * BASE_SCALE, target * BASE_SCALE),
      0.08,
    );
  });

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
      <group
        ref={group}
        scale={BASE_SCALE}
        rotation={[REST_ROTATION_X, REST_ROTATION_Y, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "grab";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onPointerDown={(e) => {
          pointerDownPos.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const start = pointerDownPos.current;
          pointerDownPos.current = null;
          if (!start) return;
          const dx = e.clientX - start.x;
          const dy = e.clientY - start.y;
          const moved = Math.hypot(dx, dy);
          if (moved < CLICK_DRAG_THRESHOLD) {
            e.stopPropagation();
            onClick();
          }
        }}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
}

// Tiny helper to ensure cursor reverts when component unmounts
function CursorReset() {
  useEffect(() => () => { document.body.style.cursor = "auto"; }, []);
  return null;
}

// Restrict OrbitControls so the phone can't spin into weird views — keep
// the rotation gentle and centred on the phone.
function ConstrainedControls() {
  const { camera, gl } = useThree();
  return (
    <OrbitControls
      args={[camera, gl.domElement]}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.6}
      minPolarAngle={Math.PI * 0.35}
      maxPolarAngle={Math.PI * 0.65}
      minAzimuthAngle={-Math.PI * 0.5}
      maxAzimuthAngle={Math.PI * 0.5}
    />
  );
}

export default function DockedPhone3D({ onClick }: DockedPhone3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
        <spotLight position={[0, 8, 2]} angle={0.4} penumbra={0.8} intensity={2.5} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} color="#D4A853" intensity={1.6} distance={12} />
        <pointLight position={[3, 0, -3]} color="#F5F0EB" intensity={1.2} distance={10} />

        <IPhoneModel onClick={onClick} />

        <ContactShadows
          position={[0, -1.7, 0]}
          opacity={0.35}
          scale={6}
          blur={2.4}
          color="#0A0A0A"
        />
        <Environment preset="studio" />

        <ConstrainedControls />
        <CursorReset />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.25} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/iphone.glb");
