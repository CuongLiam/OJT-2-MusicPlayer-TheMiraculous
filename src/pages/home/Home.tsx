import Header from "../../components/Header/Header";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Home/HomeBanner";
import HomePageInfo from "../../components/Home/HomePageInfo"
import { useRef, useState } from "react";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#14182A] flex">
      <Navbar
        isOpen={isNavbarOpen}
        toggleNavbar={() => setIsNavbarOpen(!isNavbarOpen)}
      />

      <div
        className={`
            flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
            ${isNavbarOpen ? "ml-45 md:ml-62.5" : "ml-20"} 
        `}
      >
        <Header />
        <main className="bg-[#14182A]">
          <Banner/>
          <HomePageInfo/>
        </main>
        <Footer />
      </div>
    </div>
  );
}
