import React from 'react';

export interface AlbumData {
  id: number;
  title: string;
  artist: string;
  image: string;
}

interface AlbumCardProps {
  album: AlbumData;
  className?: string;
}

const AlbumCard = ({ album, className }: AlbumCardProps) => {
  return (
    <div className={`shrink-0 cursor-pointer group ${className ?? 'w-43.75'}`}>
      <div className="w-full aspect-square overflow-hidden rounded-2xl mb-3 relative">
        <img
          src={album.image}
          alt={album.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-white text-[14px] font-bold tracking-wide line-clamp-2 min-h-10.5 group-hover:text-[#3BC8E7] transition-colors">
          {album.title}
        </h3>
        <p className="text-gray-400 text-[12px] font-medium truncate">
          {album.artist}
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;