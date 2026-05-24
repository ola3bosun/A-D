import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import glass from '../assets/images/Dev assets/w glass of water.png';

interface PreloaderProps {
  imageUrls: string[]; 
  onComplete: () => void;
}

export default function Preloader({ imageUrls, onComplete }: PreloaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const greenLayerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const loadingGroupRef = useRef<HTMLDivElement>(null);

  // 1. ASSET TRACKING & COUNTER
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    // Fallback if no images are passed
    if (totalImages === 0) { 
      setIsLoaded(true); 
      return; 
    }

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      
      const update = () => {
        loadedCount++;
        const currentProgress = Math.floor((loadedCount / totalImages) * 100);
        
        // GSAP automatically tweens the number text smoothly
        if (counterRef.current) {
          gsap.to(counterRef.current, {
            innerText: currentProgress,
            duration: 0.4,
            snap: { innerText: 1 }, 
            ease: "power2.out"
          });
        }

        if (loadedCount === totalImages) setIsLoaded(true);
      };
      
      img.onload = update;
      img.onerror = update; // Proceed even if an image fails to load
    });
  }, [imageUrls]);

  // 2. THE CHOREOGRAPHY TIMELINE (Matched exactly to Jitter sequence)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // INITIAL HIDDEN STATES
      gsap.set([glassRef.current, loadingGroupRef.current], { y: 40, opacity: 0 });
      gsap.set(greenLayerRef.current, { yPercent: 100, clipPath: "inset(0%)" });
      gsap.set(textRef.current, { opacity: 0, y: 30 });

      // PHASE 1: THE ENTRY BOUNCE (Fires on mount)
      gsap.to([glassRef.current, loadingGroupRef.current], {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: "back.out(1.5)"
      });

      // PHASE 2: THE REVEAL SEQUENCE (Fires at 100%)
      if (isLoaded) {
        tl.to({}, { duration: 0.3 }) // Let 100% visually rest for a split second

          // 1. The Full-Screen Green Sweep Up
          .to(greenLayerRef.current, {
            yPercent: 0,
            duration: 0.8,
            ease: "expo.inOut"
          })

          // 2. The Mechanical Inset & Text Pop
          .to(greenLayerRef.current, {
            clipPath: "inset(5%)", // Shrinks the green background to reveal the beige border
            duration: 0.7,
            ease: "power4.out"
          })
          .to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.5)"
          }, "-=0.5")

          // 3. Reading Hold
          .to({}, { duration: 1.2 }) 

          // 4. Text Exits & Frame Restores Full Screen
          .to(textRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in"
          })
          .to(greenLayerRef.current, {
            clipPath: "inset(0%)",
            duration: 0.5,
            ease: "power4.inOut"
          }, "-=0.2")

          // 5. Final Curtain Sweep Up to reveal the actual website
          .to(greenLayerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "expo.inOut"
          })
          .to(containerRef.current, {
            autoAlpha: 0, // Fades out the preloader container cleanly
            duration: 0.2,
            onComplete 
          }, "-=0.4");

        tl.play();
      }
    });

    return () => ctx.revert();
  }, [isLoaded, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] overflow-hidden bg-[#F5F3E9]">
      
      {/* --- LAYER 1: THE BASE (Beige Background) --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        
        {/* Top Block: Glass & Loading Numbers */}
        <div className="flex items-center gap-6 md:gap-10 translate-y-6">
          <div ref={glassRef}>
            <img src={glass} alt="Glass of water" className="w-20 md:w-28 object-contain drop-shadow-sm scale-250" />
          </div>
          
          <div ref={loadingGroupRef} className="flex flex-col items-start justify-center">
            {/* The Percentage Stack */}
            <div className="flex items-baseline gap-1 leading-none">
              <span 
                ref={counterRef} 
                className="font-clash font-semibold text-[64px] md:text-[80px] text-[#35AB57] tabular-nums tracking-tighter leading-none"
              >
                0
              </span>
              <span className="font-clash font-semibold text-3xl md:text-5xl text-[#35AB57] leading-none">
                %
              </span>
            </div>
            {/* The Loading Label */}
            <span className="font-clash text-2xl md:text-[32px] text-[#1A1A1A] font-medium leading-none mt-2">
              Loading
            </span>
          </div>
        </div>


      </div>

      {/* --- LAYER 2: THE GREEN CURTAIN --- */}
      <div 
        ref={greenLayerRef} 
        className="absolute inset-0 w-full h-full bg-[#35AB57] z-20 flex items-center justify-center will-change-transform"
      >
        <h2 
          ref={textRef} 
          className="font-clash text-[#F5F3E9] text-5xl md:text-7xl font-medium tracking-tight will-change-transform"
        >
          Drink water!
        </h2>
      </div>

    </div>
  );
}