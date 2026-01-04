import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBars, FaUserPlus, FaUser, FaPlayCircle } from 'react-icons/fa';
import SignInModal from '../auth/SignInModal';
import SignUpModal from '../auth/SignUpModal';
import LanguageIcon from '../../assets/Header/LanguageIcon.png';
import '../../assets/css/Font.css';

// 1. Định nghĩa Interface cho dữ liệu
interface Song {
  id: number;
  title: string;
  artist_id: number;
  duration: string;
  cover_image?: string; // Tùy chọn nếu bạn muốn hiển thị ảnh
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  roles: string[];
}

interface SearchResult extends Song {
  artist_name: string;
}

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  
  // State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [allArtists, setAllArtists] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // 2. Fetch dữ liệu khi Header được mount (chạy 1 lần)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dùng Promise.all để gọi song song cả 2 API
        const [songsRes, usersRes] = await Promise.all([
          fetch('http://localhost:3000/songs'),
          fetch('http://localhost:3000/users')
        ]);

        const songsData = await songsRes.json();
        const usersData = await usersRes.json();

        setAllSongs(songsData);
        // Chỉ lấy user là Artist để tối ưu
        setAllArtists(usersData.filter((u: User) => u.roles.includes('ROLE_ARTIST')));
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu tìm kiếm:", error);
      }
    };

    fetchData();
  }, []);

  // 3. Logic lọc kết quả tìm kiếm
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const lowerTerm = searchTerm.toLowerCase();

    // Lọc bài hát khớp tiêu đề
    const filtered = allSongs.filter(song => 
      song.title.toLowerCase().includes(lowerTerm)
    ).map(song => {
      // Tìm tên ca sĩ dựa trên artist_id
      const artist = allArtists.find(a => a.id === song.artist_id);
      const artistName = artist ? `${artist.first_name} ${artist.last_name}` : 'Unknown Artist';
      
      return {
        ...song,
        artist_name: artistName
      };
    });

    setSearchResults(filtered);
    setShowDropdown(true);
  }, [searchTerm, allSongs, allArtists]);

  // Xử lý đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Xử lý overflow body khi modal mở
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
      
      <header className="w-full bg-[#1e2336] text-white py-3 px-4 shadow-md relative z-40 header-josefin select-none">
        <div className="container mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4 flex-1 h-20">
            {/* Vùng tìm kiếm được bọc bởi ref để xử lý click outside */}
            <div className="relative w-full max-w-65 md:max-w-75" ref={searchRef}>
              <div className="flex items-center bg-white rounded overflow-hidden h-10 w-full transition-all duration-300">
                <input 
                  type="text" 
                  placeholder="Search Music Here.." 
                  className="px-4 py-2 w-full text-gray-700 text-sm outline-none border-none placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => { if (searchTerm) setShowDropdown(true); }}
                />
                <button className="h-full px-4 bg-[#38bdf8] hover:bg-[#22d3ee] text-white flex items-center justify-center transition-colors cursor-pointer">
                  <FaSearch />
                </button>
              </div>

              {/* DROPDOWN KẾT QUẢ TÌM KIẾM */}
              {showDropdown && (
                <div className="absolute top-12 left-0 w-full bg-white rounded-md shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((song) => (
                        <li 
                          key={song.id}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-none flex items-center justify-between group transition-colors"
                          onClick={() => {
                            console.log("Play song:", song.title);
                            // TODO: Thêm logic điều hướng hoặc phát nhạc tại đây
                            setSearchTerm(''); // Xóa tìm kiếm sau khi chọn
                          }}
                        >
                          <div className="flex flex-col">
                            <span className="text-gray-800 font-semibold text-sm group-hover:text-[#38bdf8] transition-colors line-clamp-1">
                              {song.title}
                            </span>
                            <span className="text-gray-500 text-xs mt-0.5">
                              {song.artist_name} • {song.duration}
                            </span>
                          </div>
                          <FaPlayCircle className="text-gray-400 group-hover:text-[#38bdf8] text-lg" />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm text-center">
                      No songs found.
                    </div>
                  )}
                </div>
              )}
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