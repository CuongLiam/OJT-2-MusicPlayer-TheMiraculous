import { useRef } from "react"; 
import Header from "../../components/Header/Header";
import Sidebar, { useSidebarState } from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Home/HomeBanner";
import HomePageInfo from "../../components/Home/HomePageInfo"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isNavbarOpen, toggleSidebar, setSidebarOpen } = useSidebarState();

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
      <Sidebar
        isOpen={isNavbarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-20 transition-all duration-300 ease-in-out"
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="bg-[#14182A]">
          <Banner/>
          <HomePageInfo/>
        </main>
        <Footer />
      </div>
    </div>
  );
}