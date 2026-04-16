import Slide from "../Slide";
import InteractivePhone from "../interactive-phone/InteractivePhone";

// DUMMY TEST SLIDE — slide 25.
// Throwaway. Once the interactive phone is approved, the InteractivePhone
// component moves into DeviceMockupSlide (slide 10) and this file is deleted
// + SLIDE_COUNT goes back to 24.

export default function PhoneTestSlide() {
  return (
    <Slide bg="cream" id="phone-test" anim="stagger">
      <div className="w-full h-full grid grid-cols-12 gap-8 items-center">
        {/* Left: instructions */}
        <div className="col-span-6 flex flex-col justify-center pl-[2vw]">
          <span className="deck-animate kicker text-[#D4A853] mb-4">TEST SLIDE — DELETE LATER</span>
          <h2 className="deck-animate dual-serif text-[#0A0A0A] text-5xl md:text-6xl uppercase leading-none mb-3">
            Interactive
          </h2>
          <p className="deck-animate dual-italic text-[#0A0A0A] text-4xl md:text-5xl leading-tight mb-8">
            phone test
          </p>

          <ol className="deck-animate space-y-3 max-w-[440px] font-sans text-[14px] text-[#0A0A0A]/75 leading-[1.6]">
            <li><span className="text-[#D4A853] font-semibold">1.</span> Click or tap the phone on the right.</li>
            <li><span className="text-[#D4A853] font-semibold">2.</span> Phone enlarges to centre with backdrop blur.</li>
            <li><span className="text-[#D4A853] font-semibold">3.</span> Scroll inside the phone — content moves; deck stays put.</li>
            <li><span className="text-[#D4A853] font-semibold">4.</span> Watch for subtle 3D tilt as you scroll.</li>
            <li><span className="text-[#D4A853] font-semibold">5.</span> Click outside, press Esc, or tap × to close.</li>
            <li><span className="text-[#D4A853] font-semibold">6.</span> Deck navigation resumes immediately.</li>
          </ol>

          <div className="deck-animate mt-10 pt-6 border-t border-[#0A0A0A]/10 max-w-[440px]">
            <span className="persistent-header text-[#999690] block mb-2">Status</span>
            <p className="font-sans text-[12px] text-[#0A0A0A]/55 leading-relaxed">
              Built on dummy slide first. Once approved, the component moves into <code className="bg-[#0A0A0A]/5 px-1.5 py-0.5 rounded">DeviceMockupSlide</code> (slide 10) and this slide is deleted.
            </p>
          </div>
        </div>

        {/* Right: the phone, centred in its column */}
        <div className="col-span-6 flex items-center justify-center h-full relative">
          <div className="deck-animate relative" style={{ width: "200px", height: "422px" }}>
            <InteractivePhone />
          </div>
        </div>
      </div>
    </Slide>
  );
}
