import { useNavigate } from 'react-router'; 
import Header from '../../components/Header/Header';
import Sidebar, { useSidebarState } from '../../components/Header/Sidebar';
import Footer from '../../components/Footer/Footer';
import '../../assets/css/Font.css';

interface GenreItem {
  id: number;
  title: string;
  image: string;
  actionText?: string;
  className?: string;
}

const genres: GenreItem[] = [
  {
    id: 1,
    title: 'Romantic',
    image:
      'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=1000&auto=format&fit=crop',
    actionText: 'View Song',
    className: 'lg:row-span-2',
  },
  {
    id: 2,
    title: 'Classical',
    image:
      'https://images.unsplash.com/photo-1507838153414-b4b713384ebd?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:col-span-1',
  },
  {
    id: 3,
    title: 'Hip Hop',
    image:
      'https://images.unsplash.com/photo-1594963098863-1492d475c43d?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:col-span-1',
  },
  {
    id: 4,
    title: 'Rock',
    image:
      'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:row-span-2',
  },
  {
    id: 5,
    title: 'Dancing',
    image:
      'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:col-span-1',
  },
  {
    id: 6,
    title: 'EDM',
    image:
      'https://images.unsplash.com/photo-1571266028243-371695039f2a?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:col-span-1',
  },
  {
    id: 7,
    title: 'Jazz',
    image:
      'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:col-span-1',
  },
  {
    id: 8,
    title: 'Metal',
    image:
      'https://images.unsplash.com/photo-1511735111819-9a3f77ebd235?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:col-span-1',
  },
  {
    id: 9,
    title: 'Soul',
    image:
      'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:row-span-2',
  },
  {
    id: 10,
    title: 'Blues',
    image:
      'https://images.unsplash.com/photo-1514525253440-b393452e2729?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 11,
    title: 'Pop',
    image:
      'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:col-span-1',
  },
  {
    id: 12,
    title: 'Folk',
    image:
      'https://images.unsplash.com/photo-1471478331149-172fdea56318?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:col-span-1',
  },
  {
    id: 13,
    title: 'Indie',
    image:
      'https://images.unsplash.com/photo-1513278971887-87df43cb127d?q=80&w=1000&auto=format&fit=crop',
    className: 'lg:col-span-1',
  },
];

const Genre = () => {
  const { isNavbarOpen, toggleSidebar, setSidebarOpen } = useSidebarState();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#14182a] flex select-none">
      <Sidebar
        isOpen={isNavbarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ml-0 xl:ml-20"
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 mx-auto w-full text-white p-3 sm:p-5 md:p-8 lg:px-12 font-sans overflow-x-hidden bg-[#14182a] pb-28 genre-josefin">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-6">
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-[#4fd1c5] tracking-wide">
                  Top Genres
                </h2>
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#4fd1c5] rounded-full" />
              </div>

              <button 
                onClick={() => navigate('/more-genres')}
                className="text-sm md:text-base text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                View More
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg ${
                    genre.className || ''
                  }`}
                >
                  <img
                    src={genre.image}
                    alt={genre.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-end">
                    <span className="text-lg md:text-xl font-medium tracking-wide text-white drop-shadow-md">
                      {genre.title}
                    </span>

                    {genre.actionText && (
                      <span className="text-xs text-gray-200 hover:text-white font-light mb-1">
                        {genre.actionText}
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Genre;