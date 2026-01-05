import Header from "../../components/Header/Header";
import Sidebar from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import { useRef, useState } from "react";

interface TopSong {
    rank: number;
    title: string;
    artist: string;
    image: string;
    price: string;
}

const TOP_15_SONGS: TopSong[] = [
    {
        rank: 1,
        title: "Until I Met You",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 2,
        title: "Walking Promises",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 3,
        title: "Gimme Some Courage",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 4,
        title: "Desired Games",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 5,
        title: "Dark Alley Acoustic",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 6,
        title: "Walking Promises",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 7,
        title: "Endless Things",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 8,
        title: "Dream Your Moments",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 9,
        title: "Until I Met You",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 10,
        title: "Gimme Some Courage",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 11,
        title: "Dark Alley Acoustic",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 12,
        title: "The Heartbeat Stops",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 13,
        title: "One More Stranger",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 14,
        title: "Walking Promises",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
    {
        rank: 15,
        title: "Endless Things",
        artist: "Ava Cornish",
        image:
            "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=400&auto=format&fit=crop",
        price: "5/10",
    },
];

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

const TopSongRow = ({ song }: { song: TopSong }) => {
    return (
        <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-800/30 rounded-lg transition-colors group cursor-pointer">
            <div className="flex items-center gap-4 flex-1">
                <span className="text-2xl font-bold text-white w-8">
                    {String(song.rank).padStart(2, "0")}
                </span>
                <img
                    src={song.image}
                    alt={song.title}
                    className="w-12.5 h-12.5 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] text-white font-medium truncate group-hover:text-[#3BC8E7] transition-colors">
                        {song.title}
                    </h4>
                    <p className="text-[12px] text-gray-400 truncate">{song.artist}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-[14px] text-gray-400">{song.price}</span>
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

interface Song {
    id: number;
    title: string;
    artist: string;
    image: string;
}

const TOP_TRACK: Song[] = [
    {
        id: 1,
        title: "Dream Your Moments (Dust)",
        artist: "Ava Cornish & Brian Hill",
        image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Until I Met You",
        artist: "Ava Cornish & Brian Hill",
        image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Gimme Some Courage",
        artist: "Ava Cornish & Brian Hill",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Dark Alley Acoustic",
        artist: "Ava Cornish & Brian Hill",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Walking Promises",
        artist: "Ava Cornish & Brian Hill",
        image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Desired Games",
        artist: "Ava Cornish & Brian Hill",
        image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    },
];

const SongCard = ({ song }: { song: Song }) => {
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
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
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

interface Trending {
    id: number;
    title: string;
    artist: string;
    duration: string;
    image: string;
}

const TRENDING_TRACK: Trending[] = [
    {
        id: 1,
        title: "Dark Alley Acoustic",
        artist: "Ava Cornish",
        duration: "5:10",
        image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Dark Alley Acoustic",
        artist: "Ava Cornish",
        duration: "5:10",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Dark Alley Acoustic",
        artist: "Ava Cornish",
        duration: "5:10",
        image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Dark Alley Acoustic",
        artist: "Ava Cornish",
        duration: "5:10",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Dark Alley Acoustic",
        artist: "Ava Cornish",
        duration: "5:10",
        image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
];

const TrendingCard = ({
    release,
    isLast,
}: {
    release: Trending;
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

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

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
    return (
        <div className="w-full min-h-screen bg-[#14182A] flex">
            <Sidebar
                isOpen={isNavbarOpen}
                toggleSidebar={() => setIsNavbarOpen(!isNavbarOpen)}
            />

            <div
                className={`
            flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
            ${isNavbarOpen ? "ml-45 md:ml-62.5" : "ml-20"} 
        `}
            >
                <Header />
                <main className="bg-[#14182A]">
                    <section className="relative w-full overflow-hidden mt-10.75">
                        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
                            <SectionHeader title="Weekly Top 15" />

                            <div className="hidden lg:grid lg:grid-cols-3 gap-x-8 gap-y-4">
                                {TOP_15_SONGS.map((song) => (
                                    <TopSongRow key={song.rank} song={song} />
                                ))}
                            </div>

                            <div className="lg:hidden space-y-2">
                                {TOP_15_SONGS.map((song) => (
                                    <TopSongRow key={song.rank} song={song} />
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="relative w-full overflow-hidden mt-10.75 mb-20">
                        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12 bg-transparent">
                            <div className="relative group/slider bg-transparent">
                                <SectionHeader title="Top Tracks Of All Time" />

                                <button
                                    onClick={() => scroll("left", scrollContainerRef)}
                                    className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m15 18-6-6 6-6" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => scroll("right", scrollContainerRef)}
                                    className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </button>

                                <div
                                    ref={scrollContainerRef}
                                    className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                >
                                    {TOP_TRACK.slice(0, 1).map((song) => (
                                        <div
                                            key={song.id}
                                            className="snap-start shrink-0 md:hidden"
                                        >
                                            <SongCard song={song} />
                                        </div>
                                    ))}
                                    {TOP_TRACK.slice(0, 2).map((song) => (
                                        <div
                                            key={song.id}
                                            className="snap-start shrink-0 hidden md:block lg:hidden"
                                        >
                                            <SongCard song={song} />
                                        </div>
                                    ))}
                                    {TOP_TRACK.map((song) => (
                                        <div
                                            key={song.id}
                                            className="snap-start shrink-0 hidden lg:block"
                                        >
                                            <SongCard song={song} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="relative w-full overflow-hidden mt-12">
                        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
                            <div className="relative group/slider">
                                <SectionHeader title="Trending Tracks" showViewMore={false} />

                                <button
                                    onClick={() => scroll("left", releaseScrollRef)}
                                    className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m15 18-6-6 6-6" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => scroll("right", releaseScrollRef)}
                                    className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </button>

                                <div
                                    ref={releaseScrollRef}
                                    className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                >
                                    <div className="flex gap-0">
                                        {TRENDING_TRACK.slice(0, 2).map((release, index) => (
                                            <div
                                                key={release.id}
                                                className="snap-start shrink-0 lg:hidden"
                                            >
                                                <TrendingCard release={release} isLast={index === 1} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="hidden lg:flex md:flex gap-0">
                                        {TRENDING_TRACK.slice(0, 3).map((release, index) => (
                                            <div
                                                key={release.id}
                                                className="snap-start shrink-0 md:block lg:hidden"
                                            >
                                                <TrendingCard release={release} isLast={index === 2} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="hidden lg:flex gap-0">
                                        {TRENDING_TRACK.map((release, index) => (
                                            <div key={release.id} className="snap-start shrink-0">
                                                <TrendingCard
                                                    release={release}
                                                    isLast={index === TRENDING_TRACK.length - 1}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}
