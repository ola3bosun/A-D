import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. Import your isolated component
import RotatingStats from './RotatingStats';

// 2. IMPORT YOUR SVGs
import gatesLogo from '../assets/images/Dev assets/bill gates.svg';
import whoLogo from '../assets/images/Dev assets/who.svg';
import unicefLogo from '../assets/images/Dev assets/unicef.svg';
import tedxLogo from '../assets/images/Dev assets/TEDX.svg';
import newsCentralLogo from '../assets/images/Dev assets/news central.svg';
import ariseLogo from '../assets/images/Dev assets/Arise.svg';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ARRAYS ---
const partnerLogos = [
  { name: "Gates Foundation", src: gatesLogo },
  { name: "WHO", src: whoLogo },
  { name: "UNICEF", src: unicefLogo },
  { name: "TEDx", src: tedxLogo },
  { name: "News Central", src: newsCentralLogo }, 
  { name: "Arise News", src: ariseLogo }, 
];

const marqueeLogos = [...partnerLogos, ...partnerLogos];

const scrubText = "Through digital platforms, speaking engagements, and health-tech innovation, Aproko Doctor has built a movement around accessible healthcare. The numbers speak for themselves.";

// This array gets passed directly into the new component
const rotatingStatsData = [
  { number: "10M+", label: "Social media followers" },
  { number: "50M+", label: "Lives reached annually" },
  { number: "100+", label: "Media features globally" },
];

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  charsRef.current = [];

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // --- 1. INFINITE MARQUEE ---
      gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20, 
        repeat: -1
      });

      // --- 2. PINNED CHARACTER-LEVEL TEXT REVEAL ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", 
          end: "+=150%", 
          pin: true,        
          scrub: 0.5, 
        }
      });

      tl.to(charsRef.current, {
        color: '#1A1A1A',
        stagger: 0.1,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-[100svh] bg-[#F5F3E9] flex flex-col pt-12 md:pt-20 overflow-hidden relative">
      
      {/* --- TOP BAR: Marquee + Recognized By --- */}
      <div className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 shrink-0">
        
        <div className="flex-1 w-full overflow-hidden mask-linear-fade">
          <div ref={marqueeTrackRef} className="flex items-center gap-12 md:gap-20 w-max">
            {marqueeLogos.map((logo, i) => (
              <div 
                key={i} 
                className="h-8 md:h-10 flex items-center justify-center shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="h-full w-auto object-contain" 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[350px] shrink-0 text-left md:text-right">
          <h3 className="font-clash font-medium text-xl md:text-2xl text-[#1A1A1A] mb-2">
            Recognized By
          </h3>
          <p className="text-gray-500 font-manrope text-sm md:text-xs font-medium leading-relaxed max-w-[280px] ml-auto">
            Championing health literacy and accessible medical education across Africa and the global stage.
          </p>
        </div>

      </div>

      {/* --- MIDDLE: Impact Heading & Animated Text --- */}
      <div className="flex-1 w-full px-6 md:px-12 max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-24">
        
        <div className="max-w-xl">
          <p className="text-gray-400 text-sm font-medium mb-4 tracking-wide">
            Impact
          </p>
          <h2 className="font-clash font-medium text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-[#1A1A1A]">
            Reaching <span className="text-[#35AB57]">millions</span> across Africa and beyond
          </h2>
        </div>

        <div className="max-w-lg mt-auto md:mb-12">
          <p className="font-manrope text-lg md:text-2xl leading-relaxed text-right">
            {scrubText.split(" ").map((word, wIndex) => (
              <span key={wIndex} className="inline-block mr-[0.25em]">
                {word.split("").map((char, cIndex) => (
                  <span 
                    key={cIndex}
                    ref={(el) => {
                      if (el) charsRef.current.push(el);
                    }}
                    className="text-[#C4C4C4]"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>

      </div>

      {/* --- BOTTOM: Rotating Stats Component --- */}
      <div className="w-full pb-12 md:pb-20 mt-auto shrink-0">
        <RotatingStats stats={rotatingStatsData} />
      </div>

    </section>
  );
}