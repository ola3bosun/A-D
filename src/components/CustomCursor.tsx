import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wrap in gsap.context to handle React Strict Mode cleanup perfectly
    let ctx = gsap.context(() => {
      if (!cursorRef.current) return;

      // FIX: Explicitly set scale: 1 so GSAP registers the property immediately
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, scale: 1 });

      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3.out" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3.out" });
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
          scaleTo(2); 
        } else {
          scaleTo(1);  
        }
      };

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", handleMouseOver);

      // Cleanup event listeners
      return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mouseover", handleMouseOver);
      };
    });

    // Revert context on unmount to kill the quickTo tweens safely
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-5 h-5 bg-[#FCC81D] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ willChange: 'transform' }}
    />
  );
}