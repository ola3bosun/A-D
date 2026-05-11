import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface VideoItem {
  id: number;
  thumbnail: string;
  title: string;
  timeAgo: string;
  href: string;
  cardSubtitle?: string;
}

interface VideoCarouselProps {
  videos: VideoItem[];
  theme?: 'default' | 'white' | 'green'; 
  sectionRef: React.RefObject<HTMLElement | null>; 
}

export default function VideoCarousel({ videos, sectionRef }: VideoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Unified styles for all sections
  const cardBg = 'bg-[#FFFBEA]'; 
  const textColor = 'text-[#1A1A1A]';
  const metaColor = 'text-[#737373]';

  useEffect(() => {
    if (!sectionRef) {
      console.warn("VideoCarousel: sectionRef prop is missing. Animation aborted.");
      return;
    }

    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      
      if (!track || !section) return;

      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 80); 
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section, 
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, 
        pin: true,
        animation: tween,
        scrub: 1, 
        invalidateOnRefresh: true, 
      });

      // Recalculate measurements after layout settles to prevent scroll overshoot
      setTimeout(() => ScrollTrigger.refresh(), 100);

    }, sectionRef);

    return () => ctx.revert();
  }, [videos, sectionRef]);

  return (
    <div className="relative w-full pl-6 md:pl-12 mt-8 md:mt-12">
      <div 
        ref={trackRef} 
        // Changed items-stretch to items-start so cards don't blow out vertically
        className="flex flex-nowrap items-start gap-6 md:gap-8 w-max will-change-transform px-6 md:px-12 pb-8"
      >
        {videos.map((video) => (
          <a 
            key={video.id} 
            href={video.href}
            className={`group flex flex-col shrink-0 w-[85vw] md:w-[35vw] max-w-[480px] cursor-pointer rounded-[2rem] overflow-hidden ${cardBg} shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 transition-transform hover:-translate-y-1 duration-300`}
          >
            {/* Added a wrapper div here to provide padding ONLY around the image */}
            <div className="w-full p-3 md:p-4 pb-0 shrink-0">
              <div className="w-full aspect-[16/9] overflow-hidden bg-gray-200 relative rounded-2xl md:rounded-[1.25rem]">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text Info Container */}
            <div className="flex flex-col flex-grow p-6 md:p-8 pt-6">
              {video.cardSubtitle && (
                <span className="text-xs font-bold uppercase tracking-wider mb-2 font-manrope text-[#35AB57]">
                  {video.cardSubtitle}
                </span>
              )}
              {/* Card Title */}
              <h3 className={`font-clash text-2xl md:text-[28px] font-medium leading-[1.2] tracking-tight ${textColor} mb-8`}>
                {video.title}
              </h3>
              
              {/* Spacer if no subtitle to keep bottoms aligned */}
              {!video.cardSubtitle && <div className="mb-4"></div>}
              
              {/* Bottom Row */}
              <div className="mt-auto flex items-center justify-between">
                <p className={`text-sm font-medium font-manrope ${metaColor}`}>
                  {video.timeAgo}
                </p>
                
                <div className="px-4 py-1.5 rounded-full border border-dashed flex items-center gap-2 transition-colors border-[#1A1A1A]/40 text-[#1A1A1A] group-hover:border-[#1A1A1A] group-hover:bg-black/5">
                  <span className="text-xs md:text-sm font-medium font-manrope">Watch</span>
                  <div className="flex items-center justify-center w-[14px] h-[14px] rounded-full border border-[#1A1A1A]">
                    <div className="w-[4px] h-[4px] rounded-full bg-[#1A1A1A]"></div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}