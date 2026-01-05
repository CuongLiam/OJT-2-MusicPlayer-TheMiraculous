// src/components/ProtectedArtistRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../../../types/music.types';

const ProtectedArtistRoute = () => {
  const storedUser = localStorage.getItem("artist_user");

  let user: User | null = null;
  
  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("User data is corrupted.");
    }
  }

  if (!user || !user.roles.includes("ROLE_ARTIST")) {
    return <Navigate to="/artist/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedArtistRoute;