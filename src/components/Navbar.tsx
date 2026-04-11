import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "./MagneticLink";

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
      // A. ENTRANCE SEQUENCE (Runs once on mount)
      const tl = gsap.timeline();

      // Start the pill collapsed and invisible
      gsap.set(pillRef.current, { scaleX: 0.8, opacity: 0 });
      gsap.set(".nav-item", { y: 20, opacity: 0 });

      tl.to(pillRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        delay: 0.2, // Wait a beat before appearing
      }).to(
        ".nav-item",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05, // Domino effect for the links
          ease: "back.out(1.5)",
        },
        "-=0.6",
      ); // Overlap with the pill expansion

      // B. SMART SCROLL (Hide on scroll down, show on up)
      const showNav = gsap
        .fromTo(
          navContainerRef.current,
          { yPercent: -150 },
          { yPercent: 0, paused: true, duration: 0.4, ease: "power3.out" },
        )
        .progress(1); // Start fully visible

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          // If scrolling DOWN and past 50px, reverse the animation (hide)
          if (self.direction === 1 && self.scroll() > 50) {
            showNav.reverse();
            setIsDropdownOpen(false); // Close dropdown if scrolling down
          }
          // If scrolling UP, play the animation (show)
          else if (self.direction === -1) {
            showNav.play();
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // C. DROPDOWN CHOREOGRAPHY (Runs when state changes)
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
    // Fixed container sits above everything
    <div
      ref={navContainerRef}
      className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 will-change-transform"
    >
      {/* The Floating Pill Background */}
      <div
        ref={pillRef}
        className="relative flex items-center justify-between w-full max-w-4xl bg-[#FFC40040] rounded-lg px-3 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-11.8"
      >
        {/* Logo */}
        <div className="nav-item flex items-center justify-center bg-[#0A0A0A] text-white px-4 py-3 rounded-xl h-12 w-[180px]">
          <span className="font-clash-clash-bold text-sm tracking-wide">
            APROKO DOCTOR <br /> GLOBAL
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10 font-clash-clash-medium text-gray-800">
          <MagneticLink 
          className="nav-item hover:text-green-600 transition-colors"
          href="#">
            About
          </MagneticLink>
          <MagneticLink 
          className="nav-item hover:text-green-600 transition-colors"
          href="#">
            Events
          </MagneticLink>

          {/* Dropdown Trigger */}
          <div
            className="nav-item relative flex items-center gap-1 cursor-pointer group pb-4 -mb-4"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {/* The Magnetic Link */}
            <MagneticLink className="hover:text-green-600 transition-colors">
              Resources
            </MagneticLink>

            {/* The Chevron */}
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

            {/* Dropdown Menu - position absolute pushes it down, but the parent padding bridges the gap */}
            <div
              ref={dropdownRef}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.1)] overflow-hidden h-0 opacity-0 border border-gray-100" // Adjusted mt-6 to mt-4
            >
              <div className="p-2 flex flex-col pointer-events-auto">
                {" "}
                {/* Added pointer-events to ensure clicks register */}
                <a
                  href="#"
                  className="dropdown-item px-4 py-3 hover:bg-gray-50 hover:text-green-600 rounded-lg text-sm font-clash-clash-medium transition-colors"
                >
                  Health Articles
                </a>
                <a
                  href="#"
                  className="dropdown-item px-4 py-3 hover:bg-gray-50 hover:text-green-600 rounded-lg text-sm font-clash-clash-medium transition-colors"
                >
                  Video Guides
                </a>
                <a
                  href="#"
                  className="dropdown-item px-4 py-3 hover:bg-gray-50 hover:text-green-600 rounded-lg text-sm font-clash-clash-medium transition-colors"
                >
                  Podcasts
                </a>
              </div>
            </div>
          </div>

          <MagneticLink 
          className="nav-item hover:text-green-600 transition-colors"
          href="#">
            Contact
          </MagneticLink>
          <MagneticLink className="nav-item text-yellow-600 font-clash-semibold hover:text-yellow-700 transition-colors">
            EN
          </MagneticLink>
        </div>

        {/* CTA Button */}
        <div className="nav-item">
          {/* Added a subtle scale effect on hover via Tailwind */}
          <button className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl font-clash-medium tracking-wide hover:scale-105 transition-transform duration-300 shadow-md">
            Discover awadoc
          </button>
        </div>
      </div>
    </div>
  );
}
