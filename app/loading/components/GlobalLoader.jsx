// /app/loading/components/GlobalLoader.jsx

'use client';

import React, { useEffect, useState } from 'react';
import { subscribeToLoadingChanges } from '../loadingManager';

// GlobalLoader listens for progress updates and visually displays a loader bar.
// This can be customized later with animations, logos, or transitions.
export default function GlobalLoader() {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Subscribe to global loading progress updates
    const unsubscribe = subscribeToLoadingChanges((progress) => {
      setLoadingPercent(progress.percent);
      setVisible(progress.percent < 100);
    });

    return () => {
      unsubscribe(); // Cleanup on unmount
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.05)',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${loadingPercent}%`,
          backgroundColor: '#4f46e5', // Indigo or any accent color
          transition: 'width 0.2s ease-out',
        }}
      />
    </div>
  );
}
