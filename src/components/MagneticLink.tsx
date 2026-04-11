import { useEffect, useRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import gsap from 'gsap';

// Extend standard anchor attributes so it accepts href, target, rel, etc.
interface MagneticProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const MagneticLink = ({ children, className = "", ...props }: MagneticProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!linkRef.current) return;
    
    const xTo = gsap.quickTo(linkRef.current, "x", { duration: 0.6, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(linkRef.current, "y", { duration: 0.6, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = linkRef.current!.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const el = linkRef.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    // Change the wrapper to an <a> tag and spread the remaining props
    <a ref={linkRef} className={`cursor-pointer inline-block ${className}`} {...props}>
      {children}
    </a>
  );
};

export default MagneticLink;