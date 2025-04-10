'use client';

import { createSlice } from '@reduxjs/toolkit';

// 🧱 Initial state for the audio player
const initialState = {
  playlist: [],               // 🎵 Full list of track objects
  currentTrackIndex: 0,       // 🔢 Which song is playing
  currentTrack: null,         // 🎶 Full track object (optional but useful)
  isPlaying: false,           // ▶️ or ⏸
  isReady: false,             // ✅ Amplitude initialized
};

// 🎚️ Slice
const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    // 🎵 Load playlist into state
    setPlaylist(state, action) {
      state.playlist = action.payload;
    },

    // ▶️ Play specific track by index
    playTrack(state, action) {
      const index = action.payload;
      state.currentTrackIndex = index;
      state.currentTrack = state.playlist[index];
      state.isPlaying = true;
    },

    // ⏸ Pause track
    pauseTrack(state) {
      state.isPlaying = false;
    },

    // ⏭ Next track
    nextTrack(state) {
      const nextIndex = (state.currentTrackIndex + 1) % state.playlist.length;
      state.currentTrackIndex = nextIndex;
      state.currentTrack = state.playlist[nextIndex];
    },

    // ⏮ Previous track
    prevTrack(state) {
      const prevIndex = (state.currentTrackIndex - 1 + state.playlist.length) % state.playlist.length;
      state.currentTrackIndex = prevIndex;
      state.currentTrack = state.playlist[prevIndex];
    },

    // ➕ Add to playlist
    addToPlaylist(state, action) {
      const newTrack = action.payload;
      const exists = state.playlist.some(t => t.url === newTrack.url);
      if (!exists) {
        state.playlist.push(newTrack);
      }
    },

    // 🔄 Set playback state manually
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },

    // ✅ Ready flag after Amplitude.init()
    setIsReady(state, action) {
      state.isReady = action.payload;
    },

    // 🎯 Set current full track (metadata)
    setCurrentTrack(state, action) {
      state.currentTrack = action.payload;
    },

    // 🔢 Set current track index manually
    setCurrentTrackIndex(state, action) {
      state.currentTrackIndex = action.payload;
    },
  },
});

export const {
  setPlaylist,
  playTrack,
  pauseTrack,
  nextTrack,
  prevTrack,
  addToPlaylist,
  setIsPlaying,
  setIsReady,
  setCurrentTrack,           // ✅ Newly added
  setCurrentTrackIndex,      // ✅ Added to fix existing usage
} = audioSlice.actions;

export default audioSlice.reducer;
