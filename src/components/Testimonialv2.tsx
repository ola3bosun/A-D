import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Data accurately transcribed from your screenshot
const reviews = [
  {
    quote: "You will pay huge consultation fee and go to the hospital, yet no one will sit and break down this hard truth for you! Aproko Doctor, you're doing God's work. Thank you.",
    name: "Seun Balogun",
    role: "Financial Analyst",
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    quote: "Working with Aproko Doctor has been amazing. The simple approach to health information is really making a difference.",
    name: "James Lee",
    role: "Influencer",
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    quote: "We didn't know how much influence Aproko Doctor had on people until we had a collaboration, he is truly a force!",
    name: "Adesayo Flyin",
    role: "Partner",
    avatar: "https://i.pravatar.cc/150?u=3"
  },
  {
    quote: "Partnering with Aproko Doctor has been a rewarding experience.",
    name: "Matt Cannon",
    role: "Team Member",
    avatar: "https://i.pravatar.cc/150?u=4"
  },
  {
    quote: "Wow, Aproko Doctor gives premium classes for free!",
    name: "Alasi Marilyn",
    role: "Student",
    avatar: "https://i.pravatar.cc/150?u=5"
  },
  {
    quote: "Doc, you just reminded me to check my blood pressure. Thank you for the daily reminders!",
    name: "Olusegun Thomas",
    role: "Sales Manager",
    avatar: "https://i.pravatar.cc/150?u=6"
  }
];

export default function VoicesOfChange() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.review-card');

      cards.forEach((card, index) => {
        // We do not animate the very last card away
        if (index === cards.length - 1) return;

        // Animate the current card shrinking and dimming as the NEXT card approaches
        gsap.to(card, {
          scale: 0.85, // Shrinks slightly backward
          opacity: 1, // Dims out
          filter: 'blur(1px)', // Optional: Adds a nice camera depth-of-field effect
          scrollTrigger: {
            trigger: cards[index + 1], // Triggered by the scroll position of the NEXT card
            start: "top bottom", // Starts when the next card enters the bottom of the screen
            end: "top 15%", // Ends when the next card reaches the sticky threshold
            scrub: true, // Ties the animation perfectly to the scrollbar
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#F5F3E9] pt-24 pb-32 md:pt-32 relative">
      
      {/* --- Header Section --- */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-16 md:mb-24">
        <h2 className="font-clash text-[40px] md:text-[56px] font-medium text-[#1A1A1A] mb-6 tracking-tight">
          Voices of change
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto font-medium leading-relaxed">
          People from across Africa and beyond share how Aproko Doctor transformed the way they understand their health. These are the stories that matter.
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
                <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
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

      {/* --- Newsletter CTA (Matches screenshot bottom) --- */}
      <div className="max-w-92vw mx-auto px-6">
        <div className="bg-[#FFFBEA] rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100/80 flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          <div className="max-w-100%">
            <h2 className="font-clash font-medium text-[60px] leading-[110%] tracking-[-0.025em] text-[#212121]">
              Become part of AprokoNation
            </h2>
            <p className="text-[#474747] font-manrope font-medium text-text-md tracking-[-0.025em]">
              Subscribe to my Newsletter to get weekly health insights, research updates, and exclusive content from Dr. Chinonso Egemba.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 w-full">
              <input 
                type="email" 
                placeholder="emailaddress@email.com" 
                className="flex-1 bg-[#F5F3E9] rounded-lg px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
              />
              <button 
                type="submit" 
                className="bg-[#22C55E] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#16a34a] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-3 text-center sm:text-left">
              By signing up, you agree to our Terms and Privacy Policy.
            </p>
          </div>

          {/* Avatar Group */}
          <div className="flex flex-col items-end shrink-0 hidden md:flex">
            <div className="flex -space-x-3 mb-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400"></div>
            </div>
            <p className="text-xs text-gray-500 font-medium">Join 5M+ health enthusiasts</p>
          </div>

        </div>
      </div>

    </section>
  );
}