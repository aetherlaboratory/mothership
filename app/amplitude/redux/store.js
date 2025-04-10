'use client';

import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './audioSlice';

const musicStore = configureStore({
  reducer: {
    audio: audioReducer, // 🎧 Our audio player state
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default musicStore;
