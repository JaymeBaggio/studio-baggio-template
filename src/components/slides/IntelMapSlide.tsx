import Slide from "../Slide";

// Slide 4 — Build the Context.
// Dense thought-cloud of everything found in one Firecrawl pass.
// Merges: intel screenshots + people + career paths + investment detail +
// client work + new hires + industry profile + stat callouts.
// Fan Club logo centred. Everything else floats around at native aspects.

// ═══════════ Image tiles (native aspects, no forced crop) ═══════════
type Tile = {
  src: string; label: string;
  top: string; left: string; width: string; aspect: string;
  kind: "web" | "photo"; rotate?: string;
};

const tiles: Tile[] = [
  // Top band — LinkedIn / Companies House / YouTube
  { src: "/fanclub/slide-03-context/screenshots/linkedin-company.png",        label: "LinkedIn · Company", top: "4%",  left: "2%",  width: "16%", aspect: "16/10", kind: "web", rotate: "-1.5deg" },
  { src: "/fanclub/slide-03-context/screenshots/companies-house.png",         label: "Companies House",    top: "4%",  left: "65%", width: "16%", aspect: "4/3",   kind: "web" },
  { src: "/fanclub/slide-03-context/screenshots/youtube-prime-time-beer.png", label: "YT · Prime Time Beer", top: "3%", left: "82%", width: "16%", aspect: "16/10", kind: "web", rotate: "1.5deg" },
  // Upper mid — LinkedIn posts + press
  { src: "/fanclub/slide-03-context/screenshots/joe-linkedin.png",            label: "LinkedIn · Joe",     top: "23%", left: "2%",  width: "15%", aspect: "4/3",   kind: "web" },
  { src: "/fanclub/slide-03-context/press/press-deadline.png",                label: "Deadline",           top: "22%", left: "82%", width: "16%", aspect: "16/9",  kind: "web", rotate: "1deg" },
  // Middle band — around the logo
  { src: "/fanclub/slide-03-context/screenshots/studiofanclub-homepage.png",  label: "studiofanclub.com",  top: "44%", left: "2%",  width: "13%", aspect: "4/3",   kind: "web", rotate: "1.5deg" },
  { src: "/fanclub/slide-03-context/press/press-broadcast.png",               label: "Broadcast",          top: "44%", left: "84%", width: "14%", aspect: "16/10", kind: "web", rotate: "-1.5deg" },
  // Lower mid
  { src: "/fanclub/slide-03-context/screenshots/companies-house-officers.png", label: "CH · Officers",     top: "64%", left: "2%",  width: "14%", aspect: "4/3",   kind: "web" },
  { src: "/fanclub/slide-03-context/screenshots/youtube-russell-hobbs.png",   label: "YT · Russell Hobbs", top: "64%", left: "83%", width: "15%", aspect: "16/10", kind: "web", rotate: "2deg" },
  // Bottom band — shows + press mastheads
  { src: "/fanclub/slide-03-context/partners/prime-time-beer.jpg",            label: "Prime Time Beer",    top: "82%", left: "2%",  width: "19%", aspect: "16/9",  kind: "photo", rotate: "1deg" },
  { src: "/fanclub/slide-03-context/partners/mipcom-2025.png",                label: "MIPCOM 2025",        top: "84%", left: "28%", width: "14%", aspect: "16/9",  kind: "photo" },
  { src: "/fanclub/slide-03-context/press/press-mediashotz.png",              label: "MediaShotz",         top: "83%", left: "55%", width: "16%", aspect: "16/10", kind: "web", rotate: "1deg" },
  { src: "/fanclub/slide-03-context/press/press-broadcast.png",               label: "Broadcast · bottom", top: "83%", left: "75%", width: "20%", aspect: "16/10", kind: "web", rotate: "-1deg" },
];

// ═══════════ People (circular headshots) ═══════════
type Person = { src: string; label: string; top: string; left: string; size: string };

const people: Person[] = [
  { src: "/fanclub/slide-03-context/people/joe-churchill.jpg",  label: "Joe",    top: "14%", left: "22%", size: "5.5vw" },
  { src: "/fanclub/slide-03-context/people/sonny-mclean.jpg",   label: "Sonny",  top: "56%", left: "19%", size: "5vw" },
  { src: "/fanclub/slide-03-context/people/ellen-stewart.jpg",  label: "Ellen",  top: "8%", left: "78%", size: "4.5vw" },
  { src: "/fanclub/slide-03-context/people/oliver-warley.jpg",  label: "Oliver", top: "48%", left: "80%", size: "4.8vw" },
];

// ═══════════ Text cards (scattered, SocialProof-style) ═══════════
type TextCard = {
  heading: string;
  body: string;
  top: string; left: string;
  width?: string;
  rotate?: string;
  tint?: "white" | "navy" | "pink" | "yellow";
};

const textCards: TextCard[] = [
  // Career paths
  { heading: "JOE · FOUNDER", body: "Channel 4 (4yrs, Commissioning Editor) → Sony Pictures (5yrs, Sr Dev Producer) → Studio Weekend (4yrs, Founder).", top: "14%", left: "29%", width: "17%", rotate: "-1deg" },
  // Joe's actual commissioned shows at C4 — proof of commissioning pedigree
  { heading: "AT C4 — SHOWS GREENLIT", body: "Secret Life of 5 Year Olds (EON Next) · Kojey's Block Party (Brooklyn Brewery) · Second-Hand Showdown (Vinted). Multiple Broadcast Digital Awards.", top: "4%", left: "22%", width: "17%", tint: "pink", rotate: "0.5deg" },
  { heading: "SONNY · COMMERCIAL DIRECTOR", body: "ex-Jungle Creations (3yrs · Brand Partnerships: Ford, E.L.F, KFC, Vinted, EON). Channel 4 (Group Manager, Social Branded). 30 Under 30.", top: "56%", left: "26%", width: "19%", rotate: "1.5deg" },
  // Investment
  { heading: "STV STUDIOS", body: "Minority stake · May 2025. Only branded-content label in the group. 1 of 22. FastFwd target £200M by 2030.", top: "29%", left: "26%", width: "17%", tint: "navy", rotate: "-1deg" },
  { heading: "PLAN 9 · BROKER", body: "Plan 9 Consultancy brokered the deal. Richard Parsons — legal.", top: "39%", left: "19%", width: "13%", rotate: "1deg" },
  // STV CEO quote — pushed to far right, below Ellen headshot
  { heading: "DAVID MORTIMER · STV CEO", body: "\u201CJoe is uniquely positioned to build and deliver long-term market strategies for UK and international brands. He\u2019s an expert at what he does with a creative genius and flare for highly engaging branded content that truly engages consumers.\u201D", top: "30%", left: "74%", width: "22%", tint: "navy", rotate: "-0.5deg" },
  // Industry validation — moved to mid-left (clear of centre logo)
  { heading: "MARTIN AGENCY", body: "Named Fan Club in LinkedIn post: \u2018Branded Entertainment Trends 2026: Brands as Studios\u2019. External peer validation.", top: "54%", left: "4%", width: "16%", tint: "pink", rotate: "1deg" },
  // Industry profile — kept clear of centre logo zone
  { heading: "MIPCOM 2025", body: "'Turning Brands into Broadcasters' panel with Justin Crosby, Digital Content Forum.", top: "36%", left: "56%", width: "14%", rotate: "1deg" },
  { heading: "CREATE LONDON · 29 APR 2026", body: "Joe speaking. Digital, branded, fandom.", top: "48%", left: "72%", width: "14%", rotate: "-1deg" },
  { heading: "THE DRUM · MEDIA TRENDS 2026", body: "Joe quoted on social perception shifts.", top: "60%", left: "72%", width: "15%", rotate: "1deg" },
  // Client work
  { heading: "PRIME TIME BEER", body: "Low-Cal Cook-Off · YouTube · Ep1: 110K views · 112 subs.", top: "72%", left: "22%", width: "16%", tint: "pink", rotate: "-1deg" },
  { heading: "RUSSELL HOBBS", body: "Steam Queens · Midnight Collection · C21 Media, Jan 2026.", top: "72%", left: "43%", width: "16%", rotate: "1deg" },
  { heading: "FAWKES DIGITAL", body: "Production partner. Creator-led formats for brands.", top: "72%", left: "64%", width: "13%", rotate: "-1deg" },
  // New hires
  { heading: "ELLEN STEWART · NEW HIRE", body: "Director of Strategy & Ops · ex-Reach plc (130-person dept) · Vogue · C4 · The Standard · Independent.", top: "14%", left: "60%", width: "13%", tint: "yellow" },
  { heading: "OLIVER WARLEY · NEW HIRE", body: "Head of Content · ex-PinkNews · Jungle. Building in-house production.", top: "56%", left: "60%", width: "13%", tint: "yellow" },
  // Digital presence
  { heading: "DIGITAL PRESENCE", body: "studiofanclub.com · single-page Wix · OG tags still say 'Mysite'. 3 pillars: Consultancy, Creation, Community. LinkedIn 335 followers · latest post Sonny on IAB adspend. IG @studiofanclub · TikTok @fan.club96 — BTS + collab posts.", top: "6%", left: "42%", width: "15%", rotate: "1deg" },
  // Press timeline — pulled to bottom band below logo, full width
  { heading: "PRESS TIMELINE · MAY '25 → APR '26", body: "May · STV investment (C21 + Deadline) → Jul · Sonny joins → Oct · MIPCOM panel → Dec · Prime Time Beer → Jan · Russell Hobbs → Mar · The Drum → Apr · Ellen + Oliver join.", top: "64%", left: "30%", width: "38%", tint: "navy" },
];

// ═══════════ Stat callouts ═══════════
type Stat = { value: string; label: string; top: string; left: string };

const stats: Stat[] = [
  { value: "£200M",   label: "STV FastFwd target · 2030",     top: "8%",  left: "38%" },
  { value: "£66M",    label: "Forward order book · Apr '25", top: "44%", left: "17%" },
  { value: "14,808",  label: "Joe's LinkedIn followers",     top: "44%", left: "62%" },
  { value: "110K",    label: "Prime Time Beer Ep1 views",    top: "77%", left: "70%" },
];

// ═══════════ Tint backgrounds for text cards ═══════════
const tintStyle = (tint?: string) => {
  switch (tint) {
    case "navy":   return { background: "#183263", color: "#FFF98D" };
    case "pink":   return { background: "#F96090", color: "#FFFFFF" };
    case "yellow": return { background: "#FFF98D", color: "#183263" };
    default:       return { background: "#FFFFFF", color: "#0A0A0A" };
  }
};

export default function IntelMapSlide() {
  return (
    <Slide bg="cream" id="context-map" anim="stagger" noPadding>
      <div className="w-full h-full overflow-hidden">
      <div className="relative w-full h-full" style={{ top: "4vh" }}>
        {/* Header — top-right */}
        <div className="absolute z-40 rounded-sm" style={{ top: "1%", right: "1.5%", textAlign: "right", background: "rgba(250,246,240,0.9)", padding: "8px 14px", backdropFilter: "blur(4px)" }}>
          <span className="block font-sans text-[13px] tracking-[0.3em] uppercase text-[#0A0A0A]/50">
            01 · THE MAP
          </span>
          <h2
            className="dual-serif text-[#0A0A0A] uppercase leading-[0.9] mt-1"
            style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)" }}
          >
            Build the <span className="dual-italic normal-case">context</span>
          </h2>
        </div>

        {/* Centrepiece — Fan Club logo watermark. Boosted to 18% / full opacity so it reads from the middle of the intel map. */}
        <div className="absolute pointer-events-none" style={{ top: "42%", left: "41%", width: "18%", zIndex: 5, opacity: 1 }}>
          <img
            src="/fanclub/_shared/fanclub-logo-duotone.svg"
            alt="Fan Club"
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))" }}
          />
        </div>

        {/* Image tiles */}
        {tiles.map((t, i) => (
          <div
            key={`tile-${i}`}
            className="deck-animate absolute overflow-hidden bg-white shadow-md border border-[#0A0A0A]/10 rounded-sm"
            style={{
              top: t.top, left: t.left, width: t.width,
              aspectRatio: t.aspect,
              transform: t.rotate ? `rotate(${t.rotate})` : undefined,
              zIndex: 10,
            }}
          >
            <img
              src={t.src} alt={t.label}
              className={`w-full h-full ${t.kind === "web" ? "object-cover object-top" : "object-cover"}`}
              loading="lazy"
            />
            <span
              className="absolute bottom-0 left-0 right-0 font-sans text-[10px] uppercase tracking-wider text-white px-2 py-1"
              style={{ background: "linear-gradient(to top, rgba(13,13,13,0.85), rgba(13,13,13,0))" }}
            >
              {t.label}
            </span>
          </div>
        ))}

        {/* People circles */}
        {people.map((p, i) => (
          <div
            key={`person-${i}`}
            className="deck-animate absolute rounded-full overflow-hidden shadow-lg border-2 border-white"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, zIndex: 20 }}
          >
            <img src={p.src} alt={p.label} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Text cards */}
        {textCards.map((c, i) => {
          const style = tintStyle(c.tint);
          return (
            <div
              key={`card-${i}`}
              className="deck-animate absolute rounded-md shadow-md px-3 py-2"
              style={{
                top: c.top, left: c.left,
                width: c.width ?? "16%",
                transform: c.rotate ? `rotate(${c.rotate})` : undefined,
                zIndex: 15,
                ...style,
              }}
            >
              <span
                className="block font-sans font-semibold text-[13px] tracking-[0.12em] uppercase mb-1"
                style={{ color: style.color, opacity: 0.9 }}
              >
                {c.heading}
              </span>
              <span
                className="block font-sans text-[13px] leading-snug"
                style={{ color: style.color, opacity: 0.95 }}
              >
                {c.body}
              </span>
            </div>
          );
        })}

        {/* Stat callouts */}
        {stats.map((s, i) => (
          <div
            key={`stat-${i}`}
            className="deck-animate absolute"
            style={{ top: s.top, left: s.left, zIndex: 18 }}
          >
            <span
              className="font-serif text-[#0A0A0A] leading-none block"
              style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)", fontWeight: 300 }}
            >
              {s.value}
            </span>
            <span className="font-sans text-[13px] uppercase tracking-wider text-[#0A0A0A]/55 mt-1 block max-w-[130px] leading-snug">
              {s.label}
            </span>
          </div>
        ))}

        {/* Footer method bar */}
        <div
          className="absolute z-40 flex items-center justify-between px-[2%]"
          style={{ bottom: "1%", left: 0, right: 0 }}
        >
          <span className="font-sans text-[13px] uppercase tracking-[0.2em] text-[#0A0A0A]/50">
            Firecrawl · 96% of the public web · one pass
          </span>
          <span className="font-sans text-[13px] uppercase tracking-[0.2em] text-[#0A0A0A]/50">
            Deadline · Broadcast · C21 · MediaShotz · Companies House · LinkedIn · YouTube · The Drum
          </span>
        </div>
      </div>
      </div>
    </Slide>
  );
}
