export interface Banner {
  id: number;
  url: string;
  position: string;
}

export interface Statistics { 
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  totalSongs: number;
  totalAlbums: number;
  revenue?: number;
}
