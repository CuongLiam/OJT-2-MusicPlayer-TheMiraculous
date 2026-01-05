// src/pages/Album/Album.tsx
import React, { useState, useEffect } from "react";

// Layout Components
import Header from "../../components/Header/Header";
import Sidebar, { useSidebarState } from "../../components/Header/Sidebar";
import Footer from "../../components/Footer/Footer";
import MusicPlayerBar from "../../components/Bar/MusicPlayerBar";

// Child Components (Đã refactor để nhận props)
import FeaturedAlbums from "../../components/Album/FeaturedAlbums";
import TrendingAlbums from "../../components/Album/TrendingAlbums";
import Top15Songs from "../../components/Album/Top15Songs";
import AlbumsByArtists from "../../components/Album/AlbumsByArtists";
import NewReleases from "../../components/Album/NewReleases";

// Types
import { Album, User, Song } from "../../types/music.types";

const AlbumPage: React.FC = () => {
  const { isNavbarOpen, toggleSidebar, setSidebarOpen } = useSidebarState();
  
  // State lưu dữ liệu sau khi đã xử lý (merge tên ca sĩ, ảnh bìa...)
  const [albums, setAlbums] = useState<Album[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    // Gọi song song 3 API để lấy dữ liệu
    Promise.all([
      fetch('http://localhost:3000/users').then(res => res.json()),
      fetch('http://localhost:3000/albums').then(res => res.json()),
      fetch('http://localhost:3000/songs').then(res => res.json())
    ])
    .then(([usersData, albumsData, songsData]) => {
      
      // 1. XỬ LÝ USERS: Tạo Map { "id": "Tên Ca Sĩ" }
      // Chỉ lấy những user có role là ROLE_ARTIST
      const artistMap: Record<string, string> = {};
      usersData.forEach((u: User) => {
        if (u.roles.includes("ROLE_ARTIST")) {
          // Ghép First Name + Last Name
          artistMap[u.id] = `${u.first_name} ${u.last_name}`.trim();
        }
      });

      // 2. XỬ LÝ ALBUMS: Ghép tên Artist vào Album
      // Đồng thời tạo Map { albumId: "Link Ảnh Bìa" } để dùng cho Song
      const albumCoverMap: Record<number, string> = {};
      
      const mergedAlbums = albumsData.map((album: any) => {
        // Lưu cover image để dùng cho songs
        albumCoverMap[Number(album.id)] = album.cover_image;

        return {
          ...album,
          // Ép kiểu artist_id về string để tra cứu trong artistMap
          artist_name: artistMap[String(album.artist_id)] || "Unknown Artist"
        };
      });

      // 3. XỬ LÝ SONGS: Ghép tên Artist và Ảnh bìa Album vào Song
      const mergedSongs = songsData.map((song: any) => ({
        ...song,
        artist_name: artistMap[String(song.artist_id)] || "Unknown Artist",
        album_cover: albumCoverMap[song.album_id] || "" 
      }));

      // Cập nhật State
      setAlbums(mergedAlbums);
      setSongs(mergedSongs);
    })
    .catch(err => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  // --- PHÂN LOẠI DỮ LIỆU ĐỂ TRUYỀN XUỐNG COMPONENT CON ---

  // 1. Featured Albums: Lấy những album có type là PREMIUM
  const featuredAlbums = albums.filter(a => a.type === "PREMIUM");

  // 2. Trending Albums: Tạm thời lấy 10 album đầu tiên (hoặc logic view nếu có)
  const trendingAlbums = albums.slice(0, 10);

  // 3. New Releases: Sắp xếp theo ngày phát hành mới nhất (giảm dần)
  const newReleaseAlbums = [...albums].sort((a, b) => 
    new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  // 4. Top 15 Songs: Sắp xếp theo lượt xem (views) giảm dần, lấy 15 bài
  const top15Songs = [...songs]
    .sort((a, b) => b.views - a.views)
    .slice(0, 15);

  return (
    <div className="w-full min-h-screen bg-[#14182a] flex select-none">
      <Sidebar
        isOpen={isNavbarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-20 transition-all duration-300 ease-in-out">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 w-full bg-[#14182a] overflow-y-auto pb-28 pt-6 sm:pt-8 md:pt-10 px-3 sm:px-4 md:px-8 lg:px-12 transition-all duration-300">
            
            {/* Featured Section */}
            <FeaturedAlbums data={featuredAlbums} />
            
            {/* Trending Section */}
            <TrendingAlbums data={trendingAlbums} />

            {/* Top 15 Songs */}
            <Top15Songs data={top15Songs} />

            {/* Albums By Artists (Truyền tất cả albums vào) */}
            <AlbumsByArtists data={albums} />

            {/* New Releases */}
            <NewReleases data={newReleaseAlbums} />

        </main>

        <Footer />
      </div>

      {/* <MusicPlayerBar isSidebarOpen={isNavbarOpen} /> */}
    </div>
  );
};

export default AlbumPage;