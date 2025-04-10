'use client';

import React, { useState } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export default function PlaylistView() {
  const {
    playlist,
    currentTrackIndex,
    play,
    isReady,
  } = useAudioPlayer();

  // 🪟 Local UI toggle for playlist visibility
  const [showPlaylist, setShowPlaylist] = useState(true);

  // 🎚 Toggle playlist container visibility
  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  return (
    <div id="white-player-playlist-container" className="p-4 border-t">
      {/* 📍 Playlist Top */}
      <div className="white-player-playlist-top flex justify-between items-center mb-2">
        <div />
        <div>
          <span className="queue text-sm font-semibold text-gray-700">Queue</span>
        </div>
        <div>
          <span
            className="show-playlist text-blue-600 cursor-pointer"
            onClick={togglePlaylist}
          >
            {showPlaylist ? 'Hide Playlist' : 'Show Playlist'}
          </span>
        </div>
      </div>

      {/* 🆙 Up Next Title */}
      {showPlaylist && (
        <>
          <div className="white-player-up-next text-xs uppercase tracking-wide text-gray-500 mb-2">
            Up Next
          </div>

          {/* 🎵 Playlist Queue */}
          <div className="white-player-playlist flex flex-col gap-2">
            {playlist.map((track, index) => {
              const isNowPlaying = index === currentTrackIndex;

              return (
                <div
                  key={track.id || index}
                  className={`white-player-playlist-song amplitude-song-container amplitude-play-pause flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                    isNowPlaying
                      ? 'bg-blue-200 text-blue-900 font-semibold now-playing'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    if (isReady) {
                      console.log(`🎵 Clicked Track: ${track.title} (Index: ${index})`);
                      play(index);
                      window.Amplitude.playSongAtIndex(index);
                    } else {
                      console.warn('⏳ Amplitude not ready yet.');
                    }
                  }}
                >
                  <img
                    src={track.cover_art_url}
                    className="w-12 h-12 object-cover rounded"
                    alt={track.title}
                  />

                  <div className="playlist-song-meta text-sm">
                    <span className="playlist-song-name block">
                      {track.title}
                      {isNowPlaying && ' 🎵'}
                    </span>
                    <span className="playlist-artist-album text-gray-600">
                      {track.artist} • {track.album}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* 🎧 Playlist Bottom Controls (Optional) */}
      {showPlaylist && (
        <div className="white-player-playlist-controls flex items-center gap-4 mt-4">
          <img
            data-amplitude-song-info="cover_art_url"
            className="playlist-album-art w-14 h-14 object-cover rounded"
            alt="Now Playing"
          />
          <div className="playlist-controls flex-1">
            <div className="playlist-meta-data mb-1">
              <span
                data-amplitude-song-info="name"
                className="song-name block font-semibold"
              ></span>
              <span
                data-amplitude-song-info="artist"
                className="song-artist text-sm text-gray-500"
              ></span>
            </div>
            <div className="playlist-control-wrapper flex gap-2">
              <div className="amplitude-prev cursor-pointer">⏮</div>
              <div className="amplitude-play-pause cursor-pointer">▶️ / ⏸</div>
              <div className="amplitude-next cursor-pointer">⏭</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
