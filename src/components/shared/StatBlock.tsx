interface StatBlockProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color?: "gold" | "white" | "dark";
  size?: "default" | "large";
}

const colorMap = {
  gold: "text-[#D4A853]",
  white: "text-white",
  dark: "text-[#0A0A0A]",
};

const labelColorMap = {
  gold: "text-white/70",
  white: "text-white/60",
  dark: "text-[#999690]",
};

const sizeMap = {
  default: "text-5xl md:text-6xl lg:text-7xl",
  large: "text-7xl md:text-8xl lg:text-[7rem]",
};

export default function StatBlock({ value, label, suffix = "", prefix = "", color = "gold", size = "default" }: StatBlockProps) {
  const display = value >= 1000000
    ? (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
    : value >= 1000
      ? value.toLocaleString()
      : value.toString();

  return (
    <div className="deck-animate">
      <div
        className={`stat-number ${sizeMap[size]} ${colorMap[color]}`}
        data-count-to={value}
        data-suffix={suffix}
        data-prefix={prefix}
      >
        {prefix}{display}{suffix}
      </div>
      <div className={`stat-label ${labelColorMap[color]}`}>{label}</div>
    </div>
  );
}
