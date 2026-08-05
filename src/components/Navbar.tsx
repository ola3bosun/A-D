import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "./MagneticLink";
import AprokoLogo from "../assets/images/Dev assets/aproko logo.png";

gsap.registerPlugin(ScrollTrigger);

// MAIN NAVBAR COMPONENT
export default function AprokoNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  
  // Mobile Menu Refs
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileTimeline = useRef<gsap.core.Timeline | null>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | null)[]>([]);
  const mobileFooterRef = useRef<HTMLDivElement>(null);
  const hamburgerTopRef = useRef<HTMLSpanElement>(null);
  const hamburgerBottomRef = useRef<HTMLSpanElement>(null);
  const mobileResourcesContentRef = useRef<HTMLDivElement>(null);

  // 1. ENTRANCE & SCROLL CHOREOGRAPHY
  useEffect(() => {
    let ctx = gsap.context(() => {
      // ENTRANCE SEQUENCE
      const tl = gsap.timeline();

      gsap.set(pillRef.current, { scaleX: 0.8, opacity: 0 });
      gsap.set(".nav-item", { y: 20, opacity: 0 });

      tl.to(pillRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        delay: 0.5,
      }).to(
        ".nav-item",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.5)",
        },
        "-=0.6",
      );

      // SMART SCROLL
      const showNav = gsap
        .fromTo(
          navContainerRef.current,
          { yPercent: -150 },
          { yPercent: 0, paused: true, duration: 0.4, ease: "power3.out" },
        )
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 50) {
            showNav.reverse();
            setIsDropdownOpen(false); // close dropdown on scroll down
          } else if (self.direction === -1) {
            showNav.play();
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // MEGA MENU CHOREOGRAPHY
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!dropdownRef.current || !chevronRef.current) return;

      if (isDropdownOpen) {
        // Open Sequence
        gsap.to(dropdownRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "power3.inOut",
        });
        gsap.to(chevronRef.current, {
          rotation: 180,
          duration: 0.5,
          ease: "power3.inOut",
        });
        gsap.fromTo(
          ".dropdown-item",
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.1,
          },
        );
      } else {
        // Close Sequence
        gsap.to(".dropdown-item", {
          y: -10,
          opacity: 0,
          duration: 0.3,
          stagger: 0.02,
        });
        gsap.to(dropdownRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
          delay: 0.1,
        });
        gsap.to(chevronRef.current, {
          rotation: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, [isDropdownOpen]);

  // MOBILE MENU CHOREOGRAPHY
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Initialize Timeline
      mobileTimeline.current = gsap.timeline({ paused: true });

      // Build the timeline sequence
      mobileTimeline.current
        // 1. Reveal Background (Clip-path expand from top right corner)
        .to(mobileMenuRef.current, {
          clipPath: "circle(150% at 95% 40px)",
          duration: 0.8,
          ease: "power4.inOut",
        })
        // 2. Animate hamburger lines to "X"
        .to(
          hamburgerTopRef.current,
          { y: 4, rotation: 45, duration: 0.4, ease: "power4.inOut" },
          "<0.1"
        )
        .to(
          hamburgerBottomRef.current,
          { y: -4, rotation: -45, duration: 0.4, ease: "power4.inOut" },
          "<"
        )
        // 3. Stagger links sliding up
        .fromTo(
          mobileLinksRef.current,
          { y: "50%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "<0.3"
        )
        // 4. Fade in footer
        .fromTo(
          mobileFooterRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );
    });

    return () => ctx.revert();
  }, []);

  // Play / Reverse timeline based on state
  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileTimeline.current?.play();
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      mobileTimeline.current?.reverse();
      document.body.style.overflow = "unset";
      // Close accordion when menu closes
      setTimeout(() => setIsMobileResourcesOpen(false), 500);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  // Mobile Resources Accordion Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!mobileResourcesContentRef.current) return;
      if (isMobileResourcesOpen) {
        gsap.to(mobileResourcesContentRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "power3.inOut"
        });
        gsap.fromTo(
          ".mobile-resource-item",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.1 }
        );
      } else {
        gsap.to(mobileResourcesContentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut"
        });
      }
    });
    return () => ctx.revert();
  }, [isMobileResourcesOpen]);

  const addToLinksRef = (el: HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | null) => {
    if (el && !mobileLinksRef.current.includes(el)) {
      mobileLinksRef.current.push(el);
    }
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 will-change-transform"
    >
      <div
        ref={pillRef}
        className="relative flex items-center justify-between w-full md:w-max bg-[#FFC40040] rounded-lg px-3 py-3 backdrop-blur-xl z-[60] mx-auto"
      >
        <div className="nav-item flex items-center justify-center bg-[#0A0A0A] rounded-[8px] w-[80px] h-[44px] mr-4 shrink-0 transition-all duration-300 hover:scale-[1.02] cursor-pointer p-2 overflow-hidden">
          <img
            src={AprokoLogo}
            alt="Aproko Logo"
            className="w-full h-full object-contain select-none scale-550"
          />
        </div>

        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center gap-5 text-[#000000BF]">
          <MagneticLink
            className="nav-item font-clash font-medium text-[20px] leading-[150%] tracking-[-0.025em]"
            href="#"
          >
            About
          </MagneticLink>
          <MagneticLink
            className="nav-item font-clash font-medium text-[20px] leading-[150%] tracking-[-0.025em]"
            href="#"
          >
            Events
          </MagneticLink>

          {/* DROPDOWN TRIGGER WRAPPER */}
          <div
            className="nav-item relative flex items-center gap-1 group pb-4 -mb-4 focus-within:ring-0"
            tabIndex={0}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setTimeout(() => setIsDropdownOpen(false), 0);
              }
            }}
          >
            <MagneticLink
              className="font-clash font-medium text-[20px] leading-[150%] tracking-[-0.025em]"
              href="#"
            >
              Resources
            </MagneticLink>

            <svg
              ref={chevronRef}
              className="w-4 h-4 mt-0.5 text-gray-600 group-hover:text-[#35AB57] transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>

            {/* THE MEGA MENU */}
            <div
              ref={dropdownRef}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[560px] bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden h-0 opacity-0 border border-gray-100"
            >
              <div className="relative p-6 grid grid-cols-2 gap-8 pointer-events-auto">
                {/* Subtle Vertical Divider */}
                <div className="absolute left-1/2 top-8 bottom-8 w-[1px] bg-gray-100 -translate-x-1/2"></div>

                {/* COLUMN 1: Read */}
                <div className="flex flex-col gap-1">
                  <span className="font-manrope text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-3">
                    Read
                  </span>

                  <a
                    href="#"
                    className="dropdown-item group flex flex-col p-3 rounded-xl transition-colors duration-300 hover:bg-[#35AB57]/5"
                  >
                    <h4 className="font-clash font-medium text-[18px] text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#35AB57]">
                      Health Articles
                    </h4>
                    <p className="font-manrope text-sm text-gray-500 mt-1 leading-[1.4]">
                      Clear, honest health gist without the big medical grammar.
                    </p>
                  </a>

                  <a
                    href="#"
                    className="dropdown-item group flex flex-col p-3 rounded-xl transition-colors duration-300 hover:bg-[#35AB57]/5"
                  >
                    <h4 className="font-clash font-medium text-[18px] text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#35AB57]">
                      Medical Reports
                    </h4>
                    <p className="font-manrope text-sm text-gray-500 mt-1 leading-[1.4]">
                      Deep dives into local health trends and statistics.
                    </p>
                  </a>
                </div>

                {/* COLUMN 2: Watch & Listen */}
                <div className="flex flex-col gap-1">
                  <span className="font-manrope text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-3">
                    Watch & Listen
                  </span>

                  <a
                    href="#"
                    className="dropdown-item group flex flex-col p-3 rounded-xl transition-colors duration-300 hover:bg-[#35AB57]/5"
                  >
                    <h4 className="font-clash font-medium text-[18px] text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#35AB57]">
                      Video Guides
                    </h4>
                    <p className="font-manrope text-sm text-gray-500 mt-1 leading-[1.4]">
                      Visual breakdowns of conditions and healthy habits.
                    </p>
                  </a>

                  <a
                    href="#"
                    className="dropdown-item group flex flex-col p-3 rounded-xl transition-colors duration-300 hover:bg-[#35AB57]/5"
                  >
                    <h4 className="font-clash font-medium text-[18px] text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#35AB57]">
                      Unclog Podcast
                    </h4>
                    <p className="font-manrope text-sm text-gray-500 mt-1 leading-[1.4]">
                      Real conversations and interviews with medical experts.
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <MagneticLink
            className="nav-item font-clash font-medium text-[20px] leading-[150%] tracking-[-0.025em]"
            href="#"
          >
            Contact
          </MagneticLink>
          <MagneticLink
            className="nav-item text-[#D09F00] font-clash font-medium text-[20px] leading-[150%] tracking-[-0.025em]"
            href="#"
          >
            EN
          </MagneticLink>
        </div>

        {/* CTA BUTTON */}
        <div className="nav-item hidden md:block">
          <button className="ml-8 bg-[#0A0A0A] text-white px-3 py-3 font-clash font-medium text-[16px] leading-[150%] tracking-wide shadow-md transition-transform duration-300 hover:scale-105 rounded-lg">
            Discover awadoc
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="nav-item md:hidden flex items-center ml-4 z-[60]">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`relative p-2 w-10 h-10 flex flex-col justify-center items-center gap-[6px] focus:outline-none rounded-lg backdrop-blur-md transition-colors duration-300 ${isMobileMenuOpen ? 'text-[#F5F3E9]' : 'bg-white/50 text-[#0A0A0A]'}`}
          >
            <span ref={hamburgerTopRef} className={`block w-6 h-[2px] rounded-full transition-colors duration-300 ${isMobileMenuOpen ? 'bg-[#F5F3E9]' : 'bg-[#0A0A0A]'}`}></span>
            <span ref={hamburgerBottomRef} className={`block w-6 h-[2px] rounded-full transition-colors duration-300 ${isMobileMenuOpen ? 'bg-[#F5F3E9]' : 'bg-[#0A0A0A]'}`}></span>
          </button>
        </div>
      </div>

      {/* AWWWARDS-LEVEL MOBILE MENU OVERLAY */}
      <div 
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 w-full h-[100svh] bg-[#0A0A0A] text-[#F5F3E9] z-[55] flex flex-col pt-28 pb-8 px-6 overflow-y-auto ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ clipPath: "circle(0% at 95% 40px)" }}
      >
        <div className="flex-1 flex flex-col gap-6 w-full max-w-sm mx-auto">
          {/* Main Links */}
          <div className="overflow-hidden">
            <a href="#" ref={addToLinksRef} onClick={() => setIsMobileMenuOpen(false)} className="block font-clash font-semibold text-5xl tracking-tight transition-transform hover:translate-x-2 hover:text-[#35AB57] duration-300">
              About
            </a>
          </div>
          <div className="overflow-hidden">
            <a href="#" ref={addToLinksRef} onClick={() => setIsMobileMenuOpen(false)} className="block font-clash font-semibold text-5xl tracking-tight transition-transform hover:translate-x-2 hover:text-[#35AB57] duration-300">
              Events
            </a>
          </div>

          {/* Resources Accordion */}
          <div className="overflow-hidden w-full">
            <div ref={addToLinksRef} className="flex flex-col w-full">
              <button 
                onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)} 
                className="w-full text-left flex items-center justify-between font-clash font-semibold text-5xl tracking-tight group"
              >
                <span className="transition-transform group-hover:translate-x-2 group-hover:text-[#35AB57] duration-300">Resources</span>
                <svg className={`w-8 h-8 transition-transform duration-300 ${isMobileResourcesOpen ? 'rotate-180 text-[#35AB57]' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div ref={mobileResourcesContentRef} className="h-0 opacity-0 overflow-hidden ml-4">
                <div className="flex flex-col gap-4 mt-6 mb-2 border-l-2 border-[#35AB57]/30 pl-6">
                  <a href="#" className="mobile-resource-item font-clash text-2xl text-gray-300 hover:text-white transition-colors">Health Articles</a>
                  <a href="#" className="mobile-resource-item font-clash text-2xl text-gray-300 hover:text-white transition-colors">Medical Reports</a>
                  <a href="#" className="mobile-resource-item font-clash text-2xl text-gray-300 hover:text-white transition-colors">Video Guides</a>
                  <a href="#" className="mobile-resource-item font-clash text-2xl text-gray-300 hover:text-white transition-colors">Unclog Podcast</a>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <a href="#" ref={addToLinksRef} onClick={() => setIsMobileMenuOpen(false)} className="block font-clash font-semibold text-5xl tracking-tight transition-transform hover:translate-x-2 hover:text-[#35AB57] duration-300">
              Contact
            </a>
          </div>
          
          <div className="overflow-hidden mt-6">
            <button ref={addToLinksRef} onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-[#35AB57] text-white px-8 py-5 font-clash font-medium text-2xl shadow-md rounded-xl transition-transform active:scale-95">
              Discover awadoc
            </button>
          </div>
        </div>

        {/* Mobile Footer Area */}
        <div ref={mobileFooterRef} className="mt-auto pt-8 border-t border-white/10 w-full max-w-sm mx-auto flex justify-between items-end pb-4">
          <div className="flex flex-col gap-2">
            <span className="font-manrope text-sm text-gray-400 uppercase tracking-widest">Connect</span>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-[#35AB57] transition-colors">Twitter</a>
              <a href="#" className="text-white hover:text-[#35AB57] transition-colors">Instagram</a>
              <a href="#" className="text-white hover:text-[#35AB57] transition-colors">LinkedIn</a>
            </div>
          </div>
          <div className="text-right">
            <span className="font-manrope text-sm text-gray-400">© {new Date().getFullYear()} Aproko Doctor</span>          </div>
        </div>
      </div>
    </div>
  );
}
