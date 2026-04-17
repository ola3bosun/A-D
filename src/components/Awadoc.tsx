import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Using react-icons for the feature list
// import { FaWhatsapp, FaNotesMedical, FaRobot, FaUserMd } from 'react-icons/fa';
import chatIcon from '../assets/images/Dev assets/IconlyChat 1.svg';
import symptoms from '../assets/images/Dev assets/image 21.svg';
import aiGuidance from '../assets/images/Dev assets/image 22.svg';
import professionals from '../assets/images/Dev assets/image 23.svg';


import oldWomanImg from '../assets/images/Dev assets/grandma using phone.jpg';
// import botIcon from '../assets/images/Dev assets/awadoc.png';
import hipaa from '../assets/images/Dev assets/Badge_HIPAA-Compliant-Logo 1.svg';
import ndpcLogo from '../assets/images/Dev assets/NDPC-copped 1.svg';
import gdprLogo from '../assets/images/Dev assets/gdpr.svg';
import clafiyaLogo from '../assets/images/Dev assets/clafiya 1.svg';
import wellahealthLogo from '../assets/images/Dev assets/wella health.svg';

gsap.registerPlugin(ScrollTrigger);

export default function AwadocSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // The exact animation sequence from your video: 
      // Elements slide up and fade in sequentially
      gsap.fromTo('.awadoc-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15, // Creates the cascading effect
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%", // Triggers when the section is 25% into the viewport
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#111111] py-20 overflow-hidden relative">
      
      {/* Background abstract shape (optional, simulates the faint curve in your design) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* --- LEFT SIDE: Content & Reveal Animations --- */}
        <div ref={textContainerRef} className="flex-1 w-full max-w-2xl">
          
          <p className="awadoc-reveal font-manrope text-sm font-medium text-[#A2A2A2] mb-4 tracking-wide uppercase">
            Innovation | Health Tech
          </p>
          
          <h2 className="awadoc-reveal font-clash font-medium text-[48px] md:text-[64px] leading-[1.1] tracking-[-0.03em] text-white mb-6">
            Healthcare in your pocket
          </h2>
          
          <p className="awadoc-reveal font-manrope text-lg text-gray-400 mb-8 leading-relaxed">
            Get personalized health advice directly on WhatsApp. Our AI assistant connects you to reliable support from medical professionals—without the expensive hospital bills
          </p>

          {/* Feature List Box */}
          <div className="awadoc-reveal bg-[#1A1A1A] rounded-2xl p-6 md:p-8 mb-10 border border-white/5">
            <ul className="space-y-5">
              <li className="flex items-center gap-4 text-gray-300 font-manrope font-medium">
                <span className="text-[#35AB57] text-xl"><img src={chatIcon} alt="" /></span>
                Instant Access to reliable health support
              </li>
              <li className="flex items-center gap-4 text-gray-300 font-manrope font-medium">
                <span className="text-purple-500 text-xl"><img src={symptoms} alt="" /></span>
                Describe your symptoms
              </li>
              <li className="flex items-center gap-4 text-gray-300 font-manrope font-medium">
                <span className="text-orange-400 text-xl"><img src={aiGuidance} alt="" /></span>
                Get AI-Powered Guidance
              </li>
              <li className="flex items-center gap-4 text-gray-300 font-manrope font-medium">
                <span className="text-blue-400 text-xl"><img src={professionals} alt="" /></span>
                Connect with Professionals
              </li>
            </ul>
          </div>

          {/* Partner Logos */}
          <div className="awadoc-reveal flex flex-wrap items-center gap-6 md:gap-8 mb-12">
            {/* Replace these divs with your imported <img> tags */}
            <img src={hipaa} alt="HIPAA Compliant" />
            <img src={ndpcLogo} alt="NDPC Partner" />
            <img src={gdprLogo} alt="GDPR Compliant" />
            <img src={clafiyaLogo} alt="Clafiya Partner" />
            <img src={wellahealthLogo} alt="Wella Health Partner" />
          </div>

          {/* Call to Action Button */}
          <div className="awadoc-reveal">
            <button className="bg-[#35AB57] text-white font-medium text-lg px-8 py-4 rounded-lg hover:bg-green-600 transition-colors shadow-[0_0_20px_rgba(53,171,87,0.2)]">
              Discover awadoc <span className="font-normal italic text-white/80 ml-1">for just 950 Naira</span>
            </button>
          </div>

        </div>

        {/* --- RIGHT SIDE: Tilted Image & Badge --- */}
        <div className="flex-1 w-full flex justify-center lg:justify-end relative">
          
          {/* The Dashed Border Container */}
          <div className="relative w-full max-w-[500px] rotate-[2deg] hover:rotate-0 transition-transform duration-500">
            
            <div className="border-1 border-dashed border-white rounded-[9.3px] p-2">
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-900">
                 
                  <img src={oldWomanImg} alt="Woman using phone" className="w-full h-full object-cover" />
                
              </div>
            </div>

            {/* The Floating Chatbot Badge */}
            <div className="absolute -bottom-8 -left-8 md:-left-12 w-28 h-28 md:w-36 md:h-36 bg-[#0A0A0A] rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl -rotate-[6deg] hover:rotate-0 transition-transform duration-500 z-20">
              {/* Replace with your exact bot SVG */}
              <div className="w-14 h-14 md:w-16 md:h-16 text-white">
                {/* <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                  <rect x="3" y="7" width="18" height="10" rx="2" />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M12 17v4" />
                  <path d="M8 21h8" />
                  <circle cx="9" cy="12" r="1" fill="currentColor" />
                  <circle cx="15" cy="12" r="1" fill="currentColor" />
                </svg> */}

                <img src="{botIcon}" alt="" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}