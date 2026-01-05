import React from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';

const ArtistHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-[#3c314b] bg-[#191022]/90 backdrop-blur-md sticky top-0 z-40">
      
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8c2bee] transition-colors" 
            size={20} 
          />
          <input 
            className="w-full h-10 bg-[#2a2136] border-none rounded-lg pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#8c2bee] focus:outline-none transition-all" 
            placeholder="Search for songs, albums..." 
            type="text"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full text-gray-400 hover:bg-white/10 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#191022]"></span>
        </button>

        <div className="h-6 w-px bg-[#3c314b]"></div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <span className="text-sm font-medium text-gray-300">Vietnamese</span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default ArtistHeader;