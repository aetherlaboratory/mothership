'use client';

import React, { useEffect, useState } from 'react';
import { fetchImages } from '../utils/fetchImages';

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function loadPhotos() {
      const data = await fetchImages('photo');
      setPhotos(data);
    }
    loadPhotos();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Photography</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded shadow p-4 flex flex-col">
            
            {/* Featured Image */}
            {photo.featured_image && (
              <img
                src={photo.featured_image}
                alt={photo.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}

            {/* Gallery Thumbnails */}
            <div className="flex flex-wrap gap-2 mb-3">
              {photo.image_gallery?.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-14 h-14 object-cover rounded"
                />
              ))}
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-1">{photo.title}</h2>

            {/* Excerpt */}
            <p className="text-sm text-gray-600">
              {photo.content
                ?.replace(/<[^>]+>/g, '') // Strip HTML
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
