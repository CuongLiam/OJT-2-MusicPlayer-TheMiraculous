import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Song, Album, User } from '../../../types/music.types'; 

interface DashboardStats {
  artistInfo: User; 
  totalSongs: number;
  totalAlbums: number;
  totalViews: number;
  topSongs: Song[];
  recentUploads: Song[];
}

interface ArtistDashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArtistDashboardState = {
  stats: null,
  loading: false,
  error: null,
};

export const fetchArtistDashboardData = createAsyncThunk(
  'artistDashboard/fetchData',
  async (artistId: number | string, { rejectWithValue }) => {
    try {
      // 1. Gọi thêm API /users/${artistId} để lấy thông tin Artist
      const [songsRes, albumsRes, userRes] = await Promise.all([
        axios.get(`http://localhost:3000/songs`), 
        axios.get(`http://localhost:3000/albums`),
        axios.get(`http://localhost:3000/users/${artistId}`)
      ]);

      const allSongs = songsRes.data as Song[];
      const allAlbums = albumsRes.data as Album[];
      const artistInfo = userRes.data as User;

      // 2. Lọc dữ liệu của Artist
      const artistSongs = allSongs.filter(s => String(s.artist_id) === String(artistId));
      const artistAlbums = allAlbums.filter(a => String(a.artist_id) === String(artistId));
      
      const totalViews = artistSongs.reduce((sum, song) => sum + (song.views || 0), 0);

      const topSongs = [...artistSongs]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 3);

      const recentUploads = [...artistSongs]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      // 3. Trả về có thêm artistInfo
      return {
        artistInfo,
        totalSongs: artistSongs.length,
        totalAlbums: artistAlbums.length,
        totalViews,
        topSongs,
        recentUploads
      };

    } catch (error: any) {
      return rejectWithValue(error.message || 'Error retrieving Dashboard data');
    }
  }
);

const artistDashboardSlice = createSlice({
  name: 'artistDashboard',
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.stats = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtistDashboardData.fulfilled, (state, action: PayloadAction<DashboardStats>) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchArtistDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDashboardData } = artistDashboardSlice.actions;
export default artistDashboardSlice.reducer;