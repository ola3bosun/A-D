import { useRef } from 'react';
import gsap from 'gsap';

export interface VideoItem {
  id: string | number;
  thumbnail: string;
  title: string;
  cardSubtitle?: string; // NEW: Optional subtitle (e.g., "Unclog")
  timeAgo: string;
  href: string;
}

interface VideoCarouselProps {
  videos: VideoItem[];
  viewMoreHref?: string;
  theme?: 'yellow' | 'green'; // NEW: Controls the button color
}

export default function VideoCarousel({ 
  videos, 
  viewMoreHref = "#",
  theme = 'yellow' // Default to yellow
}: VideoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    
    // Dynamically calculate width to ensure perfect alignment
    const cardWidth = container.firstElementChild?.clientWidth || 400;
    const gap = 18; // gap-4 (Keeping your updated gap)
    const scrollAmount = cardWidth + gap; 
    
    const currentScroll = container.scrollLeft;
    const targetScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;

    // Temporarily disable CSS snapping for a smooth GSAP animation
    container.style.scrollSnapType = 'none';

    gsap.to(container, {
      scrollLeft: targetScroll,
      duration: 0.8,
      ease: "power3.out", 
      overwrite: true,
      onComplete: () => {
        // Restore CSS snapping for touch/swipe users once the animation is settled
        container.style.scrollSnapType = 'x mandatory';
      }
    });
  };

// --- Dynamic Theme Styles ---
  const rightButtonStyles = theme === 'green' 
    ? "bg-[#35AB57] hover:bg-[#22c55e]" 
    : "bg-[#FCC81D] hover:bg-[#e5b51a]";

  // Toggle card backgrounds based on the theme
  const cardBgStyles = theme === 'green'
    ? "bg-white"
    : "bg-[#FFFBEA]";

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      
      {/* Carousel Track */}
      <div className="flex-1 min-h-0 relative -mx-6 px-6 md:-mx-12 md:px-12">
        <div 
          ref={carouselRef}
          className="flex gap-6 h-full overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video) => (
            <a 
              key={video.id} 
              href={video.href}
              className={`carousel-card flex flex-col shrink-0 md:w-[33vw] snap-start ${cardBgStyles} p-2 rounded-[1rem] hover:bg-[#22c55e] transition-all duration-300 group`}
            >
              {/* Image Container */}
              <div className="relative w-full mb-6 overflow-hidden rounded-[12px] bg-[#FFFBEA]">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out aspect-video"
                />
              </div>

              {/* Text Content */}
              <div className="px-8 flex flex-col flex-1">
                {/* Dynamically adjust margin based on whether subtitle exists */}
                <h3 className={`font-clash font-medium text-[1.35rem] text-[#1A1A1A] leading-[1.2] line-clamp-2 group-hover:text-green-600 transition-colors ${video.cardSubtitle ? 'mb-1' : 'mb-4'}`}>
                  {video.title}
                </h3>

                {/* Render the "Unclog" subtitle if it exists */}
                {video.cardSubtitle && (
                  <p className="text-gray-500 italic text-[1.05rem] font-medium mb-4">
                    {video.cardSubtitle}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="text-sm text-gray-500 font-medium">
                    {video.timeAgo}
                  </span>
                  
                  <div className="flex items-center gap-2 px-4 py-1.5 border border-dashed border-gray-400/80 rounded-full text-sm font-medium text-gray-700 group-hover:border-green-500 group-hover:text-green-600 transition-colors">
                    Watch 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* --- Bottom Controls --- */}
      <div className="reveal-controls flex items-center justify-between pt-4 md:pt-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => scroll('left')}
            className="w-14 h-14 rounded-full bg-[#FCFBF8] flex items-center justify-center shadow-sm border border-gray-200 hover:bg-white hover:scale-105 transition-all text-gray-400 group"
            aria-label="Scroll Left"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>

          {/* Dynamic Right Button */}
          <button 
            onClick={() => scroll('right')}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-all text-white group ${rightButtonStyles}`}
            aria-label="Scroll Right"
          >
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        <a 
          href={viewMoreHref} 
          className="flex items-center gap-2 font-clash font-medium text-[#1A1A1A] text-lg border-b border-[#1A1A1A] pb-1 hover:text-[#22c55e] hover:border-[#22c55e] transition-colors group"
        >
          View More 
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </a>
      </div>

    </div>
  );
}