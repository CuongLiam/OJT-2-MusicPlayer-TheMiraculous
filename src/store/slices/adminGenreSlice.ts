import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Genre } from '../../types/music.types';
import { adminApi, createGenre as createGenreApi, updateGenreApi, deleteGenreApi } from '../../api/core/admin.api';

interface AdminGenreState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminGenreState = {
  genres: [],
  loading: false,
  error: null,
};

export const fetchGenres = createAsyncThunk('admin/fetchGenres', async () => {
  const response = await adminApi.getGenres();
  return response;
});

export const addGenreAsync = createAsyncThunk('admin/addGenre', async (payload: Partial<Genre>) => {
  const response = await createGenreApi(payload);
  return response;
});

export const updateGenreAsync = createAsyncThunk('admin/updateGenre', async ({ id, payload }:{id:number; payload: Partial<Genre>}) => {
  const response = await updateGenreApi(id, payload);
  return response;
});

export const deleteGenreAsync = createAsyncThunk('admin/deleteGenre', async (id: number) => {
  await deleteGenreApi(id);
  return id;
});

const adminGenreSlice = createSlice({
  name: 'adminGenre',
  initialState,
  reducers: {
    addGenre: (state, action: PayloadAction<Genre>) => {
      state.genres.push(action.payload);
    },
    updateGenre: (state, action: PayloadAction<Genre>) => {
      const index = state.genres.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.genres[index] = action.payload;
      }
    },
    removeGenre: (state, action: PayloadAction<number>) => {
      state.genres = state.genres.filter(g => g.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<Genre[]>) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch genres';
      });

    builder
      .addCase(addGenreAsync.fulfilled, (state, action: PayloadAction<Genre>) => {
        state.genres.push(action.payload);
      })
      .addCase(updateGenreAsync.fulfilled, (state, action: PayloadAction<Genre>) => {
        const idx = state.genres.findIndex(g => g.id === action.payload.id);
        if (idx !== -1) state.genres[idx] = action.payload;
      })
      .addCase(deleteGenreAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.genres = state.genres.filter(g => g.id !== action.payload);
      });
  },
});

export const { addGenre, updateGenre, removeGenre } = adminGenreSlice.actions;
export default adminGenreSlice.reducer;
