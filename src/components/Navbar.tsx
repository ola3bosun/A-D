import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "./MagneticLink";
import AprokoLogo from "../assets/images/Dev assets/aproko logo.png";

gsap.registerPlugin(ScrollTrigger);

// MAIN NAVBAR COMPONENT
export default function AprokoNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

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
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(chevronRef.current, {
          rotation: 180,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.fromTo(
          ".dropdown-item",
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.1,
          },
        );
      } else {
        // Close Sequence
        gsap.to(".dropdown-item", {
          y: -10,
          opacity: 0,
          duration: 0.2,
          stagger: 0.02,
        });
        gsap.to(dropdownRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          delay: 0.1,
        });
        gsap.to(chevronRef.current, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, [isDropdownOpen]);

  return (
    <div
      ref={navContainerRef}
      className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 will-change-transform"
    >
      <div
        ref={pillRef}
        className="relative flex items-center justify-between w-fit max-w-6xl bg-[#FFC40040] rounded-lg px-3 py-3 backdrop-blur-xl"
      >
        <div className="nav-item flex items-center justify-center bg-[#0A0A0A] rounded-[8px] w-[104px] h-[54px] mr-4 shrink-0 transition-all duration-300 hover:scale-[1.02] cursor-pointer p-3 overflow-hidden">
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
        <div className="nav-item">
          <button className="ml-8 bg-[#0A0A0A] text-white px-3 py-3 font-clash font-medium text-[16px] leading-[150%] tracking-wide shadow-md transition-transform duration-300 hover:scale-105 rounded-lg">
            Discover awadoc
          </button>
        </div>
      </div>
    </div>
  );
}
