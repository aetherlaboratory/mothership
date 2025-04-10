'use client';

import React, { useEffect, useState } from 'react';
import { fetchImages } from '../utils/fetchImages';
import {
  registerTask,
  markTaskDone,
  subscribeToLoadingChanges,
  getLoadingProgress,
} from '../loading/loadingManager';
import { viewTransitionAfterLoading } from '../loading/viewTransitionUtils';
import LoadingStatus from '../loading/components/LoadingStatus';

export default function ArtworkPage() {
  const [artworks, setArtworks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function preloadArtwork() {
      registerTask('fetchArtworks', 3);
      const data = await fetchImages('2dart');
      markTaskDone('fetchArtworks');

      const tasks = [];

      // Preload all featured + gallery images using Image()
      data.forEach((art) => {
        if (art.featured_image) {
          const taskId = `img-featured-${art.id}`;
          registerTask(taskId, 1);
          tasks.push(loadImage(art.featured_image, taskId));
        }

        art.image_gallery?.slice(0, 4).forEach((img, idx) => {
          const taskId = `img-thumb-${art.id}-${idx}`;
          registerTask(taskId, 0.5);
          tasks.push(loadImage(img, taskId));
        });
      });

      await Promise.all(tasks);
      setArtworks(data);
    }

    preloadArtwork();

    viewTransitionAfterLoading(() => {
      setIsLoaded(true);
    }, getLoadingProgress);
  }, []);

  return (
    <main
      className="p-6 transition-opacity duration-500 ease-in-out"
      style={{ opacity: isLoaded ? 1 : 0.3 }}
    >
      <LoadingStatus overlay={true} />

      <h1 className="text-3xl font-bold mb-6">Artwork Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!isLoaded
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="animate-pulse bg-gray-200 h-80 rounded" />
            ))
          : artworks.map((art) => (
              <div key={art.id} className="bg-white rounded shadow p-4 flex flex-col">
                {art.featured_image && (
                  <img
                    src={art.featured_image}
                    alt={art.title}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  {art.image_gallery?.slice(0, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-14 h-14 object-cover rounded"
                    />
                  ))}
                </div>

                <h2 className="text-xl font-semibold mb-1">{art.title}</h2>
                <p className="text-sm text-gray-600">
                  {art.content
                    ?.replace(/<[^>]+>/g, '')
                    .split(' ')
                    .slice(0, 30)
                    .join(' ')}...
                </p>
              </div>
            ))}
      </div>
    </main>
  );
}

// Image loader promise
function loadImage(src, taskId) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      markTaskDone(taskId);
      resolve();
    };
    img.onerror = () => {
      markTaskDone(taskId);
      resolve();
    };
    img.src = src;
  });
}
