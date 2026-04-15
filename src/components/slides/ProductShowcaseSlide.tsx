import Slide from "../Slide";
import DualHeadline from "../shared/DualHeadline";

export default function ProductShowcaseSlide() {
  return (
    <Slide bg="cream" id="product-showcase" anim="stagger" align="top">
      {/* Top persistent header */}
      <div className="w-full h-full flex flex-col">
        <div className="deck-animate flex justify-between items-center mb-8 w-full">
          <span className="persistent-header text-[#999690]">Brand Opportunities</span>
          <span className="persistent-header text-[#999690]">Studio Baggio</span>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-0 items-start">
          {/* Left: headline + body + stats */}
          <div className="col-span-4 flex flex-col justify-start pt-[2vh] pr-[2vw] border-r border-[#0A0A0A]/10">
            <DualHeadline serif="DAILY" italic="Email" size="xl" />
            <p className="deck-animate font-sans text-[14px] leading-[1.7] text-[#0A0A0A]/75 mt-6 max-w-[340px]">
              At the heart of the platform, the daily email not only directs half a million subscribers to the site but also amplifies 8-12 diverse content features across the pillars the audience loves.
            </p>
            <p className="deck-animate font-sans text-[14px] leading-[1.7] text-[#0A0A0A]/75 mt-4 max-w-[340px]">
              It also includes a shoppable edit, encouraging readers to make direct purchases.
            </p>
            <div className="flex gap-10 mt-8">
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

          {/* Center: large device mockup (tablet showing email) */}
          <div className="col-span-5 relative h-full flex items-center justify-center px-[2vw]">
            {/* Tablet frame */}
            <div
              className="deck-animate w-[85%] aspect-[3/4] bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden p-3"
            >
              <div className="w-full h-full bg-white rounded-xl overflow-hidden flex flex-col">
                {/* Email header */}
                <div className="px-4 py-3 border-b border-[#eee]">
                  <div className="w-[30%] h-1.5 bg-[#0A0A0A]/10 rounded mb-2" />
                  <div className="w-[60%] h-2 bg-[#0A0A0A]/15 rounded" />
                </div>
                {/* Email content */}
                <div className="flex-1 p-4 flex flex-col gap-3">
                  {/* Hero image */}
                  <div className="w-full aspect-[16/9] bg-[#F5F0EB] rounded overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=450&fit=crop&auto=format"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="w-[20%] h-1 bg-[#D4A853]/40 rounded mx-auto mb-2" />
                    <div className="w-[70%] h-2.5 bg-[#0A0A0A]/12 rounded mx-auto mb-1.5" />
                    <div className="w-[85%] h-1.5 bg-[#0A0A0A]/6 rounded mx-auto mb-1" />
                    <div className="w-[60%] h-1.5 bg-[#0A0A0A]/6 rounded mx-auto" />
                  </div>
                  {/* Product grid */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="aspect-square bg-[#F5F0EB] rounded" />
                    <div className="aspect-square bg-[#F5F0EB] rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: secondary devices + labels */}
          <div className="col-span-3 relative h-full flex flex-col items-center justify-center gap-4 pl-[1vw]">
            {/* Shoppable Edit label */}
            <div className="deck-animate text-right w-full mb-2">
              <span className="dual-italic text-[#0A0A0A] text-xl">Shoppable Edit</span>
              <div className="w-12 h-px bg-[#0A0A0A]/20 ml-auto mt-1" />
            </div>

            {/* Smaller tablet */}
            <div
              className="deck-animate w-[70%] aspect-[3/4] bg-[#1a1a1a] rounded-xl shadow-xl overflow-hidden p-2"
            >
              <div className="w-full h-full bg-white rounded-lg overflow-hidden p-2 flex flex-col gap-1.5">
                <div className="w-[50%] h-1.5 bg-[#0A0A0A]/10 rounded" />
                <div className="grid grid-cols-2 gap-1.5 flex-1">
                  <div className="bg-[#F5F0EB] rounded" />
                  <div className="bg-[#F5F0EB] rounded" />
                  <div className="bg-[#F5F0EB] rounded" />
                  <div className="bg-[#F5F0EB] rounded" />
                </div>
              </div>
            </div>

            {/* Email Display label */}
            <div className="deck-animate text-right w-full mt-2">
              <span className="dual-italic text-[#0A0A0A] text-xl">Email Display</span>
              <div className="w-12 h-px bg-[#0A0A0A]/20 ml-auto mt-1" />
            </div>

            {/* Phone mockup */}
            <div
              className="deck-animate w-[40%] aspect-[9/19] bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden p-1.5"
            >
              <div className="w-full h-full bg-white rounded-xl overflow-hidden p-1.5 flex flex-col gap-1">
                <div className="w-full aspect-[9/6] bg-[#F5F0EB] rounded" />
                <div className="w-[60%] h-1 bg-[#0A0A0A]/8 rounded" />
                <div className="w-[80%] h-0.5 bg-[#0A0A0A]/5 rounded" />
                <div className="w-[70%] h-0.5 bg-[#0A0A0A]/5 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
