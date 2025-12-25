import type { Song } from "./music.types";

export interface Playlist {
  id: number;
  name: string;
  user_id: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  songs?: Song[];
}

export interface Comment {
  id: number;
  user_id: number;
  song_id: number;
  content: string;
  parent_id?: number;
  user_name?: string;
  replies?: Comment[];
  created_at: string;
}

export interface Wishlist {
  user_id: number;
  song_id: number;
}
