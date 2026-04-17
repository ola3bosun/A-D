import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

import glass from '../assets/images/Dev assets/w glass of water.png';

interface PreloaderProps {
  imageUrls: string[]; 
  onComplete: () => void;
}

export default function Preloader({ imageUrls, onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const greenSweepRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // 1. ASYNC IMAGE LOADING LOGIC
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) {
      setProgress(100);
      return;
    }

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      
      const updateProgress = () => {
        loadedCount++;
        setProgress(Math.floor((loadedCount / totalImages) * 100));
      };

      img.onload = updateProgress;
      img.onerror = updateProgress;
    });
  }, [imageUrls]);

  // 2. THE EXACT VIDEO TIMELINE
  useEffect(() => {
    if (progress !== 100) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      // Ensure start positions
      gsap.set(greenSweepRef.current, { yPercent: 100, clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(textRef.current, { opacity: 0, y: 20 });

      tl.to({}, { duration: 1.5 }) // Brief pause at 100%

        // 1. Solid Green sweeps UP to cover screen
        .to(greenSweepRef.current, {
          yPercent: 0, 
          duration: 0.6,
          ease: "power3.inOut"
        })

        // 2. Shrinks to reveal the thick cream borders (clip-path magic)
        .to(greenSweepRef.current, {
          clipPath: "inset(3% 3% 3% 3%)",
          duration: 0.6,
          ease: "power3.in"
        })

        // 3. "Drink water!" fades in
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.2")

        // 4. Hold to read
        .to({}, { duration: 1.0 })

        // 5. "Drink water!" fades out
        .to(textRef.current, { opacity: 0, y: -50, duration: 0.3 })

        // 6. Expands back out to full screen
        .to(greenSweepRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.4,
          ease: "power3.inOut"
        }, "<") // Starts at the same time as text fade out

        // 7. Green sweeps UP again to reveal your landing page
        .to(greenSweepRef.current, {
          yPercent: -100, 
          duration: 0.4,
          ease: "power3.inOut"
        })

        // 8. Fade out the whole preloader container
        .to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.4
        }, "-=0.2");
    });

    return () => ctx.revert();
  }, [progress, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-[#F5F3E9] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* --- THE ANIMATED GLASS AND LOADER --- */}
      <div className="flex items-center gap-8 relative z-10 mb-12">
        
        {/* UPDATED: Image-Based Glass Container */}
        <div className="relative w-20 h-fit md:w-24 md:h-40 flex items-end justify-center">
          

          {/* Actual Glass Image (Sits on top in z-10) */}
          <img 
            src={glass} 
            alt="Glass of water" 
            className="absolute inset-0 w-full h-full object-contain z-10 drop-shadow-sm"
          />
        </div>

        {/* Loading Text Stack */}
        <div className="flex flex-col items-start min-w-35">
          <span className="font-clash font-semibold text-5xl md:text-6xl text-[#35AB57] tabular-nums tracking-tight">
            {progress}%
          </span>
          <span className="font-clash text-2xl md:text-3xl text-[#1A1A1A] font-medium">
            Loading
          </span>
        </div>
      </div>

      {/* --- THE GREEN SWEEPING CURTAIN --- */}
      <div 
        ref={greenSweepRef}
        className="absolute inset-0 w-full h-full bg-[#35AB57] z-50 flex items-center justify-center"
      >
        <h2 
          ref={textRef}
          className="font-clash text-[#F5F3E9] text-5xl md:text-7xl font-medium tracking-tight"
        >
          Drink water!
        </h2>
      </div>
    </div>
  );
}