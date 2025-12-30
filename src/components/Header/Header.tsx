import React, { useState, useEffect } from 'react';
import { FaSearch, FaBars, FaUserPlus, FaUser } from 'react-icons/fa';
import SignInModal from '../auth/SignInModal';
import SignUpModal from '../auth/SignUpModal';
import LanguageIcon from '../../assets/Header/LanguageIcon.png';
import '../../assets/css/Font.css';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (showSignIn || showSignUp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSignIn, showSignUp]);

  return (
    <>
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
      <header className="w-full bg-[#1e2336] text-white py-3 px-4 shadow-md relative z-10 header-josefin select-none">
      <div className="container mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-4 flex-1 h-20">
          <div className="flex items-center bg-white rounded overflow-hidden h-10 shrink-0 w-full max-w-65 md:max-w-75 transition-all duration-300">
            <input 
              type="text" 
              placeholder="Search Music Here.." 
              className="px-4 py-2 w-full text-gray-700 text-sm outline-none border-none placeholder-gray-400"
            />
            <button className="h-full px-4 bg-[#38bdf8] hover:bg-[#22d3ee] text-white flex items-center justify-center transition-colors cursor-pointer">
              <FaSearch />
            </button>
          </div>

          <div className="hidden xl:block text-sm text-gray-300 truncate ml-8.75">
            <span className="text-[#38bdf8] font-medium">Trending Songs :</span> Dream your moments, Until I Met You, Gim
          </div>
        </div>

        <div className="flex items-center gap-4">
          
          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-[#38bdf8] transition-colors ml-auto mr-4 lg:mr-15.5">
            <span className="text-sm">Languages</span>
            <img src={LanguageIcon} alt="Language" className="w-5 h-5 object-contain" />
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              className="px-6 py-2 h-12 max-w-25 rounded-full bg-linear-to-r from-[#38bdf8] to-[#22d3ee] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => setShowSignUp(true)}
            >
              Register
            </button>
            <button
              className="px-6 py-2 h-12 max-w-25 rounded-full bg-linear-to-r from-[#38bdf8] to-[#22d3ee] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity ml-4 cursor-pointer"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-white shadow-md"
              onClick={() => setShowSignUp(true)}
            >
              <FaUserPlus />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-white shadow-md"
              onClick={() => setShowSignIn(true)}
            >
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
    </>
  );
};

export default Header;