import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoCarousel, { type VideoItem } from './VideoCarousel';

gsap.registerPlugin(ScrollTrigger);

interface ResourcesSectionProps {
  subtitle: string;
  title: string;
  videos: VideoItem[];
  theme?: 'yellow' | 'green';
  viewMoreHref?: string;
}

export default function ResourcesSection({ 
  subtitle, 
  title, 
  videos, 
  theme = 'yellow',
  viewMoreHref = "#" 
}: ResourcesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%", 
        }
      });

      tl.fromTo('.reveal-text', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      )
      .fromTo('.carousel-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.5" 
      )
      .fromTo('.reveal-controls',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full flex flex-col bg-[#F5F3E9] py-12 md:py-20">
      <div className="max-w-[100vw] mx-auto px-6 md:px-12 flex flex-col">
        
        <div className="mb-4 md:mb-8">
          <p className="reveal-text text-[#21212180] text-manrope md:text-base font-semibold mb-3 tracking-wide">
            {subtitle}
          </p>
          <h2 className="reveal-text font-clash font-medium text-[64px] leading-[1.05] tracking-[-0.025em] whitespace-pre-line text-[#1A1A1A]">
            {title}
          </h2>
        </div>

        <VideoCarousel videos={videos} viewMoreHref={viewMoreHref} theme={theme} />

      </div>
    </div>
  );
}