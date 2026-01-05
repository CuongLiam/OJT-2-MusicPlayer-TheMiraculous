import Header from "../../components/Header/Header";
import Sidebar, { useSidebarState } from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import MusicPlayerBar from "../../components/Bar/MusicPlayerBar";

import FeaturedAlbums from "../../components/Album/FeaturedAlbums"; 
import TrendingAlbums from "../../components/Album/TrendingAlbums"; 
import Top15Albums from "../../components/Album/Top15Albums"; 
import AlbumsByArtists from "../../components/Album/AlbumsByArtists";
import NewReleases from "../../components/Album/NewReleases";

const Album: React.FC = () => {
  const { isNavbarOpen, toggleSidebar, setSidebarOpen } = useSidebarState();

  return (
    <div className="w-full min-h-screen bg-[#14182a] flex select-none">
      <Sidebar
        isOpen={isNavbarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-20 transition-all duration-300 ease-in-out">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 w-full bg-[#14182a] overflow-y-auto pb-28 pt-6 sm:pt-8 md:pt-10 px-3 sm:px-4 md:px-8 lg:px-12 transition-all duration-300">
            
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

      {/* <MusicPlayerBar isSidebarOpen={isNavbarOpen} /> */}
    </div>
  );
};

export default Album;