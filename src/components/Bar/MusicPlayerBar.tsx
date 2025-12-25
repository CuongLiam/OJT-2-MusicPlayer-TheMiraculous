import React, { useState } from 'react';
import { 
  BsPlayFill, BsPauseFill, BsSkipStartFill, BsSkipEndFill,
  BsHeart, BsVolumeUp, BsDownload
} from 'react-icons/bs';
import '../../assets/css/Font.css';

interface MusicPlayerBarProps {
  isSidebarOpen: boolean;
}

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({ isSidebarOpen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  return (
    <div 
      className={`
        fixed bottom-0 right-0 z-50 px-4 py-3 
        bg-[#525252]/95 backdrop-blur-md border-t border-white/10 text-white 
        transition-all duration-300 bar-josefin max-w-360
        ${isSidebarOpen ? 'left-45 md:left-62.5' : 'left-20'}
      `}
    >
      <div className="w-full max-w-360 mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-45 w-auto lg:w-[30%]">
          <div className="relative group overflow-hidden rounded-xl h-14 w-14 shrink-0 shadow-lg cursor-pointer">
             <img 
                src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=200&auto=format&fit=crop" 
                alt="Album Art" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
             />
             <div className={`absolute inset-0 flex items-center justify-center bg-black/20 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <div className="w-4 h-4 bg-black rounded-full border-2 border-[#d1d5db]"></div> 
             </div>
          </div>
          <div className="hidden sm:block overflow-hidden">
            <h4 className="text-base font-bold text-white truncate hover:underline cursor-pointer">Cro Magnon Man</h4>
            <p className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer truncate">Mushroom Records</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 max-w-150">
          <div className="flex items-center w-full gap-4 md:gap-6 justify-center">
             <div className="flex items-center gap-4">
                <button className="cursor-pointer text-gray-300 hover:text-white transition-colors">
                    <BsSkipStartFill size={24} />
                </button>
                <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className="cursor-pointer w-10 h-10 rounded-full bg-white text-[#525252] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/20"
                >
                  {isPlaying ? <BsPauseFill size={24} /> : <BsPlayFill size={24} className="ml-1"/>}
                </button>
                <button className="cursor-pointer text-gray-300 hover:text-white transition-colors">
                    <BsSkipEndFill size={24} />
                </button>
             </div>
             <div className="hidden md:flex items-center gap-3 flex-1 w-full max-w-75 lg:max-w-100">
                <span className="text-xs font-medium text-gray-200 min-w-8.75 text-right">1:05</span>
                <div className="relative h-1.5 flex-1 bg-gray-400/50 rounded-full cursor-pointer group">
                  <div className="absolute top-0 left-0 h-full bg-[#38bdf8] rounded-full group-hover:bg-[#22d3ee] transition-colors" style={{ width: `${progress}%` }}>
                    <div className="absolute -right-1.5 -top-1 w-3.5 h-3.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-200 min-w-8.75">4:00</span>
             </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 sm:gap-5 w-auto lg:w-[30%] min-w-fit">
          <button className="cursor-pointer hidden sm:block text-gray-300 hover:text-white hover:scale-110 transition-all">
            <BsVolumeUp size={20} />
          </button>
          <button className="cursor-pointer text-gray-300 hover:text-red-500 hover:scale-110 transition-all">
            <BsHeart size={18} />
          </button>
          <button className="cursor-pointer hidden sm:block text-gray-300 hover:text-[#38bdf8] hover:scale-110 transition-all">
            <BsDownload size={18} />
          </button>
        </div>
      </div>
      
      <div className="md:hidden absolute bottom-0 left-0 w-full h-1 bg-gray-600">
         <div className="h-full bg-[#38bdf8]" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default MusicPlayerBar;