import axios from 'axios';
import { User } from '../../types/auth.types';
import { Genre, Album, Song } from '../../types/music.types';
import { Banner, Statistics } from '../../types/admin.types';

const API_URL = `${import.meta.env.VITE_SV_HOST || ''}`;

export const adminApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },
  getGenres: async (): Promise<Genre[]> => {
    const response = await axios.get(`${API_URL}/genres`);
    return response.data;
  },
  getAlbums: async (): Promise<Album[]> => {
    const response = await axios.get(`${API_URL}/albums`);
    return response.data;
  },
  getSongs: async (): Promise<Song[]> => {
    const response = await axios.get(`${API_URL}/songs`);
    return response.data;
  },
  getBanners: async (): Promise<Banner[]> => {
    const response = await axios.get(`${API_URL}/banners`);
    return response.data;
  },
  getStatistics: async (): Promise<Statistics> => {
    const response = await axios.get(`${API_URL}/statistics`);
    return response.data;
  }
};

// CRUD helpers
export const createGenre = async (payload: Partial<Genre>): Promise<Genre> => {
  const response = await axios.post(`${API_URL}/genres`, payload);
  return response.data;
};

export const updateGenreApi = async (id: string, payload: Partial<Genre>): Promise<Genre> => {
  const response = await axios.put(`${API_URL}/genres/${id}`, payload);
  return response.data;
};

export const deleteGenreApi = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/genres/${id}`);
};

export const createBanner = async (payload: Partial<Banner>): Promise<Banner> => {
  const response = await axios.post(`${API_URL}/banners`, payload);
  return response.data;
};

export const deleteBannerApi = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/banners/${id}`);
};

export const deleteAlbumApi = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/albums/${id}`);
};

export const deleteSongApi = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/songs/${id}`);
};

export const updateUserStatusApi = async (id: string, status: string): Promise<User> => {
  const response = await axios.patch(`${API_URL}/users/${id}`, { status });
  return response.data;
};
