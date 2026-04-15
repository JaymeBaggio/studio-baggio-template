import Slide from "../Slide";

const collagePhotos = [
  { src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&h=650&fit=crop&auto=format", w: "38%", top: "2%", left: "0%", rotate: "-2deg", z: 1 },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&auto=format", w: "30%", top: "0%", left: "22%", rotate: "3deg", z: 2 },
  { src: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=350&h=350&fit=crop&auto=format", w: "25%", top: "42%", left: "5%", rotate: "-1deg", z: 3 },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&auto=format", w: "28%", top: "38%", left: "28%", rotate: "2deg", z: 2 },
  { src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop&auto=format", w: "22%", top: "65%", left: "15%", rotate: "-3deg", z: 4 },
];

export default function TeamInfluenceSlide() {
  return (
    <Slide bg="cream" id="team-influence" anim="stagger" align="top">
      <div className="w-full h-full flex flex-col">
        {/* Main content — top ~75% */}
        <div className="flex-1 grid grid-cols-12 gap-0 items-start">
          {/* Left: photo collage */}
          <div className="col-span-6 relative h-full">
            {collagePhotos.map((photo, i) => (
              <div
                key={i}
                className="deck-animate absolute overflow-hidden rounded-sm shadow-lg"
                style={{
                  width: photo.w,
                  top: photo.top,
                  left: photo.left,
                  transform: `rotate(${photo.rotate})`,
                  zIndex: photo.z,
                  aspectRatio: i === 2 ? "1" : i === 3 ? "4/5" : "3/4",
                }}
              >
                <img src={photo.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Right: text content */}
          <div className="col-span-6 flex flex-col justify-center h-full pl-[3vw]">
            <span className="deck-animate font-sans text-[11px] font-medium tracking-[0.2em] text-[#999690] mb-3">03</span>
            <h2 className="deck-animate dual-serif text-[#0A0A0A] text-5xl md:text-6xl lg:text-7xl uppercase leading-none">
              Team
            </h2>
            <p className="deck-animate dual-italic text-[#0A0A0A] text-4xl md:text-5xl lg:text-6xl leading-tight">
              influence
            </p>
            <p className="deck-animate font-sans text-[15px] leading-[1.7] text-[#0A0A0A]/75 mt-6 max-w-[440px]">
              Our team carries the authority and trust of a traditional publisher while also being influencers in their own right. This unique blend offers highly credible and personalised recommendations that the audience deeply values.
            </p>

            {/* Embedded video/content card */}
            <div
              className="deck-animate mt-8 w-[280px] aspect-[16/9] rounded-lg overflow-hidden relative bg-[#0A0A0A]/10"
            >
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=560&h=315&fit=crop&auto=format"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-[#0A0A0A] border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>
              <span className="absolute bottom-2 left-3 font-sans text-[10px] text-white/80 uppercase tracking-wider">
                Behind the scenes
              </span>
            </div>
          </div>
        </div>

        {/* Bottom stat bar — full width */}
        <div className="flex items-center justify-center gap-[8vw] py-6 border-t border-[#0A0A0A]/10">
          <div className="deck-animate flex items-baseline gap-3">
            <span className="font-serif text-[#0A0A0A] text-4xl md:text-5xl">90%</span>
            <span className="font-sans text-[13px] text-[#0A0A0A]/60 max-w-[200px] leading-snug">
              Of the audience trust our editors' recommendations
            </span>
          </div>
          <div className="deck-animate flex items-baseline gap-3">
            <span className="font-serif text-[#0A0A0A] text-4xl md:text-5xl">93%</span>
            <span className="font-sans text-[13px] text-[#0A0A0A]/60 max-w-[200px] leading-snug">
              Have purchased products featured in our content
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
