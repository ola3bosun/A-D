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
import botIcon from '../assets/images/Dev assets/Group 3.svg';
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
    const ctx = gsap.context(() => {
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
            start: "top 70%", // Triggers when the section is 30% into the viewport
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#111111] py-20 overflow-hidden relative max-h-100svh">

      
      {/* Background abstract shape */}
      <div className="absolute top-0 right-0 min-h-svh">
        <svg
          viewBox="0 0 471 874"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[150vh] object-cover opacity-20"
        >
          <path
            d="M202.089 879.036C202.089 879.036 502.322 309.148 451.087 125.6C445.425 99.6308 434.198 75.1901 418.18 53.9614C402.161 32.7326 381.731 15.2203 358.298 2.63113C334.398 -10.2315 308.102 -18.0213 281.059 -20.2493C254.016 -22.4773 226.812 -19.0953 201.153 -10.3156C174.637 -4.62091 149.592 6.49087 127.591 22.3223C105.589 38.1537 87.1063 58.363 73.3017 81.6815C59.7519 104.546 51.3308 130.082 48.6191 156.527C45.9074 182.973 48.9697 209.699 57.5948 234.861C108.829 418.41 661.148 751.626 661.148 751.626"
            stroke="white"
            strokeWidth="95.2824"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

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
          <div className="relative w-full  -rotate-[1.15deg] hover:rotate-0 transition-transform duration-500">
            
            <div className="border border-dashed border-white rounded-[9.3px] overflow-hidden">
              <div className="relative w-full h-100% overflow-hidden bg-gray-900">
                 
                  <img src={oldWomanImg} alt="Woman using phone" className="w-full h-full aspect-4/3 object-cover" />
                
              </div>
            </div>

            {/* The Floating Chatbot Badge */}
            <div className="absolute -bottom-8 -left-8 md:-left-12 w-28 h-28 md:w-36 md:h-36 bg-[#0A0A0A] border border-dashed border-[#35AB57] rounded-[11.39px] flex items-center justify-center shadow-2xl -rotate-[3.2deg] hover:rotate-0 transition-transform duration-500 z-20">
              <div className="w-14 h-14 md:w-16 md:h-16 text-white">
                <img src={botIcon} alt="Awadoc AI chatbot assistant icon featuring a robot character interface with a friendly appearance, representing automated health support and medical guidance technology" className='h-full w-full'/>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}