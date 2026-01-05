import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../types/music.types';
import { adminApi, deleteSongApi } from '../../api/core/admin.api';

interface AdminSongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminSongState = {
  songs: [],
  loading: false,
  error: null,
};

export const fetchSongs = createAsyncThunk('admin/fetchSongs', async () => {
  const response = await adminApi.getSongs();
  return response;
});

export const deleteSongAsync = createAsyncThunk('admin/deleteSong', async (id: number) => {
  await deleteSongApi(id);
  return id;
});

const adminSongSlice = createSlice({
  name: 'adminSong',
  initialState,
  reducers: {
    removeSong: (state, action: PayloadAction<number>) => {
      state.songs = state.songs.filter(s => s.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action: PayloadAction<Song[]>) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch songs';
      });

    builder.addCase(deleteSongAsync.fulfilled, (state, action: PayloadAction<number>) => {
      state.songs = state.songs.filter(s => s.id !== action.payload);
    });
  },
});

export const { removeSong } = adminSongSlice.actions;
export default adminSongSlice.reducer;
