import Slide from "../Slide";
import { copy } from "../../data/placeholders";

export default function StatementSlide() {
  const lines = ["We build authority", "through clarity, proof", "and strategic visibility."];
  return (
    <Slide bg="cream" id="statement" anim="stagger">
      <div className="w-full h-full flex items-center justify-center px-[4vw]">
        <h2 className="dual-serif text-center text-[clamp(2.5rem,6vw,6.5rem)] leading-[1.1] max-w-[900px] text-[#0A0A0A]">
          {lines.map((line, i) => (
            <span key={i} className="deck-animate block">
              {line}
            </span>
          ))}
        </h2>
      </div>
    </Slide>
  );
}
