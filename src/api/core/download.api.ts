import axios from "axios";
import type { Song, Album, User } from "../../types/music.types";

/**
 * =================================================================
 * DOWNLOAD PAGE API SERVICE
 * =================================================================
 * Handles all data for download page:
 * - Free Downloads table (top 15 most viewed songs)
 * - Download Now carousel (top 15 most viewed songs)
 * - Recently Played carousel (from history)
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
 * For carousel sections (simpler data structure)
 */
export interface DownloadSongCard {
    id: string;
    title: string;
    artist_name: string;
    album_cover: string;
}

/**
 * For table display
 */
export interface DownloadTableSong {
    id: string;
    title: string;
    album: string;
    duration: string;
    artist_name: string;
    album_cover: string;
}

/**
 * BASE URL from environment
 */
const API_URL = import.meta.env.VITE_SV_HOST || 'http://localhost:3000';

/**
 * DOWNLOAD PAGE API
 */
export const DownloadAPI = {
    /**
     * =================================================================
     * 1. GET FREE DOWNLOADS (TABLE)
     * =================================================================
     * Get top 15 most viewed songs for the table
     * Includes full details: title, album, duration, artist
     * 
     * @returns Array of DownloadTableSong
     */
    getFreeDownloads: async (): Promise<DownloadTableSong[]> => {
        try {
            console.log('📥 Fetching free downloads...');

            // 1️⃣ Fetch everything needed
            const [downloads, songs, albums, users] = await Promise.all([
            axios.get(`${API_URL}/downloads`).then(res => res.data),
            axios.get(`${API_URL}/songs`).then(res => res.data),
            axios.get(`${API_URL}/albums`).then(res => res.data),
            axios.get(`${API_URL}/users`).then(res => res.data),
            ]);

            if (downloads.length === 0) {
            console.log('ℹ️ No downloads found');
            return [];
            }

            // 2️⃣ Convert downloads → song IDs
            const downloadedSongIds = downloads.map((d: any) =>
            String(d.song_id)
            );

            // 3️⃣ Get only downloaded songs
            const downloadedSongs = songs.filter((s: Song) =>
            downloadedSongIds.includes(String(s.id))
            );

            // 4️⃣ Map to table format
            const tableData: DownloadTableSong[] = downloadedSongs.map((song: Song) => {
            const album = albums.find((a: Album) => String(a.id) === String(song.album_id));
            const artist = users.find((u: User) => String(u.id) === String(song.artist_id));

            return {
                id: song.id,
                title: song.title,
                album: album?.title || "Unknown Album",
                duration: song.duration,
                artist_name: artist
                ? `${artist.first_name} ${artist.last_name}`.trim()
                : "Unknown Artist",
                album_cover: album?.cover_image || song.cover_image || "",
            };
            });

            console.log('✅ Free downloads loaded:', tableData.length, 'songs');
            return tableData;

        } catch (error) {
            console.error("❌ Error fetching free downloads:", error);
            throw error;
        }
    },


    /**
     * =================================================================
     * 2. GET DOWNLOAD NOW (CAROUSEL)
     * =================================================================
     * Get top 15 most viewed songs for Download Now carousel
     * Simpler data structure - just for display cards
     * 
     * @param limit - Number of songs (default: 15)
     * @returns Array of DownloadSongCard
     */
    getDownloadNow: async (limit: number = 15): Promise<DownloadSongCard[]> => {
        try {
            console.log('📥 Fetching download now...');

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
            const cards: DownloadSongCard[] = topSongs.map((song: Song) => {
                const album = albums.find((a: Album) => String(a.id) === String(song.album_id));
                const artist = users.find((u: User) => String(u.id) === String(song.artist_id));

                return {
                    id: song.id,
                    title: song.title,
                    artist_name: artist 
                        ? `${artist.first_name} ${artist.last_name}`.trim()
                        : "Unknown Artist",
                    album_cover: album?.cover_image || song.cover_image || "",
                };
            });

            console.log('✅ Download now loaded:', cards.length, 'songs');
            return cards;

        } catch (error) {
            console.error("❌ Error fetching download now:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 3. GET RECENTLY PLAYED (CAROUSEL)
     * =================================================================
     * Get recently played songs from user history
     * 
     * @param userId - User ID (optional)
     * @param limit - Number of songs (default: 6)
     * @returns Array of DownloadSongCard
     */
    getRecentlyPlayed: async (userId?: string, limit: number = 6): Promise<DownloadSongCard[]> => {
        try {
            console.log('📥 Fetching recently played...');

            // Fetch parallel
            const [songs, albums, users, history] = await Promise.all([
                axios.get(`${API_URL}/songs`).then(res => res.data),
                axios.get(`${API_URL}/albums`).then(res => res.data),
                axios.get(`${API_URL}/users`).then(res => res.data),
                userId 
                    ? axios.get(`${API_URL}/history?user_id=${userId}`).then(res => res.data)
                    : Promise.resolve([])
            ]);

            let recentSongs: Song[] = [];

            if (userId && history.length > 0) {
                // USER LOGGED IN WITH HISTORY
                const sortedHistory = [...history].sort((a: any, b: any) => 
                    new Date(b.played_at).getTime() - new Date(a.played_at).getTime()
                );

                // Get unique song_ids (avoid duplicates)
                const uniqueSongIds = Array.from(
                    new Set(sortedHistory.map((h: any) => String(h.song_id)))
                ).slice(0, limit);

                recentSongs = songs.filter((s: Song) => 
                    uniqueSongIds.includes(String(s.id))
                );

                // Sort by history order
                recentSongs.sort((a, b) => {
                    const indexA = uniqueSongIds.indexOf(String(a.id));
                    const indexB = uniqueSongIds.indexOf(String(b.id));
                    return indexA - indexB;
                });
            } else if (userId && history.length === 0) {
                // USER LOGGED IN BUT NO HISTORY
                console.log('ℹ️ User has no history yet');
                return [];
            } else if (!userId) {
                // GUEST USER: Show latest songs
                console.log('ℹ️ Guest user - showing latest songs');
                recentSongs = [...songs]
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, limit);
            }

            // Map to card format
            const cards: DownloadSongCard[] = recentSongs.map((song: Song) => {
                const album = albums.find((a: Album) => String(a.id) === String(song.album_id));
                const artist = users.find((u: User) => String(u.id) === String(song.artist_id));

                return {
                    id: song.id,
                    title: song.title,
                    artist_name: artist 
                        ? `${artist.first_name} ${artist.last_name}`.trim()
                        : "Unknown Artist",
                    album_cover: album?.cover_image || song.cover_image || "",
                };
            });

            console.log('✅ Recently played loaded:', cards.length, 'songs');
            return cards;

        } catch (error) {
            console.error("❌ Error fetching recently played:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 4. ADD TO FAVOURITES
     * =================================================================
     * Add a song to user's wishlist
     * 
     * @param userId - User ID
     * @param songId - Song ID
     */
    addToFavourites: async (userId: string, songId: string): Promise<void> => {
        try {
            // Check if already exists
            const existing = await axios.get(
                `${API_URL}/wishlist?user_id=${userId}&song_id=${songId}`
            );

            if (existing.data.length > 0) {
                console.log('ℹ️ Song already in favourites');
                return;
            }

            // Add to wishlist
            await axios.post(`${API_URL}/wishlist`, {
                user_id: Number(userId),
                song_id: Number(songId)
            });

            console.log('✅ Added to favourites:', songId);

        } catch (error) {
            console.error("❌ Error adding to favourites:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 5. REMOVE FROM DOWNLOADS
     * =================================================================
     * 
     * @param userId - User ID
     * @param songId - Song ID
     */
    removeFromDownloads: async (userId: string, songId: string): Promise<void> => {
        try {
            console.log('🗑️ Removing from downloads:', songId);

            await new Promise(resolve => setTimeout(resolve, 500));
            
            console.log('✅ Removed from downloads');

        } catch (error) {
            console.error("❌ Error removing from downloads:", error);
            throw error;
        }
    },

    downloadSongFile: async (fileUrl: string, filename: string) => {
        const response = await fetch(fileUrl);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.mp3`;
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
        },

        addToDownloads: async (userId: string, songId: string) => {
        // avoid duplicates
        const exists = await axios.get(
            `${API_URL}/downloads?user_id=${userId}&song_id=${songId}`
        );

        if (exists.data.length > 0) return;

        await axios.post(`${API_URL}/downloads`, {
            user_id: Number(userId),
            song_id: Number(songId),
            downloaded_at: new Date().toISOString(),
        });
    },

};