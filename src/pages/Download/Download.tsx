import Header from "../../components/Header/Header";
import Sidebar from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect, useRef } from "react";
import { 
  DownloadAPI, 
  DownloadTableSong, 
  DownloadSongCard 
} from "../../api/core/download.api";

const TableHeader = ({ title }: { title: string }) => (
  <div className="flex justify-between items-end mb-6 pb-2 bg-transparent">
    <div className="relative pb-2 bg-transparent">
      <h2 className="text-xl md:text-2xl font-semibold text-[#3BC8E7] tracking-wide">
        {title}
      </h2>
      <span className="absolute -bottom-2.5 left-0 w-12 h-1 bg-[#3BC8E7] rounded-full"></span>
    </div>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex justify-between items-end mb-6 pb-2 bg-transparent">
    <div className="relative pb-2 bg-transparent">
      <h2 className="text-xl md:text-2xl font-semibold text-[#3BC8E7] tracking-wide">
        {title}
      </h2>
      <span className="absolute -bottom-2.5 left-0 w-12 h-1 bg-[#3BC8E7] rounded-full"></span>
    </div>
  </div>
);

/**
 * SONG CARD COMPONENT 
 */
const SongCardComponent = ({ song, onClick }: { song: DownloadSongCard; onClick?: () => void }) => (
  <div className="group cursor-pointer bg-transparent" onClick={onClick}>
    <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#3BC8E7]/50 w-43.75 h-43.75">
      <img
        src={song.album_cover}
        alt={song.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/175?text=No+Image";
        }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-[#3BC8E7] rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
    <h3 className="text-sm text-gray-200 font-medium truncate group-hover:text-[#3BC8E7] transition-colors w-43.75">
      {song.title}
    </h3>
    <p className="text-sm text-gray-400 truncate w-43.75">{song.artist_name}</p>
  </div>
);

export default function Download() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [downloadedSongs, setDownloadedSongs] = useState<DownloadTableSong[]>([]);
  const [downloadNowSongs, setDownloadNowSongs] = useState<DownloadSongCard[]>([]);
  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState<DownloadSongCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  // Refs for scrolling
  const downloadNowRef = useRef<HTMLDivElement>(null);
  const recentlyPlayedRef = useRef<HTMLDivElement>(null);

  // Get user from localStorage
  const getUserId = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr).id : null;
  };

  /**
   * FETCH ALL DATA FROM API
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = getUserId();

        console.log('📥 Fetching download page data...');

        // Fetch parallel - all API calls at once
        const [tableData, downloadNow, recentlyPlayed] = await Promise.all([
          DownloadAPI.getFreeDownloads(),
          DownloadAPI.getDownloadNow(15),
          DownloadAPI.getRecentlyPlayed(userId, 6)
        ]);

        console.log('✅ All data loaded successfully');

        setDownloadedSongs(tableData);
        setDownloadNowSongs(downloadNow);
        setRecentlyPlayedSongs(recentlyPlayed);

      } catch (error) {
        console.error('❌ Error loading download page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * SCROLL FUNCTION
   */
  const scroll = (direction: "left" | "right", ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  /**
   * HANDLE REMOVE DOWNLOAD
   */
  const handleRemove = async (songId: string) => {
    try {
      setRemoving(songId);
      const userId = getUserId();

      await DownloadAPI.removeFromDownloads(userId, songId);
      
      // Remove from UI
      setDownloadedSongs((prev) => prev.filter((song) => song.id !== songId));
      
      console.log("✅ Removed from downloads");

    } catch (error) {
      console.error("❌ Error removing song:", error);
      alert('Failed to remove song. Please try again.');
    } finally {
      setRemoving(null);
    }
  };

  /**
   * HANDLE ADD TO FAVOURITES
   */
  const handleAddToFavourites = async (songId: string) => {
    try {
      const userId = getUserId();

      await DownloadAPI.addToFavourites(userId, songId);
      alert('Added to favourites!');

    } catch (error) {
      console.error('❌ Error adding to favourites:', error);
      alert('Failed to add to favourites. Please try again.');
    }
  };

  /**
   * HANDLE SONG CLICK
   */
  const handleSongClick = (songId: string) => {
    console.log("Play song:", songId);
    // TODO: Integrate with music player
  };

  /**
   * GET DISPLAY SONGS (10 first or all)
   */
  const displayedSongs = showAll ? downloadedSongs : downloadedSongs.slice(0, 10);

  /**
   * LOADING STATE
   */
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#14182A] flex">
        <Sidebar isOpen={isNavbarOpen} toggleSidebar={() => setIsNavbarOpen(!isNavbarOpen)} />

        <div
          className={`flex-1 flex items-center justify-center transition-all duration-300 ${
            isNavbarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#3BC8E7] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#3BC8E7] text-xl">Loading downloads...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#14182A] flex">
      <Sidebar isOpen={isNavbarOpen} toggleSidebar={() => setIsNavbarOpen(!isNavbarOpen)} />

      <div
        className={`
          flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
          ${isNavbarOpen ? "ml-64" : "ml-20"} 
        `}
      >
        <Header />

        <main className="bg-[#14182A] flex-1">
          {/* FREE DOWNLOADS TABLE */}
          <section className="relative w-full mt-12">
            <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
              <TableHeader title="Free Downloads" />

              {downloadedSongs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-800/20 rounded-xl border-2 border-dashed border-gray-700">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-gray-600 mb-4">
                    <path
                      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-gray-400 text-lg font-medium mb-2">No downloads yet</p>
                  <p className="text-gray-500 text-sm">Start downloading songs to listen offline!</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full table-fixed">
                      <thead>
                        <tr className="relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-linear-to-r after:from-cyan-400/20 after:via-cyan-400/60 after:to-cyan-400 h-12">
                          <th className="text-[#2EC8E6] w-16 text-sm px-4 text-left">#</th>
                          <th className="text-[#2EC8E6] text-sm px-4 text-left">Song Title</th>
                          <th className="text-[#2EC8E6] text-sm px-4 text-left">Album</th>
                          <th className="text-[#2EC8E6] w-32 text-sm text-center px-4">Duration</th>
                          <th className="text-[#2EC8E6] w-40 text-sm px-4 text-center">Add To Favourites</th>
                          <th className="text-[#2EC8E6] w-24 text-sm px-4 text-center">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedSongs.map((song, index) => (
                          <tr
                            key={song.id}
                            className="h-16 hover:bg-gray-800/30 transition-colors border-b border-gray-800/50"
                          >
                            <td className="text-sm text-gray-400 px-4">{String(index + 1).padStart(2, "0")}</td>
                            <td className="px-4">
                              <div className="text-sm text-white font-medium truncate">{song.title}</div>
                            </td>
                            <td className="text-sm text-[#3BC8E7] px-4 truncate hover:underline cursor-pointer">
                              {song.album}
                            </td>
                            <td className="text-sm text-gray-400 text-center">{song.duration}</td>
                            <td className="text-center">
                              <button
                                onClick={() => handleAddToFavourites(song.id)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-500/20 transition-colors group"
                                title="Add to favourites"
                              >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400 group-hover:text-red-500 transition-colors">
                                  <path
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </td>
                            <td className="text-center">
                              <button
                                onClick={() => handleRemove(song.id)}
                                disabled={removing === song.id}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#3BC8E7]/20 transition-colors disabled:opacity-50"
                                title="Remove from downloads"
                              >
                                {removing === song.id ? (
                                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#3BC8E7]">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="m15 9-6 6m0-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* VIEW MORE BUTTON */}
                  {downloadedSongs.length > 10 && (
                    <div className="flex justify-center mt-8 mb-12">
                      <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-8 py-3 bg-[#3BC8E7] hover:bg-[#2EA5C0] text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-[#3BC8E7]/50"
                      >
                        {showAll ? "Show Less" : `View More (${downloadedSongs.length - 10} more)`}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* DOWNLOAD NOW SECTION */}
          <section className="relative w-full overflow-hidden mt-12">
            <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
              <div className="relative group/slider">
                <SectionHeader title="Download Now" />

                {downloadNowSongs.length > 0 ? (
                  <>
                    <button
                      onClick={() => scroll("left", downloadNowRef)}
                      className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>

                    <button
                      onClick={() => scroll("right", downloadNowRef)}
                      className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>

                    <div
                      ref={downloadNowRef}
                      className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {downloadNowSongs.map((song) => (
                        <div key={song.id} className="snap-start shrink-0">
                          <SongCardComponent song={song} onClick={() => handleSongClick(song.id)} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 bg-gray-800/20 rounded-xl">
                    <p className="text-gray-400">No songs available</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* RECENTLY PLAYED SECTION */}
          <section className="relative w-full overflow-hidden mt-12 mb-20">
            <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
              <div className="relative group/slider">
                <SectionHeader title="Recently Played" />

                {recentlyPlayedSongs.length > 0 ? (
                  <>
                    <button
                      onClick={() => scroll("left", recentlyPlayedRef)}
                      className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>

                    <button
                      onClick={() => scroll("right", recentlyPlayedRef)}
                      className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>

                    <div
                      ref={recentlyPlayedRef}
                      className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {recentlyPlayedSongs.map((song) => (
                        <div key={song.id} className="snap-start shrink-0">
                          <SongCardComponent song={song} onClick={() => handleSongClick(song.id)} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 bg-gray-800/20 rounded-xl border-2 border-dashed border-gray-700">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-gray-600 mb-4">
                      <path
                        d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray-400">No recently played songs</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}