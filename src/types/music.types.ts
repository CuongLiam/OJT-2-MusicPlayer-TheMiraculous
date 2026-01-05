export interface Genre {
  id: string;
  genre_name: string;
}

export interface Song {
  id: string; 
  title: string;
  duration: string;
  album_id: string;
  artist_id: string;
  genre_ids: string[];
  file_url: string;
  views: number;
  created_at: string;
  updated_at: string;


  artist_name?: string;   // Để hiển thị tên ca sĩ
  album_cover?: string;   // Để hiển thị ảnh bìa album trong list bài hát
}

export enum AlbumType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

export interface Album {
  id: string;
  title: string;
  release_date: string;
  artist_id: string;
  cover_image: string;
  type: 'PREMIUM' | 'FREE';
  created_at: string;
  updated_at: string;

  artist_name?: string;
  artist_avatar?: string;
}

export interface Downloads {
  id : string;
  user_id : string;
  song_id : string;
  downloaded_at : string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username?: string;
  password?: string;
  profile_image: string | null;
  bio: string | null;
  status: string;
  roles: string[];
  created_at: string;
  updated_at: string;
}
