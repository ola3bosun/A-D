import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../assets/images/Dev assets/1 (1).jpg';
import img2 from '../assets/images/Dev assets/1 (2).jpg';
import img3 from '../assets/images/Dev assets/1 (3).jpg';
import img4 from '../assets/images/Dev assets/1 (4).jpg';
import img5 from '../assets/images/Dev assets/1 (5).jpg';
import img6 from '../assets/images/Dev assets/1 (6).jpg';
import img7 from '../assets/images/Dev assets/1 (7).jpg';
import img8 from '../assets/images/Dev assets/1 (8).jpg'; 

gsap.registerPlugin(ScrollTrigger);

const sequence = [img1, img2, img3, img4, img5, img6, img7, img8];
const leftTrackImages = [...sequence, ...sequence];
const reversedSequence = [...sequence].reverse();
const rightTrackImages = [...reversedSequence, ...reversedSequence];

export default function AprokoHero() {
  const leftTrackRef = useRef<HTMLDivElement>(null);
  const rightTrackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const leftImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const rightImagesRef = useRef<(HTMLImageElement | null)[]>([]);

  leftImagesRef.current = [];
  rightImagesRef.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wheelTl = gsap.timeline({ repeat: -1 });

      wheelTl.to(leftTrackRef.current, {
        yPercent: -50,
        ease: "none",
        duration: 20
      }, 0); 

      wheelTl.fromTo(rightTrackRef.current, 
        { yPercent: -50 },
        { yPercent: 0, ease: "none", duration: 20 },
      0); 

      let scrollTimeout: ReturnType<typeof setTimeout>;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", 
        end: "+=50%", 
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity()); 
          let targetTimeScale = 1 + (velocity / 200); 
          targetTimeScale = gsap.utils.clamp(1, 6, targetTimeScale);

          gsap.to(wheelTl, {
            timeScale: targetTimeScale, 
            duration: 0.2, 
            overwrite: true,
          });

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            gsap.to(wheelTl, {
              timeScale: 1, 
              duration: 1,  
              ease: "power2.out",
              overwrite: true
            });
          }, 150);
        }
      });

      const updateCurves = () => {
        const windowHeight = window.innerHeight;
        const centerY = windowHeight / 2;
        const curveIntensity = 15; 
        const maxRotation = 9.5; 

        leftImagesRef.current.forEach((img) => {
          if (!img) return;
          const rect = img.getBoundingClientRect();
          const imgCenterY = rect.top + rect.height / 2;
          const ratio = (imgCenterY - centerY) / centerY; 
          const sineEase = Math.sin(ratio * (Math.PI / 2)); 
          const xOffset = (ratio * ratio * curveIntensity); 
          const rotation = -(sineEase * maxRotation);
          
          gsap.set(img, { x: xOffset, rotation: rotation, scale: 1.02 });
        });

        rightImagesRef.current.forEach((img) => {
          if (!img) return;
          const rect = img.getBoundingClientRect();
          const imgCenterY = rect.top + rect.height / 2;
          const ratio = (imgCenterY - centerY) / centerY; 
          const sineEase = Math.sin(ratio * (Math.PI / 2));
          const xOffset = -(ratio * ratio * curveIntensity); 
          const rotation = (sineEase * maxRotation); 
          
          gsap.set(img, { x: xOffset, rotation: rotation, scale: 1.02 });
        });
      };

      gsap.ticker.add(updateCurves);

      return () => {
        gsap.ticker.remove(updateCurves);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sticky top-0 h-[100svh] w-full bg-[#F5F3E9A3] overflow-hidden flex items-center justify-center z-0">
      
      {/* LEFT TRACK */}
      <div className="absolute left-0 top-0 w-[16%] xl:w-[18%] max-w-[200px] flex flex-col gap-6 pb-6 opacity-90" ref={leftTrackRef}>
        {leftTrackImages.map((src, i) => (
          <img 
            key={`left-${i}`} 
            ref={(el) => { leftImagesRef.current.push(el); }}
            src={src} 
            alt="Aproko snippet" 
            className="w-full rounded-2xl object-cover shadow-lg origin-center will-change-transform" 
          />
        ))}
      </div>

      {/* CENTER CONTENT */}
      {/* FIX 1: Widened container to max-w-4xl and added a custom layout safety width (w-[64vw])
         to guarantee the text block scales inward before hitting the side columns.
      */}
      <div className="z-10 text-center flex flex-col items-center w-[64vw] max-w-4xl px-4 select-none">
        {/* FIX 2: Implemented Fluid Typography via Tailwind arbitrary values.
           text-[clamp(36px,4vw,60px)] calculates a font scale that stays fluidly responsive
           between 36px and 60px depending on layout widths. Added whitespace-nowrap safely.
        */}
        <h1 className="font-clash text-[#373737] text-[clamp(36px,4.2vw,60px)] leading-[115%] tracking-[-0.03em] text-center font-medium whitespace-nowrap font-semibold">
          Your Doctor Friend Has Gist <span className="text-[1.05em]">👀</span>
        </h1>
        
        {/* FIX 3: Balanced fluid type scale for subtitle matching layout hierarchy */}
        <p className="font-mont font-normal italic text-[clamp(24px,2.8vw,40px)] text-[#35AB57] leading-[120%] text-center pb-4 mt-2 whitespace-nowrap">
          — And It Could Save Your Life
        </p>

        <p className="text-[#474747] mb-8 text-sm md:text-base lg:text-lg font-manrope max-w-xl leading-relaxed">
          Real health advice. No big grammar. No long queue. Just clear, honest information that keeps you and your people well.
        </p>

        <div className="flex gap-4 font-clash">
           <button className="px-6 md:px-8 py-3 bg-[#35AB57] text-[#F5F3E9] rounded-lg font-medium hover:bg-green-600 transition-colors shadow-md text-sm md:text-base">
             Let's Talk Health
           </button>
           <button className="px-6 md:px-8 py-3 bg-[#F5F3E9] border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm md:text-base">
             Discover awadoc
           </button>
        </div>

        <span className="font-clash font-normal text-[20px] md:text-[24px] leading-relaxed absolute bottom-12 left-1/2 transform -translate-x-1/2">
          Scroll !
        </span>

        <div className='bg-gradient-to-b from-transparent to-[#FAFAF8]/70 absolute bottom-0 left-0 w-full h-24 pointer-events-none'></div>
      </div>

      {/* RIGHT TRACK */}
      <div className="absolute right-0 top-0 w-[16%] xl:w-[18%] max-w-[200px] flex flex-col gap-6 pb-6 opacity-90" ref={rightTrackRef}>
        {rightTrackImages.map((src, i) => (
           <img 
             key={`right-${i}`} 
             ref={(el) => { rightImagesRef.current.push(el); }}
             src={src} 
             alt="Aproko snippet" 
             className="w-full rounded-2xl object-cover shadow-lg origin-center will-change-transform" 
           />
        ))}
      </div>

    </section>
  );
}