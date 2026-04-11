import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const baseImages = [
  "https://picsum.photos/400/500?grayscale&random=1",
  "https://picsum.photos/400/500?grayscale&random=2",
  "https://picsum.photos/400/500?grayscale&random=3",
  "https://picsum.photos/400/500?grayscale&random=4",
  "https://picsum.photos/400/500?grayscale&random=5",
  "https://picsum.photos/400/500?grayscale&random=6",
//   "https://picsum.photos/400/500?grayscale&random=7",
//   "https://picsum.photos/400/500?grayscale&random=8",
];

const halfOne = [...baseImages, ...baseImages];
const loopedImages = [...halfOne, ...halfOne];

export default function AprokoHero() {
  const leftTrackRef = useRef<HTMLDivElement>(null);
  const rightTrackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const leftImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const rightImagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // THE MASTER TIMELINE
      // This guarantees both tracks are mathematically locked to the same render tick
      const wheelTl = gsap.timeline({ repeat: -1 });

      wheelTl.to(leftTrackRef.current, {
        yPercent: -50,
        ease: "none",
        duration: 20
      }, 0); // The '0' forces this to start at exactly 0.000s

      wheelTl.fromTo(rightTrackRef.current, 
        { yPercent: -50 },
        { yPercent: 0, ease: "none", duration: 20 },
      0); // Also starts at exactly 0.000s

      // Velocity Speed Control with PINNING
      let scrollTimeout: ReturnType<typeof setTimeout>;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", 
        end: "+=100%", 
        pin: true,
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const targetTimeScale = 1 + velocity / 150; 

          // We now accelerate the entire Master Timeline at once
          gsap.to(wheelTl, {
            timeScale: Math.min(targetTimeScale, 8), 
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
          }, 200);
        }
      });

      // 3. THE CURVE PHYSICS ENGINE (Unchanged, works perfectly)
      const updateCurves = () => {
        const windowHeight = window.innerHeight;
        const centerY = windowHeight / 2;
        
        const curveIntensity = 25; 
        const rotationIntensity = 12; 

        leftImagesRef.current.forEach((img) => {
          if (!img) return;
          const rect = img.getBoundingClientRect();
          const imgCenterY = rect.top + rect.height / 2;
          const ratio = (imgCenterY - centerY) / centerY; 
          
          const xOffset = (ratio * ratio * curveIntensity); 
          const rotation = - (ratio * rotationIntensity);
          gsap.set(img, { x: xOffset, rotation: rotation });
        });

        rightImagesRef.current.forEach((img) => {
          if (!img) return;
          const rect = img.getBoundingClientRect();
          const imgCenterY = rect.top + rect.height / 2;
          const ratio = (imgCenterY - centerY) / centerY; 
          
          const xOffset = - (ratio * ratio * curveIntensity); 
          const rotation = (ratio * rotationIntensity); 
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
      
      <div className="absolute left-0 md:left-8 top-0 w-[18%] max-w-[200px] flex flex-col gap-6 pb-6 opacity-90" ref={leftTrackRef}>
        {loopedImages.map((src, i) => (
          <img 
            key={`left-${i}`} 
            ref={(el) => { leftImagesRef.current[i] = el; }}
            src={src} 
            alt="Aproko snippet" 
            className="w-full rounded-2xl object-cover shadow-lg origin-center will-change-transform" 
          />
        ))}
      </div>

      <div className="z-10 text-center flex flex-col items-center w-full max-w-2xl px-4">
        <h1 className="font-clash text-[#373737] text-[60px] leading-[120%] tracking-[-0.025em] text-center">
          Your Doctor Friend Has Gist <span className="text-[60px]">👀</span>
        </h1>
        <p className="font-mont font-normal italic text-[40px] text-[#35AB57] leading-[120%] text-center pb-[16px]">
          — And It Could Save Your Life
        </p>
        <p className="text-[#474747] mb-8 text-lg" font-manrope>
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

      <div className="absolute right-0 md:right-8 top-0 w-[18%] max-w-[200px] flex flex-col gap-6 pb-6 opacity-90" ref={rightTrackRef}>
        {loopedImages.map((src, i) => (
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