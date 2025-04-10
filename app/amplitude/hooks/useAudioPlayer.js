// /app/amplitude/hooks/useAudioPlayer.js

'use client';

import { useDispatch } from 'react-redux';
import { setPlaylist } from '../redux/audioSlice';
import { initAmplitudePlayer } from '../../lib/initAmplitude';

export function useAudioPlayer() {
  const dispatch = useDispatch();

  const loadPlaylist = (tracks) => {
    if (!tracks || tracks.length === 0) return;

    dispatch(setPlaylist(tracks)); // Store tracks in Redux
    initAmplitudePlayer(tracks);   // ✅ Initialize Amplitude with them
  };

  return {
    loadPlaylist,
  };
}
