import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Admin: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
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

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('userLogin');
    sessionStorage.removeItem('userLogin');
    setUser(null);
    navigate('/', { replace: true });
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">Admin Panel</div>
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/dashboard" className={({ isActive }) =>
                `block p-4 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
              }>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/users" className={({ isActive }) =>
                `block p-4 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
              }>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/genres" className={({ isActive }) =>
                `block p-4 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
              }>
                Genres
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/albums" className={({ isActive }) =>
                `block p-4 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
              }>
                Albums
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/songs" className={({ isActive }) =>
                `block p-4 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
              }>
                Songs
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/banners" className={({ isActive }) =>
                `block p-4 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
              }>
                Banners
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/subscriptions" className={({ isActive }) =>
                `block p-4 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
              }>
                Subscriptions
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/artists" className={({ isActive }) =>
                `block p-4 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
              }>
                Artists
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-end mb-6">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end mr-2 text-right">
                <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                  {user.first_name || user.name || user.email}
                </span>
                <button onClick={handleLogout} title="Logout" className="text-xs text-red-600 hover:underline flex items-center gap-1">
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </div>
              {user.profile_image ? (
                <img src={user.profile_image} alt="avatar" className="w-12 h-12 rounded-full object-cover shadow-sm" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                  {(user.first_name ? user.first_name[0] : (user.name ? user.name[0] : (user.email ? user.email[0] : 'U'))).toUpperCase()}
                </div>
              )}
            </div>
          ) : null}
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default Admin;

