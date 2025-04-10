'use client';

import React from 'react';

export default function NowPlayingInfo() {
  return (
    <div id="white-player-center" className="flex flex-col items-center p-6 gap-4">
      {/* 🎨 Album Art */}
      <img
        data-amplitude-song-info="cover_art_url"
        className="main-album-art w-40 h-40 object-cover rounded-md shadow-md"
        alt="Current Album Art"
      />

      {/* 🎵 Song Meta Info */}
      <div className="song-meta-data text-center">
        <span
          data-amplitude-song-info="name"
          className="song-name block text-lg font-semibold text-black"
        ></span>
        <span
          data-amplitude-song-info="artist"
          className="song-artist block text-sm text-gray-500"
        ></span>
      </div>
    </div>
  );
}
