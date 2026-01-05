import Header from "../../components/Header/Header";
import Sidebar from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import { useRef, useState } from "react";

const SectionHeader = ({
  title,
  showViewMore = false,
  buttonText = "View More"
}: {
  title: string;
  showViewMore?: boolean;
  buttonText?: string;
}) => (
  <div className="flex justify-between items-end mb-6 pb-2 bg-transparent">
    <div className="relative pb-2 bg-transparent">
      <h2 className="text-xl md:text-2xl font-semibold text-[#3BC8E7] tracking-wide">
        {title}
      </h2>
      <span className="absolute -bottom-2.5 left-0 w-12 h-1 bg-[#3BC8E7] rounded-full"></span>
    </div>
    {showViewMore && (
      <button className="px-8 py-3 text-[18px] cursor-pointer bg-[#3BC8E7] hover:bg-[#2EA5C0] text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-[#3BC8E7]/50">
        {buttonText}
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
  {
    id: 7,
    title: "Desired Games",
    artist: "Ava Cornish & Brian Hill",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Desired Games",
    artist: "Ava Cornish & Brian Hill",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Desired Games",
    artist: "Ava Cornish & Brian Hill",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Desired Games",
    artist: "Ava Cornish & Brian Hill",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 11,
    title: "Desired Games",
    artist: "Ava Cornish & Brian Hill",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 12,
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

export default function history() {
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
          <section className="relative w-full overflow-hidden mt-20.25 mb-20">
            <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12 bg-transparent">
              <div className="relative bg-transparent">
                <SectionHeader title="History" showViewMore={true} buttonText="Clear" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                  {RECENTLY_PLAYED.map((song) => (
                    <div key={song.id}>
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
