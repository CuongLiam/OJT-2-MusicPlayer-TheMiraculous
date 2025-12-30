import type { Song } from "./music.types";
export interface SongHistory {
  id: number;
  user_id: number;
  song_id: number;
  played_at: string;
  song?: Song;
}
