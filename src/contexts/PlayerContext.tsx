import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { Song } from '../types/music.types';

type PlayerContextType = {
  queue: Song[];
  index: number | null;
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number; // seconds
  duration: number; // seconds
  volume: number; // 0..1
  playSong: (song: Song, startQueue?: Song[]) => void;
  playQueue: (songs: Song[], startIndex?: number) => void;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (v: number) => void;
  setQueue: (songs: Song[]) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueueState] = useState<Song[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);

  // initialize audio once
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTime = () => {
      if (!audioRef.current) return;
      setCurrentTime(audioRef.current.currentTime || 0);
    };
    const onLoaded = () => {
      if (!audioRef.current) return;
      setDuration(isFinite(audioRef.current.duration) ? audioRef.current.duration : 0);
    };
    const onEnded = () => {
      next(); // auto next
    };
    const onError = () => {
      // try to skip to next on error
      next();
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep volume in sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  function setQueue(songs: Song[]) {
    setQueueState(songs || []);
  }

  /**
   * Load and (try to) play an index.
   * If songsParam is provided, use that array (and set queue to it).
   * This avoids relying on possibly-stale `queue` state right after setQueueState.
   */
  function loadIndex(i: number | null, songsParam?: Song[]) {
    const audio = audioRef.current;
    const q = Array.isArray(songsParam) ? songsParam : queue;

    if (i === null || !q[i] || !audio) {
      setIndex(null);
      setDuration(0);
      setCurrentTime(0);
      if (audio) {
        audio.pause();
        audio.src = '';
      }
      setIsPlaying(false);
      return;
    }

    const s = q[i];
    // Set the queue state to the provided array if given (keeps state consistent)
    if (songsParam && Array.isArray(songsParam)) {
      setQueueState(songsParam);
    } else {
      // ensure queue state contains q (defensive)
      setQueueState(q);
    }

    setIndex(i);
    setCurrentTime(0);
    setDuration(0);

    // set audio source and attempt to play immediately
    audio.pause();
    audio.src = s.file_url;
    // ensure metadata is (re)loaded
    try {
      audio.load();
    } catch (err) {
      // ignore
    }

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          setIsPlaying(true);
          // duration will be set by 'loadedmetadata' event
        })
        .catch(() => {
          // autoplay blocked: keep paused but loaded
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(true);
    }
  }

  /**
   * Play single song. If startQueue is provided, use it as the queue
   * (and start at the song's index). Otherwise play the single song alone.
   */
  function playSong(song: Song, startQueue?: Song[]) {
    if (startQueue && Array.isArray(startQueue) && startQueue.length > 0) {
      const idx = startQueue.findIndex((x) => String(x.id) === String(song.id));
      if (idx >= 0) {
        // directly load the provided queue and index
        loadIndex(idx, startQueue);
      } else {
        // put the song first
        const arr = [song, ...startQueue];
        loadIndex(0, arr);
      }
    } else {
      // single song -> set queue to only that song and load index 0
      loadIndex(0, [song]);
    }
  }

  /**
   * Play an array of songs as a queue starting from startIndex.
   */
  function playQueue(songs: Song[], startIndex = 0) {
    if (!Array.isArray(songs) || songs.length === 0) return;
    const idx = Math.max(0, Math.min(startIndex, songs.length - 1));
    loadIndex(idx, songs);
  }

  function play() {
    const audio = audioRef.current;
    if (!audio) return;
    const p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(true);
    }
  }

  function pause() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) pause();
    else play();
  }

  function seekTo(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(seconds, audio.duration || seconds));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  }

  function setVolume(v: number) {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  }

  function next() {
    if (queue.length === 0) return;
    if (index === null) {
      loadIndex(0);
      return;
    }
    const nextIndex = index + 1;
    if (nextIndex < queue.length) {
      loadIndex(nextIndex);
    } else {
      // reached end -> stop and keep last song loaded
      pause();
    }
  }

  function prev() {
    if (queue.length === 0) return;
    if (index === null) {
      loadIndex(0);
      return;
    }
    const prevIndex = index - 1;
    if (prevIndex >= 0) loadIndex(prevIndex);
    else loadIndex(0);
  }

  const contextValue: PlayerContextType = {
    queue,
    index,
    currentSong: index !== null && queue[index] ? queue[index] : null,
    isPlaying,
    currentTime,
    duration,
    volume,
    playSong,
    playQueue,
    togglePlay,
    play,
    pause,
    next,
    prev,
    seekTo,
    setVolume,
    setQueue,
  };

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}
