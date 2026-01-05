import React, { useRef, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar, { useSidebarState } from '../../components/Header/Sidebar';
import Footer from '../../components/Footer/Footer';
import MusicPlayerBar from '../../components/Bar/MusicPlayerBar';
import '../../assets/css/Font.css';

interface Artist {
  id: number;
  name: string;
  image: string;
  isActive?: boolean;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  profile_image: string;
  roles: string[];
}

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
  const { isNavbarOpen, toggleSidebar, setSidebarOpen } = useSidebarState();

  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [featuredArtists, setFeaturedArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data: User[] = await response.json();

        const artistUsers = data.filter(user => user.roles.includes('ROLE_ARTIST'));

        const formattedArtists: Artist[] = artistUsers.map(user => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`, 
          image: user.profile_image,
          isActive: false
        }));

        setAllArtists(formattedArtists);
        setFeaturedArtists(formattedArtists.slice(0, 7));

      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

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
        toggleSidebar={toggleSidebar}
      />

      <div
        className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-20 transition-all duration-300 ease-in-out"
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />

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
              {featuredArtists.length > 0 ? (
                featuredArtists.map((artist) => (
                  <div key={artist.id} className="min-w-32 sm:min-w-40 md:min-w-50 snap-start">
                    <ArtistCard artist={artist} />
                  </div>
                ))
              ) : (
                 <div className="text-gray-400 italic pl-2">Loading featured artists...</div>
              )}
            </div>
          </section>

          <section>
            <SectionHeader title="Top Artists" showViewMore={true} />

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {allArtists.length > 0 ? (
                allArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">Loading artists...</div>
              )}
            </div>
          </section>
        </main>

        <Footer />
        {/* <MusicPlayerBar isSidebarOpen={isNavbarOpen} /> */}
      </div>
    </div>
  );
};

export default Artists;