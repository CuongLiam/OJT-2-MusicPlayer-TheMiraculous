// src/components/Album/AlbumCard.tsx
import React from 'react';
import { Album } from '../../types/music.types';

interface AlbumCardProps {
  album: Album;
  className?: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, className }) => {
  return (
    <div className={`shrink-0 cursor-pointer group ${className ?? 'w-43.75'}`}>
      <div className="w-full aspect-square overflow-hidden rounded-2xl mb-3 relative">
        <img
          src={album.cover_image}
          alt={album.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/200x200?text=No+Image"; 
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-white text-[14px] font-bold tracking-wide line-clamp-2 min-h-10.5 group-hover:text-[#3BC8E7] transition-colors">
          {album.title}
        </h3>
        <p className="text-gray-400 text-[12px] font-medium truncate">
          {album.artist_name || "Unknown Artist"}
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;