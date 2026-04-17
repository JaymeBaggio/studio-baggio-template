# Studio Baggio Deck Template

## Critical: duplicate before customising

**Before making ANY content changes or adding client-specific slides, duplicate the entire repo first.** This is a reusable template — never put client content directly into `main`. Create a new repo per engagement (e.g., `fanclub-deck`, `charlotte-deck`) by cloning this one.

```bash
# Example: create a FanClub-specific deck
cp -r ~/Desktop/studio-baggio-template ~/Desktop/fanclub-deck
cd ~/Desktop/fanclub-deck
rm -rf .git
git init && git add -A && git commit -m "Fork from studio-baggio-template"
```

Same applies when experimenting with new slide variants — work on a branch or a copy, not `main`.

## Stack

React 19 + TypeScript + Vite 8 + Tailwind v4 + GSAP 3.15 + React Three Fiber (drei, postprocessing) for the 3D iPhone.

## Fonts

- **Satoshi** (sans, self-hosted woff2 at `public/fonts/`) — body, UI, kickers, labels
- **Fraunces** (variable serif, Google Fonts) — display headlines + italic accent

Playfair Display and Cormorant Garamond were removed 17 Apr 2026.

## Colours

Monochrome. No accent colour.
- Cream bg: `#FAF6F0` (CSS var `--color-cream`)
- Dark bg: `#0D0D0D` (CSS var `--color-dark`)
- Text: `#0A0A0A`
- Grey: `#999690`

Gold (`#D4A853`) was removed 17 Apr 2026.

## Architecture

- **Event-driven horizontal pagination** — one wheel/touch/keyboard gesture = one slide. No free scrolling. No Lenis. `HorizontalDeck.tsx` manages navigation.
- **GSAP content animations** — each slide has a `data-anim` type. Animations play on slide entry via `playSlideContent` in `HorizontalDeck.tsx`.
- **`SLIDE_COUNT`** in `HorizontalDeck.tsx` and `SlideIndicator.tsx` MUST match the number of `<...Slide />` children in `App.tsx`. Update all three together.

## Slide types (28 total)

| Slides | Type | Notes |
|--------|------|-------|
| 1 | CoverSlide | Dark, wordmark centred |
| 2 | StatementSlide | Cream, big serif text |
| 3, 15 | FullBleedStatSlide | Photo bg + stat overlay |
| 4, 11, 20, 23 | DividerSlide | Two variants: `editorial` (chapter-mark) and `image` (full-bleed photo). Alternates through deck. |
| 5 | PlatformReachSlide | Multi-channel + device mockups |
| 6 | AudienceStatsSlide | Photo + stat overlay |
| 7 | EditorialCollageSlide | Photo collage + story |
| 8, 12, 14, 21, 22 | SplitSlide | Text/photo split, configurable direction |
| 9 | ProductShowcaseSlide | Daily email + device mockups |
| 10 | DeviceMockupSlide | **Interactive 3D iPhone** (R3F GLB + scrollable HTML overlay). See `docs/interactive-phone-spec.md`. |
| 13 | StatWallSlide | Dark bg, white stat counters |
| 16 | SocialProofSlide | Scattered comment cards |
| 17 | TeamInfluenceSlide | Photo collage + stats |
| 18 | BrandGridSlide | Vertical photo strips |
| 19 | LogoWallSlide | Client logos grid |
| 24 | ClosingSlide | Photo mosaic + animated "Jayme Baggio" band |
| 25 | FrameworkSlide (layers) | **Click-driven progressive reveal** — 7 steps stack vertically. Each scroll reveals one step. |
| 26 | FrameworkSlide (split-build) | **Click-driven progressive reveal** — collage builds on left, text swaps on right. |
| 27 | ComparisonTableSlide (highlighted) | 3-column capability matrix, Studio Baggio column highlighted |
| 28 | ComparisonTableSlide (matrix) | Same data, equal-weight editorial matrix |

## Key files

| File | What it does |
|------|-------------|
| `src/App.tsx` | Slide order + props. Add/remove slides here. |
| `src/components/HorizontalDeck.tsx` | Navigation, GSAP animations, `SLIDE_COUNT` |
| `src/components/SlideIndicator.tsx` | Dot indicator, `SLIDE_COUNT` |
| `src/components/Slide.tsx` | Base slide wrapper (bg mode, animation type) |
| `src/styles/globals.css` | Design tokens, typography classes, print styles |
| `src/data/placeholders.ts` | All placeholder copy + image URLs |
| `public/models/iphone.glb` | iPhone 15 Pro Max 3D model (6.9MB) |
| `docs/interactive-phone-spec.md` | Full spec for the 3D iPhone overlay system |

## CSS gotcha

`globals.css` must NOT have `* { padding: 0 }`. Tailwind v4 utilities live in `@layer`; an unlayered universal `padding: 0` rule silently overrides every Tailwind padding utility. This was the root cause of a multi-hour debugging session on 17 Apr 2026.

## Framework slides — navigation hijack

The FrameworkSlide component registers capture-phase wheel/keyboard listeners that intercept deck navigation while steps remain unrevealed. After all 7 steps are shown, the next gesture passes through to HorizontalDeck. This is the same pattern as the InteractivePhone's pagination suspension.

## Interactive 3D iPhone — viewport-projected overlay

The iPhone screen content is a standard HTML overlay (`position: fixed`) whose position/size is set every frame by projecting the GLB screen mesh's front-face corners to viewport pixels. Full technique documented in project memory at `~/.claude/projects/-Users-jaymebaggio/memory/project_iphone_3d_overlay_technique.md`.

## Deployment

Vercel via GitHub. Push to `main` = auto-deploy. Live at https://studio-baggio-template.vercel.app
