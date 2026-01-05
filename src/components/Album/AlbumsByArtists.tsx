import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import AlbumCard from './AlbumCard';
import { Album } from '../../types/music.types';

interface AlbumsByArtistsProps {
  data: Album[]; 
}

const AlbumsByArtists: React.FC<AlbumsByArtistsProps> = ({ data }) => {
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

  if (!data || data.length === 0) return null;

  return (
    <section className="w-full max-w-362.5 mx-auto mt-12 mb-16">
      <div className="flex justify-between items-end mb-2 px-2 xl:px-16">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-bold text-[#3BC8E7] tracking-wide">
            Albums By Artists
          </h2>
          <div className="h-0.75 w-12 bg-[#3BC8E7] rounded-full mt-1"></div>
        </div>

        <Link 
          to="/album/artists-albums"
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
          {data.map((album) => (
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

export default AlbumsByArtists;