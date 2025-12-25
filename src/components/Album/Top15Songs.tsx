import type { Song } from '../../types/music.types';
import SectionHeader from './SectionHeader'; // Sửa lại đường dẫn nếu cần
import { MoreHorizontal, Play, Music } from 'lucide-react';

interface Props {
  songs: Song[];
}

export default function Top15Songs({ songs }: Props) {
  // 1. Sắp xếp bài hát theo lượt xem (Views) giảm dần và lấy 15 bài đầu
  const sortedSongs = [...songs]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 15);

  // 2. Hàm render từng dòng bài hát
  const renderItem = (song: Song, index: number) => (
    <div 
      key={song.id} 
      className="flex items-center gap-4 py-3 border-b border-slate-800/50 hover:bg-white/5 px-2 rounded-lg transition-all group cursor-pointer"
    >
      {/* Rank Number (01, 02...) */}
      <span className={`text-xl font-bold w-8 text-center font-['Josefin_Sans'] ${index < 3 ? 'text-cyan-400' : 'text-slate-600'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Song Image (Thumbnail) */}
      <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-md">
        {/* Do Song chưa có cover_image riêng nên tạm dùng ảnh placeholder hoặc ảnh mặc định */}
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop"
          alt={song.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
        />
        {/* Overlay Play Icon on Hover */}
        <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-all">
           <Play size={14} className="text-white fill-white"/>
        </div>
      </div>

      {/* Song Info: Title & Artist */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h4 className="text-white text-sm font-medium truncate group-hover:text-cyan-400 transition-colors">
          {song.title}
        </h4>
        <div className="flex items-center gap-1 text-slate-500 text-xs">
          <Music size={10} />
          <p className="truncate hover:text-slate-300 transition-colors">
            {song.artist_name || "Unknown Artist"}
          </p>
        </div>
      </div>

      {/* Duration (Lấy từ DB, ví dụ: 5:10) */}
      <span className="text-slate-500 text-xs font-medium font-['Josefin_Sans']">
        {song.duration}
      </span>

      {/* More Options Button */}
      <button className="text-slate-600 opacity-0 group-hover:opacity-100 hover:text-white transition-all p-1">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );

  // 3. Chia danh sách thành 3 cột (Mỗi cột 5 bài)
  const col1 = sortedSongs.slice(0, 5);
  const col2 = sortedSongs.slice(5, 10);
  const col3 = sortedSongs.slice(10, 15);

  return (
    <div className="w-full">
      <SectionHeader title="Top 15 Songs" />
      
      {/* Grid Layout: 1 cột trên Mobile, 2 cột Tablet, 3 cột Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
        <div className="flex flex-col">{col1.map((item, i) => renderItem(item, i))}</div>
        <div className="flex flex-col">{col2.map((item, i) => renderItem(item, i + 5))}</div>
        {/* Ẩn cột 3 ở tablet để giao diện đỡ rối, hiện lại ở Desktop */}
        <div className="flex flex-col md:hidden lg:flex">{col3.map((item, i) => renderItem(item, i + 10))}</div>
      </div>
    </div>
  );
}