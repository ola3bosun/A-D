import { useRef } from 'react';
import VideoCarousel, { type VideoItem } from './VideoCarousel';

interface ResourcesSectionProps {
  title: string;
  subtitle: string;
  videos: VideoItem[];
  viewMoreHref?: string;
  theme?: 'default' | 'white' | 'green'; 
}

export default function ResourcesSection({ 
  title, 
  subtitle, 
  videos, 
  viewMoreHref, 
  theme = 'default' 
}: ResourcesSectionProps) {
  
  const sectionRef = useRef<HTMLElement>(null);

  // Enforcing the single light background for everything
  const bgColor = 'bg-[#F5F3E9]';
  const textColor = 'text-[#1A1A1A]';
  const subtitleColor = 'text-gray-500';

  return (
    <section 
      ref={sectionRef} 
      className={`w-full h-[100svh] ${bgColor} flex flex-col justify-center overflow-hidden relative transition-colors duration-500 `}
    >
      {/* --- Section Header --- */}
      <div className="w-full px-6 md:px-12 flex flex-col gap-2 shrink-0 z-10 pt-12 md:pt-0">
        <p className={`${subtitleColor} text-xs md:text-sm font-medium tracking-wide font-manrope uppercase`}>
          {subtitle}
        </p>
        <h2 className={`font-clash font-medium text-[40px] md:text-[56px] leading-[1.1] tracking-tight ${textColor} whitespace-pre-line`}>
          {title}
        </h2>
      </div>

      {/* --- The Carousel Component --- */}
      <VideoCarousel 
        videos={videos} 
        theme={theme} 
        sectionRef={sectionRef} 
      />

      {/* --- View More Link (Locked to Bottom Right) --- */}
      {viewMoreHref && (
        <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-20">
          <a 
            href={viewMoreHref}
            className={`flex flex-col items-end group transition-opacity hover:opacity-70 ${textColor}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm md:text-base font-semibold font-clash tracking-wide">View More</span>
              <span className="text-lg leading-none transform transition-transform group-hover:translate-x-1">→</span>
            </div>
            {/* The thin underline */}
            <div className="h-[1px] w-full transition-all duration-300 bg-[#1A1A1A]/30 group-hover:bg-[#1A1A1A]"></div>
          </a>
        </div>
      )}
    </section>
  );
}