import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Array to hold refs for each individual review card
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  cardsRef.current = [];

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Entrance animation for the Header
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" }
        }
      );

      // 2. The 3D Depth Card Stack Effect
      cardsRef.current.forEach((card, index) => {
        // We don't shrink the very last card in the array
        if (index === cardsRef.current.length - 1) return;

        // Calculate the exact pixel point where this card "sticks"
        const stickyTop = 120 + (index * 20);

        gsap.to(card, {
          scale: 0.92, // Shrink to 92% width
          opacity: 0.4, // Dim into the background
          filter: "blur(2px)", // Subtle blur for depth of field
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: `top ${stickyTop}px`, // Starts animating the moment it sticks to the top
            // Animate over the distance of exactly one card height so it perfectly 
            // shrinks as the next card covers it up.
            end: `+=${card?.offsetHeight || 300}`, 
            scrub: true,
          }
        });
      });

      // 3. Entrance animation for the Newsletter CTA
      gsap.fromTo(ctaRef.current,
        { y: 60, opacity: 0, scale: 0.98 },
        { 
          y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%" }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F5F3E9] pt-24 pb-32 md:pt-32 relative overflow-hidden">
      
      {/* --- Header Section --- */}
      <div ref={headerRef} className="max-w-3xl mx-auto px-6 text-center mb-16 md:mb-24 will-change-transform">
        <h2 className="font-clash text-[40px] md:text-[56px] font-medium text-[#1A1A1A] mb-6 tracking-tight">
          Voices of change
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto font-medium leading-relaxed">
          People from across Africa and beyond share how Aproko Doctor transformed the way they understand their health. These are the stories that matter.
        </p>
      </div>

      {/* --- Stacking Cards Container --- */}
      {/* Increased padding-bottom to ensure the user can scroll past the final stacked card seamlessly */}
      <div className="max-w-4xl mx-auto px-6 pb-[30vh]">
        {reviews.map((review, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current.push(el); }}
            className="sticky w-full bg-[#FCFBF8] rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 mb-20 origin-top will-change-transform"
            style={{ 
              // Changed from 2px to 20px. This leaves a visually pleasing "folder tab" lip
              // showing the edges of the cards stacked behind the current one.
              top: `calc(120px + ${i * 20}px)`,
              zIndex: i 
            }}
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

      {/* --- Newsletter CTA --- */}
      <div ref={ctaRef} className="max-w-5xl mx-auto px-6 relative z-50 mt-12 will-change-transform">
        <div className="bg-[#FCFBF8] rounded-[2rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          <div className="max-w-xl">
            <h2 className="font-clash text-3xl md:text-4xl font-medium text-[#1A1A1A] mb-4 tracking-tight">
              Become part of AprokoNation
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-medium mb-8">
              Subscribe to my Newsletter to get weekly health insights, research updates, and exclusive content from Dr. Chinonso Egemba.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 w-full">
              <input 
                type="email" 
                placeholder="emailaddress@email.com" 
                className="flex-1 bg-[#F5F3E9] rounded-lg px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#35AB57]"
              />
              <button 
                type="submit" 
                className="bg-[#35AB57] text-[#F5F3E9] px-8 py-4 rounded-lg font-medium hover:bg-[#2e9c4c] transition-colors whitespace-nowrap shadow-md"
              >
                Subscribe
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-3 text-center sm:text-left">
              By signing up, you agree to our Terms and Privacy Policy.
            </p>
          </div>

          <div className="flex flex-col items-end shrink-0 hidden md:flex">
            <div className="flex -space-x-3 mb-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#FCFBF8] bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full border-2 border-[#FCFBF8] bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full border-2 border-[#FCFBF8] bg-gray-400"></div>
            </div>
            <p className="text-xs text-gray-500 font-medium">Join 5M+ health enthusiasts</p>
          </div>

        </div>
      </div>

    </section>
  );
}