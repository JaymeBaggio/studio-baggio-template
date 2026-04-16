import Slide from "../Slide";
import DualHeadline from "../shared/DualHeadline";

const channels = [
  { initial: "W", stat: "2.5M", label: "Monthly Views" },
  { initial: "E", stat: "640K+", label: "Subscribers" },
  { initial: "S", stat: "1.5M", label: "Followers" },
  { initial: "C", stat: "7.5K+", label: "Members" },
];

export default function PlatformReachSlide() {
  return (
    <Slide bg="cream" id="platform-reach" anim="stagger" align="top">
      <div className="w-full h-full grid grid-cols-12 gap-0 items-start">
        {/* Left: headline + body + stats */}
        <div className="col-span-4 flex flex-col justify-center h-full pr-[2vw]">
          <DualHeadline serif="CORE" italic="brand reach" size="xl" />
          <p className="deck-animate font-sans text-[15px] leading-[1.7] text-[#0A0A0A]/75 mt-6 max-w-[380px]">
            Our platform gives audiences 360° access through the website, social media, email, video, podcasts, events, and community.
          </p>
          <div className="flex gap-10 mt-10">
            <div className="deck-animate">
              <div className="stat-number text-4xl md:text-5xl text-[#0A0A0A]">640K+</div>
              <div className="stat-label text-[#999690]">Subscribers</div>
            </div>
            <div className="deck-animate">
              <div className="stat-number text-4xl md:text-5xl text-[#0A0A0A]">60%</div>
              <div className="stat-label text-[#999690]">Open Rate</div>
            </div>
          </div>
        </div>

        {/* Center: device mockups with stat circle */}
        <div className="col-span-5 relative h-full flex items-center justify-center">
          {/* Dark stat circle */}
          <div
            className="deck-animate absolute z-30 w-[100px] h-[100px] rounded-full bg-[#0A0A0A] flex flex-col items-center justify-center"
            style={{ top: "8%", left: "50%", transform: "translateX(-50%)" }}
          >
            <span className="font-serif text-white text-xl font-bold leading-none">2.5M</span>
            <span className="font-sans text-white/60 text-[7px] uppercase tracking-wider leading-tight text-center mt-1">
              Monthly<br />Page Views
            </span>
          </div>

          {/* Laptop */}
          <div
            className="deck-animate absolute w-[72%] aspect-[16/10] bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{ top: "18%", left: "5%", transform: "rotate(-1deg)" }}
          >
            <div className="w-full h-[8%] bg-[#e8e5e0] flex items-center gap-1.5 px-3">
              <div className="w-2 h-2 rounded-full bg-[#ccc]" />
              <div className="w-2 h-2 rounded-full bg-[#ccc]" />
              <div className="w-2 h-2 rounded-full bg-[#ccc]" />
            </div>
            <div className="w-full h-[92%] bg-[#FAF6F0] p-4 flex flex-col">
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
            className="deck-animate absolute w-[38%] aspect-[3/4] bg-white rounded-xl shadow-2xl overflow-hidden z-10"
            style={{ top: "28%", right: "2%", transform: "rotate(2deg)" }}
          >
            <div className="w-full h-full bg-[#FAF6F0] p-3 flex flex-col gap-2">
              <div className="w-full aspect-[4/3] bg-[#0A0A0A]/8 rounded" />
              <div className="w-[70%] h-2 bg-[#0A0A0A]/10 rounded mt-1" />
              <div className="w-[90%] h-1.5 bg-[#0A0A0A]/6 rounded" />
              <div className="w-[80%] h-1.5 bg-[#0A0A0A]/6 rounded" />
              <div className="w-[60%] h-1.5 bg-[#0A0A0A]/4 rounded" />
            </div>
          </div>

          {/* Phone */}
          <div
            className="deck-animate absolute w-[17%] aspect-[9/19] bg-white rounded-2xl shadow-2xl overflow-hidden z-20"
            style={{ bottom: "8%", right: "18%", transform: "rotate(-3deg)" }}
          >
            <div className="w-full h-full bg-[#FAF6F0] p-2 flex flex-col gap-1.5">
              <div className="w-full aspect-[9/6] bg-[#0A0A0A]/8 rounded" />
              <div className="w-[60%] h-1.5 bg-[#0A0A0A]/10 rounded" />
              <div className="w-[85%] h-1 bg-[#0A0A0A]/5 rounded" />
              <div className="w-[70%] h-1 bg-[#0A0A0A]/5 rounded" />
            </div>
          </div>
        </div>

        {/* Right: channel breakdown */}
        <div className="col-span-3 flex flex-col justify-center h-full pl-[1vw]">
          <span className="deck-animate persistent-header text-[#999690] mb-8">Channel Breakdown</span>
          <div className="deck-animate flex flex-col gap-6">
            {channels.map((ch, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-[#0A0A0A] text-base font-bold">{ch.initial}</span>
                </div>
                <div>
                  <span className="font-serif text-[#0A0A0A] text-2xl leading-none">{ch.stat}</span>
                  <span className="block font-sans text-[10px] uppercase tracking-wider text-[#999690] mt-0.5">{ch.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
