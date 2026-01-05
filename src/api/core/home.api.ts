import axios from "axios";
import type { Song, Album, Genre, User } from "../../types/music.types";

/**
 * =================================================================
 * HOME PAGE API SERVICE - FINAL VERSION
 * =================================================================
 * Xử lý tất cả data cho trang chủ
 * Merge data từ songs, albums, users, genres
 * =================================================================
 */

/**
 * EXTENDED TYPES - Chứa thông tin đầy đủ cho UI
 */
export interface SongWithDetails extends Song {
    artist_name: string;
    artist_image: string;
    album_name: string;
    album_cover: string;
}

export interface AlbumWithDetails extends Album {
    artist_name: string;
    artist_avatar: string;
}

export interface ArtistWithStats extends User {
    song_count: number;
}

export interface GenreWithStats extends Genre {
    song_count: number;
}

/**
 * BASE URL từ environment
 */
const API_URL = import.meta.env.VITE_SV_HOST || 'http://localhost:3000';

/**
 * HOME PAGE API
 */
export const HomePageAPI = {
    /**
     * =================================================================
     * 1. GET RECENTLY PLAYED
     * =================================================================
     * Lấy bài hát gần đây của user
     * - Nếu có history: Lấy từ history
     * - Nếu chưa có history: Trả về array rỗng []
     * - Nếu chưa login (guest): Lấy 6 bài mới nhất để demo
     * 
     * @param userId - ID của user (optional)
     * @param limit - Số lượng bài hát (default: 6)
     */
    getRecentlyPlayed: async (userId?: string, limit: number = 6): Promise<SongWithDetails[]> => {
        try {
            // Fetch parallel để tăng performance
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
                // USER ĐÃ LOGIN VÀ CÓ HISTORY: Lấy từ history
                const sortedHistory = [...history].sort((a: any, b: any) => 
                    new Date(b.played_at).getTime() - new Date(a.played_at).getTime()
                );

                // Lấy unique song_ids (tránh trùng)
                const uniqueSongIds = Array.from(
                    new Set(sortedHistory.map((h: any) => String(h.song_id)))
                ).slice(0, limit);

                recentSongs = songs.filter((s: Song) => 
                    uniqueSongIds.includes(String(s.id))
                );

                // Sort lại theo thứ tự trong history
                recentSongs.sort((a, b) => {
                    const indexA = uniqueSongIds.indexOf(String(a.id));
                    const indexB = uniqueSongIds.indexOf(String(b.id));
                    return indexA - indexB;
                });
            } else if (userId && history.length === 0) {
                // USER ĐÃ LOGIN NHƯNG CHƯA CÓ HISTORY: Trả về rỗng
                console.log('ℹ️ User has no history yet');
                return [];
            } else if (!userId) {
                // GUEST (CHƯA LOGIN): Hiển thị 6 bài mới nhất để demo
                console.log('ℹ️ Guest user - showing latest songs');
                recentSongs = [...songs]
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, limit);
            }

            // Merge với albums và users
            return recentSongs.map(song => {
                const album = albums.find((a: Album) => String(a.id) === String(song.album_id));
                const artist = users.find((u: User) => String(u.id) === String(song.artist_id));

                return {
                    ...song,
                    artist_name: artist ? `${artist.first_name} ${artist.last_name}`.trim() : "Unknown Artist",
                    artist_image: artist?.profile_image || "",
                    album_name: album?.title || "Unknown Album",
                    album_cover: album?.cover_image || "",
                };
            });
        } catch (error) {
            console.error("❌ Error fetching recently played:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 2. GET WEEKLY TOP 15
     * =================================================================
     * Top 15 bài hát có views cao nhất
     * Sort theo views giảm dần
     */
    getWeeklyTop15: async (): Promise<SongWithDetails[]> => {
        try {
            const [songs, albums, users] = await Promise.all([
                axios.get(`${API_URL}/songs`).then(res => res.data),
                axios.get(`${API_URL}/albums`).then(res => res.data),
                axios.get(`${API_URL}/users`).then(res => res.data),
            ]);

            // Sort theo views giảm dần
            const topSongs = [...songs]
                .sort((a, b) => b.views - a.views)
                .slice(0, 15);

            return topSongs.map((song: Song) => {
                const album = albums.find((a: Album) => String(a.id) === String(song.album_id));
                const artist = users.find((u: User) => String(u.id) === String(song.artist_id));

                return {
                    ...song,
                    artist_name: artist ? `${artist.first_name} ${artist.last_name}`.trim() : "Unknown Artist",
                    artist_image: artist?.profile_image || "",
                    album_name: album?.title || "Unknown Album",
                    album_cover: album?.cover_image || "",
                };
            });
        } catch (error) {
            console.error("❌ Error fetching weekly top 15:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 3. GET FEATURED ARTISTS
     * =================================================================
     * Nghệ sĩ nổi bật có role ROLE_ARTIST
     * Sort theo số lượng bài hát
     */
    getFeaturedArtists: async (limit: number = 6): Promise<ArtistWithStats[]> => {
        try {
            const [users, songs] = await Promise.all([
                axios.get(`${API_URL}/users`).then(res => res.data),
                axios.get(`${API_URL}/songs`).then(res => res.data),
            ]);

            // Filter chỉ lấy ARTIST
            const artists = users.filter((u: User) => 
                u.roles && u.roles.includes('ROLE_ARTIST')
            );

            // Đếm số bài hát của mỗi artist
            const artistsWithStats = artists.map((artist: User) => {
                const songCount = songs.filter((s: Song) => 
                    String(s.artist_id) === String(artist.id)
                ).length;

                return {
                    ...artist,
                    song_count: songCount
                };
            });

            // Sort theo số bài hát giảm dần
            return artistsWithStats
                .sort((a, b) => b.song_count - a.song_count)
                .slice(0, limit);
        } catch (error) {
            console.error("❌ Error fetching featured artists:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 4. GET NEW RELEASES
     * =================================================================
     * Bài hát mới nhất theo created_at
     */
    getNewReleases: async (limit: number = 5): Promise<SongWithDetails[]> => {
        try {
            const [songs, albums, users] = await Promise.all([
                axios.get(`${API_URL}/songs`).then(res => res.data),
                axios.get(`${API_URL}/albums`).then(res => res.data),
                axios.get(`${API_URL}/users`).then(res => res.data),
            ]);

            // Sort theo created_at mới nhất
            const newSongs = [...songs]
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .slice(0, limit);

            return newSongs.map((song: Song) => {
                const album = albums.find((a: Album) => String(a.id) === String(song.album_id));
                const artist = users.find((u: User) => String(u.id) === String(song.artist_id));

                return {
                    ...song,
                    artist_name: artist ? `${artist.first_name} ${artist.last_name}`.trim() : "Unknown Artist",
                    artist_image: artist?.profile_image || "",
                    album_name: album?.title || "Unknown Album",
                    album_cover: album?.cover_image || "",
                };
            });
        } catch (error) {
            console.error("❌ Error fetching new releases:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 5. GET FEATURED ALBUMS
     * =================================================================
     * Albums PREMIUM mới nhất
     */
    getFeaturedAlbums: async (limit: number = 6): Promise<AlbumWithDetails[]> => {
        try {
            const [albums, users] = await Promise.all([
                axios.get(`${API_URL}/albums`).then(res => res.data),
                axios.get(`${API_URL}/users`).then(res => res.data),
            ]);

            // Filter PREMIUM và sort theo release_date
            const premiumAlbums = albums
                .filter((a: Album) => a.type === 'PREMIUM')
                .sort((a: Album, b: Album) => 
                    new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
                )
                .slice(0, limit);

            return premiumAlbums.map((album: Album) => {
                const artist = users.find((u: User) => String(u.id) === String(album.artist_id));

                return {
                    ...album,
                    artist_name: artist ? `${artist.first_name} ${artist.last_name}`.trim() : "Unknown Artist",
                    artist_avatar: artist?.profile_image || "",
                };
            });
        } catch (error) {
            console.error("❌ Error fetching featured albums:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 6. GET TOP GENRES
     * =================================================================
     * Thể loại phổ biến nhất
     * Sort theo số lượng bài hát
     */
    getTopGenres: async (): Promise<GenreWithStats[]> => {
        try {
            const [genres, songs] = await Promise.all([
                axios.get(`${API_URL}/genres`).then(res => res.data),
                axios.get(`${API_URL}/songs`).then(res => res.data),
            ]);

            // Đếm số bài hát cho mỗi genre
            // Fix: Convert genre.id sang number để so sánh với genre_ids (array of numbers)
            // Cast sang any để tránh TypeScript error vì genre_ids có thể undefined
            const genresWithStats = genres.map((genre: Genre) => {
                const genreIdNum = Number(genre.id);
                const songCount = songs.filter((s: any) => 
                    s.genre_ids && Array.isArray(s.genre_ids) && s.genre_ids.includes(genreIdNum)
                ).length;

                return {
                    ...genre,
                    song_count: songCount
                };
            });

            // Sort theo số bài hát giảm dần
            return genresWithStats.sort((a, b) => b.song_count - a.song_count);
        } catch (error) {
            console.error("❌ Error fetching top genres:", error);
            throw error;
        }
    },
};