import Slide from "../Slide";

export default function CoverSlide() {
  return (
    <Slide bg="dark" id="cover" anim="stagger">
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="wordmark text-white text-[clamp(1.5rem,3.5vw,3rem)]">
          Studio Baggio
        </h1>
      </div>
    </Slide>
  );
}
