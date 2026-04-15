import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show nav after first slide change
    const handler = (e: Event) => {
      const idx = (e as CustomEvent).detail;
      if (idx > 0 && !visible) {
        setVisible(true);
        gsap.fromTo(navRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" });
      } else if (idx === 0 && visible) {
        setVisible(false);
        gsap.to(navRef.current, { opacity: 0, duration: 0.3, ease: "power1.in" });
      }
    };
    window.addEventListener("slide-change", handler);
    return () => window.removeEventListener("slide-change", handler);
  }, [visible]);

  return (
    <nav
      ref={navRef}
      data-nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[10vw] py-4"
      style={{
        background: "rgba(13, 13, 13, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        opacity: 0,
      }}
    >
      <button
        onClick={() => {
          const go = (window as unknown as { __goToSlide?: (n: number) => void }).__goToSlide;
          if (go) go(0);
        }}
        className="wordmark text-white text-[11px] cursor-pointer hover:text-white/80 transition-colors"
      >
        Studio Baggio
      </button>
      <button
        onClick={() => window.print()}
        className="font-sans text-[11px] font-medium tracking-wider uppercase text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4A853]"
      >
        Download PDF
      </button>
    </nav>
  );
}
