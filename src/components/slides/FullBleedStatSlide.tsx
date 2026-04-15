import Slide from "../Slide";

interface FullBleedStatSlideProps {
  id: string;
  image: string;
  preLabel: string;
  value: number;
  postLabel: string;
  suffix?: string;
}

export default function FullBleedStatSlide({ id, image, preLabel, value, postLabel, suffix = "" }: FullBleedStatSlideProps) {
  const display = value >= 1000000
    ? (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
    : value >= 1000
      ? value.toLocaleString()
      : value.toString();

  return (
    <Slide bg="photo" id={id} anim="blur-reveal">
      <img
        src={image}
        alt=""
        data-parallax
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.55)" }}
      />
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>
        <p className="deck-animate dual-italic text-white text-2xl md:text-3xl mb-8">
          {preLabel}
        </p>
        <div className="deck-animate font-serif text-white text-[clamp(4rem,10vw,9rem)] leading-[1.1]">
          {display}{suffix}
        </div>
        <p className="deck-animate font-sans text-white/90 text-lg md:text-xl max-w-[520px] leading-relaxed mt-8">
          {postLabel}
        </p>
      </div>
    </Slide>
  );
}
