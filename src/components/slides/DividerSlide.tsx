import Slide from "../Slide";

interface DividerSlideProps {
  id: string;
  letter: string;
  kicker: string;
  title: string;
}

export default function DividerSlide({ id, kicker, title }: DividerSlideProps) {
  return (
    <Slide bg="cream" id={id} anim="stagger">
      <div className="w-full h-full flex flex-col items-center justify-center text-center">
        {/* Thin gold rule top */}
        <div className="deck-animate w-12 h-px bg-[#0A0A0A]/40 mb-10" />

        {/* Kicker */}
        <span className="deck-animate kicker text-[#0A0A0A] mb-6">{kicker}</span>

        {/* Title — large serif, elegant */}
        <h2 className="deck-animate dual-italic text-[#0A0A0A] text-4xl md:text-5xl lg:text-6xl max-w-[600px]">
          {title}
        </h2>

        {/* Thin gold rule bottom */}
        <div className="deck-animate w-12 h-px bg-[#0A0A0A]/40 mt-10" />
      </div>
    </Slide>
  );
}
