import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { RootState } from "../../../store/index";
import {
  LayoutDashboard,
  Library,
  Disc,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import LogoutModal from "./LogoutModal";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stats } = useSelector((state: RootState) => state.artistDashboard);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const storedUserString = localStorage.getItem("artist_user");
  const localUser: any = storedUserString ? JSON.parse(storedUserString) : null;

  const getDisplayName = () => {
    if (stats?.artistInfo) {
      const { first_name, last_name, fullName, username } =
        stats.artistInfo as any;
      if (fullName) return fullName;
      if (first_name || last_name)
        return `${last_name || ""} ${first_name || ""}`.trim();
      return username;
    }
    if (localUser) {
      if (localUser.fullName) return localUser.fullName;
      if (localUser.first_name || localUser.last_name)
        return `${localUser.last_name || ""} ${
          localUser.first_name || ""
        }`.trim();
      return localUser.username || "Artist";
    }
    return "Artist";
  };

  const getAvatar = () => {
    const defaultAvatar = `https://ui-avatars.com/api/?name=${getDisplayName()}&background=8c2bee&color=fff`;
    if (stats?.artistInfo) {
      return (
        (stats.artistInfo as any).profile_image ||
        (stats.artistInfo as any).avatar ||
        defaultAvatar
      );
    }
    if (localUser) {
      return localUser.profile_image || localUser.avatar || defaultAvatar;
    }
    return defaultAvatar;
  };

  const displayName = getDisplayName();
  const displayAvatar = getAvatar();

  const handleLogout = () => {
    localStorage.removeItem("artist_user");
    setIsLogoutModalOpen(false);
    navigate("/artist/login");
  };

  // Hàm này trả về class CSS dựa trên việc đường dẫn có trùng khớp không
  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? "bg-[#8c2bee] text-white shadow-lg shadow-purple-900/20 font-bold" // Style khi Active
      : "text-gray-400 hover:bg-white/5 hover:text-white font-medium"; // Style bình thường
  };

  const iconClass = (path: string) => {
    return location.pathname === path
      ? "text-white"
      : "group-hover:text-[#8c2bee] transition-colors";
  };

  return (
    <>
      <aside className="w-72 bg-[#221a2c] border-r border-[#3c314b] flex flex-col h-screen fixed left-0 top-0 z-50">
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#8c2bee] flex items-center justify-center text-white shadow-lg shadow-purple-900/40">
            <BarChart3 size={20} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-white leading-tight">
              The Miraculous
            </h1>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Artist Portal
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 flex flex-col gap-2 overflow-y-auto mt-4">
          <div className="flex flex-col gap-1">
            <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Menu
            </p>

            {/* Dashboard Link */}
            <Link
              to="/artist/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${getLinkClass(
                "/artist/dashboard"
              )}`}
            >
              <LayoutDashboard
                size={22}
                className={iconClass("/artist/dashboard")}
              />
              <span className="text-sm">Dashboard</span>
            </Link>

            {/* Song Management Link */}
            <Link
              to="/artist/songs"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${getLinkClass(
                "/artist/songs"
              )}`}
            >
              <Library size={22} className={iconClass("/artist/songs")} />
              <span className="text-sm">Song Management</span>
            </Link>

            {/* Album Management Link */}
            <Link
              to="/artist/albums"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${getLinkClass(
                "/artist/albums"
              )}`}
            >
              <Disc size={22} className={iconClass("/artist/albums")} />
              <span className="text-sm">Album Management</span>
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-1">
            <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Account
            </p>
            <Link
              to="/artist/settings"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${getLinkClass(
                "/artist/settings"
              )}`}
            >
              <Settings size={22} className={iconClass("/artist/settings")} />
              <span className="text-sm">Settings</span>
            </Link>
          </div>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-[#3c314b]">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#2a2136] border border-red-500/20 hover:bg-red-600 hover:border-red-600 text-red-500 hover:text-white font-bold h-11 transition-all shadow-lg mb-6 group"
          >
            <LogOut
              size={20}
              className="group-hover:rotate-180 transition-transform duration-300"
            />
            <span>Sign Out</span>
          </button>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <img
              src={displayAvatar}
              alt="Artist"
              className="w-10 h-10 rounded-full border border-gray-600 object-cover"
            />
            <div className="flex flex-col overflow-hidden">
              <p
                className="text-sm font-bold text-white truncate"
                title={displayName}
              >
                {displayName}
              </p>
              <p className="text-xs text-gray-400 truncate">Artist</p>
            </div>
          </div>
        </div>
      </aside>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
