// store/store.js or store/index.js

import { configureStore } from '@reduxjs/toolkit'
import videoPlayerReducer from './videoPlayerSlice'

const store = configureStore({
  reducer: {
    videoPlayer: videoPlayerReducer,
  },
})

export default store
