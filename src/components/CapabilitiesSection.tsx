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
    type: 'video', // Rendered as <video>
    videoSrc: vid1
  },
  {
    id: 2,
    icon: PiArmchairFill,
    iconColor: "text-[#1A1A1A]", 
    title: "Global advocacy and speaking",
    text: "From Lagos to London, the message is the same: your health decisions deserve better information. Aproko Doctor takes that conversation to every stage, boardroom, and conference that matters.",
    type: 'image', // FIX 1: Flipped to image context to handle the .gif file correctly
    videoSrc: vid2
  },
  {
    id: 3,
    icon: AwadocIcon, 
    iconColor: "text-[#35AB57]", 
    title: "Health-tech innovation with awadoc",
    text: "Where healthcare meets the future. Awadoc is building the digital infrastructure that puts doctors and patients on the same page — cutting the guesswork out of getting well.",
    type: 'video', // Rendered as <video>
    videoSrc: vid3 
  }
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // FIX 2: Upgraded Ref definitions to allow handling both media types cleanly
  const mediaElementsRef = useRef<(HTMLVideoElement | HTMLImageElement | null)[]>([]);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const charsRef = useRef<HTMLSpanElement[][]>([[], [], []]);
  
  // Clean allocations on every render pass
  mediaElementsRef.current = [];
  textBlocksRef.current = [];
  iconsRef.current = [];
  charsRef.current = [[], [], []];

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // SETUP INITIAL STATES
      gsap.set(mediaElementsRef.current.slice(1), { yPercent: 100 });
      gsap.set(textBlocksRef.current.slice(1), { opacity: 0.25 });
      gsap.set(iconsRef.current.slice(1), { filter: 'grayscale(100%)' });
      gsap.set(buttonRef.current, { opacity: 0, y: 15 });

      // THE MASTER SCRUB TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", 
          pin: true,
          scrub: 0.5, 
        }
      });

      capabilities.forEach((_, index) => {
        const label = `section-${index}`;
        tl.addLabel(label);

        tl.to(charsRef.current[index], {
          color: '#1A1A1A',
          stagger: 0.1, 
          ease: "none",
          duration: 4 
        }, label);

        if (index < capabilities.length - 1) {
          const nextIndex = index + 1;
          const transitionLabel = `transition-${index}`;
          
          tl.addLabel(transitionLabel, `-=1.5`)
            .to(textBlocksRef.current[index], { opacity: 0.25, duration: 2 }, transitionLabel)
            
            // Slide UP the target active element layer seamlessly
            .to(mediaElementsRef.current[nextIndex], { 
              yPercent: 0, 
              duration: 3, 
              ease: "power2.inOut" 
            }, transitionLabel)
            
            .to(textBlocksRef.current[nextIndex], { opacity: 1, duration: 2 }, transitionLabel)
            .to(iconsRef.current[nextIndex], { filter: 'grayscale(0%)', duration: 2 }, transitionLabel);
        }
      });

      tl.to(buttonRef.current, { opacity: 1, y: 0, duration: 1.5 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-[100svh] bg-[#F5F3E9] flex items-center overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* LEFT SIDE: Dynamic Asset Stack */}
        <div className="w-full lg:w-[45%] h-[40vh] lg:h-[75vh] relative rounded-[2rem] overflow-hidden shadow-xl bg-gray-200 shrink-0">
          {capabilities.map((item, index) => {
            const isVideo = item.type === "video";
            
            // FIX 3: Dynamic reference allocations to maintain absolute ordering index arrays
            const setRef = (el: HTMLVideoElement | HTMLImageElement | null) => {
              if (el) mediaElementsRef.current[index] = el;
            };

            return isVideo ? (
              <video
                key={item.id}
                ref={setRef}
                src={item.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{ zIndex: capabilities.length - index }}
                className="absolute inset-0 w-full h-full object-cover origin-bottom will-change-transform"
              />
            ) : (
              <img
                key={item.id}
                ref={setRef}
                src={item.videoSrc}
                alt={item.title}
                style={{ zIndex: capabilities.length - index }}
                className="absolute inset-0 w-full h-full object-cover origin-bottom will-change-transform"
              />
            );
          })}
        </div>

        {/* RIGHT SIDE: The Text Timeline */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          {capabilities.map((item, bIndex) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                ref={(el) => { if (el) textBlocksRef.current[bIndex] = el; }} 
                className="flex gap-4 md:gap-6 mb-8 md:mb-10 last:mb-8 transition-opacity duration-300"
              >
                <div 
                  ref={(el) => { if (el) iconsRef.current[bIndex] = el; }}
                  className="shrink-0 mt-1 transition-all duration-300"
                >
                  <Icon className={`w-6 h-6 md:w-8 md:h-8 ${item.iconColor}`} />
                </div>

                <div className="flex-1">
                  <h3 className="font-clash font-medium text-lg md:text-xl text-[#1A1A1A] mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="font-manrope text-sm md:text-base leading-relaxed text-[#1A1A1A] max-w-lg">
                    {item.text.split(" ").map((word, wIndex) => (
                      <span key={wIndex} className="inline-block mr-[0.25em] whitespace-nowrap">
                        {word.split("").map((char, cIndex) => (
                          <span 
                            key={cIndex}
                            ref={(el) => {
                              if (el) charsRef.current[bIndex].push(el);
                            }}
                            className="text-[#47474740] will-change-colors transition-colors duration-150" 
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
            <button 
              ref={buttonRef}
              className="px-6 py-3 border border-gray-300 rounded-lg font-manrope font-semibold text-[#1A1A1A] hover:bg-gray-100 transition-all duration-300 shadow-sm bg-transparent"
            >
              Let's Talk Health
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}