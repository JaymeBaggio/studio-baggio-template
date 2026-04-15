import Slide from "../Slide";

interface CommentCard {
  username: string;
  text: string;
  platform: "instagram" | "youtube" | "twitter";
  top: string;
  left: string;
  rotate: string;
  width: string;
}

const comments: CommentCard[] = [
  { username: "@sarah.k", text: "Charlotte & Lu love love love... May I ask where Charlotte's boots are from?", platform: "instagram", top: "10%", left: "2%", rotate: "-1deg", width: "22%" },
  { username: "fieldanne", text: "The BEST — one of the v few emails I actually read these days!!", platform: "youtube", top: "8%", left: "35%", rotate: "1deg", width: "24%" },
  { username: "@moomeena40", text: "Love it! Enjoy all content & team is great", platform: "instagram", top: "11%", left: "72%", rotate: "2deg", width: "20%" },
  { username: "@lynnehewitt920", text: "Fabulous show. Great host and panel. Loved the shopping and the special guests.", platform: "youtube", top: "25%", left: "8%", rotate: "0deg", width: "26%" },
  { username: "emmyylouiseee", text: "The polka dot jeans are so fun", platform: "instagram", top: "28%", left: "72%", rotate: "-2deg", width: "18%" },
  { username: "@diezweite", text: "okay the green dress! We all need more information about this one", platform: "twitter", top: "60%", left: "72%", rotate: "-1deg", width: "22%" },
  { username: "liesbethrn", text: "Which shade of Rose Inc blusher please?", platform: "instagram", top: "62%", left: "3%", rotate: "1deg", width: "20%" },
  { username: "lettherebemorelight", text: "I work a random job and I dress every day as if I worked there.", platform: "instagram", top: "68%", left: "35%", rotate: "-1deg", width: "24%" },
  { username: "@noellefitz", text: "Love the show and an AMAZING team", platform: "twitter", top: "76%", left: "68%", rotate: "2deg", width: "20%" },
  { username: "isabel.a.g", text: "Where are the glasses in the 2nd pic from?? I LOVE", platform: "instagram", top: "78%", left: "2%", rotate: "-2deg", width: "22%" },
];

const platformColors = {
  instagram: "#E1306C",
  youtube: "#FF0000",
  twitter: "#1DA1F2",
};

export default function SocialProofSlide() {
  return (
    <Slide bg="cream" id="social-proof" anim="stagger">
      {/* Scattered comment cards */}
      {comments.map((card, i) => (
        <div
          key={i}
          className="deck-animate absolute bg-white rounded-lg shadow-md p-3 flex flex-col gap-1.5"
          style={{
            top: card.top,
            left: card.left,
            width: card.width,
            transform: `rotate(${card.rotate})`,
            zIndex: 10 + i,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: platformColors[card.platform] + "20" }}
            >
              <span
                className="text-[8px] font-bold"
                style={{ color: platformColors[card.platform] }}
              >
                {card.platform.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="font-sans text-[11px] font-semibold text-[#0A0A0A]/80 truncate">{card.username}</span>
          </div>
          <p className="font-sans text-[12px] leading-[1.5] text-[#0A0A0A]/70">{card.text}</p>
        </div>
      ))}

      {/* Central quote */}
      <div className="relative z-30 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="bg-[#F5F0EB]/95 backdrop-blur-sm px-12 py-10 max-w-[520px] text-center">
          <h2 className="deck-animate dual-serif text-[#0A0A0A] text-3xl md:text-4xl uppercase leading-none">
            The Relationship
          </h2>
          <p className="deck-animate dual-italic text-[#0A0A0A] text-2xl md:text-3xl leading-tight mt-1">
            with our audience is second to none...
          </p>
          <p className="deck-animate font-sans text-[14px] leading-[1.7] text-[#0A0A0A]/70 mt-4 max-w-[400px] mx-auto">
            This powerful combination of trust, influence and engagement enables brands to forge meaningful connections with an audience that values insight and expertise.
          </p>
        </div>
      </div>
    </Slide>
  );
}
