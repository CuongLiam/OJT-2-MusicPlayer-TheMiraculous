// src/components/Player/SongCard.tsx
import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import type { Song } from '../../types/music.types';

interface Props {
  song: Song;
  /** optional queue to play together with this song */
  queue?: Song[];
  className?: string;
  /** optional flag to stop navigation if song is inside an anchor */
  stopPropagation?: boolean;
}

const SongCard: React.FC<Props> = ({ song, queue, className = '', stopPropagation = true }) => {
  const player = usePlayer();

  function handleClick(e?: React.MouseEvent) {
    if (stopPropagation && e) e.stopPropagation();
    // If we have a queue, put the queue and start same song (playSong will normalize)
    if (queue && queue.length > 0) {
      player.playSong(song, queue);
    } else {
      player.playSong(song);
    }
  }

  return (
    <div
      className={`flex items-start gap-3 cursor-pointer ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
    >
      <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-700">
        <img src={song.album_cover || (song as any).cover_image || 'https://placehold.co/400'} alt={song.title} className="w-full h-full object-cover"/>
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white truncate">{song.title}</div>
        <div className="text-xs text-gray-300 truncate">{song.artist_name ?? 'Unknown Artist'}</div>
      </div>

      <div className="text-xs text-gray-400 ml-2">{song.duration}</div>
    </div>
  );
};

export default SongCard;
