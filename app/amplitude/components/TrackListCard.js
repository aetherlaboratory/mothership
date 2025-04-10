'use client';

import { useSelector, useDispatch } from 'react-redux';
import { addToPlaylist, playTrack } from '../redux/audioSlice';

export default function TrackListCard({ track }) {
  const dispatch = useDispatch();

  const currentTrack = useSelector((state) => state.audio.currentTrack);
  const playlist = useSelector((state) => state.audio.playlist);

  const isNowPlaying = currentTrack?.id === track.id;
  const isInPlaylist = Array.isArray(playlist) && playlist.some((t) => t.id === track.id);

  const handleClick = () => {
    // ✅ Add track to playlist if not already in it
    if (!isInPlaylist) {
      dispatch(addToPlaylist(track));
    }

    // 🔍 Find index of clicked track in playlist
    const index = playlist.findIndex((t) => t.id === track.id);

    if (index >= 0) {
      dispatch(playTrack(index));

      if (typeof window !== 'undefined') {
        const Amplitude = require('amplitudejs');
        Amplitude.playSongAtIndex(index);
        console.log(`▶️ Playing track at index ${index}:`, track.title);
      }
    } else {
      console.warn('⚠️ Track not found in playlist.');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`track-card cursor-pointer p-4 rounded shadow transition ${
        isNowPlaying ? 'bg-blue-100 border border-blue-500' : 'bg-white'
      }`}
    >
      <img
        src={track.cover_art_url || '/img/default-cover.png'}
        alt={track.title}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <div className="text-sm font-semibold">{track.title || 'Untitled'}</div>
      <div className="text-xs text-gray-500">{track.artist || 'Unknown Artist'}</div>
      <div className="text-xs italic text-gray-400">{track.album || 'Unknown Album'}</div>
    </div>
  );
}
