import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Stat {
  number: string;
  label: string;
}

interface RotatingStatsProps {
  stats: Stat[];
}

export default function RotatingStats({ stats }: RotatingStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref array for the stat containers
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  // Reset the array on every render to prevent duplicates
  statsRef.current = [];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // A master timeline that loops infinitely
      const statsTl = gsap.timeline({ repeat: -1 });

      statsRef.current.forEach((stat) => {
        if (!stat) return;
        
        // 1. ENTRY: Start invisible and shifted 50px to the right (X-axis), slide to center
        statsTl.fromTo(stat,
          { opacity: 0, x: 50, y: 0 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
        )
        // 2. HOLD & EXIT: Wait for 1.8 seconds, then fade out while sliding 50px UP (Y-axis)
        .to(stat, {
          opacity: 0, 
          y: -50, 
          duration: 0.6, 
          ease: "power3.in",
        }, "+=1.8"); 
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stats]); 

  return (
    <div ref={containerRef} className="w-full relative h-[150px] md:h-[220px] flex justify-center">
      {stats.map((stat, i) => (
        <div 
          key={i}
          ref={(el) => {
            if (el) statsRef.current.push(el);
          }}
          // Stacked absolutely, starting completely transparent
          className="absolute inset-0 flex flex-col items-center justify-end opacity-0 pointer-events-none"
        >
          <h1 className="font-clash font-bold text-[80px] md:text-[140px] leading-[0.85] tracking-tighter text-[#1A1A1A] mb-4">
            {stat.number}
          </h1>
          <p className="font-manrope font-medium text-xl md:text-2xl text-[#35AB57]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}