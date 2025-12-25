import { createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type { Song } from '../../types/music.types';

interface PlayerState {
  currentSong: Song | null;    // Bài hát đang phát
  isPlaying: boolean;         // Trạng thái phát/tạm dừng
  queue: Song[];              // Danh sách bài hát đang chờ
  currentIndex: number;       // Vị trí bài hát hiện tại trong queue
  volume: number;             // Âm lượng (0 - 1)
  isMuted: boolean;           // Trạng thái tắt tiếng
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
    // Chọn một bài hát để phát ngay lập tức
    setSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      // Cập nhật vị trí nếu bài hát đã có trong queue
      state.currentIndex = state.queue.findIndex(s => s.id === action.payload.id);
    },

    // Thiết lập danh sách phát (Queue)
    setQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
    },

    // Bật/Tạm dừng nhạc
    togglePlay: (state) => {
      if (state.currentSong) {
        state.isPlaying = !state.isPlaying;
      }
    },

    // Chuyển bài hát tiếp theo [cite: 244]
    nextSong: (state) => {
      if (state.queue.length > 0) {
        state.currentIndex = (state.currentIndex + 1) % state.queue.length;
        state.currentSong = state.queue[state.currentIndex];
        state.isPlaying = true;
      }
    },

    // Quay lại bài trước
    prevSong: (state) => {
      if (state.queue.length > 0) {
        state.currentIndex = (state.currentIndex - 1 + state.queue.length) % state.queue.length;
        state.currentSong = state.queue[state.currentIndex];
        state.isPlaying = true;
      }
    },

    // Thay đổi âm lượng
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const { setSong, setQueue, togglePlay, nextSong, prevSong, setVolume } = playerSlice.actions;
export default playerSlice.reducer;