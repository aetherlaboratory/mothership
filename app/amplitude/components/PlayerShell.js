'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsPlaying,
} from '../redux/audioSlice';

export default function PlayerShell() {
  const dispatch = useDispatch();

  const currentTrack = useSelector((state) => state.audio.currentTrack);
  const currentTrackIndex = useSelector((state) => state.audio.currentTrackIndex);
  const isPlaying = useSelector((state) => state.audio.isPlaying);

  const [shuffleOn, setShuffleOn] = useState(false);
  const [repeatOn, setRepeatOn] = useState(false);

 const togglePlayPause = () => {
  if (typeof window !== 'undefined') {
    const Amplitude = require('amplitudejs');

    if (isPlaying) {
      // ⏸ If already playing, pause it
      Amplitude.pause();
      dispatch(setIsPlaying(false));
    } else {
      // ⛔️ Stop any residual playback before playing fresh
      Amplitude.stop();

      // ▶️ Force play current track index
      Amplitude.playSongAtIndex(currentTrackIndex);
      dispatch(setIsPlaying(true));
    }
  }
};


  const toggleShuffle = () => {
    if (typeof window !== 'undefined' && window.Amplitude) {
      const newState = !shuffleOn;
      window.Amplitude.setShuffle(newState);
      setShuffleOn(newState);
    }
  };

  const toggleRepeat = () => {
    if (typeof window !== 'undefined' && window.Amplitude) {
      const newState = !repeatOn;
      window.Amplitude.setRepeat(newState);
      setRepeatOn(newState);
    }
  };

  const handleVolumeChange = (e) => {
    const volume = parseInt(e.target.value);
    if (typeof window !== 'undefined' && window.Amplitude) {
      window.Amplitude.setVolume(volume);
    }
  };

  return (
    <div id="white-player" className="p-6 rounded-md shadow bg-white mb-6">
      {/* 🎚 Header */}
      <div className="white-player-top flex justify-between items-center mb-4">
        <div>&nbsp;</div>
        <div className="center text-sm uppercase font-semibold text-gray-600 tracking-wider">
          Now Playing
        </div>
        <div>
          <span className="show-playlist w-5 h-5 cursor-pointer">🎵</span>
        </div>
      </div>

      {/* 🎨 Album + Info */}
      <div id="white-player-center" className="flex flex-col items-center">
        <img
          src={currentTrack?.cover_art_url || '/img/default-cover.png'}
          alt={currentTrack?.title || 'Album Cover'}
          className="main-album-art w-32 h-32 rounded object-cover mb-4"
        />

        <div className="song-meta-data text-center mb-3">
          <p className="song-name font-bold text-lg" data-amplitude-song-info="name">
            {currentTrack?.title || 'Track Name'}
          </p>
          <p className="song-artist text-gray-500" data-amplitude-song-info="artist">
            {currentTrack?.artist || 'Artist'}
          </p>
          <p className="text-sm italic text-gray-400" data-amplitude-song-info="album">
            {currentTrack?.album || 'Album'}
          </p>
        </div>

        {/* 🎧 Time Progress Bar */}
        <div className="time-progress w-full">
          <div id="progress-container" className="relative">
            <input type="range" className="amplitude-song-slider w-full h-1" />
            <progress
              id="song-played-progress"
              className="amplitude-song-played-progress absolute top-0 left-0 h-1 w-full bg-blue-500"
            />
            <progress
              id="song-buffered-progress"
              className="amplitude-buffered-progress absolute top-0 left-0 h-1 w-full bg-gray-200"
              value="0"
            />
          </div>

          <div className="time-container flex justify-between text-xs mt-2 text-gray-500">
            <span className="current-time">
              <span className="amplitude-current-minutes" />:
              <span className="amplitude-current-seconds" />
            </span>
            <span className="duration">
              <span className="amplitude-duration-minutes" />:
              <span className="amplitude-duration-seconds" />
            </span>
          </div>
        </div>
      </div>

      {/* 🎛 Controls */}
      <div
        id="white-player-controls"
        className="flex flex-col gap-3 items-center mt-6"
      >
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={toggleShuffle}
            className={`px-2 py-1 rounded ${shuffleOn ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            🔀
          </button>

          <button className="amplitude-prev px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ⏮
          </button>

          <button
            onClick={togglePlayPause}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          <button className="amplitude-next px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ⏭
          </button>

          <button
            onClick={toggleRepeat}
            className={`px-2 py-1 rounded ${repeatOn ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            🔁
          </button>
        </div>

        {/* 🔊 Volume */}
        <div className="w-full">
          <input
            type="range"
            min="0"
            max="100"
            className="amplitude-volume-slider w-full"
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}
