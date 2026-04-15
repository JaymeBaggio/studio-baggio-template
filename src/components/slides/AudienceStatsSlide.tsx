import Slide from "../Slide";

const demographics = [
  { stat: "33", label: "Avg Age" },
  { stat: "70%", label: "Earn £50K+" },
  { stat: "30%", label: "Earn £100K+" },
  { stat: "40%", label: "Homeowners" },
  { stat: "40%", label: "Parents" },
  { stat: "40%", label: "London & SE" },
];

export default function AudienceStatsSlide() {
  return (
    <Slide bg="photo" id="audience-stats" anim="stagger">
      {/* Full-bleed photo */}
      <img
        src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&h=1080&fit=crop&auto=format"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Warm overlay on right 55% */}
      <div
        className="absolute top-0 right-0 bottom-0"
        style={{
          width: "58%",
          background: "linear-gradient(to right, rgba(184,169,154,0.0) 0%, rgba(184,169,154,0.92) 15%, rgba(184,169,154,0.95) 100%)",
        }}
      />

      {/* Content on right side */}
      <div className="relative z-10 w-full h-full flex">
        {/* Left spacer (photo shows through) */}
        <div className="w-[42%] flex-shrink-0" />

        {/* Right content */}
        <div className="flex-1 flex flex-col justify-center px-[4vw]">
          {/* Section number + headline */}
          <span className="deck-animate font-sans text-[11px] font-medium tracking-[0.2em] text-white/60 mb-3">01</span>
          <h2 className="deck-animate dual-serif text-white text-5xl md:text-6xl lg:text-7xl uppercase leading-none">
            Targeted
          </h2>
          <p className="deck-animate dual-italic text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
            audiences
          </p>

          <p className="deck-animate font-sans text-[14px] leading-[1.7] text-white/80 mt-5 max-w-[400px]">
            Our core readership is made up of affluent, forward-thinking professionals who are always looking for the latest insights and who regularly engage with our content.
          </p>

          {/* Horizontal rule */}
          <div className="deck-animate w-full h-px bg-white/20 mt-6 mb-5" />

          {/* Hero stat + demographic grid */}
          <div className="flex items-start gap-6">
            {/* Hero stat */}
            <div className="deck-animate flex-shrink-0">
              <span className="font-serif text-white text-6xl md:text-7xl leading-none">96</span>
              <span className="font-serif text-white text-3xl">%</span>
              <span className="block dual-italic text-white/70 text-lg mt-1">female</span>
            </div>

            {/* Thin vertical rule */}
            <div className="w-px h-28 bg-white/20 flex-shrink-0 mt-2" />

            {/* 2x3 grid */}
            <div className="deck-animate grid grid-cols-3 gap-x-6 gap-y-3">
              {demographics.map((d, i) => (
                <div key={i}>
                  <span className="font-serif text-white text-2xl md:text-3xl leading-none">{d.stat}</span>
                  <span className="block font-sans text-[9px] uppercase tracking-wider text-white/60 mt-1">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom horizontal rule */}
          <div className="deck-animate w-full h-px bg-white/20 mt-5 mb-4" />

          {/* Bottom engagement stat */}
          <div className="deck-animate flex items-center gap-6">
            <p className="dual-italic text-white/80 text-base max-w-[240px] leading-snug">
              Readers spend an average of 3 minutes 45 seconds per visit.
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-white text-3xl">91%</span>
              <span className="font-sans text-white/60 text-[11px] max-w-[140px] leading-tight">
                Engage with content multiple times a week.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
