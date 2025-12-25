import { useEffect, useState } from "react";
// Đảm bảo đường dẫn import đúng
import Navbar from "../../components/Header/Navbar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FeaturedAlbums from "../../components/Album/FeaturedAlbums";
import TrendingAlbums from "../../components/Album/TrendingAlbums";
import Top15Songs from "../../components/Album/Top15Songs"; // 1. Đổi tên alias cho đúng ý nghĩa
import AlbumByArtist from "../../components/Album/AlbumByArtist";

// Import Types
import type { AlbumWithStats } from "../../types/music.extended";
import { RoleName, type User } from "../../types/auth.types";
import type { Album, Song } from "../../types/music.types";

export default function Albums() {
  // --- 1. STATE ---
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [processedAlbums, setProcessedAlbums] = useState<AlbumWithStats[]>([]);
  const [allSongs, setAllSongs] = useState<Song[]>([]); // 2. Thêm state lưu songs
  const [artists, setArtists] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 2. EFFECT FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, albumsRes, songsRes] = await Promise.all([
          fetch('http://localhost:3000/users').then(r => r.json()),
          fetch('http://localhost:3000/albums').then(r => r.json()),
          fetch('http://localhost:3000/songs').then(r => r.json())
        ]);

        const users: User[] = usersRes;
        const albums: Album[] = albumsRes;
        const songs: Song[] = songsRes;

        // Lưu danh sách bài hát vào state
        setAllSongs(songs); // 3. Cập nhật state songs

        // Lọc Artists
        const artistList = users.filter(u => u.roles.includes(RoleName.ROLE_ARTIST));
        setArtists(artistList);

        // Map dữ liệu Album
        const enhancedAlbums: AlbumWithStats[] = albums.map(album => {
          const artist = users.find(u => u.id === album.artist_id);
          const artistName = artist 
            ? `${artist.first_name} ${artist.last_name}` 
            : 'Unknown Artist';

          const albumSongs = songs.filter(s => s.album_id === album.id);
          const totalViews = albumSongs.reduce((sum, song) => sum + (song.views || 0), 0);

          return {
            ...album,
            artistName,
            totalViews,
            songCount: albumSongs.length
          };
        });

        setProcessedAlbums(enhancedAlbums);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- 3. RENDER ---
  
  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0f1218] flex items-center justify-center text-cyan-400 font-bold text-xl">
        Loading Music Data...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0f1218] flex font-['Josefin_Sans']">
      
      <Navbar 
        isOpen={isNavbarOpen} 
        toggleNavbar={() => setIsNavbarOpen(!isNavbarOpen)} 
      />

      <div 
        className={`
            flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
            ${isNavbarOpen ? 'ml-64' : 'ml-20'} 
        `}
      >
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="max-w-screen-2xl mx-auto space-y-12 pb-24">
            
            <FeaturedAlbums albums={processedAlbums} />

            <TrendingAlbums albums={processedAlbums} />

            {/* 4. Truyền đúng props `songs` vào Top15Songs */}
            <Top15Songs songs={allSongs} />

            <AlbumByArtist artists={artists} />

          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}