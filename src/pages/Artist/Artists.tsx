import React, { useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Header/Sidebar';
import Footer from '../../components/Footer/Footer';
import MusicPlayerBar from '../../components/Bar/MusicPlayerBar';
import '../../assets/css/Font.css';

interface Artist {
  id: number;
  name: string;
  image: string;
  isActive?: boolean;
}

const FEATURED_ARTISTS: Artist[] = [
  { id: 1, name: "Best Of Ava Cornish", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Until I Met You", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Gimme Some Courage", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Dark Alley Acoustic", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
  { id: 5, name: "Walking Promises", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" },
  { id: 6, name: "Desired Games", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
  { id: 7, name: "Midnight Echoes", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop" },
];

const ALL_ARTISTS: Artist[] = [
  { id: 101, name: "Claire Hudson", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" },
  { id: 102, name: "Carl Brown", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop" },
  { id: 103, name: "Virginia Harris", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop" },
  { id: 104, name: "Max Glover", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=400&auto=format&fit=crop"},
  { id: 105, name: "Jennifer Kelly", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop" },
  { id: 106, name: "Harry Jackson", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { id: 107, name: "Kevin Buckland", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=400&auto=format&fit=crop" },
  { id: 108, name: "Anna Ellison", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop" },
  { id: 109, name: "Kylie Greene", image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=400&auto=format&fit=crop" },
  { id: 110, name: "Sarah Wilson", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { id: 111, name: "Jennifer Kelly", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop" },
  { id: 112, name: "Steven Walker", image: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=400&auto=format&fit=crop" },
];

const SectionHeader = ({ title, showViewMore = false }: { title: string, showViewMore?: boolean }) => (
  <div className="flex justify-between items-end mb-6 md:mb-8 border-b border-gray-800 pb-2">
    <div className="relative pb-2">
      <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-cyan-400 tracking-wide">{title}</h2>
      <span className="absolute -bottom-2.5 left-0 w-12 h-1 bg-cyan-500 rounded-full"></span>
    </div>
    {showViewMore && (
      <button className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer mb-2">
        View More
      </button>
    )}
  </div>
);

const ArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <div className="group cursor-pointer">
      <div className={`relative overflow-hidden rounded-xl aspect-3/4 sm:aspect-square mb-3 bg-gray-800 transition-all duration-300 
          ${artist.isActive ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-[#0f1218]' : 'group-hover:ring-2 group-hover:ring-cyan-500/50 group-hover:ring-offset-1 group-hover:ring-offset-[#0f1218]'}
        `}>
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>
      <h3 className="text-xs sm:text-sm md:text-[15px] text-gray-200 font-medium truncate group-hover:text-cyan-400 transition-colors">
        {artist.name}
      </h3>
    </div>
  );
};

const Artists: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#14182a] flex select-none">

      <Sidebar
        isOpen={isNavbarOpen}
        toggleSidebar={() => setIsNavbarOpen(!isNavbarOpen)}
      />

      <div
        className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-20 transition-all duration-300 ease-in-out"
      >
        <Header />

        <main className="flex-1 max-w-360 mx-auto w-full text-white p-3 sm:p-5 md:py-8 md:px-16 font-sans overflow-x-hidden bg-[#14182a] pb-28 artists-josefin">

          <section className="mb-12 relative group/slider">
            <SectionHeader title="Featured Artists" />

            <button
              onClick={() => scroll('left')}
              className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-cyan-600 hover:border-cyan-500 rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 md:flex cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            <button
              onClick={() => scroll('right')}
              className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-cyan-600 hover:border-cyan-500 rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 md:flex cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {FEATURED_ARTISTS.map((artist) => (
                <div key={artist.id} className="min-w-32 sm:min-w-40 md:min-w-50 snap-start">
                  <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Top Artists" showViewMore={true} />

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {ALL_ARTISTS.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </section>
        </main>

        <Footer />
        <MusicPlayerBar isSidebarOpen={isNavbarOpen} />
      </div>
    </div>
  );
};

export default Artists;