import Slide from "../Slide";
import DualHeadline from "../shared/DualHeadline";
import StatBlock from "../shared/StatBlock";

export default function DeviceMockupSlide() {
  return (
    <Slide bg="cream" id="device-mockup" anim="stagger" align="top">
      <div className="w-full h-full grid grid-cols-12 gap-6 items-center">
        {/* Left: overlapping device mockups */}
        <div className="col-span-7 relative h-[70vh] flex items-center justify-center">
          {/* Laptop */}
          <div
            className="deck-animate absolute w-[70%] aspect-[16/10] bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{ top: "8%", left: "5%", transform: "rotate(-2deg)" }}
          >
            <div className="w-full h-[8%] bg-[#e8e5e0] flex items-center gap-1.5 px-3">
              <div className="w-2 h-2 rounded-full bg-[#ccc]" />
              <div className="w-2 h-2 rounded-full bg-[#ccc]" />
              <div className="w-2 h-2 rounded-full bg-[#ccc]" />
            </div>
            <div className="w-full h-[92%] bg-[#F5F0EB] p-4 flex flex-col">
              <div className="w-[40%] h-2 bg-[#0A0A0A]/10 rounded mb-3" />
              <div className="flex gap-3 flex-1">
                <div className="w-[55%] flex flex-col gap-2">
                  <div className="w-full aspect-[16/9] bg-[#0A0A0A]/8 rounded" />
                  <div className="w-[90%] h-1.5 bg-[#0A0A0A]/6 rounded" />
                  <div className="w-[75%] h-1.5 bg-[#0A0A0A]/6 rounded" />
                  <div className="w-[85%] h-1.5 bg-[#0A0A0A]/4 rounded" />
                </div>
                <div className="w-[45%] flex flex-col gap-2">
                  <div className="w-full aspect-square bg-[#0A0A0A]/6 rounded" />
                  <div className="w-[80%] h-1.5 bg-[#0A0A0A]/5 rounded" />
                  <div className="w-[60%] h-1.5 bg-[#0A0A0A]/5 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Tablet */}
          <div
            className="deck-animate absolute w-[35%] aspect-[3/4] bg-white rounded-xl shadow-2xl overflow-hidden z-10"
            style={{ top: "20%", right: "8%", transform: "rotate(3deg)" }}
          >
            <div className="w-full h-full bg-[#F5F0EB] p-3 flex flex-col gap-2">
              <div className="w-full aspect-[4/3] bg-[#0A0A0A]/8 rounded" />
              <div className="w-[70%] h-2 bg-[#0A0A0A]/10 rounded mt-1" />
              <div className="w-[90%] h-1.5 bg-[#0A0A0A]/6 rounded" />
              <div className="w-[80%] h-1.5 bg-[#0A0A0A]/6 rounded" />
              <div className="w-[60%] h-1.5 bg-[#0A0A0A]/4 rounded" />
            </div>
          </div>

          {/* Phone — 3D tilt + scrolling content (no deck-animate — animated by custom GSAP handler) */}
          <div
            data-device-phone-wrapper
            className="absolute z-20"
            style={{ bottom: "8%", right: "20%", perspective: "800px", opacity: 0 }}
          >
            <div
              data-device-phone
              className="w-[18vw] max-w-[180px] aspect-[9/19] bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden p-1.5"
              style={{ transform: "rotateY(12deg) rotateX(5deg)", transformStyle: "preserve-3d" }}
            >
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[40%] h-[3%] bg-[#1a1a1a] rounded-full z-10" />
              {/* Screen with scrolling content */}
              <div className="w-full h-full bg-white rounded-xl overflow-hidden relative">
                <div data-phone-scroll className="absolute inset-0 w-full" style={{ height: "220%" }}>
                  {/* App header */}
                  <div className="px-2 pt-4 pb-2">
                    <div className="w-[50%] h-1.5 bg-[#0A0A0A]/12 rounded mb-2" />
                    <div className="w-[30%] h-1 bg-[#D4A853]/30 rounded" />
                  </div>
                  {/* Hero image */}
                  <div className="mx-2 aspect-[4/3] bg-[#F5F0EB] rounded mb-2" />
                  {/* Text lines */}
                  <div className="px-2 flex flex-col gap-1">
                    <div className="w-[80%] h-1.5 bg-[#0A0A0A]/10 rounded" />
                    <div className="w-[65%] h-1 bg-[#0A0A0A]/6 rounded" />
                    <div className="w-[90%] h-1 bg-[#0A0A0A]/6 rounded" />
                  </div>
                  {/* Second card */}
                  <div className="mx-2 mt-3 aspect-[4/3] bg-[#F5F0EB] rounded" />
                  <div className="px-2 mt-2 flex flex-col gap-1">
                    <div className="w-[70%] h-1.5 bg-[#0A0A0A]/10 rounded" />
                    <div className="w-[85%] h-1 bg-[#0A0A0A]/6 rounded" />
                  </div>
                  {/* Third card */}
                  <div className="mx-2 mt-3 aspect-[4/3] bg-[#F5F0EB] rounded" />
                  <div className="px-2 mt-2 flex flex-col gap-1">
                    <div className="w-[60%] h-1.5 bg-[#0A0A0A]/10 rounded" />
                    <div className="w-[75%] h-1 bg-[#0A0A0A]/6 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: text + stats */}
        <div className="col-span-5 flex flex-col justify-center pl-[1vw]">
          <div className="deck-animate flex justify-between items-center mb-10 w-full max-w-[400px]">
            <span className="persistent-header text-[#999690]">Brand Opportunities</span>
            <span className="persistent-header text-[#999690]">Studio Baggio</span>
          </div>
          <span className="deck-animate kicker text-[#D4A853] mb-3">PLATFORM</span>
          <DualHeadline serif="DIGITAL" italic="presence" />
          <p className="deck-animate font-sans text-[16px] leading-[1.7] text-[#0A0A0A]/75 mt-6 max-w-[400px]">
            A premium editorial environment designed for impact. Every touchpoint crafted to build authority and drive engagement across devices.
          </p>
          <ul className="mt-5 space-y-2 max-w-[400px]">
            <li className="deck-animate flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] mt-2 flex-shrink-0" />
              <span className="font-sans text-[15px] leading-[1.6] text-[#0A0A0A]/70">Responsive editorial layouts built for every screen</span>
            </li>
            <li className="deck-animate flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] mt-2 flex-shrink-0" />
              <span className="font-sans text-[15px] leading-[1.6] text-[#0A0A0A]/70">SOLUS email campaigns with premium design standards</span>
            </li>
            <li className="deck-animate flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] mt-2 flex-shrink-0" />
              <span className="font-sans text-[15px] leading-[1.6] text-[#0A0A0A]/70">Native mobile experience with platform-optimised content</span>
            </li>
          </ul>
          <div className="flex gap-12 mt-8">
            <StatBlock value={850000} label="Monthly Views" color="dark" />
            <StatBlock value={94} label="Engagement Rate" suffix="%" color="dark" />
          </div>
        </div>
      </div>
    </Slide>
  );
}
