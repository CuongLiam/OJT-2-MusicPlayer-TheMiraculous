import { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import MusicPlayerBar from "../../components/Bar/MusicPlayerBar";


import FeaturedAlbums from "../../components/Album/FeaturedAlbums"; 
import TrendingAlbums from "../../components/Album/TrendingAlbums"; 
import Top15Albums from "../../components/Album/Top15Albums"; 
import AlbumsByArtists from "../../components/Album/AlbumsByArtists";
import NewReleases from "../../components/Album/NewReleases";

const Album: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#14182a] flex select-none overflow-hidden">
      <Sidebar
        isOpen={isNavbarOpen}
        toggleSidebar={() => setIsNavbarOpen(!isNavbarOpen)}
      />

      <div className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-20 transition-all">
        <Header onMenuClick={() => setIsNavbarOpen(true)} />

        <main className="flex-1 w-full bg-[#14182a] overflow-y-auto pb-2 pt-8 px-4 xl:px-8 -ml-5 h-screen scrollbar-hide">
            
            {/* Featured */}
            <FeaturedAlbums />
            
            {/* Trending */}
            <TrendingAlbums />

            {/* Top 15 */}
            <Top15Albums />

            {/* Albums By Artists */}
            <AlbumsByArtists />

            {/* New Releases */}
            <NewReleases />

        </main>

        <Footer />
      </div>

      <MusicPlayerBar isSidebarOpen={isNavbarOpen} />
    </div>
  );
};

export default Album;