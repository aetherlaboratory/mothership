'use client';

import React from 'react';

export default function PlayerControls() {
  return (
    <div id="white-player-controls" className="flex justify-center items-center gap-4 py-4">
      {/* 🔀 Shuffle */}
      <div
        className="amplitude-shuffle amplitude-shuffle-off w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
        id="shuffle"
        title="Shuffle"
      >
        🔀
      </div>

      {/* ⏮ Previous */}
      <div
        className="amplitude-prev w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
        id="previous"
        title="Previous"
      >
        ⏮
      </div>

      {/* ▶️ / ⏸ Play / Pause */}
      <div
        className="amplitude-play-pause w-10 h-10 cursor-pointer bg-blue-500 text-white rounded-full flex items-center justify-center"
        id="play-pause"
        title="Play / Pause"
      >
        ▶️
      </div>

      {/* ⏭ Next */}
      <div
        className="amplitude-next w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
        id="next"
        title="Next"
      >
        ⏭
      </div>

      {/* 🔁 Repeat */}
      <div
        className="amplitude-repeat w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
        id="repeat"
        title="Repeat"
      >
        🔁
      </div>
    </div>
  );
}
