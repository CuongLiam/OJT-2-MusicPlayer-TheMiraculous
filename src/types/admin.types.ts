import { ReactNode } from 'react';

export interface Banner {
  id: number;
  url: string;
  position: string;
}

<<<<<<< HEAD
export interface Statistics { 
=======
export interface Statistics {
  totalArtists?: number | ReactNode;
  totalViews?: number;
>>>>>>> 545d4082b2114d2abf44080aba79c2110c841d06
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  totalSongs: number;
  totalAlbums: number;
  totalGenres?: number;
  totalComments?: number;
  revenue?: number;
}
