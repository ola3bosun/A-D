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

// Desktop variables
const leftTrackImages = [...sequence, ...sequence];
const reversedSequence = [...sequence].reverse();
const rightTrackImages = [...reversedSequence, ...reversedSequence];

// Mobile variables
const topTrackImages = [...sequence, ...sequence];
const bottomTrackImages = [...sequence].reverse().concat([...sequence].reverse());

export default function AprokoHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const ctx = gsap.context((self) => {
      const q = self.selector;
      if (!q) return;

      // DESKTOP ELEMENTS
      const leftTrack = q(".left-track");
      const rightTrack = q(".right-track");
      const leftImgs = q(".left-img");
      const rightImgs = q(".right-img");

      // MOBILE ELEMENTS
      const topTrack = q(".top-track");
      const bottomTrack = q(".bottom-track");

      // SHARED ELEMENTS
      const scrollChars = q(".scroll-char");
      const scrollArrow = q(".scroll-arrow");

      // 1. THE DESKTOP WHEEL TIMELINE (Vertical)
      const wheelTlDesktop = gsap.timeline({ repeat: -1 });
      wheelTlDesktop.to(leftTrack, { yPercent: -50, ease: "none", duration: 20 }, 0);
      wheelTlDesktop.fromTo(
        rightTrack,
        { yPercent: -50 },
        { yPercent: 0, ease: "none", duration: 20 },
        0,
      );

      // 2. THE MOBILE WHEEL TIMELINE (Horizontal)
      const wheelTlMobile = gsap.timeline({ repeat: -1 });
      wheelTlMobile.to(topTrack, { xPercent: -50, ease: "none", duration: 20 }, 0);
      wheelTlMobile.fromTo(
        bottomTrack,
        { xPercent: -50 },
        { xPercent: 0, ease: "none", duration: 20 },
        0,
      );

      // 3. SCROLL VELOCITY ENGINE (Controls both timelines)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=50%",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          let targetTimeScale = 1 + velocity / 200;
          targetTimeScale = gsap.utils.clamp(1, 6, targetTimeScale);

          // Speed up on scroll
          gsap.to([wheelTlDesktop, wheelTlMobile], {
            timeScale: targetTimeScale,
            duration: 0.2,
            overwrite: true,
          });

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            gsap.to([wheelTlDesktop, wheelTlMobile], {
              timeScale: 1,
              duration: 1,
              ease: "power2.out",
              overwrite: true,
            });
          }, 150);
        },
      });

      // 4. DESKTOP ZERO-THRASHING PHYSICS ENGINE (The Curve)
      const updateCurves = () => {
        // Only run curve logic if desktop layout is active (elements are visible)
        if (window.innerWidth < 768) return; 

        const windowHeight = window.innerHeight;
        const centerY = windowHeight / 2;
        const curveIntensity = 15;
        const maxRotation = 9.5;

        // READ PHASE
        type ImgData = { img: HTMLElement; imgCenterY: number };

        const leftData: ImgData[] = Array.from(leftImgs as Iterable<HTMLElement>).map((img) => {
          const rect = img.getBoundingClientRect();
          return { img, imgCenterY: rect.top + rect.height / 2 };
        });

        const rightData: ImgData[] = Array.from(rightImgs as Iterable<HTMLElement>).map((img) => {
          const rect = img.getBoundingClientRect();
          return { img, imgCenterY: rect.top + rect.height / 2 };
        });

        // WRITE PHASE
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

      // 5. SPLIT-TEXT & ARROW ENTRANCE ANIMATION
      gsap.to(scrollChars, {
        x: (index) => (index - 2.5) * 100, 
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

      // Cleanup
      return () => gsap.ticker.remove(updateCurves);
    }, sectionRef);

    return () => {
      clearTimeout(scrollTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 h-[100svh] w-full bg-[#F5F3E9] overflow-hidden flex flex-col md:flex-row items-center justify-between md:justify-center z-0 pt-24 md:pt-0 pb-4 md:pb-0"
    >
      {/* DESKTOP LEFT TRACK */}
      <div className="left-track absolute left-0 top-0 w-[16%] xl:w-[18%] max-w-[200px] hidden md:flex flex-col gap-6 pb-6 opacity-90">
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
      <div className="z-10 text-center flex-1 flex flex-col justify-center items-center w-full md:w-[64vw] max-w-4xl px-4 select-none pb-8 md:pb-0 mt-8 md:mt-0">
        <h1 className="font-clash text-[#373737] text-[clamp(36px,4.2vw,60px)] leading-[115%] tracking-[-0.025em] text-center whitespace-normal md:whitespace-nowrap font-medium">
          Your Doctor Friend Has Gist <span className="text-[1.05em]">👀</span>
        </h1>

        <p className="font-mont italic text-[clamp(24px,2.8vw,40px)] text-[#35AB57] leading-[120%] tracking-[-0.025em] text-center pb-4 mt-2 font-Regular whitespace-normal md:whitespace-nowrap">
          — And It Could Save Your Life
        </p>

        <p className="text-[#474747] mb-8 text-sm md:text-base lg:text-lg font-manrope max-w-xl leading-relaxed tracking-[-3.5%]">
          Real health advice. No big grammar. No long queue. Just clear, honest
          information that keeps you and your people well.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 font-clash w-full px-4 sm:px-0 sm:w-auto mt-2">
          <button className="w-full sm:w-auto px-6 md:px-8 py-4 sm:py-3 bg-[#35AB57] text-[#F5F3E9] rounded-lg font-medium hover:bg-green-600 transition-colors shadow-md text-base">
            Let's Talk Health
          </button>
          <button className="w-full sm:w-auto px-6 md:px-8 py-4 sm:py-3 bg-[#F5F3E9] border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-base">
            Discover awadoc
          </button>
        </div>
      </div>

      {/* DESKTOP RIGHT TRACK */}
      <div className="right-track absolute right-0 top-0 w-[16%] xl:w-[18%] max-w-[200px] hidden md:flex flex-col gap-6 pb-6 opacity-90">
        {rightTrackImages.map((src, i) => (
          <img
            key={`right-${i}`}
            src={src}
            alt="Aproko snippet"
            className="right-img w-full rounded-2xl object-cover shadow-lg origin-center will-change-transform"
          />
        ))}
      </div>

      {/* MOBILE BOTTOM IMAGE TRACKS */}
      <div 
        className="w-full flex md:hidden flex-col gap-3 mt-auto mb-10 opacity-90 overflow-hidden relative" 
        style={{ 
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", 
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        }}
      >
        <div className="w-max flex items-center top-track">
          {topTrackImages.map((src, i) => (
            <img
              key={`top-${i}`}
              src={src}
              alt="Aproko snippet"
              className="w-28 h-28 rounded-2xl object-cover shadow-lg mx-2 will-change-transform"
            />
          ))}
        </div>
        
        <div className="w-max flex items-center bottom-track">
          {bottomTrackImages.map((src, i) => (
            <img
              key={`bottom-${i}`}
              src={src}
              alt="Aproko snippet"
              className="w-28 h-28 rounded-2xl object-cover shadow-lg mx-2 will-change-transform"
            />
          ))}
        </div>
      </div>

      {/* NATIVE SPLIT-TEXT & BOUNCING ARROW BLOCK */}
      <div className="absolute bottom-2 md:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2">
        <div className="flex font-clash font-medium text-[16px] md:text-[24px] text-[#1A1A1A]">
          {"Scroll".split("").map((char, index) => (
            <span
              key={index}
              className="scroll-char inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
        </div>
        <FaArrowDown className="scroll-arrow text-sm md:text-xl text-[#35AB57] will-change-transform" />
      </div>

    </section>
  );
}
