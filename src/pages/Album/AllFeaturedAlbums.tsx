import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Header from "../../components/Header/Header";
import Sidebar, { useSidebarState } from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import MusicPlayerBar from "../../components/Bar/MusicPlayerBar";
import AlbumCard from "../../components/Album/AlbumCard";

import { Album, User } from "../../types/music.types";

const AllFeaturedAlbums = () => {
  const { isNavbarOpen, toggleSidebar, setSidebarOpen } = useSidebarState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  const [featuredAlbums, setFeaturedAlbums] = useState<Album[]>([]);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/users").then((res) => res.json()),
      fetch("http://localhost:3000/albums").then((res) => res.json()),
    ])
      .then(([usersData, albumsData]) => {
        const artistMap: Record<string, string> = {};
        usersData.forEach((u: User) => {
          if (u.roles.includes("ROLE_ARTIST")) {
            artistMap[u.id] = `${u.first_name} ${u.last_name}`.trim();
          }
        });
        const mergedAlbums = albumsData.map((album: any) => ({
          ...album,
          artist_name: artistMap[String(album.artist_id)] || "Unknown Artist",
        }));
        const filteredFeatured = mergedAlbums.filter(
          (a: Album) => a.type === "PREMIUM"
        );

        setFeaturedAlbums(filteredFeatured);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
        mainRef.current.scrollTo({ top: 0, behavior: "auto" });
      }
      window.scrollTo(0, 0);
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="w-full min-h-screen bg-[#14182a] flex select-none overflow-hidden">
      <Sidebar
        isOpen={isNavbarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-20 transition-all">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main
          ref={mainRef}
          id="scrolling-container"
          className="flex-1 w-full bg-[#14182a] overflow-y-auto pb-2 pt-8 px-4 xl:px-8 -ml-5 h-screen scrollbar-hide"
        >
          <section className="w-full max-w-362.5 mx-auto">
            <div className="relative mb-8 px-2 xl:px-16 flex flex-col gap-1">
              <button
                onClick={() => navigate("/album")}
                className="absolute left-0 xl:left-4 bottom-2 text-white hover:text-[#3BC8E7] transition-colors cursor-pointer outline-none"
                title="Back"
              >
                <ArrowLeft size={32} />
              </button>
              <h2 className="text-xl md:text-2xl font-bold text-[#3BC8E7] tracking-wide">
                All Featured Albums
              </h2>
              <div className="h-0.75 w-12 bg-[#3BC8E7] rounded-full mt-1"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8 px-2 xl:px-16 pb-20 justify-items-start">
              {featuredAlbums.length > 0 ? (
                featuredAlbums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">
                  Đang tải albums...
                </p>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
      <MusicPlayerBar isSidebarOpen={isNavbarOpen} />
    </div>
  );
};

export default AllFeaturedAlbums;
