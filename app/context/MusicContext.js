'use client';

import React, { createContext, useContext, useState } from 'react';

// 🎧 Music Context
const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // 🎯 Set current track and index
  const playTrack = (track, index) => {
    console.log(`🎼 playTrack() called: ${track?.name} (Index: ${index})`);
    setCurrentTrack(track);
    setCurrentIndex(index);
  };

  const clearTrack = () => {
    setCurrentTrack(null);
    setCurrentIndex(null);
  };

  const updatePlaylist = (tracks) => {
    setPlaylist(tracks);
  };

  const markReady = () => setIsReady(true);
  const markNotReady = () => setIsReady(false);

  return (
    <MusicContext.Provider
      value={{
        playlist,
        currentTrack,
        currentIndex,
        isReady,
        playTrack,
        clearTrack,
        updatePlaylist,
        markReady,
        markNotReady
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

// 🎵 Hook to use music state
export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
