// File: /app/media/MediaManager/MediaGrid.js
// Description: Displays media items from context instead of fetching directly

'use client'

import React, { useEffect, useContext } from 'react'
import { MediaManagerContext } from './MediaManagerProvider'
import MediaItemCard from './MediaItemCard'

export default function MediaGrid() {
  // Pull media state and refresh function from context
  const { mediaItems, refreshMediaLibrary, loading } = useContext(MediaManagerContext)

  // Fetch media when the component mounts
  useEffect(() => {
    refreshMediaLibrary()
  }, [refreshMediaLibrary])

  return (
    <div>
      {loading && (
        <p className="text-sm text-gray-500">Loading media...</p>
      )}

      {!loading && mediaItems.length === 0 && (
        <p className="text-sm text-gray-500">No media found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mediaItems.map((item) => (
          <MediaItemCard key={item.id} media={item} />
        ))}
      </div>
    </div>
  )
}
