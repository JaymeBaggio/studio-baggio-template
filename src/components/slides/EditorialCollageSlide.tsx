import Slide from "../Slide";
import DualHeadline from "../shared/DualHeadline";
import { images, copy } from "../../data/placeholders";

export default function EditorialCollageSlide() {
  return (
    <Slide bg="cream" id="editorial-collage" anim="stagger" align="top">
      <div className="w-full h-full grid grid-cols-12 gap-6 items-start">
        {/* Left: overlapping editorial collage */}
        <div className="col-span-6 relative h-full pt-[2vh]">
          <div className="deck-animate absolute top-[2vh] left-0 w-[48%] aspect-[3/4] overflow-hidden">
            <img src={images.collage1} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="deck-animate absolute top-[1vh] left-[30%] w-[52%] aspect-[4/3] overflow-hidden z-10">
            <img src={images.collage2} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="deck-animate absolute top-[42%] left-[5%] w-[40%] aspect-square overflow-hidden z-20">
            <img src={images.collage3} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="deck-animate absolute top-[38%] left-[38%] w-[45%] aspect-[4/5] overflow-hidden z-10">
            <img src={images.collage4} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="deck-animate absolute bottom-[8vh] left-[15%] w-[35%] aspect-square overflow-hidden z-30">
            <img src={images.collage5} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right: story text + awards */}
        <div className="col-span-6 flex flex-col justify-center h-full pl-[2vw]">
          <div className="deck-animate flex justify-between items-center mb-10 w-full max-w-[480px]">
            <span className="persistent-header text-[#999690]">Brand Opportunities</span>
            <span className="persistent-header text-[#999690]">Studio Baggio</span>
          </div>
          <DualHeadline serif={copy.about.headline} italic="story" size="xl" />
          <p className="deck-animate font-sans text-[16px] leading-relaxed text-[#0A0A0A]/80 mt-8 max-w-[480px]">
            {copy.about.body}
          </p>
          {/* Awards row */}
          <div className="flex gap-8 mt-10">
            {copy.about.awards.map((award, i) => (
              <div key={i} className="deck-animate flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border border-[#0A0A0A]/30 flex items-center justify-center mb-2">
                  <span className="font-serif text-[#0A0A0A] text-lg font-bold">{award.charAt(0)}</span>
                </div>
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#0A0A0A]/50 text-center max-w-[100px]">
                  {award}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
