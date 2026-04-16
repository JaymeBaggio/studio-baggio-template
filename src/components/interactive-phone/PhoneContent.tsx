// Daily Email mock UI — visual language matches ProductShowcaseSlide
// (cream bg, serif headlines, image cards, gold accents).
// Designed to be tall and scrollable when the phone is expanded.

const articles = [
  {
    kicker: "TODAY'S EDIT",
    title: "The compounding power of consistent visibility",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&auto=format",
    excerpt: "Small acts of authority, performed weekly, outperform single moments of brilliance every time.",
  },
  {
    kicker: "FEATURE",
    title: "How three founders built inbound pipelines from scratch",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop&auto=format",
    excerpt: "Strategy, content, proof — the same loop, applied with discipline.",
  },
  {
    kicker: "CASE STUDY",
    title: "Ninety days of expertise, distilled",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop&auto=format",
    excerpt: "What happens when a fifteen-year specialist starts publishing for the first time.",
  },
  {
    kicker: "ESSAY",
    title: "Why slow content compounds faster than fast content",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop&auto=format",
    excerpt: "The case for fewer pieces, deeper thought, longer half-lives.",
  },
  {
    kicker: "INTERVIEW",
    title: "On building authority without burning out",
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=400&fit=crop&auto=format",
    excerpt: "A conversation about systems, sustainability, and the long game of expertise.",
  },
  {
    kicker: "ANALYSIS",
    title: "The case for one piece of evergreen content per week",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop&auto=format",
    excerpt: "What we learned from publishing the same way for six months in a row.",
  },
  {
    kicker: "OPINION",
    title: "Authority is downstream of generosity",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop&auto=format",
    excerpt: "Give the answer away. Build the trust. The work follows.",
  },
  {
    kicker: "FIELD NOTES",
    title: "What advisers told us about being visible",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop&auto=format",
    excerpt: "Forty conversations with senior practitioners. Five patterns. One conclusion.",
  },
  {
    kicker: "PROFILE",
    title: "The quietest founder we know, on going public",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=400&fit=crop&auto=format",
    excerpt: "How an introvert built a personal brand without ever feeling self-conscious.",
  },
  {
    kicker: "PLAYBOOK",
    title: "Eight rules for writing in your own voice",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop&auto=format",
    excerpt: "The tone-of-voice document we share with every new client.",
  },
  {
    kicker: "DEEP READ",
    title: "Inside the patient work of building reputation",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=400&fit=crop&auto=format",
    excerpt: "Why the most enduring authority is the slowest to build.",
  },
  {
    kicker: "REPORT",
    title: "Annual review: the year in expert-led content",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop&auto=format",
    excerpt: "Numbers, names, and what worked across forty engagements.",
  },
  {
    kicker: "DISPATCH",
    title: "From the field — what's changed in the last quarter",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop&auto=format",
    excerpt: "Three shifts in how senior buyers research the people they hire.",
  },
  {
    kicker: "REFLECTION",
    title: "The first year of building in public",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop&auto=format",
    excerpt: "What I would tell myself again, and what I would do differently.",
  },
  {
    kicker: "CLOSING",
    title: "The quiet edition — back to the work",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop&auto=format",
    excerpt: "A short note on stepping away from the noise and back to the page.",
  },
];

interface PhoneContentProps {
  scrollable?: boolean;
}

export default function PhoneContent({ scrollable = false }: PhoneContentProps) {
  return (
    <div
      data-phone-scroll-container
      className="w-full h-full bg-[#F5F0EB] overflow-hidden"
      style={{
        overflowY: scrollable ? "auto" : "hidden",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Status bar — needs to clear the iPhone screen rounded corner.
          Border-radius is 13% × 6% of overlay. Bumped large to be safely
          clear of the corner curve. */}
      <div className="flex justify-between items-center px-16 pt-20 pb-3 text-[11px] font-semibold text-[#0A0A0A]/80 tabular-nums">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span>5G</span>
          <span>•••</span>
        </div>
      </div>

      {/* Email header — also needs px-12 (48px+) to clear the rounded corner
          area for the date line which sits near the top of the corner curve. */}
      <div className="px-12 py-4 border-b border-[#0A0A0A]/8">
        <div className="text-[9px] uppercase tracking-[0.2em] text-[#999690] mb-2">Tuesday, 16 April</div>
        <div className="font-serif text-[#0A0A0A] text-[22px] leading-[1.1] mb-1">The Daily Edit</div>
        <div className="font-italic italic text-[#0A0A0A]/60 text-[13px]">issue no. 247</div>
      </div>

      {/* Featured article (full width) */}
      <div className="px-8 py-5 border-b border-[#0A0A0A]/8">
        <img
          src={articles[0].image}
          alt=""
          className="w-full aspect-[16/10] object-cover rounded mb-3"
        />
        <div className="text-[8px] uppercase tracking-[0.2em] text-[#D4A853] font-semibold mb-2">
          {articles[0].kicker}
        </div>
        <h3 className="font-serif text-[#0A0A0A] text-[17px] leading-[1.2] mb-2">
          {articles[0].title}
        </h3>
        <p className="font-sans text-[12px] leading-[1.5] text-[#0A0A0A]/70">
          {articles[0].excerpt}
        </p>
      </div>

      {/* Section divider */}
      <div className="px-8 py-4 flex items-center gap-3">
        <div className="flex-1 h-px bg-[#D4A853]/30" />
        <span className="text-[8px] uppercase tracking-[0.2em] text-[#999690]">Today's stories</span>
        <div className="flex-1 h-px bg-[#D4A853]/30" />
      </div>

      {/* Article list */}
      <div className="flex flex-col">
        {articles.slice(1).map((article, i) => (
          <div key={i} className="px-8 py-4 border-b border-[#0A0A0A]/8 flex gap-3">
            <img
              src={article.image}
              alt=""
              className="w-[80px] h-[80px] object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[7px] uppercase tracking-[0.2em] text-[#D4A853] font-semibold mb-1">
                {article.kicker}
              </div>
              <h4 className="font-serif text-[#0A0A0A] text-[13px] leading-[1.2] mb-1.5">
                {article.title}
              </h4>
              <p className="font-sans text-[10px] leading-[1.45] text-[#0A0A0A]/65 line-clamp-2">
                {article.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Shoppable edit */}
      <div className="px-8 py-5 bg-[#0D0D0D] text-white">
        <div className="text-[8px] uppercase tracking-[0.3em] text-[#D4A853] mb-2">Shoppable Edit</div>
        <div className="font-serif text-[18px] leading-[1.15] mb-4">This week's selection</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="aspect-square bg-white/5 rounded flex items-end p-2">
            <span className="text-[9px] tracking-wider uppercase text-white/60">Item 01</span>
          </div>
          <div className="aspect-square bg-white/5 rounded flex items-end p-2">
            <span className="text-[9px] tracking-wider uppercase text-white/60">Item 02</span>
          </div>
          <div className="aspect-square bg-white/5 rounded flex items-end p-2">
            <span className="text-[9px] tracking-wider uppercase text-white/60">Item 03</span>
          </div>
          <div className="aspect-square bg-white/5 rounded flex items-end p-2">
            <span className="text-[9px] tracking-wider uppercase text-white/60">Item 04</span>
          </div>
        </div>
      </div>

      {/* Footer — extra bottom padding to clear bottom rounded corner */}
      <div className="px-12 pt-6 pb-14 text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#999690] mb-2">Studio Baggio</div>
        <div className="font-italic italic text-[#0A0A0A]/50 text-[11px]">
          Authority through clarity, proof and visibility.
        </div>
      </div>
    </div>
  );
}
