import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { FaSearch, FaBars, FaUserPlus, FaUser, FaSignOutAlt } from 'react-icons/fa';
import LanguageIcon from '../../assets/Header/LanguageIcon.png';
import '../../assets/css/Font.css';
import SignInModal from '../auth/SignInModal';
import SignUpModal from '../auth/SignUpModal';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Prefer sessionStorage (temporary session) if present, otherwise fall back to localStorage
    const raw = sessionStorage.getItem('userLogin') || localStorage.getItem('userLogin');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }

    function onStorage(e: StorageEvent) {
      if (e.key === 'userLogin') {
        const v = e.newValue;
        setUser(v ? JSON.parse(v) : null);
      }
    }

    function onOpenSignIn() {
      setShowSignIn(true);
      setShowSignUp(false);
    }

    function onOpenSignUp() {
      setShowSignUp(true);
      setShowSignIn(false);
    }

    window.addEventListener('storage', onStorage);
    window.addEventListener('open-signin', onOpenSignIn as EventListener);
    window.addEventListener('open-signup', onOpenSignUp as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('open-signin', onOpenSignIn as EventListener);
      window.removeEventListener('open-signup', onOpenSignUp as EventListener);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem('userLogin');
    sessionStorage.removeItem('userLogin');
    setUser(null);
    message.success('Logged out');
    setTimeout(() => window.location.reload(), 500);
  }

  return (
    <header className="max-w-360 bg-[#1e2336] text-white py-3 px-4 shadow-md relative z-10 header-josefin select-none">
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
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-sm truncate max-w-[140px]">
                    {user ? (
                      user.first_name ? `${user.first_name} ${user.last_name}` : (user.name || user.username || user.email || 'User')
                    ) : 'User'}
                  </span>
                  <button onClick={handleLogout} className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity ml-2">
                    <FaSignOutAlt />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => setShowSignUp(true)} className="px-6 py-2 h-12 max-w-25 rounded-full bg-linear-to-r from-[#38bdf8] to-[#22d3ee] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity cursor-pointer">
                  Register
                </button>
                <button onClick={() => setShowSignIn(true)} className="px-6 py-2 h-12 max-w-25 rounded-full bg-linear-to-r from-[#38bdf8] to-[#22d3ee] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity ml-4 cursor-pointer">
                  Login
                </button>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setShowSignUp(true)} className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-white shadow-md">
              <FaUserPlus />
            </button>
            <button onClick={() => setShowSignIn(true)} className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-white shadow-md">
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

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </header>
  );
};

export default Header;