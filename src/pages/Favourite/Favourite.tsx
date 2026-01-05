import { useRef, useState, useEffect } from "react";
import { WishlistAPI, SongWithDetails } from "../../api/core/favourite.api";
import { HomePageAPI } from "../../api/core/home.api";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";

const TableHeader = ({ title }: { title: string }) => (
    <div className="flex justify-between items-end mb-6 pb-2 bg-transparent">
        <div className="relative pb-2 bg-transparent">
            <h2 className="text-xl md:text-2xl font-semibold text-[#3BC8E7] tracking-wide">{title}</h2>
            <span className="absolute -bottom-2.5 left-0 w-12 h-1 bg-[#3BC8E7] rounded-full"></span>
        </div>
    </div>
);

const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex justify-between items-end mb-6 pb-2 bg-transparent">
        <div className="relative pb-2 bg-transparent">
            <h2 className="text-xl md:text-2xl font-semibold text-[#3BC8E7] tracking-wide">{title}</h2>
            <span className="absolute -bottom-2.5 left-0 w-12 h-1 bg-[#3BC8E7] rounded-full"></span>
        </div>
    </div>
);

const SongCard = ({ song }: { song: SongWithDetails }) => (
    <div className="group cursor-pointer bg-transparent">
        <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#3BC8E7]/50 w-43.75 h-43.75">
            <img 
                src={song.album_cover || song.artist_image} 
                alt={song.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
        </div>
        <h3 className="text-sm text-gray-200 font-medium truncate group-hover:text-[#3BC8E7] transition-colors w-43.75">{song.title}</h3>
        <p className="text-sm text-gray-400 truncate w-43.75">{song.artist_name}</p>
    </div>
);

export default function Favourite() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    // States
    const [wishlist, setWishlist] = useState<SongWithDetails[]>([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState<SongWithDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false); // View More state
    const [deleting, setDeleting] = useState<string | null>(null);

    // Lấy user từ localStorage
    const getUserId = () => {
        const userStr = localStorage.getItem('userLogin');
        return userStr ? JSON.parse(userStr).id : null;
    };

    /**
     * FETCH DATA
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userId = getUserId();

                if (!userId) {
                    console.log('ℹ️ User not logged in');
                    setLoading(false);
                    return;
                }

                // Fetch parallel
                const [wishlistData, recentlyPlayedData] = await Promise.all([
                    WishlistAPI.getUserWishlist(userId),
                    HomePageAPI.getRecentlyPlayed(userId, 6)
                ]);

                setWishlist(wishlistData);
                setRecentlyPlayed(recentlyPlayedData);

            } catch (error) {
                console.error('❌ Error loading favourite page:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    /**
     * DELETE SONG FROM WISHLIST
     */
    const handleDelete = async (songId: string) => {
        try {
            setDeleting(songId);
            const userId = getUserId();

            if (!userId) return;

            await WishlistAPI.removeFromWishlist(userId, songId);
            
            // Remove from UI
            setWishlist(prev => prev.filter(song => song.id !== songId));
            
            console.log('✅ Removed from wishlist');

        } catch (error) {
            console.error('❌ Error removing song:', error);
        } finally {
            setDeleting(null);
        }
    };

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
     * GET DISPLAY SONGS (10 first or all)
     */
    const displayedSongs = showAll ? wishlist : wishlist.slice(0, 10);

    /**
     * LOADING STATE
     */
    if (loading) {
        return (
            <div className="w-full min-h-screen bg-[#14182A] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#3BC8E7] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#3BC8E7] text-xl">Loading...</p>
                </div>
            </div>
        );
    }

    /**
     * NOT LOGGED IN
     */
    if (!getUserId()) {
        return (
            <div className="w-full min-h-screen bg-[#14182A] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 text-xl mb-4">Please login to view your favourites</p>
                    <button className="px-6 py-2 bg-[#3BC8E7] text-white rounded-lg hover:bg-[#2EA5C0] transition-colors">
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#14182A] flex">
            <Sidebar isOpen={isNavbarOpen} toggleSidebar={() => setIsNavbarOpen(!isNavbarOpen)} />

            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isNavbarOpen ? "ml-64" : "ml-20"}`}>
                <Header />
                
                <main className="bg-[#14182A] flex-1">
                    {/* WISHLIST TABLE */}
                    <section className="relative w-full mt-12">
                        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
                            <TableHeader title="My Favourite Songs" />

                            {wishlist.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 bg-gray-800/20 rounded-xl border-2 border-dashed border-gray-700">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-gray-600 mb-4">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="text-gray-400 text-lg font-medium mb-2">No favourite songs yet</p>
                                    <p className="text-gray-500 text-sm">Start adding songs to your favourites!</p>
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
                                                    <th className="text-[#2EC8E6] w-24 text-sm px-4 text-center">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {displayedSongs.map((song, index) => (
                                                    <tr key={song.id} className="h-16 hover:bg-gray-800/30 transition-colors border-b border-gray-800/50">
                                                        <td className="text-sm text-gray-400 px-4">{String(index + 1).padStart(2, '0')}</td>
                                                        <td className="px-4">
                                                            <div className="flex items-center gap-3">
                                                                <img 
                                                                    src={song.album_cover || song.artist_image} 
                                                                    alt={song.title}
                                                                    className="w-10 h-10 rounded object-cover"
                                                                />
                                                                <div>
                                                                    <p className="text-sm text-white font-medium truncate">{song.title}</p>
                                                                    <p className="text-xs text-gray-400 truncate">{song.artist_name}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-sm text-gray-400 px-4 truncate">{song.album_name}</td>
                                                        <td className="text-sm text-gray-400 text-center">{song.duration}</td>
                                                        <td className="text-center">
                                                            <button 
                                                                onClick={() => handleDelete(song.id)}
                                                                disabled={deleting === song.id}
                                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                                            >
                                                                {deleting === song.id ? (
                                                                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                                                ) : (
                                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                                                                        <circle cx="12" cy="12" r="10"/>
                                                                        <path d="m15 9-6 6m0-6 6 6"/>
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
                                    {wishlist.length > 10 && (
                                        <div className="flex justify-center mt-8">
                                            <button 
                                                onClick={() => setShowAll(!showAll)}
                                                className="px-8 py-3 bg-[#3BC8E7] hover:bg-[#2EA5C0] text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-[#3BC8E7]/50"
                                            >
                                                {showAll ? 'Show Less' : `View More (${wishlist.length - 10} more)`}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </section>

                    {/* RECENTLY PLAYED */}
                    <section className="relative w-full overflow-hidden mt-16 mb-20">
                        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12 bg-transparent">
                            <div className="relative group/slider bg-transparent">
                                <SectionHeader title="Recently Played" />

                                {recentlyPlayed.length > 0 ? (
                                    <>
                                        <button onClick={() => scroll("left", scrollContainerRef)} className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
                                        </button>

                                        <button onClick={() => scroll("right", scrollContainerRef)} className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
                                        </button>

                                        <div ref={scrollContainerRef} className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                                            {recentlyPlayed.map(song => (
                                                <div key={song.id} className="snap-start shrink-0">
                                                    <SongCard song={song} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 bg-gray-800/20 rounded-xl">
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