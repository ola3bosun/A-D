import AprokoHero from "./components/RotatingImageReel";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import ResourcesSection from "./components/ResourcesSection";
// import Testimonials from "./components/Testimonials";
import Testimonialsv2 from "./components/Testimonialv2";
import Preloader from "./components/Preloader";
import ImpactSection from "./components/ImpactSection";


// IMAGES IN THE RESOURCES SECTION
import bbl from "./assets/images/Dev assets/bbl.jpg";
import lossFat from "./assets/images/Dev assets/loss fat HD.jpg";
import hairline from "./assets/images/Dev assets/hairline.jpg";
import hormonalAcne from "./assets/images/Dev assets/1 (4).jpg";
import balancedDiet from "./assets/images/Dev assets/1 (5).jpg";

import unclogPcos from "./assets/images/Dev assets/unclog pcos.jpg";
import unclogAdhd from "./assets/images/Dev assets/unclog adhd.jpg";
import { useState } from "react";

const imagesToPreload = [bbl, lossFat, hairline, hormonalAcne, balancedDiet, unclogPcos, unclogAdhd];


const latestVideos = [
  { id: 1, thumbnail: bbl, title: "What they don't tell you about BBL!", timeAgo: "11 days ago", href: "#" },
  { id: 2, thumbnail: lossFat, title: "How to lose belly fat", timeAgo: "11 days ago", href: "#" },
  { id: 3, thumbnail: hairline, title: "How grow your hairline faster", timeAgo: "2 weeks ago", href: "#" },
  { id: 4, thumbnail: hormonalAcne, title: "My experience with hormonal acne", timeAgo: "3 weeks ago", href: "#" },
  { id: 5, thumbnail: balancedDiet, title: "The benefits of a balanced diet", timeAgo: "1 month ago", href: "#" },
];

const podcastVideos = [
  { id: 1, thumbnail: unclogPcos, title: "I almost ended it all because of PCOS", cardSubtitle: "Unclog", timeAgo: "11 days ago", href: "#" },
  { id: 2, thumbnail: unclogAdhd, title: "Vaginismus. How we finally did \"IT\"", cardSubtitle: "Unclog", timeAgo: "11 days ago", href: "#" },
  // { id: 3, thumbnail: unclogPeriod, title: "The one thing I wish I knew about my period", cardSubtitle: "Unclog", timeAgo: "2 weeks ago", href: "#" },
  { id: 4, thumbnail: unclogPcos, title: "How I lost 20kg with PCOS", cardSubtitle: "Unclog", timeAgo: "3 weeks ago", href: "#" },
  // { id: 5, thumbnail: unclogBirthControl, title: "The dark side of birth control pills", cardSubtitle: "Unclog", timeAgo: "1 month ago", href: "#" },
];

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  return (
    <div className="">
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
      {/* <Testimonials /> */}
      <Testimonialsv2 />
      <Footer />
    </div>
  );
}

export default App;
