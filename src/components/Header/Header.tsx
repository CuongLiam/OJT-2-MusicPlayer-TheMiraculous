import React from 'react';
import { FaSearch, FaBars, FaUserPlus, FaUser } from 'react-icons/fa';
import LanguageIcon from '../../assets/Header/LanguageIcon.png';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    // Z-index thấp hơn Navbar (Navbar là 50), position relative để nội dung hiển thị đúng
    <header className="w-full bg-[#1e2336] text-white py-3 px-4 shadow-md relative z-10">
      <div className="container mx-auto flex items-center justify-between font-josefin">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4 flex-1 h-20">
          {/* Search Input Group */}
          <div className="flex items-center bg-white rounded overflow-hidden max-w-65 w-full h-10">
            <input 
              type="text" 
              placeholder="Search Music Here.." 
              className="px-4 py-2 w-full text-gray-700 text-sm outline-none border-none placeholder-gray-400"
            />
            <button className="h-full px-4 bg-[#38bdf8] hover:bg-[#22d3ee] text-white flex items-center justify-center transition-colors">
              <FaSearch />
            </button>
          </div>

          <div className="hidden xl:block text-sm text-gray-300 truncate ml-8.75">
            <span className="text-[#38bdf8] font-medium">Trending Songs :</span> Dream your moments, Until I Met You, Gim
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          
          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-[#38bdf8] transition-colors ml-51.5 mr-15.5">
            <span className="text-sm">Languages</span>
            {/* Đảm bảo ảnh tồn tại hoặc comment dòng dưới nếu chưa có ảnh */}
            <img src={LanguageIcon} alt="Language" className="w-5 h-5 object-contain" />
          </div>

          {/* BUTTON GROUP */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-6 py-2 h-12 max-w-25 rounded-full bg-linear-to-r from-[#38bdf8] to-[#22d3ee] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity">
              Register
            </button>
            <button className="px-6 py-2 h-12 max-w-25 rounded-full bg-linear-to-r from-[#38bdf8] to-[#22d3ee] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity ml-4">
              Login
            </button>
          </div>

          {/* MOBILE ICONS */}
          <div className="flex md:hidden items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-white shadow-md">
              <FaUserPlus />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-white shadow-md">
              <FaUser />
            </button>
          </div>

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