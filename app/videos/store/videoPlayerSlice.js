// store/videoPlayerSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playlist: [],
  activeIndex: 0,
  playbackTime: 0,
}

export const videoPlayerSlice = createSlice({
  name: 'videoPlayer',
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      state.playlist = action.payload
    },
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload
    },
    setPlaybackTime: (state, action) => {
      state.playbackTime = action.payload
    },
  },
})

export const { setPlaylist, setActiveIndex, setPlaybackTime } = videoPlayerSlice.actions
export default videoPlayerSlice.reducer
