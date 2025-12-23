import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import DiscoverIcon from '../../assets/Header/DiscoverIcon.png';
import AlbumIcon from '../../assets/Header/AlbumIcon.png';
import ArtistsIcon from '../../assets/Header/ArtistsIcon.png';
import GenresIcon from '../../assets/Header/GenresIcon.png';
import TopTracksIcon from '../../assets/Header/TopTracksIcon.png';
import DownloadsIcon from '../../assets/Header/DownloadsIcon.png';
import FavoritesIcon from '../../assets/Header/FavoritesIcon.png';
import HistoryIcon from '../../assets/Header/HistoryIcon.png';
import '../../assets/css/HeaderAndNavbar.css';

interface NavbarProps {
  defaultOpen?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ defaultOpen = false }) => {
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

  const renderIcon = (icon: string, isActive: boolean) => {
    return (
      <img 
        src={icon} 
        alt="icon" 
        className={`
          w-6 h-6 object-contain transition-all duration-300
          ${isActive 
            ? 'brightness-0 invert' 
            : 'opacity-50 grayscale hover:opacity-100' 
          }
        `} 
      />
    );
  };

  return (
    <nav 
      className={`
        fixed top-0 left-0 h-screen z-50 flex flex-col justify-between py-6
        bg-[#1b2039] text-gray-300 transition-all duration-300 ease-in-out border-r border-gray-800 navbar-josefin
        ${isOpen ? 'w-45 md:w-62.5' : 'w-20'} 
      `}
    >
      <button 
        onClick={toggleNavbar}
        className={`
          absolute -right-3 top-1/2 transform -translate-y-1/2 z-50
          p-1 rounded-full cursor-pointer shadow-lg transition-all duration-300
          bg-[#1a1f38] text-white hover:bg-cyan-600
        `}
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>

      <div className="flex flex-col w-full">
        <div className={`flex flex-col items-center justify-center mb-8 transition-all duration-300 ${isOpen ? 'px-4' : 'px-0'}`}>
          <div className="relative mb-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              <span className="text-white font-bold text-xl">M</span>
            </div>
          </div>
          
          <div 
             className={`
               overflow-hidden transition-all duration-300 ease-in-out text-center
               ${isOpen ? 'max-h-10 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
             `}
          >
             <h1 className="font-bold text-white text-sm tracking-wide whitespace-nowrap">
                The Miraculous
             </h1>
          </div>
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
                  <div className={`flex items-center justify-center w-6 h-6 shrink-0`}>
                    {renderIcon(item.icon, isActive)}
                  </div>
                  
                  <span 
                    className={`
                      text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                      ${isOpen ? 'max-w-37.5 ml-4 opacity-100' : 'max-w-0 ml-0 opacity-0'}
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
                  <div className={`flex items-center justify-center w-6 h-6 shrink-0`}>
                     {renderIcon(item.icon, isActive)}
                  </div>

                  <span 
                    className={`
                      text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                      ${isOpen ? 'max-w-37.5 ml-4 opacity-100' : 'max-w-0 ml-0 opacity-0'}
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