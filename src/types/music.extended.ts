import type { Album } from "./music.types";

export interface AlbumWithStats extends Album {
    artistName: String
    totalViews: number
    songCount: number
}