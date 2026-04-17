import { useEffect, useState } from "react";

const SLIDE_COUNT = 29; // 24 production + 3 framework variants + 2 comparison-table variants

export default function SlideIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handler = (e: Event) => {
      setActiveIndex((e as CustomEvent).detail);
    };
    window.addEventListener("slide-change", handler);
    return () => window.removeEventListener("slide-change", handler);
  }, []);

  return (
    <div
      data-indicator
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5"
    >
      <span className="font-sans text-[10px] font-medium tracking-widest text-white/50 mr-2 tabular-nums">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      {Array.from({ length: SLIDE_COUNT }, (_, i) => (
        <button
          key={i}
          onClick={() => {
            const go = (window as unknown as { __goToSlide?: (n: number) => void }).__goToSlide;
            if (go) go(i);
          }}
          className="rounded-full transition-all duration-300 cursor-pointer"
          style={{
            width: i === activeIndex ? 8 : 5,
            height: i === activeIndex ? 8 : 5,
            backgroundColor: i === activeIndex ? "#0A0A0A" : "rgba(255,255,255,0.3)",
            boxShadow: i === activeIndex ? "0 0 0 3px rgba(10,10,10,0.12)" : "none",
          }}
        />
      ))}
    </div>
  );
}
