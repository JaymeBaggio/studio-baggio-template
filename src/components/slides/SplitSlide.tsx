import Slide from "../Slide";
import DualHeadline from "../shared/DualHeadline";
import StatBlock from "../shared/StatBlock";

interface SplitSlideProps {
  id: string;
  direction: "photo-left" | "photo-right";
  image: string;
  kicker: string;
  headline: string;
  italic: string;
  body: string;
  stat?: { value: number; label: string; suffix?: string };
  bullets?: string[];
}

export default function SplitSlide({ id, direction, image, kicker, headline, italic, body, stat, bullets }: SplitSlideProps) {
  const photoLeft = direction === "photo-left";

  return (
    <Slide bg="cream" id={id} anim="stagger" align="top">
      <div className="w-full h-full grid grid-cols-12 gap-0 items-stretch">
        {/* Photo side — full bleed to edge */}
        <div
          className={`${photoLeft ? "col-span-6 order-1" : "col-span-6 order-2"} relative overflow-hidden`}
          style={{
            margin: "-5vh 0 -8vh 0",
            ...(photoLeft ? { marginLeft: "-8vw" } : { marginRight: "-8vw" }),
          }}
        >
          <img
            src={image}
            alt=""
            data-parallax
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Text side */}
        <div
          className={`${photoLeft ? "col-span-6 order-2 pl-[6vw]" : "col-span-6 order-1 pr-[6vw]"} relative flex flex-col justify-center`}
        >
          {/* Persistent header */}
          <div className="deck-animate flex justify-between items-center mb-10 w-full max-w-[440px]">
            <span className="persistent-header text-[#999690]">Brand Opportunities</span>
            <span className="persistent-header text-[#999690]">Studio Baggio</span>
          </div>

          <span className="deck-animate kicker text-[#D4A853] mb-4">{kicker}</span>
          <DualHeadline serif={headline} italic={italic} />

          <p className="deck-animate font-sans text-[16px] leading-[1.7] text-[#0A0A0A]/75 mt-7 max-w-[440px]">
            {body}
          </p>

          {bullets && bullets.length > 0 && (
            <ul className="mt-6 space-y-2 max-w-[440px]">
              {bullets.map((b, i) => (
                <li key={i} className="deck-animate flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] mt-2 flex-shrink-0" />
                  <span className="font-sans text-[15px] leading-[1.6] text-[#0A0A0A]/70">{b}</span>
                </li>
              ))}
            </ul>
          )}

          {stat && (
            <div className="mt-10">
              <StatBlock value={stat.value} label={stat.label} suffix={stat.suffix} color="dark" />
            </div>
          )}

          {/* Bottom anchor — thin gold rule */}
          <div className="deck-animate absolute bottom-[clamp(70px,8vh,90px)] left-0">
            <div className="w-16 h-px bg-[#D4A853]/30" />
          </div>
        </div>
      </div>
    </Slide>
  );
}
