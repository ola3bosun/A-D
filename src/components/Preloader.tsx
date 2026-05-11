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

  // 1. ASSET TRACKING
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    if (totalImages === 0) { setIsLoaded(true); return; }

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      const update = () => {
        loadedCount++;
        const currentProgress = Math.floor((loadedCount / totalImages) * 100);
        
        // Use GSAP to animate the number text for a smoother "count up" feel
        if (counterRef.current) {
          gsap.to(counterRef.current, {
            innerText: currentProgress,
            duration: 0.5,
            snap: { innerText: 1 }, // Forces whole numbers
            ease: "power1.out"
          });
        }

        if (loadedCount === totalImages) setIsLoaded(true);
      };
      img.onload = update;
      img.onerror = update;
    });
  }, [imageUrls]);

  // 2. THE 10/10 BOUNCE & REVEAL TIMELINE
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // INITIAL HIDDEN STATES
      gsap.set([glassRef.current, loadingGroupRef.current], { y: 50, opacity: 0, scale: 0.9 });
      gsap.set(greenLayerRef.current, { yPercent: 100, clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(textRef.current, { opacity: 0, y: 40 });

      // PHASE 1: THE BOUNCE ENTRY
      // This happens immediately on mount
      gsap.to([glassRef.current, loadingGroupRef.current], {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.7)" // The "Premium Bounce"
      });

      // PHASE 2: THE REVEAL SEQUENCE
      // This triggers only when isLoaded is true
      if (isLoaded) {
        tl.to({}, { duration: 0.6 }) // Let the 100% sit for a beat

          // The snappy green sweep
          .to(greenLayerRef.current, {
            yPercent: 0,
            duration: 0.8,
            ease: "power4.inOut"
          })

          // The Frame Inset (The "Mechanical" look at 0:03)
          .to(greenLayerRef.current, {
            clipPath: "inset(6% 6% 6% 6%)",
            duration: 0.6,
            ease: "expo.out"
          })

          // Text Bounce In
          .to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
          }, "-=0.3")

          .to({}, { duration: 1.5 }) // Hold

          // Exit Sequence
          .to(greenLayerRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.4,
            ease: "expo.in"
          })
          .to(greenLayerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut"
          })
          .to(containerRef.current, {
            autoAlpha: 0,
            duration: 0.4,
            onComplete // Trigger the landing page reveal
          }, "-=0.4");

        tl.play();
      }
    });

    return () => ctx.revert();
  }, [isLoaded, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] overflow-hidden bg-[#F5F3E9]">
      
      {/* --- LAYER 1: THE BASE --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-center gap-6 md:gap-10">
          
          {/* Glass Image with individual ref for bounce */}
          <div ref={glassRef}>
            <img src={glass} alt="Glass" className="w-24 md:w-32 object-contain" />
          </div>
          
          {/* Loading Group */}
          <div ref={loadingGroupRef} className="flex flex-col items-start">
            <div className="flex items-baseline gap-1">
              <span 
                ref={counterRef} 
                className="font-clash font-semibold text-6xl md:text-8xl text-[#35AB57] tabular-nums tracking-tighter"
              >
                0
              </span>
              <span className="font-clash font-semibold text-4xl md:text-5xl text-[#35AB57]">%</span>
            </div>
            
            <div className="relative">
              <span className="font-clash text-2xl md:text-3xl text-[#1A1A1A] font-medium">
                Loading
              </span>
              {/* The dynamic sub-bar under 'Loading' */}
              <div className="h-[4px] bg-[#35AB57] mt-1 w-8 rounded-full" />
            </div>
          </div>
        </div>

        {/* Question Pill */}
        <div className="absolute bottom-16 md:bottom-24 px-8 py-3 rounded-full border border-[#1A1A1A]/10 bg-white/40 text-[#1A1A1A] font-manrope font-medium text-sm md:text-base">
          Have you drank water today ? 👀
        </div>
      </div>

      {/* --- LAYER 2: THE GREEN CURTAIN --- */}
      <div 
        ref={greenLayerRef} 
        className="absolute inset-0 w-full h-full bg-[#35AB57] z-20 flex items-center justify-center"
      >
        <h2 ref={textRef} className="font-clash text-[#F5F3E9] text-5xl md:text-8xl font-medium tracking-tight">
          Drink water!
        </h2>
      </div>

    </div>
  );
}