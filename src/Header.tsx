import React from 'react';
// Import các icon cần thiết từ thư viện FontAwesome (giống style trong ảnh)
import { FaSearch, FaLanguage, FaBars, FaUserPlus, FaUser } from 'react-icons/fa';

interface HeaderProps {
  // Bạn có thể thêm props nếu cần xử lý sự kiện click
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="w-full bg-[#1e2336] text-white py-3 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* --- LEFT SECTION: SEARCH BAR --- */}
        <div className="flex items-center gap-4 flex-1">
          {/* Search Input Group */}
          <div className="flex items-center bg-white rounded overflow-hidden max-w-[300px] w-full h-10">
            <input 
              type="text" 
              placeholder="Search Music Here.." 
              className="px-4 py-2 w-full text-gray-700 text-sm outline-none border-none placeholder-gray-400"
            />
            <button className="h-full px-4 bg-[#38bdf8] hover:bg-[#22d3ee] text-white flex items-center justify-center transition-colors">
              <FaSearch />
            </button>
          </div>

          {/* Trending Text: Chỉ hiện trên màn hình lớn (Large Desktop) */}
          {/* hidden lg:block: Ẩn ở mobile/tablet, hiện ở màn hình lg trở lên */}
          <div className="hidden xl:block text-sm text-gray-300 truncate">
            <span className="text-[#38bdf8] font-medium">Trending Songs :</span> Dream your moments, Until I Met You, Gim
          </div>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex items-center gap-4">
          
          {/* Language Selector: Ẩn trên Mobile, Hiện trên Tablet/Desktop */}
          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-[#38bdf8] transition-colors">
            <span className="text-sm">Languages</span>
            <FaLanguage size={20} />
          </div>

          {/* BUTTON GROUP */}
          
          {/* 1. Phiên bản Desktop/Tablet (Hiện Chữ) */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity">
              Register
            </button>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity">
              Login
            </button>
          </div>

          {/* 2. Phiên bản Mobile (Hiện Icon tròn) */}
          <div className="flex md:hidden items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-white shadow-md">
              <FaUserPlus />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-white shadow-md">
              <FaUser />
            </button>
          </div>

          {/* HAMBURGER MENU */}
          {/* Logic: Hiện trên Mobile và Tablet. Ẩn trên Desktop cực lớn (nếu muốn giống ảnh 1) 
              Tuy nhiên ảnh 2 (Tablet) có menu, ảnh 1 (Desktop) không có.
              Ta dùng logic: block xl:hidden (Hiện tất cả, chỉ ẩn khi màn hình cực lớn) */}
          <button 
            className="block xl:hidden text-white text-2xl ml-2 focus:outline-none"
            onClick={onMenuClick}
          >
            <FaBars />
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;