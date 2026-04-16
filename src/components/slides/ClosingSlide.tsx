import Slide from "../Slide";
import { images } from "../../data/placeholders";

const mosaicImages = [
  images.mosaic1, images.mosaic2, images.mosaic3,
  images.mosaic4, images.mosaic5, images.mosaic6,
];

export default function ClosingSlide() {
  return (
    <Slide bg="dark" id="closing" anim="mosaic">
      {/* Photo mosaic grid */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0">
        {mosaicImages.map((src, i) => (
          <div key={i} className="deck-animate relative overflow-hidden">
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay band */}
      <div
        className="deck-animate absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center py-16"
        data-overlay-band
        style={{
          background: "rgba(13, 13, 13, 0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <h2 className="dual-serif text-white text-[clamp(2.5rem,5vw,4.5rem)] tracking-[0.04em] mb-3">
          Jayme Baggio
        </h2>
        <span className="wordmark text-white/50 text-[10px] tracking-[0.4em]">
          Studio Baggio
        </span>
        <p className="font-sans text-white/40 text-xs mt-6 tracking-wider">
          hello@studiobaggio.com
        </p>
      </div>
    </Slide>
  );
}
