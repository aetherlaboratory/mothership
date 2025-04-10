'use client';

import {
  setCurrentTrackIndex,
  setCurrentTrack,
  setIsReady,
} from '../amplitude/redux/audioSlice';
import store from '../amplitude/redux/store';

export function initAmplitudePlayer(playlist) {
  if (!playlist || playlist.length === 0) return;

  console.log('🔁 Initializing Amplitude with playlist:', playlist);

  const formattedTracks = playlist.map((track) => ({
    name: track.title || 'Untitled',
    artist: track.artist || 'Unknown Artist',
    album: track.album || 'Unknown Album',
    url: track.url,
    cover_art_url: track.cover_art_url || '',
  }));

  // ✅ Use require inside window check to avoid SSR
  if (typeof window !== 'undefined') {
    const Amplitude = require('amplitudejs');

    if (Amplitude && typeof Amplitude.init === 'function') {
      Amplitude.init({
        songs: formattedTracks,
        callbacks: {
          initialized: () => {
            console.log('✅ Amplitude Initialized');
            store.dispatch(setIsReady(true));
            store.dispatch(setCurrentTrackIndex(0));
            store.dispatch(setCurrentTrack(playlist[0]));
          },
          song_change: () => {
            const index = Amplitude.getActiveIndex();
            const current = playlist[index];
            console.log(`🎵 Switched to: ${current?.title} (Index: ${index})`);
            store.dispatch(setCurrentTrackIndex(index));
            store.dispatch(setCurrentTrack(current));
          },
        },
      });
    } else {
      console.warn('⚠️ Amplitude is not loaded or missing init method');
    }
  }
}
