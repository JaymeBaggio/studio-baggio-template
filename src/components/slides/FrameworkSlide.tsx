import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Slide from "../Slide";

// Framework / process slide with click-triggered progressive reveal.
// Each scroll/arrow-key reveals the next step (one at a time). The slide
// stays in place until ALL steps are revealed, then the next gesture
// advances the deck normally.

interface FrameworkStep {
  title: string;
  description: string;
  images: string[];
}

interface FrameworkSlideProps {
  id: string;
  variant?: "layers" | "split-build";
  kicker?: string;
  headline?: string;
  subtitle?: string;
  steps?: FrameworkStep[];
}

const defaultSteps: FrameworkStep[] = [
  {
    title: "Business Context",
    description: "Who you are. What you've done. Where the gaps are.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=260&fit=crop",
    ],
  },
  {
    title: "Research the Landscape",
    description: "Competitors. Market gaps. Where attention is going.",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=260&fit=crop",
    ],
  },
  {
    title: "Establish Positioning",
    description: "Optimal angles. Direct-response copy. Market intelligence.",
    images: [
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=260&fit=crop",
    ],
  },
  {
    title: "Brand Voice + Kit",
    description: "Style. Tone. Design. Feel. The complete brand blueprint.",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=260&fit=crop",
    ],
  },
  {
    title: "Translate into Assets",
    description: "Website. Creds. Prospect deck. Social. Video. Infographics.",
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=260&fit=crop",
    ],
  },
  {
    title: "Prospect Engine",
    description: "Who to target. Why. What's the approach angle.",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=260&fit=crop",
    ],
  },
  {
    title: "Systemise + Expand",
    description: "Repeatable wins. Scale what works. Compound the advantage.",
    images: [
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=260&fit=crop",
      "https://images.unsplash.com/photo-1553484771-047a44eee27b?w=400&h=260&fit=crop",
    ],
  },
];

export default function FrameworkSlide({
  id,
  variant = "layers",
  kicker = "THE FRAMEWORK",
  headline = "How we build",
  subtitle = "Each stage compounds the value of the last.",
  steps = defaultSteps,
}: FrameworkSlideProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);
  const total = steps.length;

  // Track active slide
  useEffect(() => {
    const handler = (e: Event) => {
      const slideEl = containerRef.current?.closest("[data-deck-slide]");
      if (!slideEl) return;
      const allSlides = Array.from(document.querySelectorAll("[data-deck-slide]"));
      const myIndex = allSlides.indexOf(slideEl);
      const activeIndex = (e as CustomEvent).detail;
      setIsActive(myIndex === activeIndex);
      if (myIndex !== activeIndex) setCurrentStep(-1);
    };
    window.addEventListener("slide-change", handler);
    return () => window.removeEventListener("slide-change", handler);
  }, []);

  const advanceStep = useCallback(() => {
    if (cooldownRef.current) return true;
    if (currentStep >= total - 1) return false;
    cooldownRef.current = true;
    setCurrentStep((s) => s + 1);
    setTimeout(() => { cooldownRef.current = false; }, 500);
    return true;
  }, [currentStep, total]);

  // Hijack navigation — capture phase, 500ms cooldown between advances
  useEffect(() => {
    if (!isActive) return;

    const onWheel = (e: WheelEvent) => {
      if (currentStep >= total - 1) return;
      if (e.deltaY <= 0) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      advanceStep();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (currentStep >= total - 1) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        e.stopImmediatePropagation();
        advanceStep();
      }
    };

    window.addEventListener("wheel", onWheel, { capture: true });
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, [isActive, currentStep, total, advanceStep]);

  // Step counter dots (shared by both variants)
  const StepDots = () => (
    <div className="flex items-center gap-4">
      <div className="flex gap-1.5">
        {steps.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i <= currentStep ? 8 : 5,
              height: i <= currentStep ? 8 : 5,
              backgroundColor: i <= currentStep ? "#0A0A0A" : "rgba(10,10,10,0.15)",
            }}
          />
        ))}
      </div>
      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A]/40 tabular-nums">
        {currentStep >= 0 ? `${currentStep + 1} / ${total}` : `— / ${total}`}
      </span>
    </div>
  );

  // ──────────────────────────────────────────────
  // VARIANT: split-build
  // ──────────────────────────────────────────────
  if (variant === "split-build") {
    const step = currentStep >= 0 ? steps[currentStep] : null;
    return (
      <Slide bg="cream" id={id} anim="stagger" align="top">
        <div ref={containerRef} className="w-full h-full grid grid-cols-12 gap-6">
          {/* Left: collage that builds */}
          <div className="col-span-7 relative h-full overflow-hidden">
            {steps.map((s, si) => (
              si <= currentStep && (
                <CollageImages
                  key={si}
                  step={si}
                  images={s.images}
                  isLatest={si === currentStep}
                />
              )
            ))}
            {currentStep === -1 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-sans text-[#0A0A0A]/25 text-sm tracking-wider uppercase">
                  Scroll to begin
                </p>
              </div>
            )}
          </div>

          {/* Right: text that SWAPS — only the current step is mounted.
              React key forces unmount/remount so there's never overlap. */}
          <div className="col-span-5 flex flex-col justify-between h-full pl-[2vw]">
            <div>
              <span className="deck-animate kicker text-[#0A0A0A]/60 mb-4 block">{kicker}</span>
              <h2
                className="deck-animate dual-serif text-[#0A0A0A] uppercase leading-[0.95] mb-3"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                {headline}
              </h2>
              <p className="deck-animate dual-italic text-[#0A0A0A]/60 text-xl md:text-2xl mb-8">
                {subtitle}
              </p>

              {/* Only ONE step text mounted at a time */}
              {step && (
                <SingleStepText
                  key={currentStep}
                  step={currentStep}
                  title={step.title}
                  description={step.description}
                />
              )}
            </div>

            <div className="deck-animate pb-4">
              <StepDots />
            </div>
          </div>
        </div>
      </Slide>
    );
  }

  // ──────────────────────────────────────────────
  // VARIANT: layers (default)
  // ──────────────────────────────────────────────
  return (
    <Slide bg="cream" id={id} anim="stagger" align="top">
      <div ref={containerRef} className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <span className="deck-animate kicker text-[#0A0A0A]/60 mb-2 block">{kicker}</span>
            <h2
              className="deck-animate dual-serif text-[#0A0A0A] uppercase leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {headline}
            </h2>
          </div>
          <div className="deck-animate">
            <StepDots />
          </div>
        </div>

        {/* Bands — flex column, each band is a real flow element.
            Hidden bands have display:none. Revealed bands animate in. */}
        <div className="flex-1 flex flex-col gap-1 overflow-hidden">
          {currentStep === -1 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="font-sans text-[#0A0A0A]/25 text-sm tracking-wider uppercase">
                Scroll to reveal each stage
              </p>
            </div>
          )}
          {steps.map((step, si) => (
            si <= currentStep && (
              <LayerBand
                key={si}
                step={si}
                title={step.title}
                description={step.description}
                images={step.images}
                isLatest={si === currentStep}
                total={total}
                revealedCount={currentStep + 1}
              />
            )
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function LayerBand({
  step,
  title,
  description,
  images,
  isLatest,
  total,
  revealedCount,
}: {
  step: number;
  title: string;
  description: string;
  images: string[];
  isLatest: boolean;
  total: number;
  revealedCount: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (isLatest) {
      gsap.fromTo(ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
      );
    } else {
      gsap.to(ref.current, { opacity: 0.45, duration: 0.3, ease: "power1.out" });
    }
  }, [isLatest]);

  // Dynamic height: bands share space equally based on how many are revealed
  const bandHeight = `${Math.floor(100 / Math.max(revealedCount, 1))}%`;

  return (
    <div
      ref={ref}
      className="flex items-center gap-6 px-2 border-b border-[#0A0A0A]/8 flex-shrink-0"
      style={{ height: bandHeight, minHeight: "60px", opacity: 0 }}
    >
      {/* Left: step info */}
      <div className="w-[28%] flex-shrink-0 flex items-center gap-4">
        <span
          className="font-serif text-[#0A0A0A]/15 tabular-nums leading-none"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300 }}
        >
          {String(step + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-sans text-[12px] font-semibold text-[#0A0A0A] leading-tight uppercase tracking-wider">
            {title}
          </h3>
          <p className="font-sans text-[10px] text-[#0A0A0A]/50 leading-snug mt-0.5 max-w-[200px]">
            {description}
          </p>
        </div>
      </div>

      {/* Right: image thumbnails */}
      <div className="flex-1 flex gap-2 items-center overflow-hidden h-[85%]">
        {images.map((src, i) => (
          <div
            key={i}
            className="h-full aspect-[3/2] rounded overflow-hidden flex-shrink-0 bg-[#0A0A0A]/5"
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SingleStepText({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-serif text-[#0A0A0A]/20 text-4xl tabular-nums" style={{ fontWeight: 300 }}>
          {String(step + 1).padStart(2, "0")}
        </span>
        <div className="w-8 h-px bg-[#0A0A0A]/20" />
      </div>
      <h3 className="dual-serif text-[#0A0A0A] text-2xl md:text-3xl uppercase leading-tight mb-3">
        {title}
      </h3>
      <p className="font-sans text-[15px] text-[#0A0A0A]/70 leading-relaxed max-w-[380px]">
        {description}
      </p>
    </div>
  );
}

function CollageImages({
  step,
  images,
  isLatest,
}: {
  step: number;
  images: string[];
  isLatest: boolean;
}) {
  const groupRef = useRef<HTMLDivElement>(null);

  const positions = useRef(
    images.map((_, i) => ({
      left: `${10 + step * 7 + i * 16 + (Math.random() - 0.5) * 10}%`,
      top: `${8 + step * 9 + i * 7 + (Math.random() - 0.5) * 8}%`,
      rotate: (Math.random() - 0.5) * 8,
      width: `${24 + Math.random() * 8}%`,
    })),
  );

  useEffect(() => {
    if (!groupRef.current) return;
    const imgs = groupRef.current.querySelectorAll("[data-collage-img]");
    if (isLatest) {
      gsap.fromTo(imgs,
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
      );
    } else {
      gsap.to(imgs, { opacity: 0.35, filter: "saturate(0.3)", duration: 0.3, ease: "power1.out" });
    }
  }, [isLatest]);

  return (
    <div ref={groupRef} className="absolute inset-0" style={{ zIndex: step + 1 }}>
      {images.map((src, i) => (
        <div
          key={i}
          data-collage-img
          className="absolute rounded shadow-lg overflow-hidden"
          style={{
            left: positions.current[i].left,
            top: positions.current[i].top,
            width: positions.current[i].width,
            transform: `rotate(${positions.current[i].rotate}deg)`,
            aspectRatio: "3/2",
            opacity: 0,
          }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
