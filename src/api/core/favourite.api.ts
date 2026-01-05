import axios from "axios";
import type { Song, Album, User } from "../../types/music.types";

const API_URL = import.meta.env.VITE_SV_HOST || 'http://localhost:3000';

/**
 * Extended Song type với thông tin đầy đủ
 */
export interface SongWithDetails extends Song {
    artist_name: string;
    artist_image: string;
    album_name: string;
    album_cover: string;
}

/**
 * Wishlist item từ db.json
 */
interface WishlistItem {
    id: string;
    user_id: number;
    song_id: number;
}

export const WishlistAPI = {
    /**
     * =================================================================
     * 1. GET USER WISHLIST
     * =================================================================
     * Lấy danh sách bài hát yêu thích của user
     * Join với songs, albums, users để lấy đầy đủ thông tin
     * 
     * @param userId - ID của user
     * @returns Array of SongWithDetails
     */
    getUserWishlist: async (userId: string): Promise<SongWithDetails[]> => {
        try {
            console.log('🔄 Fetching wishlist for user:', userId);

            // Fetch parallel
            const [wishlistItems, songs, albums, users] = await Promise.all([
                axios.get(`${API_URL}/wishlist?user_id=${userId}`).then(res => res.data),
                axios.get(`${API_URL}/songs`).then(res => res.data),
                axios.get(`${API_URL}/albums`).then(res => res.data),
                axios.get(`${API_URL}/users`).then(res => res.data),
            ]);

            if (wishlistItems.length === 0) {
                console.log('ℹ️ User has no wishlist items');
                return [];
            }

            // Lấy song_ids từ wishlist
            const songIds = wishlistItems.map((item: WishlistItem) => String(item.song_id));

            // Filter songs trong wishlist
            const wishlistSongs = songs.filter((song: Song) => 
                songIds.includes(String(song.id))
            );

            // Join với albums và users
            const songsWithDetails = wishlistSongs.map((song: Song) => {
                const album = albums.find((a: Album) => String(a.id) === String(song.album_id));
                const artist = users.find((u: User) => String(u.id) === String(song.artist_id));

                return {
                    ...song,
                    artist_name: artist 
                        ? `${artist.first_name} ${artist.last_name}`.trim()
                        : "Unknown Artist",
                    artist_image: artist?.profile_image || "",
                    album_name: album?.title || "Unknown Album",
                    album_cover: album?.cover_image || "",
                };
            });

            console.log('✅ Wishlist loaded:', songsWithDetails.length, 'songs');
            return songsWithDetails;

        } catch (error) {
            console.error("❌ Error fetching wishlist:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 2. ADD TO WISHLIST
     * =================================================================
     * Thêm bài hát vào wishlist
     * Kiểm tra trùng lặp trước khi thêm
     * 
     * @param userId - ID của user
     * @param songId - ID của bài hát
     */
    addToWishlist: async (userId: string, songId: string): Promise<void> => {
        try {
            // Kiểm tra đã tồn tại chưa
            const existing = await axios.get(
                `${API_URL}/wishlist?user_id=${userId}&song_id=${songId}`
            );

            if (existing.data.length > 0) {
                console.log('ℹ️ Song already in wishlist');
                return;
            }

            // Thêm mới
            await axios.post(`${API_URL}/wishlist`, {
                user_id: Number(userId),
                song_id: Number(songId)
            });

            console.log('✅ Added to wishlist:', songId);

        } catch (error) {
            console.error("❌ Error adding to wishlist:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 3. REMOVE FROM WISHLIST
     * =================================================================
     * Xóa bài hát khỏi wishlist
     * 
     * @param userId - ID của user
     * @param songId - ID của bài hát
     */
    removeFromWishlist: async (userId: string, songId: string): Promise<void> => {
        try {
            // Tìm wishlist item
            const response = await axios.get(
                `${API_URL}/wishlist?user_id=${userId}&song_id=${songId}`
            );

            if (response.data.length === 0) {
                console.log('ℹ️ Song not in wishlist');
                return;
            }

            // Xóa
            const wishlistId = response.data[0].id;
            await axios.delete(`${API_URL}/wishlist/${wishlistId}`);

            console.log('✅ Removed from wishlist:', songId);

        } catch (error) {
            console.error("❌ Error removing from wishlist:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 4. CHECK IF IN WISHLIST
     * =================================================================
     * Kiểm tra bài hát có trong wishlist không
     * 
     * @param userId - ID của user
     * @param songId - ID của bài hát
     * @returns true nếu có, false nếu không
     */
    isInWishlist: async (userId: string, songId: string): Promise<boolean> => {
        try {
            const response = await axios.get(
                `${API_URL}/wishlist?user_id=${userId}&song_id=${songId}`
            );

            return response.data.length > 0;

        } catch (error) {
            console.error("❌ Error checking wishlist:", error);
            return false;
        }
    },

    /**
     * =================================================================
     * 5. TOGGLE WISHLIST
     * =================================================================
     * Thêm nếu chưa có, xóa nếu đã có
     * 
     * @param userId - ID của user
     * @param songId - ID của bài hát
     * @returns true nếu thêm, false nếu xóa
     */
    toggleWishlist: async (userId: string, songId: string): Promise<boolean> => {
        try {
            const isInWishlist = await WishlistAPI.isInWishlist(userId, songId);

            if (isInWishlist) {
                await WishlistAPI.removeFromWishlist(userId, songId);
                return false; // Đã xóa
            } else {
                await WishlistAPI.addToWishlist(userId, songId);
                return true; // Đã thêm
            }

        } catch (error) {
            console.error("❌ Error toggling wishlist:", error);
            throw error;
        }
    },

    /**
     * =================================================================
     * 6. CLEAR WISHLIST
     * =================================================================
     * Xóa tất cả bài hát trong wishlist của user
     * 
     * @param userId - ID của user
     */
    clearWishlist: async (userId: string): Promise<void> => {
        try {
            const wishlistItems = await axios.get(`${API_URL}/wishlist?user_id=${userId}`);

            // Xóa từng item
            await Promise.all(
                wishlistItems.data.map((item: WishlistItem) =>
                    axios.delete(`${API_URL}/wishlist/${item.id}`)
                )
            );

            console.log('✅ Wishlist cleared');

        } catch (error) {
            console.error("❌ Error clearing wishlist:", error);
            throw error;
        }
    },
};