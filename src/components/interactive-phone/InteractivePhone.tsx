import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useInteractivePhone } from "./InteractivePhoneContext";
import DockedPhone3D from "./DockedPhone3D";
import ExpandedPhone3D from "./ExpandedPhone3D";

// Architecture: TWO R3F Canvases — docked (in slide layout) and expanded
// (portal at body). Both render the SAME iPhone GLB so the visual continuity
// is preserved. On expand, docked fades out + expanded fades in. The expanded
// Canvas hosts a drei <Html transform> overlay on the screen face for the
// scrollable email content (no more DOM bezel-rectangle).
//
// Why two Canvases (not one moving): the deck track has translateX, which
// makes position:fixed children behave like position:absolute. Portal escapes
// that — but a portal'd Canvas needs its own R3F context. Cheaper than
// migrating the docked Canvas mid-flight.

interface InteractivePhoneProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function InteractivePhone({ className = "", style = {} }: InteractivePhoneProps) {
  const { isExpanded, expand, close } = useInteractivePhone();
  const dockedRef = useRef<HTMLDivElement>(null);
  const expandedWrapperRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Fade in expanded wrapper when it mounts
  useEffect(() => {
    if (!isExpanded) return;
    const wrap = expandedWrapperRef.current;
    const closeBtn = closeBtnRef.current;
    if (!wrap) return;

    gsap.fromTo(wrap, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" });

    if (closeBtn) {
      gsap.set(closeBtn, { opacity: 0 });
      gsap.to(closeBtn, { opacity: 1, duration: 0.3, ease: "power2.out", delay: 0.6 });
    }
  }, [isExpanded]);

  const handleClose = () => {
    const wrap = expandedWrapperRef.current;
    if (!wrap) {
      close();
      return;
    }
    gsap.to(wrap, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => close(),
    });
  };

  // Escape key closes
  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  return (
    <>
      {/* DOCKED phone — real 3D iPhone via R3F (built per /3d-landing-pages skill) */}
      <div
        ref={dockedRef}
        className={`relative ${className}`}
        style={{
          width: "100%",
          height: "100%",
          opacity: isExpanded ? 0 : 1,
          transition: "opacity 0.25s",
          ...style,
        }}
      >
        <DockedPhone3D
          onClick={() => {
            if (isExpanded) return;
            expand(dockedRef.current);
          }}
        />

        {/* "Tap to explore" CTA — fades in via parent hover */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ whiteSpace: "nowrap" }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4A853] font-semibold">
            Tap to explore
          </span>
        </div>
      </div>

      {/* EXPANDED phone — portal at body, R3F Canvas with the SAME iPhone GLB
          plus an <Html transform> overlay on the screen face. */}
      {isExpanded &&
        createPortal(
          <div
            ref={expandedWrapperRef}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 150,
              opacity: 0,
            }}
          >
            {/* Backdrop sits BEHIND the canvas — click to close */}
            <div
              onClick={handleClose}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                zIndex: 0,
              }}
            />

            {/* The R3F expanded phone Canvas */}
            <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
              <ExpandedPhone3D onClose={handleClose} />
            </div>

            {/* Close button — top-right */}
            <button
              ref={closeBtnRef}
              onClick={handleClose}
              aria-label="Close phone"
              className="fixed top-6 right-6 z-[210] w-11 h-11 rounded-full bg-[#0A0A0A]/85 backdrop-blur text-white flex items-center justify-center hover:bg-[#D4A853] transition-colors"
              style={{ fontSize: "20px", opacity: 0 }}
            >
              ×
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
