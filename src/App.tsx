import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Components
import AprokoHero from "./components/RotatingImageReel";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import ResourcesSection from "./components/ResourcesSection";
import Testimonialsv2 from "./components/Testimonialv2";
import Preloader from "./components/Preloader";
import ImpactSection from "./components/ImpactSection";
import AwadocSection from "./components/AwadocSection";
import CapabilitiesSection from "./components/CapabilitiesSection";

// Assets
import bbl from "./assets/images/Dev assets/bbl.jpg";
import lossFat from "./assets/images/Dev assets/loss fat HD.jpg";
import hairline from "./assets/images/Dev assets/hairline.jpg";
import heat from "./assets/images/Dev assets/heat damage to brain.jpg";
import fibroids from "./assets/images/Dev assets/fibroids.jpg";
import unclogPcos from "./assets/images/Dev assets/unclog pcos.jpg";
import unclogAdhd from "./assets/images/Dev assets/unclog adhd.jpg";
import unclogPregnancy from "./assets/images/Dev assets/Pregnancy unclog.jpg";
import unclogpee from "./assets/images/Dev assets/unclog pee.jpg";
import unclog2 from "./assets/images/Dev assets/unclog 2.jpg";

gsap.registerPlugin(ScrollTrigger);

const imagesToPreload = [bbl, lossFat, hairline, heat, fibroids, unclogPcos, unclogAdhd];

const latestVideos = [
  { id: 1, thumbnail: heat, title: "At Kano, you won't believe what I saw", timeAgo: "2 days ago", href: "#" },
  { id: 2, thumbnail: bbl, title: "What they don't tell you about BBL!", timeAgo: "11 days ago", href: "#" },
  { id: 3, thumbnail: lossFat, title: "How to lose belly fat", timeAgo: "4 months ago", href: "#" },
  { id: 4, thumbnail: hairline, title: "How grow your hairline faster", timeAgo: "6 months ago", href: "#" },
  { id: 5, thumbnail: fibroids, title: "This is what causes fibroids!", timeAgo: "2 months ago", href: "#" },
];

const podcastVideos = [
  { id: 1, thumbnail: unclogPcos, title: "I almost ended it all because of PCOS", cardSubtitle: "Unclog", timeAgo: "11 days ago", href: "#" },
  { id: 2, thumbnail: unclog2, title: "Vaginismus: How we finally did \"IT\"", cardSubtitle: "Unclog", timeAgo: "11 days ago", href: "#" },
  { id: 3, thumbnail: unclogpee, title: "She died from holding her pee ", cardSubtitle: "Unclog", timeAgo: "2 weeks ago", href: "#" },
  { id: 4, thumbnail: unclogPregnancy, title: "Pregnancy is determined from the quality of the man's sperm", cardSubtitle: "Unclog", timeAgo: "3 weeks ago", href: "#" },
  { id: 5, thumbnail: unclogAdhd, title: "How ADHD affected M.I adn Eniola's marriage", cardSubtitle: "Unclog", timeAgo: "1 month ago", href: "#" },
];

// --- MOBILE ---
const MobilePitchView = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-10 text-center font-clash">
    {/* Minimalist Logo Placeholder */}
    <div className="mb-12 opacity-50 tracking-[0.2em] text-xs uppercase font-[">
      <span className="text-[#7FFF00]">The Nuanced Studio </span> x Aproko Doctor
    </div>

    <div className="max-w-xs">
      <h1 className="text-4xl font-light mb-6 tracking-tight leading-tight">
        APROKO DOCTOR
      </h1>
      
      <div className="h-px w-12 bg-[#7FFF00] mx-auto mb-8"></div>

      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-800 rounded-full mb-12">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#50d71e] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#50d71e]"></span>
        </span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">Mobile Build in Progress...</span>
      </div>

      <p className="text-xs text-zinc-500 leading-relaxed">
        For the full interactive pitch, animations, and cinematic experience, please view this link on a <span className="text-white">Desktop browser.</span>
      </p>
    </div>

    <div className="mt-5 opacity-20 text-[10px] uppercase">
      <span> X : @bynuanced </span> <br />
      <span> IG : @thenuancedstudio </span>
    </div>
    <div className="mt-10 opacity-20 text-[10px] uppercase tracking-tighter">
      © 2026 The Nuanced Studio
    </div>
  </div>
);

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Screen check logic
    const checkScreen = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    // Only run Lenis/GSAP if we are on desktop
    if (window.innerWidth > 1024) {
      const lenis = new Lenis({
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });

      lenis.on('scroll', ScrollTrigger.update);
      
      const tickerCallback = (time: number) => {
        lenis.raf(time * 850);
      };
      
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.destroy();
        gsap.ticker.remove(tickerCallback);
        window.removeEventListener("resize", checkScreen);
      };
    }

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // --- CONDITIONAL RETURN ---
  if (!isDesktop) {
    return <MobilePitchView />;
  }

  return (
    <div className="overflow-clip relative w-full">
      {!loadingComplete && (
        <Preloader 
          imageUrls={imagesToPreload} 
          onComplete={() => setLoadingComplete(true)} 
        />
      )}
      <Navbar />
      <CustomCursor />
      <AprokoHero />
      <ImpactSection />
      <CapabilitiesSection />
      <AwadocSection />
      
      <ResourcesSection 
        subtitle="Resources"
        title={"Watch My Latest\nand Popular Videos"}
        videos={latestVideos}
        viewMoreHref="/resources"
      />
      
      <ResourcesSection 
        subtitle="Resources"
        title={"Catch me on\npodcasts"}
        videos={podcastVideos}
        theme="green" 
      />
      
      <Testimonialsv2 />
      <Footer />
    </div>
  );
}

export default App;