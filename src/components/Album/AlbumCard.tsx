import type { AlbumWithStats } from "../../types/music.extended";
import {Play} from "lucide-react"
interface AlbumCardProps {
    album: AlbumWithStats
}

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <div className="shrink-0 w-48 group cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg aspect-square mb-3">
        <img 
          src={album.cover_image} 
          alt={album.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {/* Play Button Circle Styling */}
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm hover:scale-110 transition-transform">
            <Play className="text-white fill-white" size={24} />
          </div>
        </div>
      </div>
      <h3 className="text-white text-sm font-semibold truncate">
        {album.title}
      </h3>
      
      {/* Artist Name */}
      <p className="text-slate-400 text-xs truncate">
        {album.artistName}
      </p>
    </div>
  );
}
