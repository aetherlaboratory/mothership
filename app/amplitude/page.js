'use client';

import { useEffect, useState } from 'react';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { fetchWordPressTracks } from '../lib/fetchTracks';
import TrackListCard from './components/TrackListCard';
import PlayerShell from './components/PlayerShell';

export default function AmplitudeDemoPage() {
  const [tracks, setTracks] = useState([]);
  const { loadPlaylist } = useAudioPlayer();

  useEffect(() => {
    const load = async () => {
      const result = await fetchWordPressTracks();
      setTracks(result);
      loadPlaylist(result);
    };

    load();
  }, []);

  return (
    <div className="example-container">
      <div className="left">
        <PlayerShell />
      </div>

      <div className="right grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <TrackListCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
