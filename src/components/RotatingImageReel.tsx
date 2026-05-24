import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// React Icons
import { FaArrowDown } from "react-icons/fa6";

// Assets
import img1 from "../assets/images/Dev assets/1 (1).jpg";
import img2 from "../assets/images/Dev assets/1 (2).jpg";
import img3 from "../assets/images/Dev assets/1 (3).jpg";
import img4 from "../assets/images/Dev assets/1 (4).jpg";
import img5 from "../assets/images/Dev assets/1 (5).jpg";
import img6 from "../assets/images/Dev assets/1 (6).jpg";
import img7 from "../assets/images/Dev assets/1 (7).jpg";
import img8 from "../assets/images/Dev assets/1 (8).jpg";

gsap.registerPlugin(ScrollTrigger);

const sequence = [img1, img2, img3, img4, img5, img6, img7, img8];
const leftTrackImages = [...sequence, ...sequence];
const reversedSequence = [...sequence].reverse();
const rightTrackImages = [...reversedSequence, ...reversedSequence];

export default function AprokoHero() {
  // We only need ONE ref to rule them all. GSAP Context handles the rest.
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const ctx = gsap.context((self) => {
      const q = self.selector;
      if (!q) return;

      // Secure DOM Queries mapping to classes
      const leftTrack = q(".left-track");
      const rightTrack = q(".right-track");
      const leftImgs = q(".left-img");
      const rightImgs = q(".right-img");
      const scrollChars = q(".scroll-char");
      const scrollArrow = q(".scroll-arrow");

      // 1. THE MASTER WHEEL TIMELINE
      const wheelTl = gsap.timeline({ repeat: -1 });

      wheelTl.to(leftTrack, { yPercent: -50, ease: "none", duration: 20 }, 0);
      wheelTl.fromTo(
        rightTrack,
        { yPercent: -50 },
        { yPercent: 0, ease: "none", duration: 20 },
        0,
      );

      // 2. SCROLL VELOCITY ENGINE
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=50%",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          let targetTimeScale = 1 + velocity / 200;
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
              overwrite: true,
            });
          }, 150);
        },
      });

      // 3. ZERO-THRASHING PHYSICS ENGINE
      const updateCurves = () => {
        const windowHeight = window.innerHeight;
        const centerY = windowHeight / 2;
        const curveIntensity = 15;
        const maxRotation = 9.5;

        // READ PHASE: Grab all coordinates at once (Prevents Layout Thrashing)
        type ImgData = { img: HTMLElement; imgCenterY: number };

        const leftData: ImgData[] = Array.from(leftImgs as Iterable<HTMLElement>).map((img) => {
          const rect = img.getBoundingClientRect();
          return { img, imgCenterY: rect.top + rect.height / 2 };
        });

        const rightData: ImgData[] = Array.from(rightImgs as Iterable<HTMLElement>).map((img) => {
          const rect = img.getBoundingClientRect();
          return { img, imgCenterY: rect.top + rect.height / 2 };
        });

        // WRITE PHASE: Apply all GSAP transforms at once
        leftData.forEach(({ img, imgCenterY }) => {
          const ratio = (imgCenterY - centerY) / centerY;
          const sineEase = Math.sin(ratio * (Math.PI / 2));
          const xOffset = ratio * ratio * curveIntensity;
          const rotation = -(sineEase * maxRotation);
          gsap.set(img, { x: xOffset, rotation: rotation, scale: 1.02 });
        });

        rightData.forEach(({ img, imgCenterY }) => {
          const ratio = (imgCenterY - centerY) / centerY;
          const sineEase = Math.sin(ratio * (Math.PI / 2));
          const xOffset = -(ratio * ratio * curveIntensity);
          const rotation = sineEase * maxRotation;
          gsap.set(img, { x: xOffset, rotation: rotation, scale: 1.02 });
        });
      };

      gsap.ticker.add(updateCurves);

      // 4. SPLIT-TEXT & ARROW ENTRANCE ANIMATION
      gsap.to(scrollChars, {
        x: (index) => (index - 2.5) * 100, // Spreads letters left and right from the center
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300px",
          scrub: true,
        },
      });

      gsap.fromTo(scrollArrow,
      { yPercent: -50 },
      { yPercent: 100, repeat: -1, duration: 1.2, ease: "power3.inOut", delay: 1 });

      // Cleanup Ticker on Context Revert
      return () => gsap.ticker.remove(updateCurves);
    }, sectionRef);

    // MASTER CLEANUP: Plugs the Memory Leak
    return () => {
      clearTimeout(scrollTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 h-[100svh] w-full bg-[#F5F3E9A3] overflow-hidden flex items-center justify-center z-0"
    >
      {/* LEFT TRACK */}
      <div className="left-track absolute left-0 top-0 w-[16%] xl:w-[18%] max-w-[200px] flex flex-col gap-6 pb-6 opacity-90">
        {leftTrackImages.map((src, i) => (
          <img
            key={`left-${i}`}
            src={src}
            alt="Aproko snippet"
            className="left-img w-full rounded-2xl object-cover shadow-lg origin-center will-change-transform"
          />
        ))}
      </div>

      {/* CENTER CONTENT */}
      <div className="z-10 text-center flex flex-col items-center w-[64vw] max-w-4xl px-4 select-none">
        {/* Typo fixed: proper spacing on tracking-[-0.025em] text-center */}
        <h1 className="font-clash text-[#373737] text-[clamp(36px,4.2vw,60px)] leading-[115%] tracking-[-0.025em] text-center whitespace-nowrap font-medium">
          Your Doctor Friend Has Gist <span className="text-[1.05em]">👀</span>
        </h1>

        <p className="font-mont italic text-[clamp(24px,2.8vw,40px)] text-[#35AB57] leading-[120%] tracking-[-0.025em] text-center pb-4 mt-2 font-Regular whitespace-nowrap">
          — And It Could Save Your Life
        </p>

        <p className="text-[#474747] mb-8 text-sm md:text-base lg:text-lg font-manrope max-w-xl leading-relaxed tracking-[-3.5%]">
          Real health advice. No big grammar. No long queue. Just clear, honest
          information that keeps you and your people well.
        </p>

        <div className="flex gap-4 font-clash">
          <button className="px-6 md:px-8 py-3 bg-[#35AB57] text-[#F5F3E9] rounded-lg font-medium hover:bg-green-600 transition-colors shadow-md text-sm md:text-base">
            Let's Talk Health
          </button>
          <button className="px-6 md:px-8 py-3 bg-[#F5F3E9] border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm md:text-base">
            Discover awadoc
          </button>
        </div>

        {/* NATIVE SPLIT-TEXT & BOUNCING ARROW BLOCK */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="flex font-clash font-medium text-[20px] md:text-[24px] text-[#1A1A1A]">
            {"Scroll".split("").map((char, index) => (
              <span
                key={index}
                className="scroll-char inline-block will-change-transform"
              >
                {char}
              </span>
            ))}
          </div>
          <FaArrowDown className="scroll-arrow text-xl text-[#35AB57] will-change-transform" />
        </div>

        {/* Gradient Blur Base */}
        <div className="bg-gradient-to-b from-transparent to-[#FAFAF8]/70 absolute bottom-0 left-0 w-full h-24 pointer-events-none"></div>
      </div>

      {/* RIGHT TRACK */}
      <div className="right-track absolute right-0 top-0 w-[16%] xl:w-[18%] max-w-[200px] flex flex-col gap-6 pb-6 opacity-90">
        {rightTrackImages.map((src, i) => (
          <img
            key={`right-${i}`}
            src={src}
            alt="Aproko snippet"
            className="right-img w-full rounded-2xl object-cover shadow-lg origin-center will-change-transform"
          />
        ))}
      </div>
    </section>
  );
}
