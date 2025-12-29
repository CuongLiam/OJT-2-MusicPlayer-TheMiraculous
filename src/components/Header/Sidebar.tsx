import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import DiscoverIcon from '../../assets/Header/DiscoverIcon.png';
import AlbumIcon from '../../assets/Header/AlbumIcon.png';
import ArtistsIcon from '../../assets/Header/ArtistsIcon.png';
import GenresIcon from '../../assets/Header/GenresIcon.png';
import TopTracksIcon from '../../assets/Header/TopTracksIcon.png';
import DownloadsIcon from '../../assets/Header/DownloadsIcon.png';
import FavoritesIcon from '../../assets/Header/FavoritesIcon.png';
import HistoryIcon from '../../assets/Header/HistoryIcon.png';
import '../../assets/css/Font.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = React.useState('Discover');

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
    <>
      <div 
        className={`
          fixed inset-0 bg-black/50 z-55 transition-opacity duration-300 xl:hidden
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
        onClick={toggleSidebar}
      />

      <nav
        className={`
          fixed top-0 left-0 z-60 
          flex flex-col pt-6 pb-11 bg-[#1b2039] text-gray-300 
          transition-all duration-300 ease-in-out border-r border-gray-800 navbar-josefin select-none 
          h-[110vh]
          
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          xl:translate-x-0
          ${isOpen ? "w-64 xl:w-62.5" : "w-64 xl:w-20"} 
        `}
      >
        <button
          onClick={toggleSidebar}
          className={`
            absolute -right-3 top-1/2 transform -translate-y-1/2 z-70
            p-1 rounded-full cursor-pointer shadow-lg transition-all duration-300
            bg-[#1a1f38] text-white hover:bg-cyan-600
            hidden xl:flex items-center justify-center
          `}
        >
          {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </button>

        <div className="flex flex-col w-full">
          <div className="flex flex-col items-center justify-center w-full h-32 shrink-0 mb-4 transition-all duration-300">
            <div className="relative mb-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                <span className="text-white font-bold text-xl">M</span>
              </div>
            </div>

            <div
              className={`
                 overflow-hidden text-center transition-all duration-300 ease-in-out
                 ${isOpen ? "opacity-100 max-h-10" : "opacity-0 max-h-0 xl:opacity-0"} 
               `}
            >
              <h1 className="font-bold text-white text-sm tracking-wide whitespace-nowrap h-5 block">
                The Miraculous
              </h1>
            </div>
          </div>

          <ul className="flex flex-col w-full space-y-2">
            {mainMenuItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <li
                  key={item.name}
                  className="relative w-full cursor-pointer"
                  onClick={() => {
                    setActiveItem(item.name);
                  }}
                >
                  <div
                    className={`
                      flex items-center h-12 transition-all duration-300 ease-in-out
                      ${isOpen ? "px-6" : "xl:pl-7 px-6"} 
                      ${isActive ? "bg-cyan-500 text-white" : "hover:text-white hover:bg-white/5"}
                    `}
                  >
                    <div className={`flex items-center justify-center w-6 h-6 shrink-0 transition-all duration-300`}>
                      {renderIcon(item.icon, isActive)}
                    </div>

                    <span
                      className={`
                        text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                        ${isOpen 
                          ? "max-w-37.5 ml-4 opacity-100" 
                          : "xl:max-w-0 xl:ml-0 xl:opacity-0 max-w-37.5 ml-4 opacity-100"
                        }
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

        <div className="flex flex-col w-full mt-auto pb-18.5">
          <ul className="flex flex-col w-full space-y-2 mt-10">
            {secondaryMenuItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <li
                  key={item.name}
                  className="w-full cursor-pointer"
                  onClick={() => setActiveItem(item.name)}
                >
                  <div
                    className={`
                      flex items-center h-12 transition-all duration-300 ease-in-out
                      ${isOpen ? "px-6" : "xl:pl-7 px-6"}
                      ${isActive ? "bg-cyan-500 text-white" : "hover:text-white hover:bg-white/5"}
                    `}
                  >
                    <div className={`flex items-center justify-center w-6 h-6 shrink-0 transition-all duration-300`}>
                      {renderIcon(item.icon, isActive)}
                    </div>

                    <span
                      className={`
                        text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                        ${isOpen 
                          ? "max-w-37.5 ml-4 opacity-100" 
                          : "xl:max-w-0 xl:ml-0 xl:opacity-0 max-w-37.5 ml-4 opacity-100"
                        }
                        ${isActive ? "text-white" : "text-gray-400"} 
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
    </>
  );
};

export default Sidebar;