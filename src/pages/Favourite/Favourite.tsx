import Header from "../../components/Header/Header";
import Sidebar from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import Delete from "../../assets/image/delete-favourite.png";
import { useRef, useState } from "react";

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

interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
}

const RECENTLY_PLAYED: Song[] = [
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

export default function Favourite() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
          <section className="relative w-full mt-12">
            <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
              <TableHeader title="Free downloads" />
              <table className="w-full table-fixed ">
                <tr className="relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-linear-to-r after:from-cyan-400/20 after:via-cyan-400/60 after:to-cyan-400 h-8.5">
                  <th className="text-[#2EC8E6] w-39 size-3.75 px-1 text-left">
                    • #
                  </th>
                  <th className="text-[#2EC8E6] w-72.5 size-3.75 px-1 text-left">
                    • Song Title
                  </th>
                  <th className="text-[#2EC8E6] w-50 size-3.75 px-1 text-left">
                    • Album
                  </th>
                  <th className="text-[#2EC8E6] w-47.5 size-3.75 text-center px-1">
                    • Duration
                  </th>
                  <th className="text-[#2EC8E6] w-39 size-3.75 px-1 text-center">
                    • Remove
                  </th>
                </tr>
                <tr className="h-8.5">
                  <td className="size-3.5 text-white px-4">01</td>
                  <td className="size-3.5 text-white px-4">Bloodlust</td>
                  <td className="size-3.5 text-white px-4">
                    Dream your moments
                  </td>
                  <td className="size-3.5 text-white text-center">5:26</td>
                  <td className="size-3.5 text-center">
                    <img src={Delete} className="cursor-pointer inline-block" />
                  </td>
                </tr>
                <tr className="h-8.5">
                  <td className="size-3.5 text-white px-4">01</td>
                  <td className="size-3.5 text-white px-4">Bloodlust</td>
                  <td className="size-3.5 text-white px-4">
                    Dream your moments
                  </td>
                  <td className="size-3.5 text-white text-center">5:26</td>
                  <td className="size-3.5 text-center">
                    <img src={Delete} className="cursor-pointer inline-block" />
                  </td>
                </tr>
                <tr className="h-8.5">
                  <td className="size-3.5 text-white px-4">01</td>
                  <td className="size-3.5 text-white px-4">Bloodlust</td>
                  <td className="size-3.5 text-white px-4">
                    Dream your moments
                  </td>
                  <td className="size-3.5 text-white text-center">5:26</td>
                  <td className="size-3.5 text-center">
                    <img src={Delete} className="cursor-pointer inline-block" />
                  </td>
                </tr>
                <tr className="h-8.5">
                  <td className="size-3.5 text-white px-4">01</td>
                  <td className="size-3.5 text-white px-4">Bloodlust</td>
                  <td className="size-3.5 text-white px-4">
                    Dream your moments
                  </td>
                  <td className="size-3.5 text-white text-center">5:26</td>
                  <td className="size-3.5 text-center">
                    <img src={Delete} className="cursor-pointer inline-block" />
                  </td>
                </tr>
                <tr className="h-8.5">
                  <td className="size-3.5 text-white px-4">01</td>
                  <td className="size-3.5 text-white px-4">Bloodlust</td>
                  <td className="size-3.5 text-white px-4">
                    Dream your moments
                  </td>
                  <td className="size-3.5 text-white text-center">5:26</td>
                  <td className="size-3.5 text-center">
                    <img src={Delete} className="cursor-pointer inline-block" />
                  </td>
                </tr>
              </table>
              <div className="flex justify-center mt-8">
                <button className="px-8 py-3 bg-[#3BC8E7] hover:bg-[#2EA5C0] text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-[#3BC8E7]/50">
                  View More
                </button>
              </div>
            </div>
          </section>

          <section className="relative w-full overflow-hidden mt-10.75 mb-20">
            <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12 bg-transparent">
              <div className="relative group/slider bg-transparent">
                <SectionHeader title="Recently Played" />

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
                  {RECENTLY_PLAYED.slice(0, 1).map((song) => (
                    <div
                      key={song.id}
                      className="snap-start shrink-0 md:hidden"
                    >
                      <SongCard song={song} />
                    </div>
                  ))}
                  {RECENTLY_PLAYED.slice(0, 2).map((song) => (
                    <div
                      key={song.id}
                      className="snap-start shrink-0 hidden md:block lg:hidden"
                    >
                      <SongCard song={song} />
                    </div>
                  ))}
                  {RECENTLY_PLAYED.map((song) => (
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
        </main>
        <Footer />
      </div>
    </div>
  );
}
