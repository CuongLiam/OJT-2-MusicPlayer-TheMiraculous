import React, { useRef } from 'react';
import Ad from "../../assets/image/Home-ad.jpg"

interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
}

interface Artist {
  id: number;
  name: string;
  image: string;
}

interface Album {
  id: number;
  title: string;
  artist: string;
  image: string;
}

interface Genre {
  id: number;
  name: string;
  image: string;
  size: 'large' | 'medium' | 'small';
}

interface Release {
  id: number;
  title: string;
  artist: string;
  duration: string;
  image: string;
}

interface TopSong {
  rank: number;
  title: string;
  artist: string;
  image: string;
  price: string;
}

const RECENTLY_PLAYED: Song[] = [
  { id: 1, title: "Dream Your Moments (Dust)", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Until I Met You", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Gimme Some Courage", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Dark Alley Acoustic", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Walking Promises", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { id: 6, title: "Desired Games", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
];

const FEATURED_ARTISTS: Artist[] = [
  { id: 1, name: "Best Of Ava Cornish", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Until I Met You", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Gimme Some Courage", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Dark Alley Acoustic", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
  { id: 5, name: "Walking Promises", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" },
  { id: 6, name: "Desired Games", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
];

const FEATURED_ALBUMS: Album[] = [
  { id: 1, title: "Bloodlust", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Time flies", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Dark matters", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Eye to eye", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Cloud nine", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
  { id: 6, title: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
];

const NEW_RELEASES: Release[] = [
  { id: 1, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
];

const TOP_15_SONGS: TopSong[] = [
  { rank: 1, title: "Until I Met You", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 2, title: "Walking Promises", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 3, title: "Gimme Some Courage", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 4, title: "Desired Games", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 5, title: "Dark Alley Acoustic", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 6, title: "Walking Promises", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 7, title: "Endless Things", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 8, title: "Dream Your Moments", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 9, title: "Until I Met You", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 10, title: "Gimme Some Courage", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 11, title: "Dark Alley Acoustic", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 12, title: "The Heartbeat Stops", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 13, title: "One More Stranger", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 14, title: "Walking Promises", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop", price: "5/10" },
  { rank: 15, title: "Endless Things", artist: "Ava Cornish", image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=400&auto=format&fit=crop", price: "5/10" },
];

const TOP_GENRES: Genre[] = [
  { id: 1, name: "Romantic", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop", size: 'large' },
  { id: 2, name: "Classical", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop", size: 'medium' },
  { id: 3, name: "Hip Hop", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=800&auto=format&fit=crop", size: 'medium' },
  { id: 4, name: "Rock", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800&auto=format&fit=crop", size: 'small' },
  { id: 5, name: "Dancing", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop", size: 'medium' },
  { id: 6, name: "EDM", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop", size: 'small' },
];

const SectionHeader = ({ title, showViewMore = false }: { title: string, showViewMore?: boolean }) => (
  <div className="flex justify-between items-end mb-6 pb-2 bg-transparent">
    <div className="relative pb-2 bg-transparent">
      <h2 className="text-xl md:text-2xl font-semibold text-[#3BC8E7] tracking-wide">{title}</h2>
      <span className="absolute -bottom-2.5 left-0 w-12 h-1 bg-[#3BC8E7] rounded-full"></span>
    </div>
    {showViewMore && (
      <button className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer mb-2 bg-transparent">
        View More
      </button>
    )}
  </div>
);

const SongCard = ({ song }: { song: Song }) => {
  return (
    <div className="group cursor-pointer bg-transparent">
      <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#3BC8E7]/50 group-hover:ring-offset-1 group-hover:ring-offset-[#14182A]
                      w-83.5 h-83.5
                      lg:w-43.75 lg:h-43.75">
        <img 
          src={song.image} 
          alt={song.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>
      <h3 className="text-[12px] lg:text-[14px] text-gray-200 font-medium truncate group-hover:text-[#3BC8E7] transition-colors 
                     w-83.5 lg:w-43.75">
        {song.title}
      </h3>
      <p className="text-[12px] lg:text-[14px] text-gray-400 truncate 
                    w-83.5 lg:w-43.75">
        {song.artist}
      </p>
    </div>
  );
};

const ArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <div className="group cursor-pointer bg-transparent">
      <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#3BC8E7]/50 group-hover:ring-offset-1 group-hover:ring-offset-[#14182A]
                      w-83.5 h-83.5
                      lg:w-43.75 lg:h-43.75">
        <img 
          src={artist.image} 
          alt={artist.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>
      <h3 className="text-[12px] lg:text-[14px] text-gray-200 font-medium truncate group-hover:text-[#3BC8E7] transition-colors 
                     w-83.5 lg:w-43.75">
        {artist.name}
      </h3>
    </div>
  );
};

const AlbumCard = ({ album }: { album: Album }) => {
  return (
    <div className="group cursor-pointer bg-transparent">
      <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#3BC8E7]/50 group-hover:ring-offset-1 group-hover:ring-offset-[#14182A]
                      w-83.5 h-83.5
                      lg:w-43.75 lg:h-43.75">
        <img 
          src={album.image} 
          alt={album.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>
      <h3 className="text-[12px] lg:text-[14px] text-gray-200 font-medium truncate group-hover:text-[#3BC8E7] transition-colors 
                     w-83.5 lg:w-43.75">
        {album.title}
      </h3>
      <p className="text-[12px] lg:text-[14px] text-gray-400 truncate 
                    w-83.5 lg:w-43.75">
        {album.artist}
      </p>
    </div>
  );
};

const ReleaseCard = ({ release, isLast }: { release: Release, isLast: boolean }) => {
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
            <span className="text-[14px] text-gray-400 shrink-0">{release.duration}</span>
          </div>
          <p className="text-[12px] text-gray-400 truncate">{release.artist}</p>
        </div>
      </div>
    </div>
  );
};

const GenreCard = ({ genre }: { genre: Genre }) => {
  const sizeClasses = {
    large: 'lg:col-span-2 lg:row-span-2',
    medium: 'lg:col-span-1 lg:row-span-1',
    small: 'lg:col-span-1 lg:row-span-1'
  };

  return (
    <div className={`group cursor-pointer relative overflow-hidden rounded-xl bg-gray-800 transition-all duration-300 hover:ring-2 hover:ring-[#3BC8E7]/50 ${sizeClasses[genre.size]}`}>
      <img 
        src={genre.image} 
        alt={genre.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
        <h3 className="text-lg font-semibold text-white">{genre.name}</h3>
        <button className="text-white hover:text-[#3BC8E7] transition-colors">
          <span className="text-sm">View Song</span>
        </button>
      </div>
    </div>
  );
};

const TopSongRow = ({ song }: { song: TopSong }) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-800/30 rounded-lg transition-colors group cursor-pointer">
      <div className="flex items-center gap-4 flex-1">
        <span className="text-2xl font-bold text-white w-8">{String(song.rank).padStart(2, '0')}</span>
        <img 
          src={song.image} 
          alt={song.title}
          className="w-12.5 h-12.5 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] text-white font-medium truncate group-hover:text-[#3BC8E7] transition-colors">{song.title}</h4>
          <p className="text-[12px] text-gray-400 truncate">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[14px] text-gray-400">{song.price}</span>
        <button className="text-gray-400 hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="6" r="1.5"/>
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="12" cy="18" r="1.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function HomePageInfo() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const artistScrollRef = useRef<HTMLDivElement>(null);
  const albumScrollRef = useRef<HTMLDivElement>(null);
  const releaseScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const { current } = ref;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full bg-[#14182A]">
      <section className="relative w-full overflow-hidden mt-10.75">
        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12 bg-transparent">
          <div className="relative group/slider bg-transparent">
            <SectionHeader title="Recently Played" showViewMore={true} />
            
            <button 
              onClick={() => scroll('left', scrollContainerRef)}
              className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              onClick={() => scroll('right', scrollContainerRef)}
              className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
            >
              {RECENTLY_PLAYED.slice(0, 1).map((song) => (
                <div key={song.id} className="snap-start shrink-0 md:hidden">
                  <SongCard song={song} />
                </div>
              ))}
              {RECENTLY_PLAYED.slice(0, 2).map((song) => (
                <div key={song.id} className="snap-start shrink-0 hidden md:block lg:hidden">
                  <SongCard song={song} />
                </div>
              ))}
              {RECENTLY_PLAYED.map((song) => (
                <div key={song.id} className="snap-start shrink-0 hidden lg:block">
                  <SongCard song={song} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section className="relative w-full overflow-hidden mt-10.75">
        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12 bg-transparent">
          <div className="relative group/slider bg-transparent">
            <SectionHeader title="Featured Artists" showViewMore={true} />
            
            <button 
              onClick={() => scroll('left', artistScrollRef)}
              className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              onClick={() => scroll('right', artistScrollRef)}
              className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>

            <div 
              ref={artistScrollRef}
              className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
            >
              {FEATURED_ARTISTS.slice(0, 1).map((artist) => (
                <div key={artist.id} className="snap-start shrink-0 md:hidden">
                  <ArtistCard artist={artist} />
                </div>
              ))}
              {FEATURED_ARTISTS.slice(0, 2).map((artist) => (
                <div key={artist.id} className="snap-start shrink-0 hidden md:block lg:hidden">
                  <ArtistCard artist={artist} />
                </div>
              ))}
              {FEATURED_ARTISTS.map((artist) => (
                <div key={artist.id} className="snap-start shrink-0 hidden lg:block">
                  <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden mt-12">
        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
          <img 
            src={Ad}
            alt="Upgrade to Pro"
            className="w-full h-10.5 md:h-21.5 lg:h-37 object-contain rounded-2xl"
          />
        </div>
      </section>

      <section className="relative w-full overflow-hidden mt-12">
        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
          <div className="relative group/slider">
            <SectionHeader title="New Releases" showViewMore={true} />
            
            <button 
              onClick={() => scroll('left', releaseScrollRef)}
              className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              onClick={() => scroll('right', releaseScrollRef)}
              className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>

            <div 
              ref={releaseScrollRef}
              className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
            >
              <div className="flex gap-0">
                {NEW_RELEASES.slice(0, 2).map((release, index) => (
                  <div key={release.id} className="snap-start shrink-0 lg:hidden">
                    <ReleaseCard release={release} isLast={index === 1} />
                  </div>
                ))}
              </div>
              <div className="hidden lg:flex md:flex gap-0">
                {NEW_RELEASES.slice(0, 3).map((release, index) => (
                  <div key={release.id} className="snap-start shrink-0 md:block lg:hidden">
                    <ReleaseCard release={release} isLast={index === 2} />
                  </div>
                ))}
              </div>
              <div className="hidden lg:flex gap-0">
                {NEW_RELEASES.map((release, index) => (
                  <div key={release.id} className="snap-start shrink-0">
                    <ReleaseCard release={release} isLast={index === NEW_RELEASES.length - 1} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden mt-10.75">
        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12 bg-transparent">
          <div className="relative group/slider bg-transparent">
            <SectionHeader title="Featured Albums" showViewMore={true} />
            
            <button 
              onClick={() => scroll('left', albumScrollRef)}
              className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              onClick={() => scroll('right', albumScrollRef)}
              className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] hover:border-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>

            <div 
              ref={albumScrollRef}
              className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
            >
              {FEATURED_ALBUMS.slice(0, 1).map((album) => (
                <div key={album.id} className="snap-start shrink-0 md:hidden">
                  <AlbumCard album={album} />
                </div>
              ))}
              {FEATURED_ALBUMS.slice(0, 2).map((album) => (
                <div key={album.id} className="snap-start shrink-0 hidden md:block lg:hidden">
                  <AlbumCard album={album} />
                </div>
              ))}
              {FEATURED_ALBUMS.map((album) => (
                <div key={album.id} className="snap-start shrink-0 hidden lg:block">
                  <AlbumCard album={album} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden mt-10.75 mb-20.25">
        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader title="Top Genres" showViewMore={true} />
          
          <div className="hidden lg:flex lg:flex-row gap-2 h-92.25">
            <div className="w-92.25 h-full shrink-0">
              <div className="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-800 w-full h-full">
                <img src={TOP_GENRES[0].image} alt={TOP_GENRES[0].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <h3 className="text-lg font-semibold text-white">{TOP_GENRES[0].name}</h3>
                  <button className="text-white hover:text-[#3BC8E7] transition-colors"><span className="text-sm">View Song</span></button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-row gap-2 h-43.75">
                <div className="w-43.75 h-full shrink-0">
                  <div className="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-800 w-full h-full">
                    <img src={TOP_GENRES[1].image} alt={TOP_GENRES[1].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                      <h3 className="text-lg font-semibold text-white">{TOP_GENRES[1].name}</h3>
                      <button className="text-white hover:text-[#3BC8E7] transition-colors"><span className="text-sm">View Song</span></button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 h-full">
                  <div className="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-800 w-full h-full">
                    <img src={TOP_GENRES[2].image} alt={TOP_GENRES[2].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                      <h3 className="text-lg font-semibold text-white">{TOP_GENRES[2].name}</h3>
                      <button className="text-white hover:text-[#3BC8E7] transition-colors"><span className="text-sm">View Song</span></button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row gap-2 h-43.75">
                <div className="flex-1 h-full">
                  <div className="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-800 w-full h-full">
                    <img src={TOP_GENRES[4].image} alt={TOP_GENRES[4].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                      <h3 className="text-lg font-semibold text-white">{TOP_GENRES[4].name}</h3>
                      <button className="text-white hover:text-[#3BC8E7] transition-colors"><span className="text-sm">View Song</span></button>
                    </div>
                  </div>
                </div>
                <div className="w-43.75 h-full shrink-0">
                  <div className="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-800 w-full h-full">
                    <img src={TOP_GENRES[5].image} alt={TOP_GENRES[5].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                      <h3 className="text-lg font-semibold text-white">{TOP_GENRES[5].name}</h3>
                      <button className="text-white hover:text-[#3BC8E7] transition-colors"><span className="text-sm">View Song</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-43.5 h-full shrink-0">
              <div className="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-800 w-full h-full">
                <img src={TOP_GENRES[3].image} alt={TOP_GENRES[3].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <h3 className="text-lg font-semibold text-white">{TOP_GENRES[3].name}</h3>
                  <button className="text-white hover:text-[#3BC8E7] transition-colors"><span className="text-sm">View Song</span></button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden grid grid-cols-1 gap-4">
            {TOP_GENRES.map((genre) => (
              <div key={genre.id} className="w-full h-[83.5px] md:h-[174.5px]">
                <div className="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-800 transition-all duration-300 hover:ring-2 hover:ring-[#3BC8E7]/50 w-full h-full">
                  <img src={genre.image} alt={genre.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <h3 className="text-lg font-semibold text-white">{genre.name}</h3>
                    <button className="text-white hover:text-[#3BC8E7] transition-colors"><span className="text-sm">View Song</span></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};