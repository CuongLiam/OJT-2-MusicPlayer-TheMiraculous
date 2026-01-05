import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import Sidebar, { useSidebarState } from '../../components/Header/Sidebar';
import Footer from '../../components/Footer/Footer';
import '../../assets/css/Font.css';

interface GenreItem {
  id: string | number;
  genre_name: string;
  cover_image: string;
}

const Genre = () => {
  const { isNavbarOpen, toggleSidebar, setSidebarOpen } = useSidebarState();
  const navigate = useNavigate();
  const [genres, setGenres] = useState<GenreItem[]>([]);

  const getGridClass = (index: number) => {
    const pattern = [
      'lg:row-span-2',
      'lg:col-span-1',
      'lg:col-span-1',
      'lg:row-span-2',
      'lg:col-span-1',
      'lg:col-span-1',
      'lg:col-span-1',
      'lg:col-span-1',
      'lg:row-span-2',
      'lg:col-span-2 lg:row-span-2',
    ];
    return pattern[index % pattern.length] || 'lg:col-span-1';
  };

  useEffect(() => {
    fetch('http://localhost:3000/genres')
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
      })
      .catch((err) => console.error('Error fetching genres:', err));
  }, []);

  const handleGenreClick = (genreName: string) => {
    navigate('/more-genres', { state: { targetGenre: genreName } });
  };

  return (
    <div className="w-full min-h-screen bg-[#14182a] flex select-none">
      <Sidebar isOpen={isNavbarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ml-0 xl:ml-20">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 mx-auto w-full text-white p-3 sm:p-5 md:p-8 lg:px-12 font-sans overflow-x-hidden bg-[#14182a] pb-28 genre-josefin">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div className="relative">
                <h2 className="text-xl md:text-2xl font-bold text-[#4fd1c5] tracking-wide">
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
              {genres.map((genre, index) => (
                <div
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.genre_name)}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg ${getGridClass(index)}`}
                >
                  <img
                    src={genre.cover_image}
                    alt={genre.genre_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-end">
                    <span className="text-lg md:text-xl font-medium tracking-wide text-white drop-shadow-md">
                      {genre.genre_name}
                    </span>
                    
                    {(index === 0 || index === 9) && (
                      <span className="text-xs text-gray-200 hover:text-white font-light mb-1">
                        View Songs
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