import { useRef } from 'react';
import gsap from 'gsap';

export interface VideoItem {
  id: string | number;
  thumbnail: string;
  title: string;
  timeAgo: string;
  href: string;
}

interface VideoCarouselProps {
  videos: VideoItem[];
  viewMoreHref?: string;
}

export default function VideoCarousel({ videos, viewMoreHref = "#" }: VideoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    
    // Dynamically calculate width to ensure perfect alignment
    const cardWidth = container.firstElementChild?.clientWidth || 400;
    const gap = 18; // gap-4
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
              className="carousel-card flex flex-col shrink-0 w-[320px] md:w-[33vw] snap-start bg-[#FCFBF8] p-4 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100/50 transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] mb-6 overflow-hidden rounded-[1.25rem] bg-gray-100 shrink-0">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Text Content */}
              <div className="px-2 flex flex-col flex-1">
                <h3 className="font-clash font-medium text-[1.35rem] text-[#1A1A1A] leading-[1.2] mb-4 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {video.title}
                </h3>

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
          <button 
            onClick={() => scroll('right')}
            className="w-14 h-14 rounded-full bg-[#FCC81D] flex items-center justify-center shadow-md hover:bg-[#e5b51a] hover:scale-105 transition-all text-white group"
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