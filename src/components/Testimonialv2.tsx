import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Data accurately transcribed from your screenshot
const reviews = [
  {
    quote:
      "You will pay huge consultation fee and go to the hospital, yet no one will sit and break down this hard truth for you! Aproko Doctor, you're doing God's work. Thank you.",
    name: "Seun Balogun",
    role: "Financial Analyst",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    quote:
      "Working with Aproko Doctor has been amazing. The simple approach to health information is really making a difference.",
    name: "James Lee",
    role: "Influencer",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    quote:
      "We didn't know how much influence Aproko Doctor had on people until we had a collaboration, he is truly a force!",
    name: "Adesayo Flyin",
    role: "Partner",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    quote: "Partnering with Aproko Doctor has been a rewarding experience.",
    name: "Matt Cannon",
    role: "Team Member",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    quote: "Wow, Aproko Doctor gives premium classes for free!",
    name: "Alasi Marilyn",
    role: "Student",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    quote:
      "Doc, you just reminded me to check my blood pressure. Thank you for the daily reminders!",
    name: "Olusegun Thomas",
    role: "Sales Manager",
    avatar: "https://i.pravatar.cc/150?u=6",
  },
];

export default function VoicesOfChange() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".review-card");

      cards.forEach((card, index) => {
        // We do not animate the very last card away
        if (index === cards.length - 1) return;

        // Animate the current card shrinking and dimming as the NEXT card approaches
        gsap.to(card, {
          scale: 0.85, // Shrinks slightly backward
          opacity: 1, // Dims out
          filter: "blur(1px)", // Optional: Adds a nice camera depth-of-field effect
          scrollTrigger: {
            trigger: cards[index + 1], // Triggered by the scroll position of the NEXT card
            start: "top bottom", // Starts when the next card enters the bottom of the screen
            end: "top 15%", // Ends when the next card reaches the sticky threshold
            scrub: true, // Ties the animation perfectly to the scrollbar
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#F5F3E9] pt-24 pb-32 md:pt-32 relative"
    >
      {/* --- Header Section --- */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-16 md:mb-24">
        <h2 className="font-clash text-[40px] md:text-[56px] font-medium text-[#1A1A1A] mb-6 tracking-tight">
          Voices of change
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto font-medium leading-relaxed">
          People from across Africa and beyond share how Aproko Doctor
          transformed the way they understand their health. These are the
          stories that matter.
        </p>
      </div>

      {/* --- Stacking Cards Container --- */}
      <div className="max-w-4xl mx-auto px-6 pb-[20vh]">
        {reviews.map((review, i) => (
          <div
            key={i}
            // sticky and top-[15vh] handle the physical stacking without expensive JS math
            className="review-card sticky top-[15vh] w-full bg-[#FCFBF8] rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100/80 mb-24 transition-all duration-300 origin-top"
            // Adding a dynamic top offset gives it that "deck of cards" staggered look at the top edge
            style={{ top: `calc(15vh + ${i * 12}px)` }}
          >
            <h3 className="font-clash text-2xl md:text-[28px] text-[#1A1A1A] font-medium leading-[1.4] mb-12">
              "{review.quote}"
            </h3>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden shrink-0">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1A1A] text-sm md:text-base">
                  {review.name}
                </h4>
                <p className="text-gray-500 text-xs md:text-sm font-medium">
                  {review.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Newsletter CTA  --- */}
      <div className="w-full max-w-[92vw] mx-auto px-4 md:px-6">
        <div className="bg-[#FFFBEA] rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100/80 flex flex-col gap-10 md:gap-14">
          {/* --- TOP ROW: Text & Avatars --- */}
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 w-full">
            {/* Text Content (Left) */}
            <div className="max-w-3xl">
              <h2 className="font-clash font-medium text-[40px] md:text-[60px] leading-[110%] tracking-[-0.025em] text-[#212121] mb-3">
                Become part of AprokoNation
              </h2>
              <p className="text-[#474747] font-manrope font-medium text-base md:text-lg tracking-[-0.025em] max-w-2xl">
                Subscribe to my Newsletter to get weekly health insights,
                research updates, and exclusive content from Dr. Chinonso
                Egemba.
              </p>
            </div>

            {/* Avatar Group (Right) */}
            <div className="flex flex-col items-start md:items-end shrink-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm md:text-base text-[#474747] font-medium tracking-[-0.025em]">
                  Join 5M+
                </span>
                <div className="flex -space-x-3">
                  {/* Note: Border color matches the card background for a seamless cut-out */}
                  <div className="w-8 h-8 rounded-full border-[2.5px] border-[#FFFBEA] bg-gray-200"></div>
                  <div className="w-8 h-8 rounded-full border-[2.5px] border-[#FFFBEA] bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full border-[2.5px] border-[#FFFBEA] bg-gray-400"></div>
                  <div className="w-8 h-8 rounded-full border-[2.5px] border-[#FFFBEA] bg-gray-500"></div>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-600 font-medium">
                health enthusiasts
              </p>
            </div>
          </div>

          {/* --- BOTTOM ROW: Form & Disclaimer --- */}
          <div className="flex flex-col w-full">
            <form className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="email"
                placeholder="emekankechi@email.com"
                // flex-[3] makes the input take up roughly 75% of the row
                className="flex-[3] bg-[#47474710] placeholder:text-gray-400 text-gray-800 rounded-[4px] px-6 py-5 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#35AB57] transition-all font-manrope font-regular text-base line-height-[150%] tracking-[-0.025em]"
              />
              <button
                type="submit"
                // flex-1 makes the button take up the remaining 25%
                className="flex-1 bg-[#35AB57] text-white px-8 py-5 rounded-lg font-clash font-medium text-base line-height-[150%] hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {/* Centered Disclaimer */}
            <p className="text-[11px] md:text-xs text-[#474747] text-manrope font-regular mt-4 text-center w-full">
              By signing up, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
