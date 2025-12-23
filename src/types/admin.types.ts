export interface Banner {
  id: number;
  url: string;
  position: string;
}

export interface Statistics { // DTO
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  totalSongs: number;
  totalAlbums: number;
  revenue?: number;
}
