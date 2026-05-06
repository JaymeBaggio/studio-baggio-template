import Slide from "../Slide";
import DualHeadline from "../shared/DualHeadline";
import InteractivePhone from "../interactive-phone/InteractivePhone";

// Slide 14 — Translate into Assets (consolidated).
// Combines the old DeviceMockupSlide (laptop + 3D iPhone hero) with the Output Wall
// masonry grid. Left: devices + headline + URLs + stats. Right: every-format grid
// including the email template. Story: brand kit → every format, no rework.

interface Output {
  src: string;
  label: string;
  aspect: string;
}

// 13 tiles. Removed two theme-duplicates (story-campaigns-expire,
// story-brands-into-broadcasters). Added email-template. Infographic stays.
const outputs: Output[] = [
  // Col 1
  { src: "/fanclub/slide-07-assets/output-wall/linkedin-ad-16x9.png", label: "LinkedIn 16:9", aspect: "16/9" },
  { src: "/fanclub/slide-07-assets/output-wall/infographic.png", label: "Infographic", aspect: "4/5" },
  { src: "/fanclub/slide-07-assets/output-wall/carousel-01.png", label: "Carousel · open", aspect: "1/1" },

  // Col 2
  { src: "/fanclub/slide-07-assets/output-wall/campaigns-expire-channels-compound.png", label: "Hero · Campaigns expire", aspect: "1/1" },
  { src: "/fanclub/slide-07-assets/output-wall/email-template.png", label: "Email template", aspect: "3/4" },
  { src: "/fanclub/slide-07-assets/output-wall/story-audience-waiting.png", label: "Story · Audience", aspect: "9/16" },

  // Col 3
  { src: "/fanclub/slide-07-assets/output-wall/your-brand-has-an-audience-waiting.png", label: "Hero · Audience waiting", aspect: "1/1" },
  { src: "/fanclub/slide-07-assets/output-wall/gtm-cover.png", label: "GTM deck · cover", aspect: "16/9" },
  { src: "/fanclub/slide-07-assets/output-wall/linkedin-ad-vertical.png", label: "LinkedIn vertical", aspect: "4/5" },

  // Col 4
  { src: "/fanclub/slide-07-assets/output-wall/renting-attention.png", label: "Hero · Renting attention", aspect: "6/5" },
  { src: "/fanclub/slide-07-assets/output-wall/we-turn-brands-into-broadcasters.png", label: "Hero · Broadcasters", aspect: "1/1" },
  { src: "/fanclub/slide-07-assets/output-wall/linkedin-ad-square.png", label: "LinkedIn square", aspect: "1/1" },
  { src: "/fanclub/slide-07-assets/output-wall/carousel-03.png", label: "Carousel · close", aspect: "1/1" },
];

export default function OutputWallSlide() {
  return (
    <Slide bg="cream" id="translate-to-assets" anim="stagger" align="top">
      <div className="w-full h-full grid grid-cols-12 gap-6 items-stretch">
        {/* ───────── LEFT · devices + text ───────── */}
        <div className="col-span-5 flex flex-col h-full">
          {/* Top: persistent header + kicker + headline */}
          <div>
            <div className="deck-animate flex justify-between items-center mb-6 w-full">
              <span className="persistent-header text-[#999690]">05 · Assets</span>
              <span className="persistent-header text-[#999690]">Fan Club</span>
            </div>
            <span className="font-sans text-[13px] tracking-[0.3em] uppercase text-[#0A0A0A]/60 block mb-1.5">STEP 05</span>
            <span className="deck-animate kicker text-[#0A0A0A] mb-3 block">THREE LIVE BUILDS · EVERY FORMAT</span>
            <DualHeadline serif="TRANSLATE" italic="into assets" />
            <ul className="mt-5 space-y-1.5 max-w-[380px]">
              <li className="deck-animate flex items-start gap-2.5">
                <span className="w-1 h-1 rounded-full bg-[#0A0A0A] mt-[9px] flex-shrink-0" />
                <span className="font-sans text-[13px] leading-[1.55] text-[#0A0A0A]/70">
                  fanclub-site-psi.vercel.app — the website
                </span>
              </li>
              <li className="deck-animate flex items-start gap-2.5">
                <span className="w-1 h-1 rounded-full bg-[#0A0A0A] mt-[9px] flex-shrink-0" />
                <span className="font-sans text-[13px] leading-[1.55] text-[#0A0A0A]/70">
                  fan-club-agency-creds-2026.vercel.app — the creds
                </span>
              </li>
              <li className="deck-animate flex items-start gap-2.5">
                <span className="w-1 h-1 rounded-full bg-[#0A0A0A] mt-[9px] flex-shrink-0" />
                <span className="font-sans text-[13px] leading-[1.55] text-[#0A0A0A]/70">
                  fanclub-prospect-deck.vercel.app — the prospect engine
                </span>
              </li>
            </ul>
          </div>

          {/* Middle: devices (flex-1 fills remaining height) */}
          <div className="relative flex-1 mt-4 min-h-0">
            {/* Laptop — website */}
            <div
              className="deck-animate absolute w-[80%] aspect-[16/10] bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden"
              style={{ top: "4%", left: "0%", transform: "rotate(-2deg)" }}
            >
              <div className="w-full h-[7%] bg-[#e8e5e0] flex items-center gap-1.5 px-3">
                <div className="w-2 h-2 rounded-full bg-[#ccc]" />
                <div className="w-2 h-2 rounded-full bg-[#ccc]" />
                <div className="w-2 h-2 rounded-full bg-[#ccc]" />
              </div>
              <div className="w-full h-[93%] bg-white overflow-hidden">
                <img
                  src="/fanclub/slide-07-assets/live-builds/website-live-fresh.png"
                  alt="Fan Club website"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Interactive 3D iPhone — hero. deck-animate so it fades in with
                the other staggered content instead of appearing pre-lit. */}
            <div
              className="deck-animate absolute z-20"
              style={{ bottom: "0%", right: "2%", width: "min(220px, 18vw)", height: "min(360px, 46vh)" }}
            >
              <InteractivePhone />
            </div>
          </div>
        </div>

        {/* ───────── RIGHT · output wall ───────── */}
        <div className="col-span-7 flex flex-col h-full min-h-0">
          {/* Sub-header */}
          <div className="mb-3 flex items-baseline justify-between pb-2 border-b border-[#0A0A0A]/15 flex-shrink-0">
            <span className="deck-animate font-sans text-[13px] tracking-[0.3em] uppercase text-[#0A0A0A]/55">
              THE OUTPUT WALL · EVERY ASSET, EVERY PLATFORM
            </span>
            <span className="deck-animate font-sans text-[13px] tracking-[0.2em] uppercase text-[#0A0A0A]/40">
              40+ in the Brand OS
            </span>
          </div>

          {/* Masonry — 4 cols */}
          <div
            className="flex-1 overflow-hidden min-h-0"
            style={{
              columnCount: 4,
              columnGap: "6px",
            }}
          >
            {outputs.map((o, i) => (
              <div
                key={i}
                className="deck-animate mb-1.5 rounded overflow-hidden shadow-md border border-[#0A0A0A]/10 bg-white relative group"
                style={{
                  breakInside: "avoid",
                  aspectRatio: o.aspect,
                }}
              >
                <img
                  src={o.src}
                  alt={o.label}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute bottom-0 left-0 right-0 font-sans text-[10px] uppercase tracking-wider text-white px-1.5 py-0.5"
                  style={{
                    background: "linear-gradient(to top, rgba(13,13,13,0.8), rgba(13,13,13,0))",
                  }}
                >
                  {o.label}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <span className="font-sans text-[13px] tracking-[0.2em] uppercase text-[#0A0A0A]/45 mt-2 flex-shrink-0">
            LinkedIn · Carousels · Stories · Email · GTM · Hero art · Infographic
          </span>
        </div>
      </div>
    </Slide>
  );
}
