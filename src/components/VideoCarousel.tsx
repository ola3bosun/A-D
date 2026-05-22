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

  const cardBg = 'bg-[#FFFBEA]'; 
  const textColor = 'text-[#1A1A1A]';

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

      setTimeout(() => ScrollTrigger.refresh(), 100);

    }, sectionRef);

    return () => ctx.revert();
  }, [videos, sectionRef]);

  return (
    <div className="relative w-full pl-6 md:pl-12 mt-8 md:mt-12">
      <div 
        ref={trackRef} 
        className="flex flex-nowrap items-start gap-6 md:gap-8 w-max will-change-transform px-6 md:px-12 pb-8"
      >
        {videos.map((video) => {
          const isPodcast = !!video.cardSubtitle;

          // Context Styles: Podcasts = Yellow, Videos = Brand Green
          const hoverClasses = isPodcast
            ? 'hover:bg-[rgba(252,200,29,1)] hover:border-[rgba(252,200,29,1)] '
            : 'hover:bg-[#35AB57] hover:border-[#35AB57] ';

          const hoverTextClasses = isPodcast
            ? 'group-hover:text-[#1A1A1A]'
            : 'group-hover:text-[#1A1A1A]';

          const hoverMetaClasses = isPodcast
            ? 'group-hover:text-[#1a1a1a]'
            : 'group-hover:text-[#1a1a1a]';

          const hoverPillClasses = isPodcast
            ? 'group-hover:border-solid group-hover:border-[#1A1A1A] group-hover:bg-black/5'
            : 'group-hover:border-solid group-hover:border-white group-hover:bg-white/10';

          return (
            <a 
              key={video.id} 
              href={video.href}
              className={`group flex flex-col shrink-0 w-[85vw] md:w-[35vw] max-w-[480px] cursor-pointer rounded-[2rem] overflow-hidden ${cardBg} shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl ${hoverClasses}`}
            >
              {/* Thumbnail */}
              <div className="w-full md:p-2 pb-0 shrink-0">
                <div className="w-full aspect-[16/9] overflow-hidden bg-gray-200 relative rounded-2xl md:rounded-[1.25rem]">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Info Block */}
              <div className="flex flex-col flex-grow p-6 md:p-8 pt-6">
                {video.cardSubtitle && (
                  <span className="text-xs font-bold uppercase tracking-wider mb-2 font-manrope text-[#35AB57] group-hover:text-[#1A1A1A]/80 transition-colors duration-300">
                    {video.cardSubtitle}
                  </span>
                )}
                
                <h3 className={`font-clash text-2xl md:text-[28px] font-medium leading-[1.2] tracking-tight ${textColor} mb-8 transition-colors duration-300 ${hoverTextClasses}`}>
                  {video.title}
                </h3>
                
                {!video.cardSubtitle && <div className="mb-4"></div>}
                
                {/* Meta Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <p className={`text-sm font-medium font-manrope text-[rgba(0,0,0,1)] transition-colors duration-300 ${hoverMetaClasses}`}>
                    {video.timeAgo}
                  </p>
                  
                  {/* Action Button Pill */}
                  <div className={`px-4 py-1.5 rounded-full border border-dashed flex items-center gap-2 transition-all duration-300 border-[#1A1A1A]/40 text-[#1A1A1A] ${hoverPillClasses}`}>
                    <span className="text-xs md:text-sm font-medium font-manrope">Watch</span>
                    <div className="flex items-center justify-center w-[14px] h-[14px] rounded-full border border-current">
                      <div className="w-[4px] h-[4px] rounded-full bg-current"></div>
                    </div>
                  </div>
                </div>

              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}