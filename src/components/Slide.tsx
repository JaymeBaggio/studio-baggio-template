type BgMode = "cream" | "dark" | "photo";

const bgStyles: Record<BgMode, { bg: string; color: string }> = {
  cream: { bg: "#F5F0EB", color: "#0A0A0A" },
  dark: { bg: "#0D0D0D", color: "#FFFFFF" },
  photo: { bg: "transparent", color: "#FFFFFF" },
};

interface SlideProps {
  bg: BgMode;
  id: string;
  children: React.ReactNode;
  anim?: "stagger" | "scale" | "stat-counter" | "blur-reveal" | "mosaic" | "logo-wave";
  align?: "center" | "top";
  className?: string;
  noPadding?: boolean;
}

export default function Slide({ bg, id, children, anim = "stagger", align = "center", className = "", noPadding = false }: SlideProps) {
  const styles = bgStyles[bg];
  return (
    <section
      data-deck-slide
      data-anim={anim}
      id={id}
      className={`relative flex ${align === "top" ? "items-start" : "items-center"} overflow-hidden ${className}`}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: styles.bg,
        color: styles.color,
        flexShrink: 0,
        ...(noPadding
          ? {}
          : {
              paddingLeft: "8vw",
              paddingRight: "8vw",
              paddingTop: align === "top" ? "max(90px, 7vh)" : "max(80px, 5vh)",
              paddingBottom: "clamp(70px, 8vh, 90px)",
            }),
      }}
    >
      {children}
    </section>
  );
}
