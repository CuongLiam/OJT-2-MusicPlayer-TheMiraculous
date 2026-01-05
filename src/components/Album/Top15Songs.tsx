import { MoreHorizontal } from 'lucide-react';
import { Song } from '../../types/music.types'; // Import Interface chuẩn

interface Top15SongsProps {
  data: Song[];
}

const Top15Songs: React.FC<Top15SongsProps> = ({ data }) => {
  // Chia dữ liệu thành 3 cột, mỗi cột 5 bài
  const col1 = data.slice(0, 5);
  const col2 = data.slice(5, 10);
  const col3 = data.slice(10, 15);

  const renderItem = (item: Song, index: number, offset: number) => {
    // Tính số thứ tự: Offset (0/5/10) + index hiện tại + 1
    const rank = offset + index + 1;
    const rankStr = rank < 10 ? `0${rank}` : rank;

    return (
      <div key={item.id} className="flex items-center gap-4 py-3 border-b border-white/5 hover:bg-white/5 px-2 rounded-lg transition-colors group cursor-pointer">
        {/* Số thứ tự */}
        <span className={`text-xl font-bold font-mono w-8 ${rank <= 3 ? 'text-[#3BC8E7]' : 'text-gray-400'}`}>
          {rankStr}
        </span>

        {/* Ảnh bìa bài hát (lấy từ album_cover) */}
        <div className="w-12.5 h-12.5 shrink-0 rounded-md overflow-hidden bg-gray-800">
          <img 
            src={item.album_cover || "https://placehold.co/100x100?text=Music"} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Error";
            }}
          />
        </div>

        {/* Thông tin bài hát */}
        <div className="flex flex-col flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm truncate group-hover:text-[#3BC8E7] transition-colors">
            {item.title}
          </h4>
          <p className="text-gray-500 text-xs truncate">
            {item.artist_name || "Unknown Artist"}
          </p>
        </div>

        {/* Thời lượng */}
        <span className="text-gray-400 text-xs font-medium">
          {item.duration}
        </span>

        {/* Nút more */}
        <button className="text-gray-500 hover:text-white transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>
    );
  };

  return (
    <section className="w-full max-w-362.5 mx-auto mt-12 mb-10">
      <div className="flex flex-col gap-1 mb-6 px-2 xl:px-16">
        <h2 className="text-xl md:text-2xl font-bold text-[#3BC8E7] tracking-wide">
          Top 15 Songs
        </h2>
        <div className="h-0.75 w-12 bg-[#3BC8E7] rounded-full mt-1"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-4 px-2 xl:px-16">
        {/* Cột 1 (Rank 1-5) */}
        <div className="flex flex-col">
          {col1.map((item, index) => renderItem(item, index, 0))}
        </div>
        
        {/* Cột 2 (Rank 6-10) */}
        <div className="flex flex-col">
          {col2.map((item, index) => renderItem(item, index, 5))}
        </div>
        
        {/* Cột 3 (Rank 11-15) */}
        <div className="flex flex-col">
          {col3.map((item, index) => renderItem(item, index, 10))}
        </div>
      </div>
    </section>
  );
};

export default Top15Songs;