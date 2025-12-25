import type { AlbumWithStats } from '../../types/music.extended';
import AlbumCard from './AlbumCard';
import SectionHeader from './SectionHeader';

interface Props {
  albums: AlbumWithStats[];
}

export default function TrendingAlbums({ albums }: Props) {
  // Logic: Lấy top 6 album có view cao nhất
  const trendingList = [...albums]
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 6);

  return (
    <div>
      <SectionHeader title="Trending Albums" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {trendingList.map((album) => (
          <div key={album.id} className="w-full">
             <AlbumCard album={album} />
          </div>
        ))}
      </div>
    </div>
  );
}