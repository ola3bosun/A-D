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
  return (
    <section className="w-full bg-[#F5F3E9] pt-24 pb-32 md:pt-32 relative">
      
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
      {/* The pb-[20vh] ensures there is enough scroll room at the bottom for the last card to finish stacking */}
      <div className="max-w-4xl mx-auto px-6 pb-[20vh]">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="review-card sticky w-full bg-[#FCFBF8] rounded-[2rem] p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 mb-20"
            style={{ 
              // 120px clears your navbar. 
              // i * 24px creates the staggered overlapping tab effect seen in the video.
              top: `calc(120px + ${i * 2}px)`,
              // zIndex ensures the newer cards always cleanly overlap the older ones
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
      <div className="max-w-5xl mx-auto px-6 relative z-50 mt-12">
        <div className="bg-[#FCFBF8] rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-8">
          
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