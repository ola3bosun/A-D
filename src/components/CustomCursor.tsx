import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3.out" });
    
    // scaling up when hovering over clickable items
    const scaleTo = gsap.quickTo(cursorRef.current, "scale", { duration: 0.3, ease: "back.out(1.5)" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX); 
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        scaleTo(2); // Expand by 100% when hovering over interactive elements
      } else {
        scaleTo(1);   // Return to normal
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-5 h-5 bg-[#FCC81D] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300 ease-out"
      style={{ willChange: 'transform' }}
    />
  );
}