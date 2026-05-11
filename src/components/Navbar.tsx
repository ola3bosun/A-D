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
        "-=0.6"
      );

      // SMART SCROLL
      const showNav = gsap
        .fromTo(
          navContainerRef.current,
          { yPercent: -150 },
          { yPercent: 0, paused: true, duration: 0.4, ease: "power3.out" }
        )
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 50) {
            showNav.reverse();
            setIsDropdownOpen(false);
          } else if (self.direction === -1) {
            showNav.play();
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // DROPDOWN CHOREOGRAPHY
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!dropdownRef.current || !chevronRef.current) return;

      if (isDropdownOpen) {
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
          }
        );
      } else {
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
        {/* Fixed Logo Badge (104x54) */}
        <div className="nav-item flex items-center justify-center bg-[#0A0A0A] rounded-[8px] w-[104px] h-[54px] mr-4 shrink-0 transition-all duration-300 hover:scale-[1.02] cursor-pointer p-3 overflow-hidden">
          <img
            src={AprokoLogo}
            alt="Aproko Logo"
            className="w-full h-full object-contain select-none scale-550"
          />
        </div>

        {/* Center Links */}
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

          {/* Dropdown Trigger */}
          <div
            className="nav-item relative flex items-center gap-1 group pb-4 -mb-4"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <MagneticLink
              className="font-clash font-medium text-[20px] leading-[150%] tracking-[-0.025em]"
              href="#"
            >
              Resources
            </MagneticLink>

            <svg
              ref={chevronRef}
              className="w-4 h-4 mt-0.5 text-gray-600 group-hover:text-green-600 transition-colors"
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

            {/* Dropdown Menu */}
            <div
              ref={dropdownRef}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.1)] overflow-hidden h-0 opacity-0 border border-gray-100"
            >
              <div className="p-2 flex flex-col pointer-events-auto">
                <a
                  href="#"
                  className="dropdown-item px-4 py-3 hover:bg-gray-50 hover:text-green-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Health Articles
                </a>
                <a
                  href="#"
                  className="dropdown-item px-4 py-3 hover:bg-gray-50 hover:text-green-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Video Guides
                </a>
                <a
                  href="#"
                  className="dropdown-item px-4 py-3 hover:bg-gray-50 hover:text-green-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Podcasts
                </a>
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

        {/* CTA Button */}
        <div className="nav-item">
          <button className="ml-8 bg-[#0A0A0A] text-white px-6 py-3 font-clash font-medium text-[20px] leading-[150%] tracking-wide shadow-md transition-transform duration-300 hover:scale-105 rounded-lg">
            Discover awadoc
          </button>
        </div>
      </div>
    </div>
  );
}