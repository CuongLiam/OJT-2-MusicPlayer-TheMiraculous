import Header from "../../components/Header/Header";
import Sidebar, { useSidebarState } from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import { useRef, useState, useEffect } from "react";
import { 
    TopTrackAPI, 
    TopSongRow as TopSongRowType,
    TopTrackCard,
    TrendingTrack 
} from "../../api/core/toptrack.api";

const SectionHeader = ({
    title,
    showViewMore = false,
}: {
    title: string;
    showViewMore?: boolean;
}) => (
    <div className="flex justify-between items-end mb-6 pb-2 bg-transparent">
        <div className="relative pb-2 bg-transparent">
            <h2 className="text-xl md:text-2xl font-semibold text-[#3BC8E7] tracking-wide">
                {title}
            </h2>
            <span className="absolute -bottom-2.5 left-0 w-12 h-1 bg-[#3BC8E7] rounded-full"></span>
        </div>
        {showViewMore && (
            <button className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer mb-2 bg-transparent">
                View More
            </button>
        )}
    </div>
);

const TopSongRow = ({ song }: { song: TopSongRowType }) => {
    return (
        <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-800/30 rounded-lg transition-colors group cursor-pointer">
            <div className="flex items-center gap-4 flex-1">
                <span 
                    className={`text-2xl font-bold w-8 ${
                        song.rank <= 3 ? 'text-[#3BC8E7]' : 'text-white'
                    }`}
                >
                    {String(song.rank).padStart(2, "0")}
                </span>
                <img
                    src={song.image}
                    alt={song.title}
                    className="w-12.5 h-12.5 rounded-lg object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/50?text=No+Image";
                    }}
                />
                <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] text-white font-medium truncate group-hover:text-[#3BC8E7] transition-colors">
                        {song.title}
                    </h4>
                    <p className="text-[12px] text-gray-400 truncate">{song.artist}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-[14px] text-gray-400">{song.duration}</span>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="6" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="18" r="1.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const SongCard = ({ song }: { song: TopTrackCard }) => {
    return (
        <div className="group cursor-pointer bg-transparent">
            <div
                className="relative overflow-hidden rounded-xl mb-3 bg-gray-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#3BC8E7]/50 group-hover:ring-offset-1 group-hover:ring-offset-[#14182A]
                      w-83.5 h-83.5
                      lg:w-43.75 lg:h-43.75"
            >
                <img
                    src={song.image}
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
            <h3
                className="text-[12px] lg:text-[14px] text-gray-200 font-medium truncate group-hover:text-[#3BC8E7] transition-colors 
                     w-83.5 lg:w-43.75"
            >
                {song.title}
            </h3>
            <p
                className="text-[12px] lg:text-[14px] text-gray-400 truncate 
                    w-83.5 lg:w-43.75"
            >
                {song.artist}
            </p>
        </div>
    );
};

const TrendingCard = ({
    release,
    isLast,
}: {
    release: TrendingTrack;
    isLast: boolean;
}) => {
    return (
        <div className="relative flex flex-col items-start w-[297.5px]">
            <div className="relative w-full mb-7">
                <div className="w-3 h-3 rounded-full border-2 border-[#3BC8E7] bg-[#14182A] absolute left-0"></div>
                {!isLast && (
                    <div className="absolute top-1.5 left-3 w-[293.5px] h-0.5 bg-gray-700"></div>
                )}
            </div>

            <div className="flex items-center gap-4 w-full">
                <img
                    src={release.image}
                    alt={release.title}
                    className="w-12.5 h-12.5 rounded-lg object-cover shrink-0"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/50?text=No+Image";
                    }}
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h4 className="text-[14px] text-white font-medium truncate">
                            {release.title}
                        </h4>
                        <span className="text-[14px] text-gray-400 shrink-0">
                            {release.duration}
                        </span>
                    </div>
                    <p className="text-[12px] text-gray-400 truncate">{release.artist}</p>
                </div>
            </div>
        </div>
    );
};

export default function TopTrack() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const releaseScrollRef = useRef<HTMLDivElement>(null);

    const { isNavbarOpen, toggleSidebar, setSidebarOpen } = useSidebarState();

    // States
    const [weeklyTop15, setWeeklyTop15] = useState<TopSongRowType[]>([]);
    const [topTracksAllTime, setTopTracksAllTime] = useState<TopTrackCard[]>([]);
    const [trendingTracks, setTrendingTracks] = useState<TrendingTrack[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * FETCH ALL DATA FROM API
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log('📥 Fetching top track page data...');

                // Fetch all data at once
                const data = await TopTrackAPI.getAllTopTrackData();

                console.log('✅ All data loaded successfully');

                setWeeklyTop15(data.weeklyTop15);
                setTopTracksAllTime(data.topTracksAllTime);
                setTrendingTracks(data.trendingTracks);

            } catch (err) {
                console.error('❌ Error loading top track page:', err);
                setError('Failed to load data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const scroll = (
        direction: "left" | "right",
        ref: React.RefObject<HTMLDivElement>
    ) => {
        if (ref.current) {
            const { current } = ref;
            const scrollAmount = 300;
            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    /**
     * LOADING STATE
     */
    if (loading) {
        return (
            <div className="w-full min-h-screen bg-[#14182A] flex">
                <Sidebar isOpen={isNavbarOpen} toggleSidebar={toggleSidebar} />

                <div className="flex-1 flex items-center justify-center ml-0 xl:ml-20 transition-all duration-300">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-[#3BC8E7] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[#3BC8E7] text-xl">Loading top tracks...</p>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * ERROR STATE
     */
    if (error) {
        return (
            <div className="w-full min-h-screen bg-[#14182A] flex">
                <Sidebar isOpen={isNavbarOpen} toggleSidebar={toggleSidebar} />

                <div className="flex-1 flex items-center justify-center ml-0 xl:ml-20 transition-all duration-300">
                    <div className="bg-red-500/10 border border-red-500 rounded-xl p-8 max-w-md">
                        <p className="text-red-500 text-xl text-center">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#14182A] flex select-none">
            <Sidebar isOpen={isNavbarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-20 transition-all duration-300 ease-in-out">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                
                <main className="bg-[#14182A] w-full">
                    {/* WEEKLY TOP 15 SECTION */}
                    <section className="relative w-full overflow-hidden mt-10.75">
                        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
                            <SectionHeader title="Weekly Top 15" />

                            {weeklyTop15.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 bg-gray-800/20 rounded-xl">
                                    <p className="text-gray-400">No songs available</p>
                                </div>
                            ) : (
                                <>
                                    {/* Desktop: 3 columns (5 + 5 + 5) */}
                                    <div className="hidden lg:grid lg:grid-cols-3 gap-x-8">
                                        {/* Column 1: Rank 1-5 */}
                                        <div className="space-y-0">
                                            {weeklyTop15.slice(0, 5).map((song) => (
                                                <TopSongRow key={song.id} song={song} />
                                            ))}
                                        </div>

                                        {/* Column 2: Rank 6-10 */}
                                        <div className="space-y-0">
                                            {weeklyTop15.slice(5, 10).map((song) => (
                                                <TopSongRow key={song.id} song={song} />
                                            ))}
                                        </div>

                                        {/* Column 3: Rank 11-15 */}
                                        <div className="space-y-0">
                                            {weeklyTop15.slice(10, 15).map((song) => (
                                                <TopSongRow key={song.id} song={song} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mobile/Tablet: Single column */}
                                    <div className="lg:hidden space-y-2">
                                        {weeklyTop15.map((song) => (
                                            <TopSongRow key={song.id} song={song} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </section>

                    {/* TOP TRACKS OF ALL TIME SECTION */}
                    <section className="relative w-full overflow-hidden mt-10.75 mb-20">
                        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12 bg-transparent">
                            <div className="relative group/slider bg-transparent">
                                <SectionHeader title="Top Tracks Of All Time" />

                                {topTracksAllTime.length > 0 && (
                                    <>
                                        <button
                                            onClick={() => scroll("left", scrollContainerRef)}
                                            className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m15 18-6-6 6-6" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => scroll("right", scrollContainerRef)}
                                            className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>
                                        </button>

                                        <div
                                            ref={scrollContainerRef}
                                            className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                        >
                                            {topTracksAllTime.map((song) => (
                                                <div key={song.id} className="snap-start shrink-0">
                                                    <SongCard song={song} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* TRENDING TRACKS SECTION */}
                    <section className="relative w-full overflow-hidden mt-12 mb-20">
                        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
                            <div className="relative group/slider">
                                <SectionHeader title="Trending Tracks" showViewMore={false} />

                                {trendingTracks.length > 0 && (
                                    <>
                                        <button
                                            onClick={() => scroll("left", releaseScrollRef)}
                                            className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m15 18-6-6 6-6" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => scroll("right", releaseScrollRef)}
                                            className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>
                                        </button>

                                        <div
                                            ref={releaseScrollRef}
                                            className="flex gap-0 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                        >
                                            {trendingTracks.map((release, index) => (
                                                <div key={release.id} className="snap-start shrink-0">
                                                    <TrendingCard
                                                        release={release}
                                                        isLast={index === trendingTracks.length - 1}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </>
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