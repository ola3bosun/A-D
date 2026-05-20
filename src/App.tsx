import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

// IMAGES IN THE RESOURCES SECTION
import bbl from "./assets/images/Dev assets/bbl.jpg";
import lossFat from "./assets/images/Dev assets/loss fat HD.jpg";
import hairline from "./assets/images/Dev assets/hairline.jpg";
import conversations from "./assets/images/Dev assets/Conversations_That_Matter_with_Aproko_Doctor__Dr_Chinonso_E.gif";
import fibroids from "./assets/images/Dev assets/fibroids.jpg";
import unclogPcos from "./assets/images/Dev assets/unclog pcos.jpg";
import unclogAdhd from "./assets/images/Dev assets/unclog adhd.jpg";
import unclogPregnancy from "./assets/images/Dev assets/Pregnancy unclog.jpg";
import unclogpee from "./assets/images/Dev assets/unclog pee.jpg";
import unclogHeat from "./assets/images/Dev assets/heat damage to brain.jpg";



gsap.registerPlugin(ScrollTrigger);

const imagesToPreload = [bbl, lossFat, hairline, conversations, fibroids, unclogPcos, unclogAdhd];

const latestVideos = [
  { id: 1, thumbnail: conversations, title: "Conversations that matter", timeAgo: "3 weeks ago", href: "#" },
  { id: 2, thumbnail: bbl, title: "What they don't tell you about BBL!", timeAgo: "11 days ago", href: "#" },
  { id: 3, thumbnail: lossFat, title: "How to lose belly fat", timeAgo: "11 days ago", href: "#" },
  { id: 4, thumbnail: hairline, title: "How grow your hairline faster", timeAgo: "2 weeks ago", href: "#" },
  { id: 5, thumbnail: fibroids, title: "Fibroids : What You Need to Know", timeAgo: "1 month ago", href: "#" },
];

const podcastVideos = [
  { id: 1, thumbnail: unclogPcos, title: "I almost ended it all because of PCOS", cardSubtitle: "Unclog", timeAgo: "11 days ago", href: "#" },
  { id: 2, thumbnail: unclogHeat, title: "Heat Damage to the Brain", cardSubtitle: "Unclog", timeAgo: "11 days ago", href: "#" },
  { id: 3, thumbnail: unclogpee, title: "Side-effects of urine retention", cardSubtitle: "Unclog", timeAgo: "2 weeks ago", href: "#" },
  { id: 4, thumbnail: unclogPregnancy, title: "The Dark Side of Pregnancy", cardSubtitle: "Unclog", timeAgo: "3 weeks ago", href: "#" },
  { id: 5, thumbnail: unclogAdhd, title: "ADHD and me: The struggle is real", cardSubtitle: "Unclog", timeAgo: "1 month ago", href: "#" },
];

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.8, //  lower is faster, higher is smoother/slower
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard ease-out
      touchMultiplier: 2, // Makes touch scrolling feel a bit more responsive
    });

    // 2. TIE LENIS TO GSAP SCROLLTRIGGER
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Sync Lenis's requestAnimationFrame with GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 5. Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);
  
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
      
      {/* The Video Section */}
      <ResourcesSection 
        subtitle="Resources"
        title={"Watch My Latest\nand Popular Videos"}
        videos={latestVideos}
        viewMoreHref="/resources"
      />
      
      {/* The Podcast Section */}
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