import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AlbumCard, { type AlbumData } from './AlbumCard';

const TRENDING_ALBUMS: AlbumData[] = [
  { id: 1, title: "Bloodlust", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
    { id: 2, title: "Time flies", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
    { id: 3, title: "Dark matters", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
    { id: 4, title: "Eye to eye", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" },
    { id: 5, title: "Cloud nine", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
    { id: 6, title: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
    { id: 7, title: "New Horizon", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" },
    { id: 8, title: "Dream Your Moments (Duet)", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop" },
    { id: 9, title: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
    { id: 10, title: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
];

const TrendingAlbums = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 199;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="w-full max-w-362.5 mx-auto mt-12">
      <div className="flex justify-between items-end mb-2 px-2 xl:px-16">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-bold text-[#3BC8E7] tracking-wide">
            Trending Albums
          </h2>
          <div className="h-0.75 w-12 bg-[#3BC8E7] rounded-full mt-1"></div>
        </div>
        <Link 
          to="/album/trending-albums"
          className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer font-medium uppercase tracking-wider"
        >
          View More
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 mt-10 w-full">
        <button 
          onClick={() => scroll('left')}
          className="shrink-0 z-20 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:scale-110 transition-all cursor-pointer bg-[#14182a]/50 rounded-full border border-white/10 hover:bg-white/10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth w-full max-w-292.5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TRENDING_ALBUMS.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
        <button 
          onClick={() => scroll('right')}
          className="shrink-0 z-20 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:scale-110 transition-all cursor-pointer bg-[#14182a]/50 rounded-full border border-white/10 hover:bg-white/10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default TrendingAlbums;