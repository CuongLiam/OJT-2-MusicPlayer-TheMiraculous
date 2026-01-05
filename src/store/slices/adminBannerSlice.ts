import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Banner } from '../../types/admin.types';
import { adminApi, createBanner as createBannerApi, deleteBannerApi } from '../../api/core/admin.api';

interface AdminBannerState {
  banners: Banner[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminBannerState = {
  banners: [],
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk('admin/fetchBanners', async () => {
  const response = await adminApi.getBanners();
  return response;
});

export const addBannerAsync = createAsyncThunk('admin/addBanner', async (payload: Partial<Banner>) => {
  const response = await createBannerApi(payload);
  return response;
});

export const deleteBannerAsync = createAsyncThunk('admin/deleteBanner', async (id: number) => {
  await deleteBannerApi(id);
  return id;
});

const adminBannerSlice = createSlice({
  name: 'adminBanner',
  initialState,
  reducers: {
    addBanner: (state, action: PayloadAction<Banner>) => {
      state.banners.push(action.payload);
    },
    removeBanner: (state, action: PayloadAction<number>) => {
      state.banners = state.banners.filter(b => b.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action: PayloadAction<Banner[]>) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch banners';
      });

    builder
      .addCase(addBannerAsync.fulfilled, (state, action: PayloadAction<Banner>) => {
        state.banners.push(action.payload);
      })
      .addCase(deleteBannerAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.banners = state.banners.filter(b => b.id !== action.payload);
      });
  },
});

export const { addBanner, removeBanner } = adminBannerSlice.actions;
export default adminBannerSlice.reducer;
