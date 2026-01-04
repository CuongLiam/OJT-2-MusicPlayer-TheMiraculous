import { ReactNode } from 'react';

export interface Banner {
  id: number;
  url: string;
  position: string;
}

export interface Statistics {
  totalArtists?: number | ReactNode;
  totalViews?: number;
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  totalSongs: number;
  totalAlbums: number;
  totalGenres?: number;
  totalComments?: number;
  revenue?: number;
}
