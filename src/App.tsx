import SmoothScroll from "./components/SmoothScroll";
import HorizontalDeck from "./components/HorizontalDeck";
import Navigation from "./components/Navigation";
import SlideIndicator from "./components/SlideIndicator";

import CoverSlide from "./components/slides/CoverSlide";
import StatementSlide from "./components/slides/StatementSlide";
import FullBleedStatSlide from "./components/slides/FullBleedStatSlide";
import DividerSlide from "./components/slides/DividerSlide";
import EditorialCollageSlide from "./components/slides/EditorialCollageSlide";
import SplitSlide from "./components/slides/SplitSlide";
import DeviceMockupSlide from "./components/slides/DeviceMockupSlide";
import StatWallSlide from "./components/slides/StatWallSlide";
import LogoWallSlide from "./components/slides/LogoWallSlide";
import ClosingSlide from "./components/slides/ClosingSlide";
import PlatformReachSlide from "./components/slides/PlatformReachSlide";
import AudienceStatsSlide from "./components/slides/AudienceStatsSlide";
import BrandGridSlide from "./components/slides/BrandGridSlide";
import TeamInfluenceSlide from "./components/slides/TeamInfluenceSlide";
import SocialProofSlide from "./components/slides/SocialProofSlide";
import ProductShowcaseSlide from "./components/slides/ProductShowcaseSlide";

import { images, copy } from "./data/placeholders";

function App() {
  return (
    <SmoothScroll>
      <Navigation />
      <SlideIndicator />
      <HorizontalDeck>
        {/* 1. Cover */}
        <CoverSlide />

        {/* 2. Statement */}
        <StatementSlide />

        {/* 3. Full-bleed stat — hero reach number */}
        <FullBleedStatSlide
          id="stat-hero-1"
          image={images.hero1}
          preLabel="An Audience Of"
          value={copy.stat1.value}
          postLabel="Engage with us across our network each month, including a database of 850,000 subscribers."
        />

        {/* 4. Divider: Approach */}
        <DividerSlide id="divider-a" letter="A" kicker="THE APPROACH" title="Strategy in practice" />

        {/* 5. Platform Reach — multi-channel overview with device mockups */}
        <PlatformReachSlide />

        {/* 6. Audience Stats — demographic breakdown with photo */}
        <AudienceStatsSlide />

        {/* 7. Editorial collage + story */}
        <EditorialCollageSlide />

        {/* 8. Split: text L, photo R — Approach */}
        <SplitSlide
          id="split-approach"
          direction="photo-right"
          image={images.editorial1}
          kicker={copy.approach.kicker}
          headline={copy.approach.headline}
          italic={copy.approach.italic}
          body={copy.approach.body}
          bullets={[
            "Diagnostic-first: map expertise, visibility gaps and commercial opportunity",
            "Systems that compound: content that positions, proof that converts",
            "Measurable outcomes tied to business growth, not vanity metrics",
          ]}
        />

        {/* 9. Product Showcase — daily email / channel detail */}
        <ProductShowcaseSlide />

        {/* 10. Device mockup collage */}
        <DeviceMockupSlide />

        {/* 11. Divider: Proof */}
        <DividerSlide id="divider-p" letter="P" kicker="THE PROOF" title="Results that compound" />

        {/* 12. Split: photo L, text R — Case study 1 */}
        <SplitSlide
          id="split-case1"
          direction="photo-left"
          image={images.editorial2}
          kicker={copy.caseStudy1.kicker}
          headline={copy.caseStudy1.headline}
          italic={copy.caseStudy1.italic}
          body={copy.caseStudy1.body}
          stat={copy.caseStudy1.stat}
          bullets={[
            "Positioning framework deployed in week one",
            "Content system producing weekly authority pieces by month two",
            "Inbound pipeline exceeded outbound within six months",
          ]}
        />

        {/* 13. Stat wall */}
        <StatWallSlide />

        {/* 14. Split: text L, photo R — Case study 2 */}
        <SplitSlide
          id="split-case2"
          direction="photo-right"
          image={images.editorial3}
          kicker={copy.caseStudy2.kicker}
          headline={copy.caseStudy2.headline}
          italic={copy.caseStudy2.italic}
          body={copy.caseStudy2.body}
          bullets={[
            "Voice profiling and content system built from scratch",
            "Three speaking invitations within four months",
            "Consulting pipeline exceeded full-time employment income",
          ]}
        />

        {/* 15. Full-bleed stat #2 */}
        <FullBleedStatSlide
          id="stat-hero-2"
          image={images.hero2}
          preLabel="Client Retention"
          value={copy.stat2.value}
          postLabel="Of clients continue working with us beyond their initial engagement."
          suffix="%"
        />

        {/* 16. Social Proof — testimonials/reactions wall */}
        <SocialProofSlide />

        {/* 17. Team Influence — editorial collage with stats */}
        <TeamInfluenceSlide />

        {/* 18. Brand Grid — vertical photo strips with brand names */}
        <BrandGridSlide />

        {/* 19. Logo wall */}
        <LogoWallSlide />

        {/* 20. Divider: Services */}
        <DividerSlide id="divider-s" letter="S" kicker="THE SERVICES" title="What we do" />

        {/* 21. Split: photo L, text R — Services */}
        <SplitSlide
          id="split-services"
          direction="photo-left"
          image={images.editorial4}
          kicker={copy.services.kicker}
          headline={copy.services.headline}
          italic={copy.services.italic}
          body={copy.services.body}
          bullets={[
            "Strategic positioning and authority-building",
            "AI adoption, skills and workflow design",
            "Content systems and visibility infrastructure",
            "Advisory for founders, leaders and organisations",
          ]}
        />

        {/* 22. Split: text L, photo R — Engagement */}
        <SplitSlide
          id="split-pricing"
          direction="photo-right"
          image={images.editorial5}
          kicker={copy.pricing.kicker}
          headline={copy.pricing.headline}
          italic={copy.pricing.italic}
          body={copy.pricing.body}
          bullets={[
            "Diagnostic sprints: 2-week deep-dive into opportunity and gaps",
            "Strategic builds: 6-12 week positioning and systems implementation",
            "Ongoing advisory: monthly strategic counsel and direction",
          ]}
        />

        {/* 23. Divider: Contact */}
        <DividerSlide id="divider-c" letter="C" kicker="GET IN TOUCH" title="Start a conversation" />

        {/* 24. Closing */}
        <ClosingSlide />
      </HorizontalDeck>
    </SmoothScroll>
  );
}

export default App;
