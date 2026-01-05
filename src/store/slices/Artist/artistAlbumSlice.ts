import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Album } from '../../../types/music.types';

interface ArtistAlbumState {
  albums: Album[];
  loading: boolean;
  error: string | null;
}

const initialState: ArtistAlbumState = {
  albums: [],
  loading: false,
  error: null,
};

// 1. Lấy danh sách Album
export const fetchArtistAlbums = createAsyncThunk(
  'artistAlbum/fetchArtistAlbums',
  async (artistId: number | string) => {
    const response = await axios.get(`http://localhost:3000/albums?artist_id=${artistId}`);
    return response.data;
  }
);

// 2. Thêm Album mới
export const createAlbum = createAsyncThunk(
  'artistAlbum/createAlbum',
  async (albumData: any) => {
    const response = await axios.post('http://localhost:3000/albums', albumData);
    return response.data;
  }
);

// 3. Cập nhật Album
export const updateAlbum = createAsyncThunk(
  'artistAlbum/updateAlbum',
  async ({ id, data }: { id: string | number; data: any }) => {
    const response = await axios.patch(`http://localhost:3000/albums/${id}`, data);
    return response.data;
  }
);

// 4. Xóa Album
export const deleteAlbum = createAsyncThunk(
  'artistAlbum/deleteAlbum',
  async (id: string | number) => {
    await axios.delete(`http://localhost:3000/albums/${id}`);
    return id;
  }
);

const artistAlbumSlice = createSlice({
  name: 'artistAlbum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistAlbums.pending, (state) => { state.loading = true; })
      .addCase(fetchArtistAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      // Xử lý Thêm
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.albums.unshift(action.payload);
      })
      // Xử lý Cập nhật
      .addCase(updateAlbum.fulfilled, (state, action) => {
        const index = state.albums.findIndex((a) => String(a.id) === String(action.payload.id));
        if (index !== -1) {
          state.albums[index] = action.payload;
        }
      })
      // Xử lý Xóa
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.filter((a) => String(a.id) !== String(action.payload));
      });
  },
});

export default artistAlbumSlice.reducer;