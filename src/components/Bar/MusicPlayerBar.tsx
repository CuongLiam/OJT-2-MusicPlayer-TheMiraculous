import React, { useMemo, useEffect, useState } from 'react';
import { 
  BsPlayFill,
  BsPauseFill,
  BsSkipStartFill,
  BsSkipEndFill,
  BsHeart,
  BsVolumeUp,
  BsDownload
} from 'react-icons/bs';
import '../../assets/css/Font.css';
import { usePlayer } from '../../contexts/PlayerContext';
import { WishlistAPI } from '../../api/core/favourite.api';

// helper to format seconds to mm:ss
function fmtTime(sec: number) {
  if (!isFinite(sec) || sec <= 0) return '0:00';
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  const m = Math.floor(sec / 60);
  return `${m}:${s}`;
}

interface MusicPlayerBarProps {
  isSidebarOpen: boolean;
}

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({ isSidebarOpen }) => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    next,
    prev,
    seekTo,
    volume,
    setVolume
  } = usePlayer();

  /* ======================================================
     WISHLIST STATE
  ====================================================== */
  const [isFavourite, setIsFavourite] = useState(false);
  const [checkingFav, setCheckingFav] = useState(false);

  const getUserId = () => {
    const userStr = localStorage.getItem('userLogin');
    return userStr ? JSON.parse(userStr).id : null;
  };

  // Check favourite when song changes
  useEffect(() => {
    const checkFavourite = async () => {
      if (!currentSong) {
        setIsFavourite(false);
        return;
      }

      const userId = getUserId();
      if (!userId) {
        setIsFavourite(false);
        return;
      }

      setCheckingFav(true);
      try {
        const exists = await WishlistAPI.isInWishlist(
          String(userId),
          String(currentSong.id)
        );
        setIsFavourite(exists);
      } catch (err) {
        console.error('❌ Failed to check wishlist', err);
        setIsFavourite(false);
      } finally {
        setCheckingFav(false);
      }
    };

    checkFavourite();
  }, [currentSong]);

  const handleToggleFavourite = async () => {
    if (!currentSong) return;

    const userId = getUserId();
    if (!userId) {
      alert('Please login to add favourites');
      return;
    }

    // Optimistic UI
    setIsFavourite(prev => !prev);

    try {
      const added = await WishlistAPI.toggleWishlist(
        String(userId),
        String(currentSong.id)
      );
      setIsFavourite(added);
    } catch (err) {
      console.error('❌ Toggle favourite failed', err);
      setIsFavourite(prev => !prev); // rollback
    }
  };

  /* ======================================================
     PLAYER UI LOGIC
  ====================================================== */
  const progressPercent = useMemo(() => {
    if (!duration || duration === 0) return 0;
    return Math.max(0, Math.min(100, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  function onBarClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const seconds = (duration || 0) * percent;
    seekTo(seconds);
  }

  return (
    <div 
      className={`
        fixed bottom-0 right-0 z-10 px-4 py-3 
        bg-[#525252]/95 backdrop-blur-md border-t border-white/10 text-white 
        transition-all duration-300 bar-josefin
        left-0 w-full                   
        xl:left-20 xl:w-[calc(100%-5rem)] 
      `}
    >
      <div className="w-full mx-auto flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-4 min-w-45 w-auto lg:w-[30%]">
          <div className="relative group overflow-hidden rounded-xl h-14 w-14 shrink-0 shadow-lg cursor-pointer">
            <img 
              src={currentSong?.album_cover || "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=200&auto=format&fit=crop"}
              alt="Album Art" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div className={`absolute inset-0 flex items-center justify-center bg-black/20 ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <div className="w-4 h-4 bg-black rounded-full border-2 border-[#d1d5db]"></div> 
            </div>
          </div>

          <div className="hidden sm:block overflow-hidden">
            <h4 className="text-base font-bold text-white truncate hover:underline cursor-pointer">
              {currentSong?.title ?? 'Not playing'}
            </h4>
            <p className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer truncate">
              {currentSong?.artist_name ?? 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-150">
          <div className="flex items-center w-full gap-4 md:gap-6 justify-center">
            <div className="flex items-center gap-4">
              <button onClick={prev} className="cursor-pointer text-gray-300 hover:text-white transition-colors">
                <BsSkipStartFill size={24} />
              </button>

              <button 
                onClick={togglePlay} 
                className="cursor-pointer w-10 h-10 rounded-full bg-white text-[#525252] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/20"
              >
                {isPlaying ? <BsPauseFill size={24} /> : <BsPlayFill size={24} className="ml-1"/>}
              </button>

              <button onClick={next} className="cursor-pointer text-gray-300 hover:text-white transition-colors">
                <BsSkipEndFill size={24} />
              </button>
            </div>

            <div className="hidden md:flex items-center gap-3 flex-1 w-full max-w-75 lg:max-w-100 select-none">
              <span className="text-xs font-medium text-gray-200 min-w-8.75 text-right">
                {fmtTime(currentTime)}
              </span>

              <div 
                className="relative h-1.5 flex-1 bg-gray-400/50 rounded-full cursor-pointer group"
                onClick={onBarClick}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#38bdf8] rounded-full group-hover:bg-[#22d3ee] transition-colors"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute -right-1.5 -top-1 w-3.5 h-3.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>

              <span className="text-xs font-medium text-gray-200 min-w-8.75">
                {fmtTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-3 sm:gap-5 w-auto lg:w-[30%] min-w-fit">
          <div className="flex items-center gap-2">
            <button className="cursor-pointer hidden sm:block text-gray-300 hover:text-white hover:scale-110 transition-all">
              <BsVolumeUp size={20} />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20"
            />
          </div>

          {/* ❤️ FAVOURITE */}
          <button
            onClick={handleToggleFavourite}
            disabled={checkingFav}
            className={`
              cursor-pointer transition-all
              ${isFavourite ? 'text-red-500 scale-110' : 'text-gray-300'}
              hover:text-red-500 hover:scale-110
              disabled:opacity-50
            `}
          >
            <BsHeart size={18} />
          </button>

          <button className="cursor-pointer hidden sm:block text-gray-300 hover:text-[#38bdf8] hover:scale-110 transition-all">
            <BsDownload size={18} />
          </button>
        </div>
      </div>

      {/* MOBILE PROGRESS */}
      <div className="md:hidden absolute bottom-0 left-0 w-full h-1 bg-gray-600">
        <div className="h-full bg-[#38bdf8]" style={{ width: `${progressPercent}%` }}></div>
      </div>
    </div>
  );
};

export default MusicPlayerBar;
