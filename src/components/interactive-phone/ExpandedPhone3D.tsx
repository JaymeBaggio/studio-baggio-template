import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Html, ContactShadows, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import PhoneContent from "./PhoneContent";

// Same iPhone GLB as DockedPhone3D — visual continuity preserved.
// Pose: flat-on facing camera (rotated 180° on Y so screen faces camera).
//
// Architecture: HTML email content rendered via drei <Html transform> attached
// inside the rotating model group, sized to match the GLB's actual screen mesh
// dimensions (lune.dev PCModel pattern). Inheriting the model's transform means
// no viewport-space alignment math, no vh guessing — the overlay scales/moves
// with the phone automatically through the lerp animation.
//
// Built per /3d-landing-pages skill (Technique 8: Loaded GLB Model).

interface ExpandedPhone3DProps {
  onClose: () => void;
}

// Native model is 0.336 × 0.718 × 0.075 (measured via Box3 from GLB).
// Screen mesh xXDHkMplTIDAXLN is 0.317 × 0.702 = 94% × 97% of body — matches
// what a real iPhone screen looks like (almost edge-to-edge with bezel).
const BASE_SCALE = 3;
const PHONE_NATIVE_W = 0.336;
const PHONE_NATIVE_H = 0.718;
const PHONE_NATIVE_D = 0.075;
const SCREEN_FRAC_W = 0.94;
const SCREEN_FRAC_H = 0.97;

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
    // Lerp to face-camera (Y=π so the GLB's native -Z screen face turns to +Z = toward camera)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.07);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.PI, 0.07);
    group.current.scale.lerp(new THREE.Vector3(BASE_SCALE, BASE_SCALE, BASE_SCALE), 0.07);
  });

  // Html sized to match the screen mesh.
  // Math (verified by experiment, not theory):
  // - Phone at group scale 3 → world body width = 0.336 * 3 = 1.008
  // - Want Html world width = 0.94 * 1.008 = 0.948 (matches screen rect)
  // - Inside the rotated group with scale 3, Html effective world scale =
  //   3 * htmlLocalScale. So local_scale = 0.948 / (HTML_PX_WIDTH * 3)
  // - Choosing 320 px wide content: local_scale = 0.948 / 960 = 0.000988 ≈ 0.001
  const HTML_PX_WIDTH = 320;
  const HTML_PX_HEIGHT = Math.round(HTML_PX_WIDTH * (PHONE_NATIVE_H * SCREEN_FRAC_H) / (PHONE_NATIVE_W * SCREEN_FRAC_W));
  // Empirically: scale 0.001 gave tiny dot, no scale gave huge. Trying 0.003.
  const HTML_LOCAL_SCALE = 0.003;

  return (
    <group ref={group}>
      <primitive object={scene} />

      {/* Email content overlay attached INSIDE the rotating group so it
          follows the model's lerp automatically. Position in LOCAL coords:
          - Native screen face is at z ≈ -PHONE_NATIVE_D/2 (model's -Z front)
          - Place Html slightly in front (more negative z)
          - Counter-rotate Y=π so content reads correctly through the group's
            π rotation (otherwise mirrored). */}
      <Html
        transform
        occlude={false}
        position={[0, 0, -(PHONE_NATIVE_D / 2) - 0.001]}
        rotation={[0, Math.PI, 0]}
        scale={HTML_LOCAL_SCALE}
        style={{
          width: `${HTML_PX_WIDTH}px`,
          height: `${HTML_PX_HEIGHT}px`,
          background: "#F5F0EB",
          borderRadius: `${HTML_PX_WIDTH * 0.13}px`,
          overflow: "hidden",
          pointerEvents: "auto",
        }}
      >
        <div
          className="w-full h-full overflow-y-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            background: "#F5F0EB",
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
