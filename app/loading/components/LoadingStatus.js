'use client';

import React, { useEffect, useState } from 'react';
import { subscribeToLoadingChanges, getLoadingProgress } from '../loadingManager';

// Displays loading % as a simple overlay or inline component
export default function LoadingStatus({ overlay = true }) {
  const [percent, setPercent] = useState(getLoadingProgress().percent);

  useEffect(() => {
    const unsubscribe = subscribeToLoadingChanges((progress) => {
      setPercent(progress.percent);
    });
    return () => unsubscribe();
  }, []);

  if (percent === 100) return null;

  return overlay ? (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-xl font-semibold text-gray-800 animate-pulse">
        Loading... {percent}%
      </div>
    </div>
  ) : (
    <div className="text-sm text-gray-500 mb-4">Loading: {percent}%</div>
  );
}
