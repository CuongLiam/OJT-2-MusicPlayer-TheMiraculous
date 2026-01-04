import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Album } from '../../types/music.types';
import { adminApi, deleteAlbumApi } from '../../api/core/admin.api';

interface AdminAlbumState {
  albums: Album[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminAlbumState = {
  albums: [],
  loading: false,
  error: null,
};

export const fetchAlbums = createAsyncThunk('admin/fetchAlbums', async () => {
  const response = await adminApi.getAlbums();
  return response;
});

export const deleteAlbumAsync = createAsyncThunk('admin/deleteAlbum', async (id: number) => {
  await deleteAlbumApi(id);
  return id;
});

const adminAlbumSlice = createSlice({
  name: 'adminAlbum',
  initialState,
  reducers: {
    removeAlbum: (state, action: PayloadAction<number>) => {
      state.albums = state.albums.filter(a => a.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action: PayloadAction<Album[]>) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch albums';
      });

    builder.addCase(deleteAlbumAsync.fulfilled, (state, action: PayloadAction<number>) => {
      state.albums = state.albums.filter(a => a.id !== action.payload);
    });
  },
});

export const { removeAlbum } = adminAlbumSlice.actions;
export default adminAlbumSlice.reducer;
