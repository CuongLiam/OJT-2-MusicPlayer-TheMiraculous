import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlices';
import adminUserReducer from './slices/adminUserSlice';
import adminGenreReducer from './slices/adminGenreSlice';
import adminAlbumReducer from './slices/adminAlbumSlice';
import adminSongReducer from './slices/adminSongSlice';
import adminBannerReducer from './slices/adminBannerSlice';
import adminDashboardReducer from './slices/adminDashboardSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    adminUser: adminUserReducer,
    adminGenre: adminGenreReducer,
    adminAlbum: adminAlbumReducer,
    adminSong: adminSongReducer,
    adminBanner: adminBannerReducer,
    adminDashboard: adminDashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;