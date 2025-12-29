import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Header/Sidebar';
import Footer from '../../components/Footer/Footer';
import '../../assets/css/Font.css';

interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
}

interface GenreSection {
  title: string;
  songs: Song[];
}

const MOCK_DATA: GenreSection[] = [
  {
    title: 'Romantics',
    songs: [
      { id: 1, title: 'Dream Your Moments (Duet)', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1516575334481-f85287c2c81d?w=500&q=80' },
      { id: 2, title: 'Until I Met You', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=500&q=80' },
      { id: 3, title: 'Gimme Some Courage', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80' },
      { id: 4, title: 'Dark Alley Acoustic', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&q=80' },
      { id: 5, title: 'Walking Promises', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=500&q=80' },
      { id: 6, title: 'Desired Games', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80' },
      { id: 7, title: 'Extra Song 1', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80' },
    ],
  },
  {
    title: 'Pure Love',
    songs: [
      { id: 8, title: 'Bloodlust', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80' },
      { id: 9, title: 'Time flies', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500&q=80' },
      { id: 10, title: 'Dark matters', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1505312926838-89269550e416?w=500&q=80' },
      { id: 11, title: 'Eye to eye', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=500&q=80' },
      { id: 12, title: 'Cloud nine', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1513279922550-250c2129b7b0?w=500&q=80' },
      { id: 13, title: 'Cobweb of lies', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80' },
    ],
  },
  {
    title: 'Love At First Sight',
    songs: [
      { id: 14, title: 'First Glance', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=500&q=80' },
      { id: 15, title: 'Heartbeat', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=500&q=80' },
      { id: 16, title: 'Destiny Calls', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?w=500&q=80' },
      { id: 17, title: 'Soulmates', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1523307730650-5945347a2a29?w=500&q=80' },
      { id: 18, title: 'Forever', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=500&q=80' },
      { id: 19, title: 'Magic Moment', artist: 'Ava Cornish & Brian Hill', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80' },
    ],
  },
];

export default function MoreGenres() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleScroll = (index: number, direction: 'left' | 'right') => {
    const row = rowRefs.current[index];
    if (row) {
      const scrollAmount = row.clientWidth * 0.8;
      row.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#14182a] flex select-none">
      <Sidebar
        isOpen={isNavbarOpen}
        toggleSidebar={() => setIsNavbarOpen(!isNavbarOpen)}
      />

      <div
        className="flex-1 flex flex-col min-h-screen ml-20 transition-all duration-300 ease-in-out"
      >
        <Header />

        <main className="flex-1 mx-auto w-full text-white p-4 md:py-8 md:px-16 more-genres-josefin pb-28 bg-[#14182a]">
          <div className="max-w-350uto">
            {MOCK_DATA.map((section, idx) => (
              <div key={idx} className="mb-10 last:mb-0 relative group">
                <div className="flex justify-between items-end mb-4 px-4 md:px-0">
                  <h2 className="text-xl md:text-2xl font-bold text-[#19A7CE] tracking-wide relative inline-block">
                    {section.title}
                    <span className="absolute -bottom-2 left-0 w-1/2 h-0.75 bg-[#19A7CE] rounded-full"></span>
                  </h2>
                  <a href="#" className="text-gray-400 hover:text-white text-xs md:text-sm font-medium transition-colors">View More</a>
                </div>

                <button
                  onClick={() => handleScroll(idx, 'left')}
                  className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white hidden md:group-hover:block transition-all backdrop-blur-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => handleScroll(idx, 'right')}
                  className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white hidden md:group-hover:block transition-all backdrop-blur-sm"
                >
                  <ChevronRight size={24} />
                </button>

                <div
                  ref={(el) => { rowRefs.current[idx] = el; }}
                  className="flex overflow-x-auto gap-4 md:gap-6 pb-4 scrollbar-hide snap-x snap-mandatory px-4 md:px-0"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {section.songs.map((song) => (
                    <div key={song.id} className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(16.666%-20px)] snap-start group/card cursor-pointer">
                      <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
                        <img src={song.image} alt={song.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-white font-bold text-base md:text-lg leading-tight truncate">{song.title}</h3>
                        <p className="text-gray-400 text-xs md:text-sm truncate mt-1">{song.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}