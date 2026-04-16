import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useInteractivePhone } from "./InteractivePhoneContext";

// Full-screen dimmed + blurred backdrop. Click anywhere to close.
// Rendered via portal at document.body so it sits above the deck's
// transformed track (transformed parents create new containing blocks
// for fixed-position children, so we have to portal out).

export default function Backdrop() {
  const { isExpanded, close } = useInteractivePhone();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isExpanded) {
      gsap.to(el, { opacity: 1, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(el, { opacity: 0, duration: 0.4, ease: "power2.in" });
    }
  }, [isExpanded]);

  // Always render in DOM (so opacity can animate); pointer-events controlled by isExpanded.
  return createPortal(
    <div
      ref={ref}
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: 0,
        pointerEvents: isExpanded ? "auto" : "none",
        zIndex: 100,
      }}
    />,
    document.body,
  );
}
