import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { adminApi } from '../../api/core/admin.api';
import { Statistics } from '../../types/admin.types';
import { User, UserStatus, RoleName } from '../../types/auth.types';
import { Song } from '../../types/music.types';

interface AdminDashboardState {
  statistics: Statistics | null;
  users: User[];
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminDashboardState = {
  statistics: null,
  users: [],
  songs: [],
  loading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk('admin/fetchDashboardData', async () => {
  const [stats, users, songs, albums, genres, comments] = await Promise.all([
    adminApi.getStatistics(),
    adminApi.getUsers(),
    adminApi.getSongs(),
    adminApi.getAlbums(),
    adminApi.getGenres(),
    Promise.resolve({ length: 10 }),
  ]);

  return {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === UserStatus.ACTIVE).length,
    blockedUsers: users.filter(u => u.status === UserStatus.BLOCKED).length,
    totalSongs: songs.length,
    totalAlbums: albums.length,
    totalArtists: users.filter(u => u.roles.includes(RoleName.ROLE_ARTIST)).length,
    totalComments: comments.length,
    totalGenres: genres.length,
    totalViews: songs.reduce((acc, song) => acc + (song.views || 0), 0),
    revenue: stats?.revenue,
  };
});


const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard data';
      });
  },
});

export default adminDashboardSlice.reducer;
