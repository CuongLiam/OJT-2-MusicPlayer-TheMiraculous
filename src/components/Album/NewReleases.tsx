import { useRef } from 'react';
import { BarChart2 } from 'lucide-react';

interface ReleaseItem {
  id: number;
  title: string;
  artist: string;
  duration: string;
  image: string;
}

const RELEASES_DATA: ReleaseItem[] = [
  { id: 1, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=200&auto=format&fit=crop" },
  { id: 2, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop" },
  { id: 3, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=200&auto=format&fit=crop" },
  { id: 4, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=200&auto=format&fit=crop" },
  { id: 5, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { id: 6, title: "Cobweb of lies", artist: "Ava Cornish", duration: "4:20", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { id: 7, title: "New Horizon", artist: "Ava Cornish", duration: "3:45", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" },
];

const NewReleases = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const firstCardWrapper = current.querySelector('.release-card-wrapper') as HTMLElement;
      
      if (firstCardWrapper) {
        const cardWidth = firstCardWrapper.offsetWidth;
        const gap = 32; 
        const scrollAmount = cardWidth + gap;

        if (direction === 'left') {
          current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section className="w-full max-w-362.5 mx-auto mt-12 mb-20">
      <div className="flex justify-between items-end mb-8 px-2 xl:px-16">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-bold text-[#3BC8E7] tracking-wide">
            New Releases
          </h2>
          <div className="h-0.75 w-12 bg-[#3BC8E7] rounded-full mt-1"></div>
        </div>
        <button className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer font-medium uppercase tracking-wider">
          View More
        </button>
      </div>

      <div className="px-2 xl:px-16">
        <div className="hidden xl:block relative">
          <div className="absolute top-1.75 left-2 right-2 h-px bg-[#3BC8E7]/30 z-0"></div>
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {RELEASES_DATA.slice(0, 4).map((item, index) => (
              <ReleaseCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        <div className="flex xl:hidden items-center gap-2 md:gap-4 w-full">
          <button 
            onClick={() => scroll('left')}
            className="shrink-0 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer bg-[#14182a]/50 rounded-full border border-white/10 hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div 
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-8 w-full min-w-max relative px-1">
              <div className="absolute top-1.75 left-0 right-0 h-px bg-[#3BC8E7]/30 z-0"></div>

              {RELEASES_DATA.map((item, index) => (
                <div 
                  key={item.id} 
                  className="release-card-wrapper shrink-0 w-[calc(50%-16px)] md:w-[calc(33.33%-21.33px)]"
                >
                  <ReleaseCard item={item} index={index} />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => scroll('right')}
            className="shrink-0 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer bg-[#14182a]/50 rounded-full border border-white/10 hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

const ReleaseCard = ({ item, index }: { item: ReleaseItem, index: number }) => {
  return (
    <div className="flex flex-col gap-6 group cursor-pointer relative z-10">
      <div className={`w-4 h-4 rounded-full border-2 bg-[#14182a] transition-all duration-300 shrink-0
        ${index === 0 
          ? 'border-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
          : 'border-[#3BC8E7] group-hover:border-white group-hover:scale-110'
        }`}
      ></div>

      <div className="flex gap-4 items-center pr-4">
        <div className="relative w-15 h-15 shrink-0 rounded-lg overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
          {index === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <BarChart2 className="text-white w-6 h-6 animate-pulse" />
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-white text-sm font-bold truncate group-hover:text-[#3BC8E7] transition-colors">
              {item.title}
            </h3>
            <span className="text-gray-400 text-xs">{item.duration}</span>
          </div>
          <p className="text-gray-500 text-xs mt-1 truncate">
            {item.artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewReleases;