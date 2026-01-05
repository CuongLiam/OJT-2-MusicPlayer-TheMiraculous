import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router'; 
import Header from '../../components/Header/Header';
import Sidebar, { useSidebarState } from '../../components/Header/Sidebar';
import Footer from '../../components/Footer/Footer';
import '../../assets/css/Font.css';
import { usePlayer } from '../../contexts/PlayerContext';
import type { Song } from '../../types/music.types';

interface DBGenre {
  id: string | number;
  genre_name: string;
  cover_image: string;
}

interface DBSong {
  id: number | string;
  title: string;
  artist_id: number | string;
  album_id: number | string;
  genre_ids: Array<number | string>;
  cover_image?: string;
  file_url?: string;
  duration?: string;
  views?: number;
  created_at?: string;
  updated_at?: string;
}

interface DBUser {
  id: number | string;
  first_name: string;
  last_name: string;
  roles: string[];
}

interface DBAlbum {
  id: number | string;
  title: string;
  cover_image?: string;
}

interface SongUI {
  id: number | string;
  title: string;
  artist: string;
  image: string;
  // internal: keep original DBSong so we can construct the real Song on click
  __raw?: DBSong;
  __album_cover?: string;
}

interface GenreSection {
  title: string;
  songs: SongUI[];
}

export default function MoreGenres() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const { isNavbarOpen, toggleSidebar, setSidebarOpen } = useSidebarState();
  const [sections, setSections] = useState<GenreSection[]>([]);
  
  const location = useLocation();
  const player = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresRes, songsRes, usersRes, albumsRes] = await Promise.all([
          fetch('http://localhost:3000/genres'),
          fetch('http://localhost:3000/songs'),
          fetch('http://localhost:3000/users'),
          fetch('http://localhost:3000/albums')
        ]);

        const genres: DBGenre[] = await genresRes.json();
        const songs: DBSong[] = await songsRes.json();
        const users: DBUser[] = await usersRes.json();
        const albums: DBAlbum[] = await albumsRes.json();

        const targetSongId = (location as any).state?.targetSongId;

        if (targetSongId) {
          const foundSong = songs.find(s => String(s.id) === String(targetSongId));

          if (foundSong) {
            const artist = users.find(u => String(u.id) === String(foundSong.artist_id));
            const artistName = artist ? `${artist.first_name} ${artist.last_name}` : 'Unknown Artist';
            const album = albums.find(a => String(a.id) === String(foundSong.album_id));
            
            let finalImage = 'https://placehold.co/400'; 
            if (foundSong.cover_image) {
              finalImage = foundSong.cover_image;
            } else if (album && album.cover_image) {
              finalImage = album.cover_image;
            }

            const uiSong: SongUI = {
              id: foundSong.id,
              title: foundSong.title,
              artist: artistName,
              image: finalImage,
              __raw: foundSong,
              __album_cover: album?.cover_image || ''
            };

            setSections([{
              title: "Search Result",
              songs: [uiSong]
            }]);

            return;
          }
        }

        const newSections: GenreSection[] = genres.map((genre) => {
          const genreSongs = songs.filter((song) => 
            Array.isArray(song.genre_ids) && song.genre_ids.some(g => String(g) === String(genre.id))
          );

          const uiSongs: SongUI[] = genreSongs.map((song) => {
            const artist = users.find(u => String(u.id) === String(song.artist_id));
            const artistName = artist ? `${artist.first_name} ${artist.last_name}` : 'Unknown Artist';

            const album = albums.find(a => String(a.id) === String(song.album_id));
            
            let finalImage = 'https://placehold.co/400'; 
            
            if (song.cover_image) {
              finalImage = song.cover_image;
            } else if (album && album.cover_image) {
              finalImage = album.cover_image;
            }

            return {
              id: song.id,
              title: song.title,
              artist: artistName,
              image: finalImage,
              __raw: song,
              __album_cover: album?.cover_image || ''
            };
          });

          return {
            title: genre.genre_name,
            songs: uiSongs,
          };
        });

        setSections(newSections.filter(section => section.songs.length > 0));

      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  useEffect(() => {
    const targetGenre = (location as any).state?.targetGenre;
    if (targetGenre && sections.length > 0) {
      const targetGenreName = targetGenre;
      
      const index = sections.findIndex(s => s.title === targetGenreName);
      
      if (index !== -1 && sectionRefs.current[index]) {
        setTimeout(() => {
          sectionRefs.current[index]?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      }
    }
  }, [sections, location.state]);

  const handleScroll = (index: number, direction: 'left' | 'right') => {
    const row = rowRefs.current[index];
    if (row) {
      const scrollAmount = row.clientWidth * 0.8;
      row.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // Build normalized Song object from DBSong for PlayerProvider
  function buildNormalizedSong(raw: DBSong, artistName: string, albumCover: string): Song {
    return {
      id: String(raw.id),
      title: raw.title,
      duration: raw.duration || '0:00',
      album_id: String(raw.album_id ?? ''),
      artist_id: String(raw.artist_id ?? ''),
      genre_ids: Array.isArray(raw.genre_ids) ? raw.genre_ids.map(String) : [],
      file_url: String(raw.file_url ?? ''),
      views: Number(raw.views ?? 0),
      created_at: raw.created_at ?? '',
      updated_at: raw.updated_at ?? '',
      artist_name: artistName,
      album_cover: raw.cover_image || albumCover || ''
    };
  }

  return (
    <div className="w-full min-h-screen bg-[#14182a] flex select-none">
      <Sidebar
        isOpen={isNavbarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-20 transition-all duration-300 ease-in-out">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 mx-auto w-full text-white p-4 md:py-12 md:px-20 more-genres-josefin pb-28 bg-[#14182a]">
          <div className="max-w-400 mx-auto">
            {sections.map((section, idx) => (
              <div 
                key={idx} 
                ref={(el) => { sectionRefs.current[idx] = el; }}
                className="mb-10 last:mb-0 relative group pt-4"
              >
                <div className="flex justify-between items-end mb-6 px-4 md:px-0">
                  <h2 className="text-xl md:text-2xl font-bold text-[#4fd1c5] tracking-wide relative inline-block">
                    {section.title}
                    <span className="absolute -bottom-2 left-0 w-1/2 h-0.75 bg-[#4fd1c5] rounded-full"></span>
                  </h2>
                </div>

                <button
                  onClick={() => handleScroll(idx, 'left')}
                  className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={() => handleScroll(idx, 'right')}
                  className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                >
                  <ChevronRight size={24} />
                </button>

                <div
                  ref={(el) => { rowRefs.current[idx] = el; }}
                  className="flex overflow-x-auto gap-4 md:gap-6 pb-4 scrollbar-hide snap-x snap-mandatory px-4 md:px-0"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {section.songs.map((song) => (
                    <div
                      key={song.id}
                      className="flex-none w-40 md:w-50 lg:w-55 snap-start group/card cursor-pointer"
                      // keep UI unchanged — only add click behavior
                      onClick={() => {
                        if (!song.__raw) return;
                        const normalized = buildNormalizedSong(
                          song.__raw,
                          song.artist,
                          song.__album_cover || ''
                        );
                        // play the clicked song (single)
                        player.playSong(normalized);
                      }}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg mb-3 shadow-lg">
                        <img 
                          src={song.image} 
                          alt={song.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-white font-bold text-sm md:text-base leading-tight truncate" title={song.title}>
                          {song.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm truncate mt-1">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {sections.length === 0 && (
               <div className="text-center text-gray-400 mt-20">Loading genres and songs...</div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
