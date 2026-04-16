import Slide from "../Slide";

// Two divider variants:
//
// "editorial" — magazine chapter mark. Massive section number top-left in
//   Fraunces serif, big uppercase sans title, italic descriptor sentence,
//   bottom-right wordmark + page count. Asymmetric, restrained, premium.
//
// "image"     — full-bleed editorial photo at ~60% darkness with bottom-left
//   text overlay (section number in serif + section title big serif +
//   italic subtitle). Cinematic break in the cream rhythm.

interface DividerSlideProps {
  id: string;
  /** Section number, e.g. "01", "02" */
  number: string;
  /** Short kicker label, e.g. "THE APPROACH" */
  kicker: string;
  /** Big section title, e.g. "Strategy in practice" */
  title: string;
  /** One-sentence descriptor of what the section covers */
  descriptor?: string;
  /** Variant of divider design */
  variant?: "editorial" | "image";
  /** Photo URL — required for "image" variant */
  image?: string;
  /** Old prop, kept for back-compat with existing App.tsx call sites */
  letter?: string;
}

export default function DividerSlide({
  id,
  number,
  kicker,
  title,
  descriptor = "",
  variant = "editorial",
  image,
}: DividerSlideProps) {
  if (variant === "image" && image) {
    return (
      <Slide bg="photo" id={id} anim="stagger" noPadding>
        {/* Full-bleed editorial photo */}
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(0.9)" }}
        />
        {/* Subtle gradient toward bottom-left for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Bottom-left text overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-[8vw]">
          <div className="deck-animate flex items-baseline gap-4 mb-6">
            <span className="font-serif text-white/70 text-3xl md:text-4xl tabular-nums">
              {number}
            </span>
            <div className="h-px w-16 bg-white/40" />
            <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/70">
              {kicker}
            </span>
          </div>
          <h2 className="deck-animate dual-serif text-white text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.95] max-w-[700px]">
            {title}
          </h2>
          {descriptor && (
            <p className="deck-animate dual-italic text-white/80 text-2xl md:text-3xl leading-snug mt-6 max-w-[640px]">
              {descriptor}
            </p>
          )}
        </div>
      </Slide>
    );
  }

  // Editorial variant (default)
  return (
    <Slide bg="cream" id={id} anim="stagger" align="top">
      <div className="w-full h-full grid grid-cols-12 gap-8">
        {/* Left column: massive section number, hangs from top */}
        <div className="col-span-3 flex flex-col">
          <span
            className="deck-animate font-serif text-[#0A0A0A] leading-[0.85] tabular-nums"
            style={{ fontSize: "clamp(7rem, 14vw, 14rem)", fontWeight: 300 }}
          >
            {number}
          </span>
          <div className="deck-animate w-12 h-px bg-[#0A0A0A]/30 mt-6" />
        </div>

        {/* Right column: kicker + title + descriptor, vertically centred */}
        <div className="col-span-9 flex flex-col justify-center pl-[2vw] pr-[4vw] pb-[6vh]">
          <span className="deck-animate kicker text-[#0A0A0A]/60 mb-6">
            {kicker}
          </span>
          <h2
            className="deck-animate dual-serif text-[#0A0A0A] uppercase leading-[0.95] mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
          >
            {title}
          </h2>
          {descriptor && (
            <p className="deck-animate dual-italic text-[#0A0A0A]/70 text-2xl md:text-3xl leading-snug max-w-[700px]">
              {descriptor}
            </p>
          )}

          {/* Footer rule + wordmark — bottom right */}
          <div className="deck-animate absolute bottom-[6vh] right-[8vw] flex items-center gap-4">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/40">
              Studio Baggio
            </span>
            <div className="w-8 h-px bg-[#0A0A0A]/30" />
            <span className="font-sans text-[10px] tracking-[0.2em] tabular-nums text-[#0A0A0A]/40">
              §{number}
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
