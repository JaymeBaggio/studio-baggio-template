import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInteractivePhone } from "./interactive-phone/InteractivePhoneContext";

const SLIDE_COUNT = 26; // 24 production + 2 comparison-table variants

export default function HorizontalDeck({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const { isExpanded } = useInteractivePhone();
  const isExpandedRef = useRef(isExpanded);
  isExpandedRef.current = isExpanded;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = track.querySelectorAll("[data-deck-slide]");

    // Set all deck-animate elements to hidden initially
    slides.forEach((slide) => {
      const items = slide.querySelectorAll(".deck-animate");
      items.forEach((item) => gsap.set(item, { opacity: 0, y: 40 }));
    });

    // Play first slide's content immediately
    playSlideContent(slides[0] as HTMLElement);

    function goToSlide(index: number) {
      if (index < 0 || index >= SLIDE_COUNT) return;
      if (isAnimatingRef.current) return;
      if (index === currentRef.current) return;

      isAnimatingRef.current = true;
      const prevIndex = currentRef.current;
      currentRef.current = index;

      // Update indicator
      window.dispatchEvent(new CustomEvent("slide-change", { detail: index }));

      // Animate the track
      gsap.to(track, {
        x: -index * window.innerWidth,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: () => {
          // Play content on the new slide
          playSlideContent(slides[index] as HTMLElement);

          // Allow next transition after a brief hold
          gsap.delayedCall(0.1, () => {
            isAnimatingRef.current = false;
          });
        },
      });

      // Reset previous slide content (after it's offscreen)
      gsap.delayedCall(0.5, () => {
        resetSlideContent(slides[prevIndex] as HTMLElement);
      });
    }

    // Wheel event — one gesture = one slide
    let wheelAccum = 0;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;
    const WHEEL_THRESHOLD = 50;

    const onWheel = (e: WheelEvent) => {
      if (isExpandedRef.current) return; // phone owns input
      e.preventDefault();
      if (isAnimatingRef.current) return;

      wheelAccum += e.deltaY;

      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelAccum = 0; }, 200);

      if (Math.abs(wheelAccum) >= WHEEL_THRESHOLD) {
        const direction = wheelAccum > 0 ? 1 : -1;
        wheelAccum = 0;
        goToSlide(currentRef.current + direction);
      }
    };

    // Touch events — swipe left/right
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (isExpandedRef.current) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (isExpandedRef.current) return;
      if (isAnimatingRef.current) return;
      const dx = touchStartX - e.changedTouches[0].clientX;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        goToSlide(currentRef.current + (dx > 0 ? 1 : -1));
      }
    };

    // Keyboard
    const onKeyDown = (e: KeyboardEvent) => {
      if (isExpandedRef.current) return; // Escape handled by InteractivePhone
      if (e.repeat) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToSlide(currentRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToSlide(currentRef.current - 1);
      }
    };

    // Expose goToSlide globally for nav click
    (window as unknown as { __goToSlide: (n: number) => void }).__goToSlide = goToSlide;

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    // Handle resize
    const onResize = () => {
      gsap.set(track, { x: -currentRef.current * window.innerWidth });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ width: "100vw", height: "100vh" }}>
      <div
        ref={trackRef}
        className="flex"
        style={{ width: `${SLIDE_COUNT * 100}vw`, height: "100vh" }}
      >
        {children}
      </div>
    </div>
  );
}

// ============================================
// Real-time content animations
// ============================================

function playSlideContent(slide: HTMLElement) {
  const items = Array.from(slide.querySelectorAll(".deck-animate"));
  const animType = slide.getAttribute("data-anim") || "stagger";

  // 3D phone tilt + content scroll animation
  const phoneWrapper = slide.querySelector("[data-device-phone-wrapper]") as HTMLElement | null;
  const phone = slide.querySelector("[data-device-phone]") as HTMLElement | null;
  if (phoneWrapper && phone) {
    // Fade in the wrapper
    gsap.fromTo(phoneWrapper,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
    );
    // Tilt the phone from 3D to flat
    gsap.fromTo(phone,
      { rotateY: 12, rotateX: 5 },
      { rotateY: 0, rotateX: 0, duration: 1.8, ease: "power2.out", delay: 0.5 }
    );
    // Scroll content inside the phone
    const phoneScroll = phone.querySelector("[data-phone-scroll]") as HTMLElement | null;
    if (phoneScroll) {
      gsap.fromTo(phoneScroll,
        { y: 0 },
        { y: "-55%", duration: 5, ease: "power1.inOut", delay: 1.2 }
      );
    }
  }

  if (items.length === 0) return;

  const stagger = 0.1;
  const dur = 0.7;

  if (animType === "scale") {
    gsap.fromTo(items,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", overwrite: true }
    );
  } else if (animType === "blur-reveal") {
    gsap.fromTo(items,
      { filter: "blur(12px) brightness(30%)", opacity: 0 },
      { filter: "blur(0px) brightness(100%)", opacity: 1, duration: 1.0, stagger: 0.06, ease: "power1.out", overwrite: true }
    );
  } else if (animType === "mosaic") {
    items.forEach((item, i) => {
      if ((item as HTMLElement).hasAttribute("data-overlay-band")) {
        // Horizontal wipe-in from centre + opacity unhide. The global init
        // sets all .deck-animate to opacity:0; mosaic branch must explicitly
        // set opacity:1 or the band stays invisible.
        gsap.fromTo(
          item,
          { clipPath: "inset(0 50% 0 50%)", opacity: 1, y: 0 },
          { clipPath: "inset(0 0% 0 0%)", opacity: 1, y: 0, duration: 0.9, delay: items.length * 0.04, ease: "power3.out", overwrite: true },
        );
      } else {
        gsap.fromTo(item, { opacity: 0.15, scale: 1.06, y: 0 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: i * 0.05, ease: "power1.out", overwrite: true });
      }
    });
  } else if (animType === "logo-wave") {
    items.forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, y: 25, x: gsap.utils.random(-10, 10) }, { opacity: 1, y: 0, x: 0, duration: 0.6, delay: i * 0.04, ease: "power1.out", overwrite: true });
    });
  } else if (animType === "stat-counter") {
    items.forEach((item, i) => {
      const target = (item as HTMLElement).querySelector("[data-count-to]") as HTMLElement | null;
      if (target) {
        gsap.fromTo(item, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, delay: i * stagger, ease: "power2.out", overwrite: true });
        const endVal = parseFloat(target.getAttribute("data-count-to") || "0");
        const suffix = target.getAttribute("data-suffix") || "";
        const prefix = target.getAttribute("data-prefix") || "";
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: endVal, duration: 1.2, delay: i * stagger + 0.3, ease: "power1.out",
          snap: { val: endVal > 1000 ? 1000 : 1 },
          onUpdate: () => {
            const f = proxy.val >= 1000000 ? (proxy.val / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
              : proxy.val >= 1000 ? Math.round(proxy.val).toLocaleString() : Math.round(proxy.val).toString();
            target.textContent = prefix + f + suffix;
          },
        });
      } else {
        gsap.fromTo(item, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, delay: i * stagger, ease: "power2.out", overwrite: true });
      }
    });
  } else {
    // Default stagger
    items.forEach((item, i) => {
      const ht = (item as HTMLElement).getAttribute("data-headline");
      const countTarget = (item as HTMLElement).querySelector("[data-count-to]") as HTMLElement | null;

      if (countTarget) {
        gsap.fromTo(item, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, delay: i * stagger, ease: "power2.out", overwrite: true });
        const endVal = parseFloat(countTarget.getAttribute("data-count-to") || "0");
        const suffix = countTarget.getAttribute("data-suffix") || "";
        const prefix = countTarget.getAttribute("data-prefix") || "";
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: endVal, duration: 1.2, delay: i * stagger + 0.3, ease: "power1.out",
          snap: { val: endVal > 1000 ? 1000 : 1 },
          onUpdate: () => {
            const f = proxy.val >= 1000000 ? (proxy.val / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
              : proxy.val >= 1000 ? Math.round(proxy.val).toLocaleString() : Math.round(proxy.val).toString();
            countTarget.textContent = prefix + f + suffix;
          },
        });
      } else if (ht === "serif") {
        gsap.fromTo(item, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: i * stagger, ease: "power2.out", overwrite: true });
      } else if (ht === "italic") {
        gsap.fromTo(item, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: i * stagger + 0.05, ease: "power2.out", overwrite: true });
      } else {
        gsap.fromTo(item, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, delay: i * stagger, ease: "power2.out", overwrite: true });
      }
    });
  }
}

function resetSlideContent(slide: HTMLElement) {
  const items = slide.querySelectorAll(".deck-animate");
  gsap.set(items, { opacity: 0, y: 40 });
  // Reset phone wrapper too
  const phoneWrapper = slide.querySelector("[data-device-phone-wrapper]") as HTMLElement | null;
  if (phoneWrapper) gsap.set(phoneWrapper, { opacity: 0, y: 30 });
  const phone = slide.querySelector("[data-device-phone]") as HTMLElement | null;
  if (phone) gsap.set(phone, { rotateY: 12, rotateX: 5 });
  const phoneScroll = slide.querySelector("[data-phone-scroll]") as HTMLElement | null;
  if (phoneScroll) gsap.set(phoneScroll, { y: 0 });
}
