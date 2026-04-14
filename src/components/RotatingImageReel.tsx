import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. Safe imports for Vite
import img1 from '../assets/images/Dev assets/1 (1).jpg';
import img2 from '../assets/images/Dev assets/1 (2).jpg';
import img3 from '../assets/images/Dev assets/1 (3).jpg';
import img4 from '../assets/images/Dev assets/1 (4).jpg';
import img5 from '../assets/images/Dev assets/1 (5).jpg';
import img6 from '../assets/images/Dev assets/1 (6).jpg';
import img7 from '../assets/images/Dev assets/1 (7).jpg';
import img8 from '../assets/images/Dev assets/1 (8).jpg'; 

gsap.registerPlugin(ScrollTrigger);

// 2. THE CONVEYOR BELT ARRAYS
const sequence = [img1, img2, img3, img4, img5, img6, img7, img8];

// Left Track (Moves UP): Standard order
const leftTrackImages = [...sequence, ...sequence];

// Right Track (Moves DOWN): Reversed order to simulate the back of the belt
const reversedSequence = [...sequence].reverse();
const rightTrackImages = [...reversedSequence, ...reversedSequence];

export default function AprokoHero() {
  const leftTrackRef = useRef<HTMLDivElement>(null);
  const rightTrackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const leftImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const rightImagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // --- THE MASTER TIMELINE ---
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

      // --- VELOCITY SPEED CONTROL ---
      let scrollTimeout: ReturnType<typeof setTimeout>;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", 
        end: "+=100%", 
        pin: true,
        onUpdate: (self) => {
          // Absolute value ensures velocity only speeds up, never reverses
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

      // --- THE CURVE PHYSICS ENGINE (MATH.SIN) ---
      const updateCurves = () => {
        const windowHeight = window.innerHeight;
        const centerY = windowHeight / 2;
        
        const curveIntensity = 15; 
        const maxRotation = 9.5; // Max degrees of rotation at the edges

        leftImagesRef.current.forEach((img) => {
          if (!img) return;
          const rect = img.getBoundingClientRect();
          const imgCenterY = rect.top + rect.height / 2;
          
          // Ratio goes from -1 (top) to 0 (center) to 1 (bottom)
          const ratio = (imgCenterY - centerY) / centerY; 
          
          // Sine wave creates the organic ease-in-out curve
          const sineEase = Math.sin(ratio * (Math.PI / 2)); 
          
          const xOffset = (ratio * ratio * curveIntensity); 
          const rotation = -(sineEase * maxRotation);
          
          gsap.set(img, { x: xOffset, rotation: rotation });
        });

        rightImagesRef.current.forEach((img) => {
          if (!img) return;
          const rect = img.getBoundingClientRect();
          const imgCenterY = rect.top + rect.height / 2;
          
          const ratio = (imgCenterY - centerY) / centerY; 
          const sineEase = Math.sin(ratio * (Math.PI / 2));
          
          const xOffset = -(ratio * ratio * curveIntensity); 
          // Mirrored rotation for the right side
          const rotation = (sineEase * maxRotation); 
          
          gsap.set(img, { x: xOffset, rotation: rotation });
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
    <section ref={sectionRef} className="relative h-svh w-full bg-[#FAFAF8] overflow-hidden flex items-center justify-center">
      
      {/* LEFT TRACK */}
      <div className="absolute left-0 top-0 w-[18%] max-w-[200px] flex flex-col gap-6 pb-6 opacity-90" ref={leftTrackRef}>
        {leftTrackImages.map((src, i) => (
          <img 
            key={`left-${i}`} 
            ref={(el) => { leftImagesRef.current[i] = el; }}
            src={src} 
            alt="Aproko snippet" 
            className="w-full rounded-2xl object-cover shadow-lg origin-center will-change-transform" 
          />
        ))}
      </div>

      {/* CENTER CONTENT */}
      <div className="z-10 text-center flex flex-col items-center w-full max-w-2xl px-4">
        <h1 className="font-clash text-[#373737] text-[60px] leading-[120%] tracking-[-0.025em] text-center">
          Your Doctor Friend Has Gist <span className="text-[60px]">👀</span>
        </h1>
        <p className="font-mont font-normal italic text-[40px] text-[#35AB57] leading-[120%] text-center pb-[16px]">
          — And It Could Save Your Life
        </p>
        <p className="text-[#474747] mb-8 text-lg font-manrope">
          Real health advice. No big grammar. No long queue. Just clear, honest information that keeps you and your people well.
        </p>
        <div className="flex gap-4">
           <button className="px-8 py-3 bg-[#35AB57] text-[#F5F3E9] rounded-lg font-medium hover:bg-green-600 transition-colors shadow-md font-clash-medium">
             Let's Talk Health
           </button>
           <button className="px-8 py-3 bg-[#F5F3E9] border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm font-clash-medium">
             Discover awadoc
           </button>
        </div>
      </div>

      {/* RIGHT TRACK */}
      <div className="absolute right-0 top-0 w-[18%] max-w-[200px] flex flex-col gap-6 pb-6 opacity-90" ref={rightTrackRef}>
        {rightTrackImages.map((src, i) => (
           <img 
             key={`right-${i}`} 
             ref={(el) => { rightImagesRef.current[i] = el; }}
             src={src} 
             alt="Aproko snippet" 
             className="w-full rounded-2xl object-cover shadow-lg origin-center will-change-transform" 
           />
        ))}
      </div>

    </section>
  );
}