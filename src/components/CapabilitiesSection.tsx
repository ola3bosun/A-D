import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FaYoutube } from 'react-icons/fa';
import { PiArmchairFill } from 'react-icons/pi';

import awadoc from '../assets/images/Dev assets/awadoc svg.svg';

// MEDIA ASSETS
import vid1 from '../assets/images/Dev assets/1st gif part youtube content .webm';
import vid2 from '../assets/images/Dev assets/Conversations_That_Matter_with_Aproko_Doctor__Dr_Chinonso_E.gif';
import vid3 from '../assets/images/Dev assets/3rd gif part awadoc content .webm';

gsap.registerPlugin(ScrollTrigger);

const AwadocIcon = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img src={awadoc} alt="Awadoc" {...props} />
);

const capabilities = [
  {
    id: 1,
    icon: FaYoutube,
    iconColor: "text-[#FF0000]",
    title: "Health education through content",
    text: "Making complex medical topics simple enough to share with your mum. Through YouTube videos, reels, and social content, Aproko Doctor breaks down what your body is doing — and what you should actually do about it.",
    type: 'video',
    videoSrc: vid1
  },
  {
    id: 2,
    icon: PiArmchairFill,
    iconColor: "text-[#1A1A1A]", 
    title: "Global advocacy and speaking",
    text: "From Lagos to London, the message is the same: your health decisions deserve better information. Aproko Doctor takes that conversation to every stage, boardroom, and conference that matters.",
    type: 'image', // GIF is treated as an image
    videoSrc: vid2
  },
  {
    id: 3,
    icon: AwadocIcon, 
    iconColor: "text-[#35AB57]", 
    title: "Health-tech innovation with awadoc",
    text: "Where healthcare meets the future. Awadoc is building the digital infrastructure that puts doctors and patients on the same page — cutting the guesswork out of getting well.",
    type: 'video',
    videoSrc: vid3 
  }
];

export default function CapabilitiesSection() {
  // We only need ONE ref for the entire component now
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // gsap.context creates a safe sandbox. Everything inside automatically reverts on unmount.
    let ctx = gsap.context((self) => {
      
      // 1. SAFE QUERY: Grab elements safely from the DOM, bypassing React Strict Mode issues
      const q = self.selector; 
      if (!q) return;

      const mediaLayers = q('.media-layer');
      const textLayers = q('.text-layer');
      const iconLayers = q('.icon-layer');
      
      // 2. INITIAL STATES
      gsap.set(mediaLayers.slice(1), { yPercent: 100 });
      gsap.set(textLayers.slice(1), { opacity: 0.25 });
      gsap.set(iconLayers.slice(1), { filter: 'grayscale(100%)' });
      gsap.set('.cta-btn', { opacity: 0, y: 15 });

      // 3. MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", 
          pin: true,
          scrub: 0.5, 
          invalidateOnRefresh: true,
        }
      });

      capabilities.forEach((_, index) => {
        const label = `section-${index}`;
        tl.addLabel(label);

        // Dynamically find the characters for THIS specific block
        const blockChars = q(`.char-group-${index} .split-char`);

        tl.to(blockChars, {
          color: '#1A1A1A',
          stagger: 0.1, 
          ease: "none",
          duration: 4 
        }, label);

        if (index < capabilities.length - 1) {
          const nextIndex = index + 1;
          const transitionLabel = `transition-${index}`;
          
          tl.addLabel(transitionLabel, `-=1.5`)
            .to(textLayers[index], { opacity: 0.25, duration: 2 }, transitionLabel)
            
            // Slide up the exact media layer matched by index
            .to(mediaLayers[nextIndex], { 
              yPercent: 0, 
              duration: 3, 
              ease: "power2.inOut" 
            }, transitionLabel)
            
            .to(textLayers[nextIndex], { opacity: 1, duration: 2 }, transitionLabel)
            .to(iconLayers[nextIndex], { filter: 'grayscale(0%)', duration: 2 }, transitionLabel);
        }
      });

      tl.to('.cta-btn', { opacity: 1, y: 0, duration: 1.5 });

      // Ensure ScrollTrigger calculates heights after videos paint
      setTimeout(() => ScrollTrigger.refresh(), 300);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#F5F3E9] relative z-20">
      <section ref={sectionRef} className="w-full min-h-[100svh] lg:h-[100svh] py-16 lg:py-0 bg-[#F5F3E9] flex items-center overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row gap-8 lg:gap-24 items-center">
          
         {/* LEFT SIDE: Dynamic Asset Stack */}
          <div 
            data-cursor-text="Play"
            className="w-full lg:w-[45%] h-[40vh] lg:h-[75vh] relative rounded-[2rem] overflow-hidden shadow-xl bg-gray-200 shrink-0"
          >
            {capabilities.map((item, index) => {
              const isVideo = item.type === "video";
  
              return isVideo ? (
                <video
                  key={item.id}
                  src={item.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  // FIXED: Now z-index increases (1, 2, 3), allowing next videos to stack ON TOP
                  style={{ zIndex: index + 1 }} 
                  className="media-layer absolute inset-0 w-full h-full object-cover origin-bottom will-change-transform"
                />
              ) : (
                <img
                  key={item.id}
                  src={item.videoSrc}
                  alt={item.title}
                  // FIXED: Matches the video z-index logic
                  style={{ zIndex: index + 1 }} 
                  className="media-layer absolute inset-0 w-full h-full object-cover origin-bottom will-change-transform"
                />
              );
            })}
          </div>
  
          {/* RIGHT SIDE: The Text Timeline */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">
            {capabilities.map((item, index) => { // Standardized map loop to 'index'
              const Icon = item.icon;
              return (
                <div 
                  key={item.id} 
                  // The 'text-layer' class connects it to the timeline
                  className="text-layer flex gap-4 md:gap-6 mb-8 md:mb-10 last:mb-8 transition-opacity duration-300"
                >
                  <div className="icon-layer shrink-0 mt-1 transition-all duration-300">
                    <Icon className={`w-6 h-6 md:w-8 md:h-8 ${item.iconColor}`} />
                  </div>
  
                  <div className="flex-1">
                    <h3 className="font-clash font-medium text-lg md:text-xl text-[#1A1A1A] mb-2 md:mb-3">
                      {item.title}
                    </h3>
                    
                    {/* Dynamic class to tie text spans to their specific index block */}
                    <p className={`char-group-${index} font-manrope text-sm md:text-base leading-relaxed text-[#1A1A1A] max-w-lg`}>
                      {item.text.split(" ").map((word, wIndex) => (
                        <span key={wIndex} className="inline-block mr-[0.25em] whitespace-nowrap">
                          {word.split("").map((char, cIndex) => (
                            <span 
                              key={cIndex}
                              className="split-char text-[#47474740] will-change-colors transition-colors duration-150" 
                            >
                              {char}
                            </span>
                          ))}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              );
            })}
  
            <div className="ml-10 md:ml-14 mt-4">
              <button className="cta-btn px-6 py-3 border border-gray-300 rounded-lg font-manrope font-semibold text-[#1A1A1A] hover:bg-gray-100 transition-all duration-300 shadow-sm bg-transparent">
                Let's Talk Health
              </button>
            </div>
  
          </div>
        </div>
      </section>
    </div>
  );
}