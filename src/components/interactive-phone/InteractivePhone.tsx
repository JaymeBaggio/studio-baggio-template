import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useInteractivePhone } from "./InteractivePhoneContext";
import PhoneContent from "./PhoneContent";

gsap.registerPlugin(Flip);

// Pattern: TPL-25 (one-element-scroll-gsap-flip) — uses Flip.getState + Flip.from
// to animate one element from a captured bounding rect to its new layout position.
// We render TWO phones: docked (in slide DOM) and expanded (portal at body).
// On expand: hide docked, mount expanded, Flip.from(dockedRect) to animate in.
// On close: Flip.fit to dockedRect, then unmount expanded, show docked.
//
// Why two phones (not move one): the deck track has translateX, which makes
// position:fixed children behave like position:absolute. Portal escapes that.

interface InteractivePhoneProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function InteractivePhone({ className = "", style = {} }: InteractivePhoneProps) {
  const { isExpanded, expand, close, sourceRect } = useInteractivePhone();
  const dockedRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const expandedPhoneRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Animate expanded phone in when it mounts
  useEffect(() => {
    if (!isExpanded || !sourceRect) return;
    const phone = expandedPhoneRef.current;
    const closeBtn = closeBtnRef.current;
    if (!phone) return;

    // Build a synthetic Flip state from the captured docked rect
    // (Flip.from accepts targets directly; we use gsap.fromTo for precise control)
    gsap.set(phone, {
      position: "fixed",
      top: sourceRect.top,
      left: sourceRect.left,
      width: sourceRect.width,
      height: sourceRect.height,
      rotateY: 12,
      rotateX: 5,
      transformOrigin: "center center",
    });

    const targetHeight = window.innerHeight * 0.78;
    const targetWidth = (targetHeight * 9) / 19;
    const targetTop = (window.innerHeight - targetHeight) / 2;
    const targetLeft = (window.innerWidth - targetWidth) / 2;

    const tl = gsap.timeline();
    tl.to(phone, {
      top: targetTop,
      left: targetLeft,
      width: targetWidth,
      height: targetHeight,
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "power3.out",
    });

    if (closeBtn) {
      gsap.set(closeBtn, { opacity: 0 });
      tl.to(closeBtn, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.7);
    }

    return () => {
      tl.kill();
    };
  }, [isExpanded, sourceRect]);

  // Animate close
  const handleClose = () => {
    const phone = expandedPhoneRef.current;
    if (!phone || !sourceRect) {
      close();
      return;
    }
    gsap.to(phone, {
      top: sourceRect.top,
      left: sourceRect.left,
      width: sourceRect.width,
      height: sourceRect.height,
      rotateY: 12,
      rotateX: 5,
      duration: 0.5,
      ease: "power2.inOut",
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
  }, [isExpanded, sourceRect]);

  // Subtle 3D parallax tilt as user scrolls inside expanded phone
  useEffect(() => {
    if (!isExpanded) return;
    const phone = expandedPhoneRef.current;
    const scroller = phone?.querySelector("[data-phone-scroll-container]") as HTMLElement | null;
    if (!phone || !scroller) return;
    const onScroll = () => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      if (max <= 0) return;
      const progress = scroller.scrollTop / max; // 0 → 1
      const tilt = (progress - 0.5) * 4; // -2 → +2 deg
      gsap.to(phone, { rotateY: tilt, duration: 0.6, ease: "power1.out", overwrite: "auto" });
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [isExpanded]);

  // Stop propagation on phone interactions (so deck doesn't see them while expanded)
  const stopProp = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <>
      {/* DOCKED phone — lives in slide layout */}
      <div
        ref={dockedRef}
        className={`cursor-pointer group ${className}`}
        style={{
          perspective: "800px",
          opacity: isExpanded ? 0 : 1,
          transition: "opacity 0.2s",
          ...style,
        }}
        onClick={() => {
          if (isExpanded) return;
          expand(dockedRef.current);
        }}
      >
        <div
          className="w-full h-full bg-[#1a1a1a] rounded-[18%/9%] shadow-2xl overflow-hidden p-[3%] relative transition-transform group-hover:scale-[1.02]"
          style={{
            transform: "rotateY(12deg) rotateX(5deg)",
            transformStyle: "preserve-3d",
            aspectRatio: "9/19",
          }}
        >
          {/* Notch */}
          <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[40%] h-[3%] bg-[#1a1a1a] rounded-full z-10" />
          {/* Screen */}
          <div className="w-full h-full rounded-[14%/7%] overflow-hidden">
            <PhoneContent scrollable={false} />
          </div>
        </div>

        {/* "Tap to explore" CTA — hover only on desktop, always on touch */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none touch:opacity-100"
          style={{ whiteSpace: "nowrap" }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4A853] font-semibold">
            Tap to explore
          </span>
        </div>
      </div>

      {/* EXPANDED phone — portal at body, only mounted when expanded */}
      {isExpanded &&
        createPortal(
          <div
            ref={expandedRef}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              pointerEvents: "none",
              perspective: "1400px",
            }}
            onClick={stopProp}
            onWheel={stopProp}
            onTouchStart={stopProp}
            onTouchMove={stopProp}
          >
            <div
              ref={expandedPhoneRef}
              className="bg-[#1a1a1a] rounded-[6%/3%] shadow-2xl overflow-hidden relative"
              style={{
                transformStyle: "preserve-3d",
                pointerEvents: "auto",
                padding: "0.6%",
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-[1.5%] left-1/2 -translate-x-1/2 bg-[#1a1a1a] rounded-full z-10"
                style={{ width: "32%", height: "1.6%" }}
              />
              {/* Screen */}
              <div className="w-full h-full rounded-[5%/2.5%] overflow-hidden">
                <PhoneContent scrollable={true} />
              </div>

              {/* Close button */}
              <button
                ref={closeBtnRef}
                onClick={handleClose}
                aria-label="Close phone"
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#0A0A0A]/80 backdrop-blur text-white flex items-center justify-center hover:bg-[#D4A853] transition-colors"
                style={{ fontSize: "16px" }}
              >
                ×
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
