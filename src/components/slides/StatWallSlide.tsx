import Slide from "../Slide";
import StatBlock from "../shared/StatBlock";
import { copy } from "../../data/placeholders";

export default function StatWallSlide() {
  return (
    <Slide bg="dark" id="stat-wall" anim="stat-counter">
      <div className="w-full flex flex-col items-center justify-center">
        <span className="deck-animate kicker text-white/60 mb-3">THE NUMBERS</span>
        <h2 className="deck-animate dual-italic text-white/90 text-3xl md:text-4xl mb-14">
          Results that speak
        </h2>
        <div className="flex gap-[8vw] items-start">
          <StatBlock value={copy.stat1.value} label={copy.stat1.label} color="white" size="large" />
          <StatBlock value={copy.stat2.value} label={copy.stat2.label} suffix={copy.stat2.suffix} color="white" size="large" />
          <StatBlock value={copy.stat3.value} label={copy.stat3.label} color="white" size="large" />
        </div>
        <p className="deck-animate font-sans text-white/40 text-xs mt-10 tracking-wider max-w-[500px] text-center leading-relaxed">
          Source: Internal metrics, Q1 2026. Reach calculated across all owned and partner channels. Retention measured at 12-month renewal.
        </p>
      </div>
    </Slide>
  );
}
