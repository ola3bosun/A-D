import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import RotatingStats from './RotatingStats';

// Asset Imports
import gatesLogo from '../assets/images/Dev assets/bill gates.svg';
import whoLogo from '../assets/images/Dev assets/who.svg';
import unicefLogo from '../assets/images/Dev assets/unicef.svg';
import tedxLogo from '../assets/images/Dev assets/TEDX.svg';
import newsCentralLogo from '../assets/images/Dev assets/news central.svg';
import ariseLogo from '../assets/images/Dev assets/Arise.svg';

gsap.registerPlugin(ScrollTrigger);

// DATA ARRAYS
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
      
      // INFINITE MARQUEE
      gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20, 
        repeat: -1
      });


      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", 
          end: "+=90%", 
          pin: true,        
          scrub: 0.1, 
        }
      });

      tl.to(charsRef.current, {
        color: '#212121', 
        stagger: {
          each: 0.05,
        },
        duration: 1, 
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-svh bg-[#F5F3E9] flex flex-col pt-2 md:pt-2 overflow-hidden relative">
      
      {/* --- TOP BAR: Marquee + Recognized By --- */}
      <div className="w-full md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 shrink-0">
        
        <div className="flex-1 w-full overflow-hidden mask-linear-fade">
          <div ref={marqueeTrackRef} className="flex items-center gap-12 md:gap-20 w-max">
            {marqueeLogos.map((logo, i) => (
              <div 
                key={`${logo.name}-${i}`} 
                className="h-8 md:h-10 flex items-center justify-center shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="h-full min-w-3.5 object-contain" 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[350px] shrink-0 text-left md:text-right">
          <h3 className="font-clash font-medium text-[1rem] md:text-2xl text-[#474747] mb-2">
            Recognized By
          </h3>
          <p className="text-[#8E8E8E] font-manrope text-sm md:text-xs font-medium leading-relaxed max-w-[280px] ml-auto">
            Championing health literacy and accessible medical education across Africa and the global stage.
          </p>
        </div>

      </div>

      <div className="p-8 w-full mx-auto">
        
        <div className="w-full lg:max-w-[55vw] mb-8 md:mb-12">
          <p className="text-[#8E8E8E] text-sm font-medium mb-4 tracking-wide font-manrope">
            Impact
          </p>
          <h2 className="font-clash font-medium text-[40px] md:text-[48px] leading-[1.05] tracking-[-0.04em] text-[#212121]">
            Reaching <span className="text-[#35AB57]">millions</span> across Africa and<br className="hidden md:block" /> beyond
          </h2>
        </div>

        <div className="w-full flex justify-end items-start">
          <div className="w-full lg:max-w-[55vw]">
            
            <p className="font-manrope font-medium text-[20px] md:text-[24px] leading-[150%] tracking-[-0.02em] text-left md:text-right">

              <span className="sr-only">{scrubText}</span>
              
              <span aria-hidden="true">
                {scrubText.split(" ").map((word, wIndex) => (
                  <span key={wIndex} className="inline-block mr-[0.25em]">
                    {word.split("").map((char, cIndex) => (
                      <span 
                        key={cIndex}
                        ref={(el) => {
                          if (el) charsRef.current.push(el);
                        }}
                        className="text-[#1A1A1A]/20"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </p>
            
          </div>
        </div>

      </div>

      <div className="w-full pb-12 md:pb-20 shrink-0">
        <RotatingStats stats={rotatingStatsData} />
      </div>

    </section>
  );
}