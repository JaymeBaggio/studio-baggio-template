# Interactive 3D Phone — Final Implementation
*Studio Baggio Deck Template | Updated 17 Apr 2026*

## What shipped

A real 3D iPhone (GLB model rendered via React Three Fiber) that lives in `DeviceMockupSlide` (slide 10). Docked: sits in a fixed slightly-side-on resting pose with ambient Float motion, drag-to-rotate via OrbitControls, hover-scale 1.0→1.08. Click: expands to a fullscreen overlay with the same 3D iPhone face-on, plus a scrollable "Daily Email" HTML overlay projected onto the screen face.

## Architecture

**Hybrid: R3F docked + R3F expanded with viewport-projected HTML overlay.**

Two R3F Canvases (one docked in slide layout, one portal'd at `document.body` for the expanded view). Both render the same iPhone GLB. The expanded view hides the GLB's screen mesh and replaces it with a standard fixed-position HTML overlay (`position: fixed`) whose `left/top/width/height` are set every frame by projecting the screen mesh's front-face corners to viewport pixels via `camera.project()`.

### Why this architecture
- drei `<Html transform>` was tried and abandoned — its CSS3D scale math depends on an "arbitrary magic number" (400) and interacts unpredictably with parent group scale. Multiple iterations produced unreliable sizing.
- Viewport-projected overlay is the canonical Three.js pattern for aligning HTML to 3D (`threejs.org/manual/Aligning HTML to 3D`). Deterministic, self-correcting on resize.

### Critical implementation details
1. **Project only 4 front-face corners** (not full 8-corner 3D bounding box). The screen mesh has depth; projecting back-face corners produces a wider bounding rect when the model has any rotation.
2. **Snap rotation/scale on convergence** — the lerp asymptotically approaches target but never reaches it, causing the projection to drift. Snap to exact values once delta < 0.005.
3. **Hide the GLB screen mesh** (`mesh.visible = false`) so its baked wallpaper texture doesn't bleed through the overlay's rounded corners.
4. **Overlay has `border-radius: 13% / 6%`** matching iPhone screen corner curve, plus a CSS dynamic-island pill at top-centre.
5. **The `* { padding: 0 }` CSS reset gotcha** — Tailwind v4 utilities live in `@layer`; an unlayered universal `padding: 0` rule silently overrides every Tailwind padding utility. Removed from `globals.css`. This was the root cause of hours of "padding isn't applying" debugging.

### Screen mesh identification
The iPhone GLB (`public/models/iphone.glb`, 6.9MB) has obfuscated mesh names. The screen mesh was identified by logging all mesh bounding boxes and finding the one at 94% × 97% of phone body dimensions: `xXDHkMplTIDAXLN` (size 0.317 × 0.702, centre at -0.006, 0, -0.027).

## Files

| File | Role |
|------|------|
| `src/components/interactive-phone/InteractivePhone.tsx` | Orchestrator: docked Canvas + portal'd expanded Canvas + HTML overlay + backdrop + close handlers |
| `src/components/interactive-phone/DockedPhone3D.tsx` | R3F docked state: Float + OrbitControls + hover-scale + click-vs-drag detection |
| `src/components/interactive-phone/ExpandedPhone3D.tsx` | R3F expanded state: face-on lerp + screen-mesh projection to viewport pixels |
| `src/components/interactive-phone/PhoneContent.tsx` | Scrollable "Daily Email" mock UI (15 articles, ~3 phone-heights of scroll) |
| `src/components/interactive-phone/InteractivePhoneContext.tsx` | React context: `{ isExpanded, expand, close, sourceRect }` |
| `src/components/interactive-phone/Backdrop.tsx` | *(unused — backdrop now inlined in InteractivePhone)* |
| `src/components/slides/DeviceMockupSlide.tsx` | Hosts `<InteractivePhone />` where the old static CSS phone used to sit |
| `public/models/iphone.glb` | iPhone 15 Pro Max GLB (6.9MB, from `~/Desktop/Examples/3d-landing-demo/`) |

## Dependencies added
- `three@0.183.2`
- `@react-three/fiber@9.5.0`
- `@react-three/drei@10.7.7`
- `@react-three/postprocessing@3.0.4`

## Deck integration
- `HorizontalDeck.tsx` reads `isExpanded` from context and early-returns from wheel/touch/keyboard handlers when the phone is expanded (deck pagination suspended).
- Escape key and backdrop click both close the phone.
- `SLIDE_COUNT` in `HorizontalDeck.tsx` and `SlideIndicator.tsx` must stay in sync with the number of `<...Slide />` children in `App.tsx`.
