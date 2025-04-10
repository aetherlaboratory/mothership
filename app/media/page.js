// File: /app/media/page.js
// Description: Optional Media Dashboard page for viewing, testing, and managing media uploads via the global media manager

'use client'

import React from 'react'
import { MediaManagerTrigger } from '@/app/media/MediaManager/MediaManagerTrigger'
import { MediaManagerModal } from '@/app/media/MediaManager/MediaManagerModal'
import { MediaManagerProvider } from '@/app/media/MediaManager/MediaManagerProvider'

export default function MediaPage() {
  return (
    // Wrap the entire page in the MediaManagerProvider to enable global modal usage
    <MediaManagerProvider>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold">Media Library</h1>

        {/* Description */}
        <p className="text-gray-600">
          This dashboard allows you to manage media uploads, deletions, and insertions using the WordPress Media Library API.
        </p>

        {/* Trigger button to open the media manager modal */}
        <MediaManagerTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Open Media Library
        </MediaManagerTrigger>

        {/* The modal itself, controlled via context */}
        <MediaManagerModal />
      </div>
    </MediaManagerProvider>
  )
}
