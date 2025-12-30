import { useNavigate } from "react-router-dom"; 
import { ArrowLeft } from "lucide-react";       

import Header from "../../components/Header/Header";
import Sidebar, { useSidebarState } from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import MusicPlayerBar from "../../components/Bar/MusicPlayerBar";
import AlbumCard, { type AlbumData } from "../../components/Album/AlbumCard"; 

const TRENDING_ALBUMS: AlbumData[] = [
  { id: 1, title: "Bloodlust", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Time flies", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Dark matters", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Eye to eye", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Cloud nine", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
  { id: 6, title: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { id: 7, title: "New Horizon", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" },
  { id: 8, title: "Silent Night", artist: "Brian Hill", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 9, title: "Another World", artist: "Brian Hill", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop" },
  { id: 10, title: "Echoes", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 11, title: "Summer Vibes", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=400&auto=format&fit=crop" },
  { id: 12, title: "Winter Chill", artist: "Brian Hill", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 13, title: "Time flies", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { id: 14, title: "Dark matters", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
  { id: 15, title: "Eye to eye", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" },
  { id: 16, title: "Cloud nine", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
  { id: 17, title: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { id: 18, title: "New Horizon", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" },
  { id: 19, title: "Silent Night", artist: "Brian Hill", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 20, title: "Another World", artist: "Brian Hill", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop" },
  { id: 21, title: "Echoes", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 22, title: "Summer Vibes", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=400&auto=format&fit=crop" },
  { id: 23, title: "Winter Chill", artist: "Brian Hill", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 24, title: "Winter Chill", artist: "Brian Hill", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
];

const AllTrendingAlbums = () => {
  const { isNavbarOpen, toggleSidebar, setSidebarOpen } = useSidebarState();
  const navigate = useNavigate(); 

  return (
    <div className="w-full min-h-screen bg-[#14182a] flex select-none overflow-hidden">
      <Sidebar
        isOpen={isNavbarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-20 transition-all">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 w-full bg-[#14182a] overflow-y-auto pb-2 pt-8 pl-4 pr-0 xl:px-8 -ml-5 h-screen scrollbar-hide">
            <section className="w-full max-w-362.5 mx-auto">
                <div className="flex items-end gap-4 mb-8 pl-4 pr-0 md:pl-8 md:pr-0 xl:px-16">
                    <button 
                      onClick={() => navigate('/album')}
                      className="text-white hover:text-[#3BC8E7] transition-colors cursor-pointer outline-none shrink-0 mb-1"
                      title="Back"
                    >
                      <ArrowLeft size={32} />
                    </button>
                    
                    <div className="flex flex-col gap-1"> 
                        <h2 className="text-xl md:text-2xl font-bold text-[#3BC8E7] tracking-wide">
                            All Trending Albums
                        </h2>
                        <div className="h-0.75 w-12 bg-[#3BC8E7] rounded-full mt-1"></div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-8 pl-4 pr-0 md:pl-8 md:pr-0 xl:px-16 pb-20 justify-items-center">
                    {TRENDING_ALBUMS.map((album) => (
                        <AlbumCard key={album.id} album={album} className="w-full" />
                    ))}
                </div>
            </section>
        </main>
        <Footer />
      </div>
      <MusicPlayerBar isSidebarOpen={isNavbarOpen} />
    </div>
  );
};

export default AllTrendingAlbums;