import { createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type { Song } from '../../types/music.types';

interface PlayerState {
  currentSong: Song | null;    
  isPlaying: boolean;         
  queue: Song[];              
  currentIndex: number;       
  volume: number;           
  isMuted: boolean;           
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  volume: 0.8,
  isMuted: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.currentIndex = state.queue.findIndex(s => s.id === action.payload.id);
    },

    setQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
    },

    togglePlay: (state) => {
      if (state.currentSong) {
        state.isPlaying = !state.isPlaying;
      }
    },

    nextSong: (state) => {
      if (state.queue.length > 0) {
        state.currentIndex = (state.currentIndex + 1) % state.queue.length;
        state.currentSong = state.queue[state.currentIndex];
        state.isPlaying = true;
      }
    },

    prevSong: (state) => {
      if (state.queue.length > 0) {
        state.currentIndex = (state.currentIndex - 1 + state.queue.length) % state.queue.length;
        state.currentSong = state.queue[state.currentIndex];
        state.isPlaying = true;
      }
    },

    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const { setSong, setQueue, togglePlay, nextSong, prevSong, setVolume } = playerSlice.actions;
export default playerSlice.reducer;