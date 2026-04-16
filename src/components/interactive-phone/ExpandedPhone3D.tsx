import { Suspense, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Architecture: project the iPhone screen mesh's world bounding-box corners
// to viewport pixels every frame, then update the HTML overlay's style
// directly via ref. No drei <Html transform> magic numbers, no vh guessing.
//
// The overlay sits OUTSIDE the canvas (in the parent portal) and is
// positioned/sized purely from the projected screen rect. As the model
// lerps/rotates, the overlay tracks it precisely.
//
// Built per /3d-landing-pages skill (Technique 8: Loaded GLB Model).

export interface ExpandedPhone3DHandle {
  // No public methods — overlay positioning is done via ref forwarded down
}

interface ExpandedPhone3DProps {
  onClose: () => void;
  // Caller provides a ref to the overlay div so we can position it directly
  overlayRef: React.RefObject<HTMLDivElement | null>;
}

const BASE_SCALE = 3;
// Identified from the GLB inspection log: this mesh is 0.317 × 0.702 = 94% × 97% of the body
const SCREEN_MESH_NAME = "xXDHkMplTIDAXLN";

function FlatIPhone({ overlayRef }: { overlayRef: React.RefObject<HTMLDivElement | null> }) {
  const group = useRef<THREE.Group>(null);
  const { scene, nodes } = useGLTF("/models/iphone.glb");
  const { camera, size } = useThree();

  // Pre-compute the LOCAL bounding box of the screen mesh (doesn't change
  // with parent transform — getting it once is cheaper than every frame).
  // ALSO hide the screen mesh so its baked wallpaper texture doesn't bleed
  // through any rounded-corner gap of the HTML overlay above it.
  const screenLocalBox = useRef<THREE.Box3 | null>(null);
  useEffect(() => {
    const mesh = nodes[SCREEN_MESH_NAME] as THREE.Mesh | undefined;
    if (!mesh || !mesh.geometry) {
      console.warn(`[ExpandedPhone3D] screen mesh "${SCREEN_MESH_NAME}" not found`);
      return;
    }
    mesh.geometry.computeBoundingBox();
    screenLocalBox.current = mesh.geometry.boundingBox?.clone() ?? null;
    // Hide the screen mesh — the HTML overlay replaces it
    mesh.visible = false;
    return () => {
      // Restore on unmount in case the GLB scene is reused
      mesh.visible = true;
    };
  }, [nodes]);

  useEffect(() => {
    if (!group.current) return;
    // Start small + slightly tilted, then lerp to face-on
    group.current.scale.set(BASE_SCALE * 0.4, BASE_SCALE * 0.4, BASE_SCALE * 0.4);
    group.current.rotation.set(-0.1, Math.PI - 0.4, 0);
  }, []);

  // Reusable Vector3s to avoid allocation in useFrame.
  // Only 4 corners — we project the visible front face, not the full
  // 3D bounding box (which would expand the projected rect when phone
  // is at any angle, making the overlay larger than the visible screen).
  const tmpV = useRef(new THREE.Vector3());
  const corners = useRef<THREE.Vector3[]>([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(),
  ]);

  useFrame(() => {
    if (!group.current) return;

    // Lerp to face-camera (Y=π so the GLB's native -Z screen turns to +Z = camera direction).
    // Snap to target once close enough so the projection stabilises and the
    // overlay doesn't drift around as the lerp asymptotically approaches.
    const targetRotY = Math.PI;
    const targetScale = BASE_SCALE;
    const rotXDelta = Math.abs(group.current.rotation.x - 0);
    const rotYDelta = Math.abs(group.current.rotation.y - targetRotY);
    const scaleDelta = Math.abs(group.current.scale.x - targetScale);
    const SNAP_THRESHOLD = 0.005;
    if (rotXDelta < SNAP_THRESHOLD && rotYDelta < SNAP_THRESHOLD && scaleDelta < SNAP_THRESHOLD) {
      group.current.rotation.x = 0;
      group.current.rotation.y = targetRotY;
      group.current.scale.set(targetScale, targetScale, targetScale);
    } else {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.12);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.12);
      group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
    }

    // Update overlay position from projected screen mesh FRONT FACE only.
    const overlay = overlayRef.current;
    const box = screenLocalBox.current;
    const screenMesh = nodes[SCREEN_MESH_NAME] as THREE.Mesh | undefined;
    if (!overlay || !box || !screenMesh) return;

    // Local -Z face of the screen mesh is the iPhone's screen surface.
    // After the group's Y=π rotation it ends up facing +Z (toward camera).
    // Use the 4 corners of THAT face only — projecting the back face too
    // gives a wider bounding box that doesn't match the visible screen.
    const frontZ = box.min.z;
    const cs = corners.current;
    cs[0].set(box.min.x, box.min.y, frontZ);
    cs[1].set(box.max.x, box.min.y, frontZ);
    cs[2].set(box.min.x, box.max.y, frontZ);
    cs[3].set(box.max.x, box.max.y, frontZ);

    let minPx = Infinity, minPy = Infinity, maxPx = -Infinity, maxPy = -Infinity;
    for (const c of cs) {
      tmpV.current.copy(c);
      tmpV.current.applyMatrix4(screenMesh.matrixWorld);
      tmpV.current.project(camera);
      const px = (tmpV.current.x * 0.5 + 0.5) * size.width;
      const py = (1 - (tmpV.current.y * 0.5 + 0.5)) * size.height;
      if (px < minPx) minPx = px;
      if (px > maxPx) maxPx = px;
      if (py < minPy) minPy = py;
      if (py > maxPy) maxPy = py;
    }

    overlay.style.left = `${minPx}px`;
    overlay.style.top = `${minPy}px`;
    overlay.style.width = `${maxPx - minPx}px`;
    overlay.style.height = `${maxPy - minPy}px`;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

const ExpandedPhone3D = forwardRef<ExpandedPhone3DHandle, ExpandedPhone3DProps>(function ExpandedPhone3D(
  { onClose, overlayRef },
  ref,
) {
  useImperativeHandle(ref, () => ({}), []);
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

        <FlatIPhone overlayRef={overlayRef} />

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
});

export default ExpandedPhone3D;
