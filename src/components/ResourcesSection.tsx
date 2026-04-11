import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoCarousel, { type VideoItem } from './VideoCarousel';

gsap.registerPlugin(ScrollTrigger);

// Mock data (You can move this to a separate data file later)
const latestVideos: VideoItem[] = [
  {
    id: 1,
    thumbnail: "https://picsum.photos/600/400?random=1",
    title: "What they don't tell you about BBL!",
    timeAgo: "11 days ago",
    href: "#"
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/600/400?random=2",
    title: "How to Lose Belly Fat!",
    timeAgo: "4 months ago",
    href: "#"
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/600/400?random=3",
    title: "How to grow your hairline fast",
    timeAgo: "6 months ago",
    href: "#"
  },
  {
    id: 4,
    thumbnail: "https://picsum.photos/600/400?random=4",
    title: "The hidden dangers of energy drinks",
    timeAgo: "8 months ago",
    href: "#"
  },
  {
    id: 5,
    thumbnail: "https://picsum.photos/600/400?random=5",
    title: "The truth about detox teas",
    timeAgo: "1 year ago",
    href: "#"
  }
];

export default function ResourcesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", 
        }
      });

      // 1. Reveal Header Text
      tl.fromTo('.reveal-text', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      )
      // 2. Cascade the Carousel Cards (Found inside the imported VideoCarousel)
      .fromTo('.carousel-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.5" 
      )
      // 3. Fade in the bottom controls (Found inside the imported VideoCarousel)
      .fromTo('.reveal-controls',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-[800px] flex flex-col bg-[#990000] py-12 md:py-20">
      <div className="max-w-[100vw] mx-auto px-6 md:px-12 w-full flex flex-col h-full">
        
        {/*  Header  */}
        <div className="mb-8 md:mb-12 shrink-0">
          <p className="reveal-text text-[#21212180] text-manrope md:text-base font-semibold mb-3 tracking-wide">
            Resources
          </p>
          <h2 className="reveal-text font-clash font-medium text-5xl md:text-[3rem] text-[#1A1A1A] max-w-2xl leading-[1.05] tracking-tight whitespace-pre-line">
            Watch My Latest{'\n'}and Popular Videos
          </h2>
        </div>

        {/*  Imported Carousel Component  */}
        {/* The carousel dynamically absorbs the remaining height */}
        <VideoCarousel videos={latestVideos} viewMoreHref="#" />

      </div>
    </section>
  );
}