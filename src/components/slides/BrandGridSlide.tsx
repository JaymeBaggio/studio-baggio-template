import Slide from "../Slide";

const brands = [
  { name: "EDITORIAL", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=700&fit=crop&auto=format" },
  { name: "LUXE", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=700&fit=crop&auto=format" },
  { name: "LIFESTYLE", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=700&fit=crop&auto=format" },
  { name: "EVENTS", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=700&fit=crop&auto=format" },
  { name: "WELLNESS", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=700&fit=crop&auto=format" },
  { name: "BUSINESS", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=700&fit=crop&auto=format" },
  { name: "CULTURE", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=700&fit=crop&auto=format" },
];

export default function BrandGridSlide() {
  return (
    <Slide bg="dark" id="brand-grid" anim="scale" noPadding>
      <div className="w-full h-full flex flex-col">
        {/* Photo strip grid — top 68% */}
        <div className="flex-1 flex" style={{ height: "68%" }}>
          {brands.map((brand, i) => (
            <div
              key={i}
              className="deck-animate relative flex-1 overflow-hidden"
            >
              <img
                src={brand.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.0) 100%)" }}
              />
              {/* Brand name */}
              <span
                className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans font-semibold text-white text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* Cream band — bottom 32% */}
        <div className="flex items-center justify-center px-[8vw]" style={{ height: "32%", backgroundColor: "#FAF6F0" }}>
          <div className="text-center max-w-[700px]">
            <p className="deck-animate font-sans text-[15px] leading-[1.7] text-[#0A0A0A]/75">
              Our reach extends through targeted verticals — from editorial and luxury to wellness, business, and culture. Each channel serves a distinct audience with tailored content and premium partnerships.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
