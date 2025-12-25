import type { User } from '../../types/auth.types';
import SectionHeader from './SectionHeader';

interface Props {
  artists: User[];
}

export default function AlbumByArtist({ artists }: Props) {
  return (
    <div className="mb-12">
      <SectionHeader title="Albums By Artists" />
      
      {/* Scrollable Container */}
      <div 
        className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {artists.map((artist) => (
          <div 
            key={artist.id} 
            className="flex flex-col items-center shrink-0 cursor-pointer group w-24"
          >
            {/* Artist Image Circle */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-cyan-400 transition-all mb-3 relative">
              <img 
                src={artist.profile_image || 'https://via.placeholder.com/150'} 
                alt={artist.last_name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            {/* Artist Name */}
            <span className="text-white text-sm font-medium text-center truncate w-full group-hover:text-cyan-400 transition-colors font-['Josefin_Sans']">
              {artist.first_name} {artist.last_name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}