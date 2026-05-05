/**
 * F1ShowcaseSlide — full-bleed dark slide with a real Alfa Romeo C42 F1.
 *
 * Behaviour mirrors FrameworkSlide / InteractivePhone:
 *   • capture-phase wheel/keyboard hijack while this slide is active
 *   • each gesture advances internal beat (0 → 5)
 *   • F1 rotates + camera moves through 6 cinematic angles
 *   • once at final beat, next gesture passes through to HorizontalDeck
 *   • previous beat behaviour is symmetric — wheel-up reverses through beats,
 *     past beat 0 it passes through (back to previous slide)
 *
 * NO Lenis. NO ScrollTrigger. Same wheel-event pattern as the rest of the deck.
 */
import { useEffect, useRef, useState, Suspense, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  MeshReflectorMaterial,
  useGLTF,
  PerspectiveCamera,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import Slide from "../Slide";

// ──────────────────────────────────────────────
// 6 hero beats — TWO FULL 360° rotations across the slide (4π total).
// Each gesture spins the F1 ~144°, long enough to feel cinematic, not whippy.
// rotY decreases monotonically so the F1 spins one continuous direction.
// ──────────────────────────────────────────────
type Beat = {
  rotY: number;
  camera: [number, number, number];
  lookAt: [number, number, number];
};

const BEATS: Beat[] = [
  { rotY: 0,                camera: [4.0, 1.2, 5.2],  lookAt: [0, 0.55, 0] },    // start: 3/4 front hero
  { rotY: -Math.PI * 0.8,   camera: [0.2, 0.9, 5.5],  lookAt: [0, 0.55, 0] },    // ~144° — side-rear
  { rotY: -Math.PI * 1.6,   camera: [-3.6, 1.0, -4.0], lookAt: [0, 0.55, 0] },   // ~288° — rear quarter
  { rotY: -Math.PI * 2.4,   camera: [0.0, 6.0, -2.4], lookAt: [0, 0.3, 0] },     // ~432° — top-down (1.2 rev)
  { rotY: -Math.PI * 3.2,   camera: [3.6, 1.2, 3.6],  lookAt: [0, 0.55, 0] },    // ~576° — front quarter close
  { rotY: -Math.PI * 4.0,   camera: [4.5, 1.5, 5.6],  lookAt: [0, 0.55, 0] },    // 2 full rotations, back to hero
];

// ──────────────────────────────────────────────
// Mutable choreo state — written by GSAP, read by R3F
// ──────────────────────────────────────────────
type ChoreoState = {
  rotY: number;
  camX: number;
  camY: number;
  camZ: number;
  lookX: number;
  lookY: number;
  lookZ: number;
};

function makeInitialState(): ChoreoState {
  const b = BEATS[0];
  return {
    rotY: b.rotY,
    camX: b.camera[0], camY: b.camera[1], camZ: b.camera[2],
    lookX: b.lookAt[0], lookY: b.lookAt[1], lookZ: b.lookAt[2],
  };
}

// ──────────────────────────────────────────────
// CarModel — loads GLB, enables shadows, applies rotation each frame
// ──────────────────────────────────────────────
function CarModel({ state }: { state: React.MutableRefObject<ChoreoState> }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/c42.glb");

  useEffect(() => {
    scene.traverse((o: THREE.Object3D) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.castShadow = true;
      m.receiveShadow = true;
      const mat = m.material as THREE.MeshStandardMaterial;
      if (mat) {
        if (mat.envMapIntensity !== undefined) mat.envMapIntensity = 1.5;
        if (mat.roughness !== undefined && mat.roughness > 0.7) mat.roughness = 0.55;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (group.current) group.current.rotation.y = state.current.rotY;
  });

  // c42.glb is in CAD-ish scale (~46m long); 0.11 brings it to ~5m
  return (
    <group ref={group} position={[0, 0, 0]} scale={0.11}>
      <primitive object={scene} />
    </group>
  );
}

// ──────────────────────────────────────────────
// ScrollCamera — applies camera state each frame
// ──────────────────────────────────────────────
function ScrollCamera({ state }: { state: React.MutableRefObject<ChoreoState> }) {
  const { camera } = useThree();
  const tmp = useRef(new THREE.Vector3()).current;
  useFrame(() => {
    const s = state.current;
    camera.position.set(s.camX, s.camY, s.camZ);
    tmp.set(s.lookX, s.lookY, s.lookZ);
    camera.lookAt(tmp);
  });
  return null;
}

// ──────────────────────────────────────────────
// Stage — lighting, floor, postprocessing
// ──────────────────────────────────────────────
function Stage({ state }: { state: React.MutableRefObject<ChoreoState> }) {
  return (
    <>
      <fog attach="fog" args={["#06060a", 8, 30]} />
      <PerspectiveCamera makeDefault fov={42} position={[4, 1.2, 5.2]} near={0.1} far={100} />
      <ScrollCamera state={state} />

      <ambientLight intensity={0.18} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.4}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight position={[-7, 3, -2]} angle={0.6} penumbra={0.85} intensity={45} distance={22} color="#ff6a4a" />
      <spotLight position={[7, 2.5, 4]} angle={0.55} penumbra={0.9} intensity={28} distance={18} color="#5b8af5" />
      <pointLight position={[0, 8, 0]} color="#ffffff" intensity={0.8} distance={14} />

      <Environment preset="warehouse" />

      <Suspense fallback={null}>
        <CarModel state={state} />
      </Suspense>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[260, 120]}
          resolution={1024}
          mixBlur={1.0}
          mixStrength={28}
          roughness={0.8}
          depthScale={1.0}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#04040a"
          metalness={0.6}
          mirror={0.55}
        />
      </mesh>

      <ContactShadows position={[0, 0.001, 0]} opacity={0.55} scale={14} blur={2.4} far={4} color="#000000" />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.62} luminanceThreshold={0.55} luminanceSmoothing={0.35} mipmapBlur />
        <Vignette eskil={false} offset={0.18} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

// ──────────────────────────────────────────────
// Slide
// ──────────────────────────────────────────────
export default function F1ShowcaseSlide({ id = "f1-showcase" }: { id?: string }) {
  const [currentBeat, setCurrentBeat] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);
  const stateRef = useRef<ChoreoState>(makeInitialState());
  const total = BEATS.length;

  // Track active slide via the deck's slide-change event (mirrors FrameworkSlide)
  useEffect(() => {
    const handler = (e: Event) => {
      const slideEl = containerRef.current?.closest("[data-deck-slide]");
      if (!slideEl) return;
      const allSlides = Array.from(document.querySelectorAll("[data-deck-slide]"));
      const myIndex = allSlides.indexOf(slideEl);
      const activeIndex = (e as CustomEvent).detail;
      const becameActive = myIndex === activeIndex;
      setIsActive(becameActive);
      if (!becameActive) setCurrentBeat(0);
    };
    window.addEventListener("slide-change", handler);
    return () => window.removeEventListener("slide-change", handler);
  }, []);

  // Animate state to the target beat with GSAP — slow + buttery.
  // 4s tween with sine.out (no spike at start, no harsh decel — gentlest curve).
  useEffect(() => {
    const target = BEATS[currentBeat];
    gsap.to(stateRef.current, {
      rotY: target.rotY,
      camX: target.camera[0],
      camY: target.camera[1],
      camZ: target.camera[2],
      lookX: target.lookAt[0],
      lookY: target.lookAt[1],
      lookZ: target.lookAt[2],
      duration: 4.0,
      ease: "sine.out",
      overwrite: true,
    });
  }, [currentBeat]);

  const advance = useCallback((dir: 1 | -1) => {
    if (cooldownRef.current) return false;
    const next = currentBeat + dir;
    // Out of range = pass through to deck
    if (next < 0 || next >= total) return false;
    cooldownRef.current = true;
    setCurrentBeat(next);
    // Cooldown ~40% of tween — chains scrolls smoothly via overwrite while
    // preventing rapid-fire gestures from queueing instant transitions.
    setTimeout(() => { cooldownRef.current = false; }, 1600);
    return true;
  }, [currentBeat, total]);

  // Capture-phase hijack — same model as FrameworkSlide
  useEffect(() => {
    if (!isActive) return;

    const onWheel = (e: WheelEvent) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      const atForwardEdge = dir === 1 && currentBeat >= total - 1;
      const atBackwardEdge = dir === -1 && currentBeat <= 0;
      if (atForwardEdge || atBackwardEdge) return; // pass through to deck
      e.preventDefault();
      e.stopImmediatePropagation();
      advance(dir);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const isForward = e.key === "ArrowRight" || e.key === "ArrowDown";
      const isBackward = e.key === "ArrowLeft" || e.key === "ArrowUp";
      if (!isForward && !isBackward) return;
      const dir: 1 | -1 = isForward ? 1 : -1;
      const atForwardEdge = dir === 1 && currentBeat >= total - 1;
      const atBackwardEdge = dir === -1 && currentBeat <= 0;
      if (atForwardEdge || atBackwardEdge) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      advance(dir);
    };

    window.addEventListener("wheel", onWheel, { capture: true });
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, [isActive, currentBeat, total, advance]);

  return (
    <Slide bg="dark" id={id} anim="stagger" noPadding>
      <div ref={containerRef} className="absolute inset-0">
        <Canvas
          dpr={[1, 2]}
          shadows
          gl={{ antialias: true, alpha: false }}
          style={{ background: "#06060a" }}
        >
          <Stage state={stateRef} />
        </Canvas>

        {/* Beat counter — minimal, mirrors deck's typography */}
        <div className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          <div className="flex gap-1.5">
            {BEATS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i <= currentBeat ? 8 : 5,
                  height: i <= currentBeat ? 8 : 5,
                  backgroundColor: i <= currentBeat ? "#FAF6F0" : "rgba(250,246,240,0.25)",
                }}
              />
            ))}
          </div>
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#FAF6F0]/40 tabular-nums">
            {String(currentBeat + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </Slide>
  );
}

// Preload at module level so first paint isn't blocked
useGLTF.preload("/models/c42.glb");
