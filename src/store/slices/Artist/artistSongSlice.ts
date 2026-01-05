import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Song, Album } from '../../../types/music.types';

interface ArtistSongState {
  songs: Song[];
  albums: Album[]; 
  loading: boolean;
  error: string | null;
}

const initialState: ArtistSongState = {
  songs: [],
  albums: [],
  loading: false,
  error: null,
};

// 1. GET: Lấy danh sách bài hát và album của Artist
export const fetchArtistSongs = createAsyncThunk(
  'artistSong/fetchArtistSongs',
  async (artistId: number | string) => {
    const [songsRes, albumsRes] = await Promise.all([
        axios.get(`http://localhost:3000/songs?artist_id=${artistId}`),
        axios.get(`http://localhost:3000/albums?artist_id=${artistId}`)
    ]);
    return { songs: songsRes.data, albums: albumsRes.data };
  }
);

// 2. POST: Thêm bài hát mới (Dữ liệu JSON sau khi đã có link Cloudinary)
export const createSong = createAsyncThunk(
  'artistSong/createSong',
  async (songData: any) => {
    const response = await axios.post('http://localhost:3000/songs', songData);
    return response.data;
  }
);

// 3. PATCH: Cập nhật bài hát
export const updateSong = createAsyncThunk(
  'artistSong/updateSong',
  async ({ id, data }: { id: string; data: any }) => {
    const response = await axios.patch(`http://localhost:3000/songs/${id}`, data);
    return response.data;
  }
);

// 4. DELETE: Xóa bài hát
export const deleteSong = createAsyncThunk(
  'artistSong/deleteSong',
  async (id: string) => {
    await axios.delete(`http://localhost:3000/songs/${id}`);
    return id; 
  }
);

const artistSongSlice = createSlice({
  name: 'artistSong',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload.songs;
        state.albums = action.payload.albums;
      })
      .addCase(createSong.fulfilled, (state, action) => {
        state.songs.unshift(action.payload);
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        const index = state.songs.findIndex((s) => String(s.id) === String(action.payload.id));
        if (index !== -1) {
          state.songs[index] = action.payload;
        }
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.songs = state.songs.filter((s) => String(s.id) !== String(action.payload));
      });
  },
});

export default artistSongSlice.reducer;