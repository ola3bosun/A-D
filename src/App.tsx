import AprokoHero from "./components/RotatingImageReel";
// import HeroContent from './components/HeroContent';
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import ResourcesSection from "./components/ResourcesSection";

function App() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
      <Navbar />
      <CustomCursor />
      <AprokoHero />
      <ResourcesSection />
      <Footer />
    </div>
  );
}

export default App;
