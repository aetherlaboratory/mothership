'use client';

import React from 'react';

export default function TimeProgress() {
  return (
    <div className="time-progress w-full px-6 mb-4">
      {/* 🎚️ Progress Controls */}
      <div id="progress-container" className="relative w-full mb-2">
        <input
          type="range"
          className="amplitude-song-slider w-full"
          aria-label="Song progress"
        />
        <progress
          id="song-played-progress"
          className="amplitude-song-played-progress absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-blue-500"
          value="0"
        ></progress>
        <progress
          id="song-buffered-progress"
          className="amplitude-buffered-progress absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300"
          value="0"
        ></progress>
      </div>

      {/* 🕒 Timestamps */}
      <div className="time-container flex justify-between text-xs text-gray-600 font-mono">
        <span className="current-time">
          <span className="amplitude-current-minutes"></span>:
          <span className="amplitude-current-seconds"></span>
        </span>
        <span className="duration">
          <span className="amplitude-duration-minutes"></span>:
          <span className="amplitude-duration-seconds"></span>
        </span>
      </div>
    </div>
  );
}
