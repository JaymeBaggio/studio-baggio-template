import Slide from "../Slide";

// Two table variants:
//
// "highlighted" — Studio Baggio column has a paper-card background and
//   a thin top rule, visually emphasised. Other columns ghost. Best for
//   sales / pitch decks where the differentiation needs to land fast.
//
// "matrix"      — All columns equal weight, no fills. Studio Baggio column
//   emphasised only by type weight (semibold) and a thin underline rule.
//   Best for analyst / objective comparison work.

interface Brand {
  name: string;
  /** Optional logo URL. Falls back to a typographic mark if absent. */
  logo?: string;
}

interface Row {
  label: string;
  /** Per-brand mark: true = filled circle (yes), false = en-dash (no),
   *  or a string for custom text (e.g. "Limited", "£25k+") */
  values: (boolean | string)[];
}

interface ComparisonTableSlideProps {
  id: string;
  /** Variant of table design */
  variant?: "highlighted" | "matrix";
  /** Slide kicker, e.g. "HOW WE COMPARE" */
  kicker?: string;
  /** Slide title, e.g. "Capability comparison" */
  title?: string;
  /** Subtitle italic line */
  subtitle?: string;
  /** Brand columns. First entry is Studio Baggio (highlighted in variant A). */
  brands?: Brand[];
  /** Capability rows */
  rows?: Row[];
}

const defaultBrands: Brand[] = [
  { name: "Studio Baggio" },
  { name: "Agency One" },
  { name: "Agency Two" },
];

const defaultRows: Row[] = [
  { label: "Strategic positioning + diagnostic", values: [true, true, false] },
  { label: "AI adoption + workflow design", values: [true, false, false] },
  { label: "Content systems built for compounding", values: [true, false, true] },
  { label: "Authority-first creative direction", values: [true, true, false] },
  { label: "Founder-led engagement (no junior handoff)", values: [true, false, false] },
  { label: "Measurable proof tied to growth", values: [true, "Limited", "Limited"] },
  { label: "Sector specialism in financial services", values: [true, false, false] },
  { label: "Typical engagement length", values: ["6–12 wk", "3–6 mo", "12 mo+"] },
];

function Mark({ value, emphasis = false }: { value: boolean | string; emphasis?: boolean }) {
  if (typeof value === "string") {
    return (
      <span
        className={`font-sans text-[12px] tracking-wide ${
          emphasis ? "text-[#0A0A0A] font-medium" : "text-[#0A0A0A]/55"
        }`}
      >
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <span
        className="inline-block rounded-full"
        style={{
          width: emphasis ? "10px" : "8px",
          height: emphasis ? "10px" : "8px",
          backgroundColor: emphasis ? "#0A0A0A" : "#0A0A0A",
          opacity: emphasis ? 1 : 0.55,
        }}
      />
    );
  }
  return (
    <span
      className="inline-block"
      style={{
        width: "16px",
        height: "1px",
        backgroundColor: "#0A0A0A",
        opacity: 0.18,
      }}
    />
  );
}

function BrandMark({ brand }: { brand: Brand }) {
  if (brand.logo) {
    return <img src={brand.logo} alt={brand.name} className="h-6 object-contain mx-auto" />;
  }
  return (
    <span className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0A0A0A]/80 whitespace-nowrap">
      {brand.name}
    </span>
  );
}

export default function ComparisonTableSlide({
  id,
  variant = "highlighted",
  kicker = "HOW WE COMPARE",
  title = "Capability matrix",
  subtitle = "Where we're stronger, where we're not, and where it shows in the work.",
  brands = defaultBrands,
  rows = defaultRows,
}: ComparisonTableSlideProps) {
  const isHighlighted = variant === "highlighted";

  return (
    <Slide bg="cream" id={id} anim="stagger" align="top">
      <div className="w-full h-full grid grid-cols-12 gap-6 items-start">
        {/* Header: kicker + title + subtitle on the left, takes full width on top */}
        <div className="col-span-12 mb-2">
          <div className="deck-animate flex items-baseline justify-between gap-6 mb-3">
            <span className="kicker text-[#0A0A0A]/60">{kicker}</span>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#0A0A0A]/40">
              {variant === "highlighted" ? "Comparison · Highlighted" : "Comparison · Matrix"}
            </span>
          </div>
          <h2
            className="deck-animate dual-serif text-[#0A0A0A] uppercase leading-[0.95] mb-3"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="deck-animate dual-italic text-[#0A0A0A]/65 text-xl md:text-2xl max-w-[760px]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Table proper, full width */}
        <div className="col-span-12 mt-6">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `minmax(0, 1.6fr) repeat(${brands.length}, minmax(0, 1fr))`,
            }}
          >
            {/* Brand header row */}
            <div className="deck-animate" />
            {brands.map((brand, bi) => {
              const isFirst = bi === 0;
              const cellClasses = `flex items-center justify-center py-5 px-3 ${
                isHighlighted && isFirst ? "bg-white/70 border-t border-[#0A0A0A] rounded-t-lg" : ""
              }`;
              return (
                <div key={brand.name} className={`deck-animate ${cellClasses}`}>
                  <div className="flex flex-col items-center gap-2">
                    <BrandMark brand={brand} />
                    {isHighlighted && isFirst && (
                      <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#0A0A0A]/50">
                        Us
                      </span>
                    )}
                    {!isHighlighted && isFirst && (
                      <div className="w-6 h-px bg-[#0A0A0A]" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Data rows */}
            {rows.map((row, ri) => {
              const isLast = ri === rows.length - 1;
              return (
                <div key={ri} className="contents">
                  {/* Row label (left col) */}
                  <div
                    className={`deck-animate flex items-center font-sans text-[14px] text-[#0A0A0A]/85 py-4 pr-4 border-t border-[#0A0A0A]/10 ${
                      isLast ? "border-b border-[#0A0A0A]/10" : ""
                    }`}
                  >
                    {row.label}
                  </div>
                  {/* Per-brand cell */}
                  {brands.map((brand, bi) => {
                    const value = row.values[bi];
                    const isFirst = bi === 0;
                    const cellHighlight =
                      isHighlighted && isFirst ? "bg-white/70" : "";
                    const matrixHighlight =
                      !isHighlighted && isFirst ? "font-semibold" : "";
                    return (
                      <div
                        key={brand.name}
                        className={`deck-animate flex items-center justify-center py-4 px-3 border-t border-[#0A0A0A]/10 ${
                          isLast && isHighlighted && isFirst ? "rounded-b-lg" : ""
                        } ${isLast ? "border-b border-[#0A0A0A]/10" : ""} ${cellHighlight} ${matrixHighlight}`}
                      >
                        <Mark value={value} emphasis={isFirst} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Footer note — small print */}
          <div className="deck-animate flex items-center justify-between mt-6">
            <span className="font-sans text-[10px] tracking-wider uppercase text-[#0A0A0A]/40">
              Filled circle: yes · Dash: no · Text: detail
            </span>
            <span className="font-sans text-[10px] tracking-wider uppercase text-[#0A0A0A]/40">
              Source: capability mapping, Q2 2026
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
