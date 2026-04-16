# Interactive 3D Phone — Spec
*Studio Baggio Deck Template | Drafted 16 Apr 2026*

## Goal
Turn the existing static phone mockup in `DeviceMockupSlide` into an interactive 3D feature: small and tilted in its slide, then on tap it pops out, centres, enlarges, and the user can scroll deck-relevant content inside the screen. Click outside or press Escape to dismiss.

Reference: https://showcased.webflow.io/projects/mockup-scroll (Jayme's chosen ref — phone-frame-with-scrollable-content), upgraded with 3D tilt and a captured-scroll interaction model because the deck has no native page scroll.

## Decision: B (pop-out interactive), not A (cinematic auto-scroll)
A is what `DeviceMockupSlide.tsx` already does (autoplay phoneScroll y: 0 → -55%). It's pretty but passive — you can't actually read content inside, and it doesn't justify the build. B turns the phone into a content surface, which is what makes it useful for client decks.

## Out of scope (deliberately)
- React Three Fiber / Three.js / GLB models. CSS 3D transforms are sufficient for the tilt and pop-out we want, and avoid loading a 3D runtime for one slide.
- Multiple expanded phones at once (one phone open at a time, full-stop).
- Mobile responsive layout for the deck overall (tracked separately in MEMORY.md).
- Replacing the existing slide-level `playSlideContent` animation system. The phone hooks into it but doesn't replace it.

---

## State machine
Three states, one source of truth.

| State | Trigger | Visual | Deck pagination |
|---|---|---|---|
| `docked` | Default on slide enter | Phone small, in its layout grid position, tilted (rotateY 12°, rotateX 5°), brief auto-scroll preview (~2s, then halts) | Active |
| `expanded` | User clicks/taps the phone OR the "Tap to explore" CTA | Phone scaled to ~70vh, translated to viewport centre, rotated flat, backdrop dimmed + blurred | Suspended |
| `closing` | User clicks backdrop / presses Esc / clicks × button | Phone reverses to `docked` over 0.6s, backdrop fades | Suspended → Active on transition complete |

State lives in a single `InteractivePhoneContext` exposed at the App root, so `HorizontalDeck` can read `isExpanded` and skip wheel/touch/keyboard handlers while the phone owns the input.

## Interaction details

### Mouse / trackpad
- **Docked:** Hover shows subtle scale (1.02) + shadow lift. Cursor becomes pointer. Click anywhere on phone → expand.
- **Expanded:** Wheel events on the phone's inner scrollable area scroll the content. `e.stopPropagation()` so deck doesn't see them. Wheel events on the backdrop (outside the phone) close it.
- **Closing:** Click on × button (top-right of phone) or anywhere on backdrop → close.

### Touch
- **Docked:** Tap on phone → expand. Touch swipes elsewhere on the slide still navigate the deck (current behaviour).
- **Expanded:** Vertical touch swipes inside the phone scroll content. Horizontal swipes inside the phone do nothing (don't navigate the deck — phone has focus). Any touch outside the phone closes it.
- Touch isolation handled by attaching `touchstart`/`touchmove` listeners to the phone container with `stopPropagation`, so HorizontalDeck's existing global touch handlers don't fire.

### Keyboard
- **Docked:** No phone-specific keys. Arrow keys still navigate the deck.
- **Expanded:** `Escape` closes. Arrow Up/Down scrolls phone content. Arrow Left/Right does nothing (deck navigation suspended).
- Focus trap: when expanded, focus moves to the phone container; restored to the original trigger element on close.

## Visual treatment

### Docked
- Position: existing layout slot in `DeviceMockupSlide` (bottom-right area, z-20).
- Size: `w-[18vw] max-w-[180px]`, aspect 9/19.
- Tilt: `rotateY(12deg) rotateX(5deg)`, `perspective: 800px` on wrapper, `transform-style: preserve-3d`.
- Shadow: existing 2xl shadow.
- Auto-preview: on slide entry, content scrolls from y:0 to y:-30% over 2s with `power1.inOut`, then halts. (Currently runs to -55% over 5s — too long, gives away too much; we shorten so user is curious to expand.)

### Expanded
- Position: `position: fixed`, centred via `top: 50%; left: 50%; translate: -50% -50%`.
- Size: `height: 70vh`, width derived from 9/19 ratio (~33vh wide).
- Tilt: rotates flat (`rotateY(0) rotateX(0)`) over 0.7s with `power3.out`.
- Subtle scroll-driven parallax: as user scrolls inside, phone tilts ±2° on Y axis (not enough to feel gimmicky, enough to feel alive).
- Backdrop: full-screen `position: fixed`, `background: rgba(0,0,0,0.6)`, `backdropFilter: blur(12px)`, fades in over 0.4s.
- Close button: small × in top-right corner of the phone, gold (`#D4A853`), appears with 0.3s delay after expansion completes.
- "Tap to explore" CTA appears under docked phone on hover, fades out on expand.

### Animation timings (single GSAP timeline for expand)
```
0.0s  Backdrop fade in (0.4s, power2.out)
0.0s  Phone scale + translate to centre (0.7s, power3.out)
0.1s  Phone tilt to flat (0.6s, power3.out)
0.7s  Close button fade in (0.3s)
```
Reverse for close (0.6s total, power2.inOut).

## Architecture

### New files
```
src/
  components/
    interactive-phone/
      InteractivePhone.tsx       # The phone shell (docked + expanded states)
      PhoneContent.tsx           # Scrollable inner content (used in both states)
      InteractivePhoneContext.tsx # State provider: { isExpanded, expand, close }
      Backdrop.tsx               # Dimmed backdrop with blur, click-to-close
```

### Modified files
- `App.tsx` — wrap deck in `<InteractivePhoneProvider>`, render `<Backdrop />` at root level.
- `HorizontalDeck.tsx` — read `isExpanded` from context, early-return from wheel/touch/keyboard handlers when true.
- `DeviceMockupSlide.tsx` — replace inline phone JSX with `<InteractivePhone />` component. Drop the existing GSAP autoscroll logic (moves into `InteractivePhone`).
- `Slide.tsx` — no changes.

### Why a context (not just lifting state to App.tsx)
Three separate components need to read or write phone state:
- `InteractivePhone` (writes: expand on click)
- `Backdrop` (writes: close on click)
- `HorizontalDeck` (reads: pause pagination)

A context is the cleanest way to share. Alternative would be a global event bus (we already use `window.dispatchEvent('slide-change')`) but context is more explicit and React-idiomatic for shared state.

## Deck pagination integration
In `HorizontalDeck.tsx`, modify the existing handlers:

```tsx
const { isExpanded } = useInteractivePhone();

const onWheel = (e: WheelEvent) => {
  if (isExpanded) return; // phone owns input
  e.preventDefault();
  // ... existing logic
};

const onTouchStart = (e: TouchEvent) => {
  if (isExpanded) return;
  // ... existing logic
};

const onKeyDown = (e: KeyboardEvent) => {
  if (isExpanded) return; // Escape handled by InteractivePhone
  // ... existing logic
};
```

The `isAnimatingRef` lock is *not* used for this — it's specifically for slide transitions. Phone state is a separate concern.

## Content inside the phone

This is the part you need to define. The current placeholder is grey rectangles. For the spec, three options:

1. **Mock-screenshot approach.** A static long PNG (designed in Figma or Canva) showing fake email content, fake messages, fake app UI relevant to "Studio Baggio email". Simplest, looks great, no maintenance.
2. **HTML/Tailwind approach.** Build the inner content as actual HTML (header bar, message cards, image rows). Editable, can pull from `placeholders.ts`. More code but more flexible.
3. **Hybrid.** HTML structure with image cards that swap based on which deck slide is active (so the phone "matches" the surrounding slide).

**My recommendation: option 2.** Most flexible for a template, easy to swap copy per-client, doesn't depend on Figma. I'd build a "Daily Email" mock UI matching the existing `ProductShowcaseSlide` visual language (cream bg, serif headlines, small kicker labels, image cards).

I need a decision from you on this before building.

## Edge cases

- **What if user expands phone, then resizes window?** Recompute centre position on `resize`. GSAP set on the centred position, no animation.
- **What if user expands phone on slide N, then somehow advances?** Can't — pagination is suspended. But as a defensive measure, on `close()` we re-sync deck position to `currentRef.current * window.innerWidth`.
- **What about other slides with phones?** Currently only `DeviceMockupSlide` has the 3D phone. `PlatformReachSlide` and `ProductShowcaseSlide` have flat mockups. Spec scope: make `InteractivePhone` reusable so we can add it to those slides later, but only wire it into `DeviceMockupSlide` in this build.
- **Print mode?** Existing `@media print` rules force `deck-animate` to opacity 1 / no transform. We add a print rule that hides the backdrop and renders the phone in its docked state with full content visible.
- **Slide reset.** When user navigates away from `DeviceMockupSlide` while phone is docked, existing `resetSlideContent` clears it. Fine. But if expanded, they can't navigate (handlers suspended), so this can't happen.

## Acceptance criteria

The build is done when:
1. On slide 10 (DeviceMockupSlide), phone appears small and tilted with a brief content preview.
2. Clicking/tapping phone smoothly enlarges it to centre with backdrop blur.
3. Wheel/touch scroll inside phone scrolls inner content; deck does not advance.
4. Click outside, press Escape, or click × dismisses phone; deck pagination resumes immediately.
5. Subtle 3D tilt parallax during inner scroll.
6. Mobile touch isolation works (vertical swipe inside scrolls phone, tap outside dismisses, doesn't accidentally trigger deck).
7. Print preview shows phone in docked state with content visible.
8. No console errors. No layout shift on expand. No flicker on close.
9. Lighthouse perf score on `/` does not regress more than 5 points vs current.

## Sequence I'll build in (if approved)

1. Stub the context provider + `isExpanded` boolean. Wire pagination suspension into `HorizontalDeck`. Verify by toggling state from devtools.
2. Extract docked phone JSX from `DeviceMockupSlide` into `InteractivePhone` component. No expand behaviour yet — just refactor + visual parity.
3. Build expand/close GSAP timeline + backdrop. Click phone → expand. Click backdrop → close.
4. Build `PhoneContent` (option 2 from above, pending your call). Make it scrollable inside phone.
5. Wire wheel + touch + keyboard handlers with isolation.
6. Add 3D tilt parallax during scroll.
7. Add × close button + "Tap to explore" CTA.
8. Test on mobile (iOS Safari + Chrome Android via Playwriter).
9. Print mode CSS.
10. Deploy preview branch on Vercel, verify with Playwriter, return URL.

---

## Decisions I need from you before building

1. **Content inside the phone — option 1, 2, or 3?** (My recommendation: 2 — HTML "Daily Email" mock matching `ProductShowcaseSlide` style.)
2. **Should the × close button be visible from the moment phone expands, or fade in after 0.7s?** (My pick: fade in after, less cluttered during the expand animation.)
3. **"Tap to explore" CTA — show always, on hover only, or never?** (My pick: on hover only, to keep docked state clean. On touch devices it shows always since there's no hover.)
4. **Does any other slide need the same treatment in this build?** (My pick: no — DeviceMockupSlide only. Make the component reusable for later.)
5. **Animation feel — snappier (current spec, 0.7s expand) or more cinematic (1.2s expand with overshoot easing)?** (My pick: 0.7s power3.out — feels responsive, not theatrical.)
