import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// IMPORT ICONS
import DiscoverIcon from '../../assets/Header/DiscoverIcon.png';
import AlbumIcon from '../../assets/Header/AlbumIcon.png';
import ArtistsIcon from '../../assets/Header/ArtistsIcon.png';
import GenresIcon from '../../assets/Header/GenresIcon.png';
import TopTracksIcon from '../../assets/Header/TopTracksIcon.png';
import DownloadsIcon from '../../assets/Header/DownloadsIcon.png';
import FavoritesIcon from '../../assets/Header/FavoritesIcon.png';
import HistoryIcon from '../../assets/Header/HistoryIcon.png';

interface NavbarProps {
  defaultOpen?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeItem, setActiveItem] = useState('Discover');

  const mainMenuItems = [
    { name: 'Discover', icon: DiscoverIcon },
    { name: 'Albums', icon: AlbumIcon },
    { name: 'Artists', icon: ArtistsIcon },
    { name: 'Genres', icon: GenresIcon },
    { name: 'Top Tracks', icon: TopTracksIcon },
  ];

  const secondaryMenuItems = [
    { name: 'Downloads', icon: DownloadsIcon },
    { name: 'Favourites', icon: FavoritesIcon },
    { name: 'History', icon: HistoryIcon },
  ];

  const toggleNavbar = () => setIsOpen(!isOpen);

  // CẬP NHẬT: Hàm render icon với filter chuẩn hơn
  const renderIcon = (icon: string, isActive: boolean) => {
    return (
      <img 
        src={icon} 
        alt="icon" 
        className={`
          w-6 h-6 object-contain transition-all duration-200
          ${isActive 
            ? 'brightness-0 invert' // Khi active: Biến icon thành màu TRẮNG hoàn toàn
            : 'opacity-50 grayscale hover:opacity-100' // Khi thường: Xám và mờ
          }
        `} 
      />
    );
  };

  return (
    <nav 
      className={`
        fixed top-0 left-0 h-screen z-50 flex flex-col justify-between py-6
        bg-[#1b2039] text-gray-300 transition-all duration-300 ease-in-out border-r border-gray-800
        ${isOpen ? 'w-45 md:w-62.5' : 'w-20'} 
      `}
    >
      <button 
        onClick={toggleNavbar}
        className={`
          absolute -right-3 top-1/2 transform -translate-y-1/2 z-50
          p-1 rounded-full shadow-lg transition-all duration-300
          bg-cyan-500 text-white hover:bg-cyan-600
        `}
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>

      {/* --- PHẦN TRÊN: LOGO & MAIN MENU --- */}
      <div className="flex flex-col w-full">
        <div className={`flex flex-col items-center justify-center mb-8 transition-all duration-300 ${isOpen ? 'px-4' : 'px-0'}`}>
          <div className="relative mb-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              <span className="text-white font-bold text-xl">M</span>
            </div>
          </div>
          <h1 className={`font-bold text-white text-sm tracking-wide transition-opacity duration-200 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
            The Miraculous
          </h1>
        </div>

        <ul className="flex flex-col w-full space-y-2">
          {mainMenuItems.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <li key={item.name} className="relative w-full cursor-pointer" onClick={() => setActiveItem(item.name)}>
                <div 
                  className={`
                    flex items-center h-12 transition-all duration-200
                    ${isOpen ? 'px-6' : 'justify-center px-0'}
                    ${isActive ? 'bg-cyan-500 text-white' : 'hover:text-white hover:bg-white/5'}
                  `}
                >
                  <div className={`flex items-center justify-center w-6 h-6`}>
                    {renderIcon(item.icon, isActive)}
                  </div>
                  
                  <span className={`ml-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                    {item.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* --- PHẦN DƯỚI: SECONDARY MENU (ĐÃ SỬA LỖI MÀU CHỮ) --- */}
      <div className="flex flex-col w-full pb-4">
        <ul className="flex flex-col w-full space-y-2">
          {secondaryMenuItems.map((item) => {
             const isActive = activeItem === item.name;
             return (
              <li key={item.name} className="w-full cursor-pointer" onClick={() => setActiveItem(item.name)}>
                <div 
                  className={`
                    flex items-center h-12 transition-all duration-200
                    ${isOpen ? 'px-6' : 'justify-center px-0'}
                    ${isActive ? 'bg-cyan-500 text-white' : 'hover:text-white hover:bg-white/5'}
                  `}
                >
                  <div className={`flex items-center justify-center w-6 h-6`}>
                     {renderIcon(item.icon, isActive)}
                  </div>

                  {/* CẬP NHẬT: Thêm logic đổi màu text khi active */}
                  <span 
                    className={`
                      ml-4 text-sm font-medium whitespace-nowrap transition-all duration-200 
                      ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                      ${isActive ? 'text-white' : 'text-gray-400'} 
                    `}
                  >
                    {item.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;