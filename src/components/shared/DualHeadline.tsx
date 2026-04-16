interface DualHeadlineProps {
  serif: string;
  italic: string;
  size?: "lg" | "xl";
  color?: "dark" | "light" | "gold";
}

const sizeClasses = {
  lg: { serif: "text-4xl md:text-5xl lg:text-6xl", italic: "text-3xl md:text-4xl lg:text-5xl" },
  xl: { serif: "text-5xl md:text-7xl lg:text-8xl", italic: "text-4xl md:text-6xl lg:text-7xl" },
};

const colorClasses = {
  dark: "text-[#0A0A0A]",
  light: "text-white",
  gold: "text-[#0A0A0A]",
};

export default function DualHeadline({ serif, italic, size = "lg", color = "dark" }: DualHeadlineProps) {
  return (
    <div className="space-y-2">
      <h2
        className={`deck-animate dual-serif uppercase leading-none ${sizeClasses[size].serif} ${colorClasses[color]}`}
        data-headline="serif"
      >
        {serif}
      </h2>
      <p
        className={`deck-animate dual-italic leading-tight ${sizeClasses[size].italic} ${colorClasses[color]}`}
        data-headline="italic"
      >
        {italic}
      </p>
    </div>
  );
}
