import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Perfect icon matches for your design
import { FaYoutube } from 'react-icons/fa';
import { PiArmchairFill } from 'react-icons/pi';


// import img1 from '../assets/images/Dev assets/w glass of water.png';
// import img2 from '../assets/images/Dev assets/w glass of water.png';
// import img3 from '../assets/images/Dev assets/w glass of water.png';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: 1,
    icon: FaYoutube,
    iconColor: "text-[#FF0000]", // YouTube Red
    title: "Health education through content",
    text: "Making complex medical topics simple enough to share with your mum. Through YouTube videos, reels, and social content, Aproko Doctor breaks down what your body is doing — and what you should actually do about it.",
    imgSrc: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000", // Placeholder
  },
  {
    id: 2,
    icon: PiArmchairFill,
    iconColor: "text-[#1A1A1A]", // Dark Gray/Black
    title: "Global advocacy and speaking",
    text: "From Lagos to London, the message is the same: your health decisions deserve better information. Aproko Doctor takes that conversation to every stage, boardroom, and conference that matters.",
    imgSrc: "{awadoc}", // Placeholder
  },
  {
    id: 3,
    icon: PiArmchairFill,
    iconColor: "text-[#35AB57]", // Brand Green/Teal
    title: "Health-tech innovation with awadoc",
    text: "Where healthcare meets the future. Awadoc is building the digital infrastructure that puts doctors and patients on the same page — cutting the guesswork out of getting well.",
    imgSrc: "{awadoc}", // Placeholder
  }
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Arrays to hold our dynamically generated refs
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // A 2D array to hold the characters for EACH paragraph
  const charsRef = useRef<HTMLSpanElement[][]>([[], [], []]);
  
  // Reset arrays on render to prevent StrictMode duplicates
  imagesRef.current = [];
  textBlocksRef.current = [];
  iconsRef.current = [];
  charsRef.current = [[], [], []];

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. SETUP INITIAL STATES
      // Hide images 2 and 3 below the container
      gsap.set(imagesRef.current.slice(1), { yPercent: 100 });
      // Dim text blocks 2 and 3
      gsap.set(textBlocksRef.current.slice(1), { opacity: 0.25 });
      // Grayscale the inactive icons
      gsap.set(iconsRef.current.slice(1), { filter: 'grayscale(100%)' });
      // Hide the final button
      gsap.set(buttonRef.current, { opacity: 0, y: 15 });

      // THE MASTER SCRUB TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Require 3 screens of scrolling to finish
          pin: true,
          scrub: 0.5, 
        }
      });

    capabilities.forEach((_, index) => {
        // Fill the text characters for the current block
        tl.to(charsRef.current[index], {
          color: '#1A1A1A',
          stagger: 0.2, // Staggers the color change across characters
          ease: "none",
        });

        // Transition to the NEXT item (if it exists)
        if (index < capabilities.length - 1) {
          const nextIndex = index + 1;
          
          tl.addLabel(`transition-${index}`)
            // Dim current block
            .to(textBlocksRef.current[index], { opacity: 0.25, duration: 2 }, `transition-${index}`)
            
            // Slide UP the next image
            .to(imagesRef.current[nextIndex], { yPercent: 0, duration: 4, ease: "power2.inOut" }, `transition-${index}`)
            
            // Brighten next block and restore icon color
            .to(textBlocksRef.current[nextIndex], { opacity: 1, duration: 2 }, `transition-${index}`)
            .to(iconsRef.current[nextIndex], { filter: 'grayscale(0%)', duration: 2 }, `transition-${index}`);
        }
      });

      // Fade in the button at the very end of the scroll
      tl.to(buttonRef.current, { opacity: 1, y: 0, duration: 2 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-[100svh] bg-[#F5F3E9] flex items-center overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* LEFT SIDE: The Image Stack*/}
        <div className="w-full lg:w-[45%] h-[40vh] lg:h-[75vh] relative rounded-[2rem] overflow-hidden shadow-xl bg-gray-200 shrink-0">
          {capabilities.map((item) => (
            <img
              key={item.id}
              ref={(el) => {
                if (el) imagesRef.current.push(el);
              }}
              src={item.imgSrc}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover origin-bottom will-change-transform"
            />
          ))}
        </div>

        {/* The Text Timeline */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          {capabilities.map((item, bIndex) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                ref={(el) => {
                  if (el) textBlocksRef.current.push(el);
                }} 
                className="flex gap-4 md:gap-6 mb-8 md:mb-10 last:mb-8"
              >
                {/* Icon Column */}
                <div 
                  ref={(el) => {
                    if (el) iconsRef.current.push(el);
                  }}
                  className="shrink-0 mt-1"
                >
                  <Icon className={`text-2xl md:text-3xl ${item.iconColor}`} />
                </div>

                {/* Text Column */}
                <div className="flex-1">
                  <h3 className="font-clash font-medium text-lg md:text-xl text-[#1A1A1A] mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  
                  {/* The Character-Scrub Paragraph */}
                  <p className="font-manrope text-sm md:text-base leading-relaxed text-[red] max-w-lg">
                    {item.text.split(" ").map((word, wIndex) => (
                      <span key={wIndex} className="inline-block mr-[0.25em]">
                        {word.split("").map((char, cIndex) => (
                          <span 
                            key={cIndex}
                            ref={(el) => {
                              if (el) charsRef.current[bIndex].push(el);
                            }}
                            className="text-[#47474780]" // Starts light gray
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

          {/* Let's Talk Button */}
          <div className="ml-10 md:ml-14 mt-4">
            <button 
              ref={buttonRef}
              className="px-6 py-3 border border-gray-300 rounded-lg font-manrope font-semibold text-[#1A1A1A] hover:bg-gray-100 transition-colors shadow-sm bg-transparent"
            >
              Let's Talk Health
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}