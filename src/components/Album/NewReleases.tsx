import { BarChart2} from 'lucide-react';
import { Album } from '../../types/music.types';
import { Link } from 'react-router-dom';

interface NewReleasesProps {
  data: Album[];
}

const NewReleases: React.FC<NewReleasesProps> = ({ data }) => {
  const releases = data.slice(0, 4);
  if (!data || data.length === 0) return null;

  return (
    <section className="w-full max-w-362.5 mx-auto mt-12 mb-20">
      <div className="flex justify-between items-end mb-8 px-2 xl:px-16">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-bold text-[#3BC8E7] tracking-wide">
            New Releases
          </h2>
          <div className="h-0.75 w-12 bg-[#3BC8E7] rounded-full mt-1"></div>
        </div>
        <Link to="/album/new-releases" className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer font-medium uppercase tracking-wider">
          View More
          </Link>
      </div>

      <div className="relative px-2 xl:px-16">
        <div className="absolute top-1.75 left-2 xl:left-16 right-2 xl:right-16 h-px bg-[#3BC8E7]/30 z-0"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          
          {releases.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-6 group cursor-pointer">
              
              <div className={`w-4 h-4 rounded-full border-2 bg-[#14182a] transition-all duration-300
                ${index === 0 
                  ? 'border-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
                  : 'border-[#3BC8E7] group-hover:border-white group-hover:scale-110'
                }`}
              ></div>

              <div className="flex gap-4 items-center pr-4">
                <div className="relative w-15 h-15 shrink-0 rounded-lg overflow-hidden">
                  <img 
                    src={item.cover_image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/150x150?text=No+Image";
                    }}
                  />
                  {index === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                       <BarChart2 className="text-white w-6 h-6 animate-pulse" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white text-sm font-bold truncate group-hover:text-[#3BC8E7] transition-colors">
                      {item.title}
                    </h3>
                    {/* Thay duration bằng Năm phát hành */}
                    <span className="text-gray-400 text-xs font-mono">
                      {new Date(item.release_date).getFullYear()}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1 truncate">
                    {item.artist_name || "Unknown Artist"}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default NewReleases;