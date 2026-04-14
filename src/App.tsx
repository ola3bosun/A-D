import AprokoHero from "./components/RotatingImageReel";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import ResourcesSection from "./components/ResourcesSection";
import Testimonials from "./components/Testimonials";
import Testimonialsv2 from "./components/Testimonialv2";

const latestVideos = [
  { id: 1, thumbnail: "../assets/images/Dev assets/1 (1).jpg", title: "What they don't tell you about BBL!", timeAgo: "11 days ago", href: "#" },
  { id: 2, thumbnail: "../assets/images/Dev assets/1 (2).jpg", title: "How to lose belly fat", timeAgo: "11 days ago", href: "#" },
  { id: 3, thumbnail: "../assets/images/Dev assets/1 (3).jpg", title: "How grow your hairline faster", timeAgo: "2 weeks ago", href: "#" },
  { id: 4, thumbnail: "../assets/images/Dev assets/1 (4).jpg", title: "My experience with hormonal acne", timeAgo: "3 weeks ago", href: "#" },
  { id: 5, thumbnail: "../assets/images/Dev assets/1 (5).jpg", title: "The benefits of a balanced diet", timeAgo: "1 month ago", href: "#" },
];

const podcastVideos = [
  { id: 1, thumbnail: "../assets/images/Dev assets/1 (1).jpg", title: "I almost ended it all because of PCOS", cardSubtitle: "Unclog", timeAgo: "11 days ago", href: "#" },
  { id: 2, thumbnail: "../assets/images/Dev assets/1 (2).jpg", title: "Vaginismus. How we finally did \"IT\"", cardSubtitle: "Unclog", timeAgo: "11 days ago", href: "#" },
  { id: 3, thumbnail: "../assets/images/Dev assets/1 (3).jpg", title: "The one thing I wish I knew about my period", cardSubtitle: "Unclog", timeAgo: "2 weeks ago", href: "#" },
  { id: 4, thumbnail: "../assets/images/Dev assets/1 (4).jpg", title: "How I lost 20kg with PCOS", cardSubtitle: "Unclog", timeAgo: "3 weeks ago", href: "#" },
  { id: 5, thumbnail: "../assets/images/Dev assets/1 (5).jpg", title: "The dark side of birth control pills", cardSubtitle: "Unclog", timeAgo: "1 month ago", href: "#" },
];

function App() {
  return (
    <div className="">
      <Navbar />
      <CustomCursor />
      <AprokoHero />
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
      <Testimonials />
      <Testimonialsv2 />
      <Footer />
    </div>
  );
}

export default App;
