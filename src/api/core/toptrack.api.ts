import axios from "axios";
import type { Song, Album, User } from "../../types/music.types";

/**
 * =================================================================
 * TOP TRACK PAGE API SERVICE
 * =================================================================
 * Handles all data for top track page:
 * - Weekly Top 15 (top 15 most viewed songs)
 * - Top Tracks Of All Time (top songs by views)
 * - Trending Tracks (recent songs with high views)
 * =================================================================
 */

/**
 * EXTENDED TYPES - Full information for UI
 */
export interface SongWithDetails extends Song {
    artist_name: string;
    artist_image: string;
    album_name: string;
    album_cover: string;
}

/**
 * For Weekly Top 15 table
 */
export interface TopSongRow {
    rank: number;
    id: string;
    title: string;
    artist: string;
    image: string;
    duration: string;
}

/**
 * For carousel cards
 */
export interface TopTrackCard {
    id: string;
    title: string;
    artist: string;
    image: string;
}

/**
 * For trending timeline
 */
export interface TrendingTrack {
    id: string;
    title: string;
    artist: string;
    duration: string;
    image: string;
}

/**
 * BASE URL from environment
 */
const API_URL = import.meta.env.VITE_SV_HOST || 'http://localhost:3000';

/**
 * TOP TRACK PAGE API
 */
export const TopTrackAPI = {
    /**
     * =================================================================
     * 1. GET WEEKLY TOP 15
     * =================================================================
     * Get top 15 most viewed songs for Weekly Top 15 section
     * Returns full data with rank, title, artist, image, duration
     * 
     * @returns Array of TopSongRow
     */
    getWeeklyTop15: async (): Promise<TopSongRow[]> => {
        try {
            console.log('📥 Fetching weekly top 15...');

            const [songs, albums, users] = await Promise.all([
                axios.get(`${API_URL}/songs`).then(res => res.data),
                axios.get(`${API_URL}/albums`).then(res => res.data),
                axios.get(`${API_URL}/users`).then(res => res.data),
            ]);

            // Sort by views (descending) and take top 15
            const topSongs = [...songs]
                .sort((a: Song, b: Song) => b.views - a.views)
                .slice(0, 15);

            // Map to row format with rank
            const rows: TopSongRow[] = topSongs.map((song: Song, index: number) => {
                const album = albums.find((a: Album) => String(a.id) === String(song.album_id));
                const artist = users.find((u: User) => String(u.id) === String(song.artist_id));

                return {
                    rank: index + 1,
                    id: song.id,
                    title: song.title,
                    artist: artist 
                        ? `${artist.first_name} ${artist.last_name}`.trim()
                        : "Unknown Artist",
                    image: album?.cover_image || song.cover_image || "",
                    duration: song.duration,
                };
            });

            console.log('✅ Weekly top 15 loaded:', rows.length, 'songs');
            return rows;

        } catch (error) {
            console.error("❌ Error fetching weekly top 15:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 2. GET TOP TRACKS OF ALL TIME
     * =================================================================
     * Get top songs by views (all time)
     * Returns card format for carousel display
     * 
     * @param limit - Number of songs (default: 10)
     * @returns Array of TopTrackCard
     */
    getTopTracksAllTime: async (limit: number = 10): Promise<TopTrackCard[]> => {
        try {
            console.log('📥 Fetching top tracks of all time...');

            const [songs, albums, users] = await Promise.all([
                axios.get(`${API_URL}/songs`).then(res => res.data),
                axios.get(`${API_URL}/albums`).then(res => res.data),
                axios.get(`${API_URL}/users`).then(res => res.data),
            ]);

            // Sort by views and take top songs
            const topSongs = [...songs]
                .sort((a: Song, b: Song) => b.views - a.views)
                .slice(0, limit);

            // Map to card format
            const cards: TopTrackCard[] = topSongs.map((song: Song) => {
                const album = albums.find((a: Album) => String(a.id) === String(song.album_id));
                const artist = users.find((u: User) => String(u.id) === String(song.artist_id));

                return {
                    id: song.id,
                    title: song.title,
                    artist: artist 
                        ? `${artist.first_name} ${artist.last_name}`.trim()
                        : "Unknown Artist",
                    image: album?.cover_image || song.cover_image || "",
                };
            });

            console.log('✅ Top tracks all time loaded:', cards.length, 'songs');
            return cards;

        } catch (error) {
            console.error("❌ Error fetching top tracks all time:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 3. GET TRENDING TRACKS
     * =================================================================
     * Get recent songs with high views (trending)
     * Returns timeline format for carousel display
     * 
     * @param limit - Number of songs (default: 10)
     * @returns Array of TrendingTrack
     */
    getTrendingTracks: async (limit: number = 10): Promise<TrendingTrack[]> => {
        try {
            console.log('📥 Fetching trending tracks...');

            const [songs, albums, users] = await Promise.all([
                axios.get(`${API_URL}/songs`).then(res => res.data),
                axios.get(`${API_URL}/albums`).then(res => res.data),
                axios.get(`${API_URL}/users`).then(res => res.data),
            ]);

            // Get current date and 90 days ago
            const now = new Date();
            const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

            // Filter songs created in last 90 days
            const recentSongs = songs.filter((song: Song) => {
                const createdDate = new Date(song.created_at);
                return createdDate >= ninetyDaysAgo;
            });

            // If not enough recent songs, just take the most recent ones
            let trendingSongs: Song[];
            if (recentSongs.length < limit) {
                // Take most recent songs by created_at
                trendingSongs = [...songs]
                    .sort((a: Song, b: Song) => 
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    )
                    .slice(0, limit);
            } else {
                // Sort recent songs by views
                trendingSongs = recentSongs
                    .sort((a: Song, b: Song) => b.views - a.views)
                    .slice(0, limit);
            }

            // Map to trending format
            const trending: TrendingTrack[] = trendingSongs.map((song: Song) => {
                const album = albums.find((a: Album) => String(a.id) === String(song.album_id));
                const artist = users.find((u: User) => String(u.id) === String(song.artist_id));

                return {
                    id: song.id,
                    title: song.title,
                    artist: artist 
                        ? `${artist.first_name} ${artist.last_name}`.trim()
                        : "Unknown Artist",
                    duration: song.duration,
                    image: album?.cover_image || song.cover_image || "",
                };
            });

            console.log('✅ Trending tracks loaded:', trending.length, 'songs');
            return trending;

        } catch (error) {
            console.error("❌ Error fetching trending tracks:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 4. GET ALL TOP TRACK DATA
     * =================================================================
     * Fetch all sections at once for better performance
     * 
     * @returns Object with all three sections
     */
    getAllTopTrackData: async (): Promise<{
        weeklyTop15: TopSongRow[];
        topTracksAllTime: TopTrackCard[];
        trendingTracks: TrendingTrack[];
    }> => {
        try {
            console.log('📥 Fetching all top track data...');

            // Fetch all sections in parallel
            const [weeklyTop15, topTracksAllTime, trendingTracks] = await Promise.all([
                TopTrackAPI.getWeeklyTop15(),
                TopTrackAPI.getTopTracksAllTime(10),
                TopTrackAPI.getTrendingTracks(10)
            ]);

            console.log('✅ All top track data loaded successfully');

            return {
                weeklyTop15,
                topTracksAllTime,
                trendingTracks
            };

        } catch (error) {
            console.error("❌ Error fetching all top track data:", error);
            throw error;
        }
    }
};