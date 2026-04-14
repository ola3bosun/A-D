import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import glass from '../assets/images/glass.png'; 

import { FaFacebook, FaInstagram, FaXTwitter, FaTiktok, FaLinkedin, FaYoutube } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  index: [
    { name: 'About', href: '#' },
    { name: 'Events', href: '#' },
    { name: 'Resources', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Change Language', href: '#', underline: true },
  ],
  products: [
    { name: 'Awadoc', href: '#' },
    { name: 'Podcast', href: '#' },
    { name: 'Videos', href: '#' },
    { name: 'Community', href: '#' },
  ],
  policies: [
    { name: 'License Agreement', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Cookie Settings', href: '#' },
  ],
  socials: [
    { name: 'Facebook', href: '#', icon: FaFacebook, hoverColor: 'group-hover:text-[#1877F2]' },
    { name: 'Instagram', href: '#', icon: FaInstagram, hoverColor: 'group-hover:text-[#E4405F]' },
    { name: 'X', href: '#', icon: FaXTwitter, hoverColor: 'group-hover:text-white' },
    { name: 'TikTok', href: '#', icon: FaTiktok, hoverColor: 'group-hover:text-white' },
    { name: 'LinkedIn', href: '#', icon: FaLinkedin, hoverColor: 'group-hover:text-[#0A66C2]' },
    { name: 'YouTube', href: '#', icon: FaYoutube, hoverColor: 'group-hover:text-[#FF0000]' },
  ]
};

export default function AprokoFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLHeadingElement>(null);
  const glassRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in columns
      gsap.fromTo('.footer-col', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          }
        }
      );

      // Parallax big text
      gsap.fromTo(bigTextRef.current,
        { y: '25%' }, 
        {
          y: '5%', 
          ease: "none",
          scrollTrigger: {
            trigger: ".water-section",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.5, 
          }
        }
      );

      // Slide up glass
      gsap.fromTo(glassRef.current,
        { y: 500 },
        {
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".water-section",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.5, 
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#151515] text-[#E5E5E5] pt-12 md:pt-20 overflow-hidden relative font-clash h-[100svh] w-full flex flex-col justify-between">
      
      {/* --- Top Section: Grid --- */}
      <div className="w-full mx-auto px-6 md:px-12 shrink-0 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-8 md:mb-12">
          
          <div className="md:col-span-4 footer-col pr-0 md:pr-12">
            <div className="bg-[#0A0A0A] inline-flex items-center justify-center px-4 py-3 rounded-xl h-14 mb-8 border border-gray-800">
              <span className="font-bold text-[#f4f4f4] text-sm tracking-wide flex items-center gap-2">
                <span className="text-[#30BF5A]">✚</span> APROKO DOCTOR GLOBAL
              </span>
            </div>
            <p className="text-manrope text-[1.1rem] leading-relaxed mb-10 max-w-sm tracking-wide">
              Real health advice. No big grammar. No long queue. Just clear, honest information that keeps you and your people well.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#30BF5A]/70 text-[#f4f4f4] px-6 py-3 rounded-lg font-medium hover:bg-[#30BF5A]/90 transition-colors">
                Let's Talk Health
              </button>
              <button className="bg-transparent border border-gray-600 text-[#f4f4f4] px-6 py-3 rounded-lg font-medium hover:bg-[#f4f4f4]/10 transition-colors">
                Discover awadoc
              </button>
            </div>
          </div>

          <div className="md:col-span-2 footer-col">
            <h3 className="font-semibold text-white mb-6 text-base tracking-wide">Index</h3>
            <ul className="space-y-4 text-[0.95rem]">
              {footerLinks.index.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={`text-gray-400 hover:text-white transition-colors ${link.underline ? 'underline decoration-gray-500 underline-offset-4' : ''}`}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 footer-col">
            <h3 className="font-semibold text-white mb-6 text-base tracking-wide">Products</h3>
            <ul className="space-y-4 text-[0.95rem]">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 footer-col">
            <h3 className="font-semibold text-white mb-6 text-base tracking-wide">Terms & Policies</h3>
            <ul className="space-y-4 text-[0.95rem]">
              {footerLinks.policies.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 footer-col">
            <h3 className="font-semibold text-white mb-6 text-base tracking-wide">Socials</h3>
            <ul className="space-y-4 text-[0.95rem]">
              {footerLinks.socials.map((link) => {
                const Icon = link.icon; 
                return (
                  <li key={link.name}>
                    <a href={link.href} className="text-[#A2A2A2] hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                      <Icon className={`w-5 h-5 text-[#A2A2A2] transition-all duration-300 ease-out ${link.hoverColor}`} />
                      <span className="transition-transform duration-300 ease-out">
                        {link.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        <div className="flex justify-start md:justify-end pb-6 footer-col">
          <p className="text-[#4D4D4D] text-manrope tracking-wide">
            Made with Grit by <a href="#" className="text-[#30BF5A] hover:text-green-400 transition-colors text-clash">the nuanced studio</a>
          </p>
        </div>
      </div>

      {/* --- Bottom Section: The Glass --- */}
      <div className="water-section relative w-full flex-1 flex flex-col items-center justify-end pointer-events-none min-h-0">
        
        <p className="text-[24px] font-manrope-regular text-[#f4f4f4] mb-auto mt-4 md:mt-12 z-20">
          Your reminder to
        </p>

        <h1 
          ref={bigTextRef}
          className="absolute bottom-[-15%] left-[-5%] w-full text-center font-clash text-[#212121]/83 leading-none tracking-[-0.04em] select-none z-10 whitespace-nowrap"
          style={{ fontSize: 'clamp(6rem, 24vw, 32rem)' }}
        >
          drink water
        </h1>

        {/* Wrapper fixes the GSAP horizontal centering issue */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center z-30 pointer-events-none">
          <img 
            ref={glassRef}
            src={glass}
            alt="Glass of water" 
            className="h-[25svh] max-h-[500px] object-contain"
          />
        </div>
      </div>

    </footer>
  );
}