export interface Genre {
  id: number;
  genre_name: string;
}

export interface Song {
  id: number;
  title: string;
  duration: string;
  album_id?: number | null;
  file_url: string;
  views: number;
  created_at: string;
  updated_at: string;

  // API / UI only
  genres?: Genre[];
  artist_name?: string;
  album?: Album; 
}

export enum AlbumType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

export interface Album {
  id: number;
  title: string;
  release_date: string;
  artist_id: number;
  cover_image: string;
  type: AlbumType;
  created_at: string;
  updated_at: string;
  songs?: Song[];
}
