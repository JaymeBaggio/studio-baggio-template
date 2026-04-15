import Slide from "../Slide";
import DualHeadline from "../shared/DualHeadline";
import { images, clientLogos } from "../../data/placeholders";

export default function LogoWallSlide() {
  return (
    <Slide bg="cream" id="logo-wall" anim="logo-wave" align="top">
      <div className="w-full h-full grid grid-cols-12 gap-0 items-stretch">
        {/* Left: event photo */}
        <div
          className="col-span-6 relative overflow-hidden"
          style={{ margin: "-5vh 0 -8vh -8vw" }}
        >
          <img
            src={images.event1}
            alt=""
            data-parallax
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right: headline + logo grid */}
        <div className="col-span-6 flex flex-col justify-center pl-[4vw]">
          <div className="deck-animate flex justify-between items-center mb-10 w-full">
            <span className="persistent-header text-[#999690]">Brand Partnerships</span>
            <span className="persistent-header text-[#999690]">Studio Baggio</span>
          </div>

          <span className="deck-animate kicker text-[#D4A853] mb-4">OUR CLIENTS</span>
          <DualHeadline serif="WE WORK WITH" italic="leading brands" size="lg" />

          <p className="deck-animate font-sans text-[16px] leading-[1.7] text-[#0A0A0A]/75 mt-6 max-w-[440px]">
            We partner with ambitious brands and organisations across sectors — from established leaders to high-growth challengers.
          </p>

          {/* Monochrome logo grid */}
          <div className="grid grid-cols-4 gap-x-8 gap-y-5 mt-10">
            {clientLogos.map((logo, i) => (
              <div
                key={i}
                className="deck-animate flex items-center justify-center h-12 border-b border-[#0A0A0A]/8"
              >
                <span
                  className="font-sans font-semibold text-[11px] tracking-[0.15em] uppercase text-[#0A0A0A]/60 whitespace-nowrap"
                >
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
