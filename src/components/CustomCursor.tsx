import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("Play");

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!cursorRef.current || !textRef.current) return;

      // INITIAL STATE: Solid yellow, transparent border, text hidden
      gsap.set(cursorRef.current, {
        xPercent: -50,
        yPercent: -50,
        width: 12,
        height: 12,
        backgroundColor: "#FCC81D",
        borderColor: "transparent",
        borderWidth: "1.5px", // FIXED: Set thickness permanently
        borderStyle: "solid", // FIXED: Set style permanently
      });
      gsap.set(textRef.current, { opacity: 0, scale: 0 });

      const xTo = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.15,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.15,
        ease: "power3.out",
      });

      const moveCursor = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        // 1. Check for Text Override (The Bubble Hover)
        const textElement = target.closest("[data-cursor-text]") as HTMLElement;

        if (textElement) {
          const text = textElement.getAttribute("data-cursor-text") || "";
          setCursorText(text);

          gsap.to(cursorRef.current, {
            width: 50,
            height: 50,
            backgroundColor: "#FCC81D",
            borderColor: "transparent",
            duration: 0.4,
            ease: "expo.out",
            overwrite: "auto",
          });

          gsap.to(textRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            delay: 0.05,
            ease: "back.out(1.7)",
            overwrite: "auto",
          });
          return;
        }

        // Standard Interaction (The Target Ring)
        const isHoverable =
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".cursor-pointer") ||
          window.getComputedStyle(target).cursor === "pointer";

        if (isHoverable) {
          gsap.to(textRef.current, {
            opacity: 0,
            scale: 0,
            duration: 0.1,
            overwrite: "auto",
          });

          // Expand to 20px and hollow out
          gsap.to(cursorRef.current, {
            width: 20,
            height: 20,
            backgroundColor: "transparent",
            borderColor: "#FCC81D",
            duration: 0.3,
            ease: "back.out(1.5)",
            overwrite: "auto",
          });
        } else {
          // Snap back to resting state
          gsap.to(textRef.current, {
            opacity: 0,
            duration: 0.1,
            scale: 0,
            overwrite: "auto",
          });

          gsap.to(cursorRef.current, {
            width: 12,
            height: 12,
            backgroundColor: "#FCC81D",
            borderColor: "transparent",
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", handleMouseOver);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mouseover", handleMouseOver);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cursorRef}
      // Added flex/center utilities so the text sits perfectly in the middle
      className="fixed top-0 left-0 flex items-center justify-center w-3 h-3 rounded-full pointer-events-none z-[9999] shadow-sm"
      style={{ willChange: "transform, background-color, border-color" }}
    >
      <span
        ref={textRef}
        className="font-clash font-semibold text-[#1A1A1A] text-[12px] tracking-wide whitespace-nowrap uppercase"
        style={{ willChange: "transform, opacity" }}
      >
        {cursorText}
      </span>
    </div>
  );
}
