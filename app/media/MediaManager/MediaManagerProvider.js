// File: /app/media/MediaManager/MediaManagerProvider.js
// Description: Context provider to control global media modal state, selection, and media list refresh

'use client'

import React, { createContext, useState, useCallback } from 'react'
import { getAllMedia } from '@/app/media/mediaActions'

// Context object
export const MediaManagerContext = createContext()

// Provider component
export function MediaManagerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)              // Modal state
  const [selectedMedia, setSelectedMedia] = useState(null) // Media selection
  const [mediaItems, setMediaItems] = useState([])         // List of media items
  const [loading, setLoading] = useState(false)            // Loading state

  // Open modal
  const openModal = useCallback(() => setIsOpen(true), [])

  // Close modal
  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSelectedMedia(null)
  }, [])

  // Select media item
  const selectMedia = useCallback((media) => {
    setSelectedMedia(media)
  }, [])

  // Refresh media from WordPress
  const refreshMediaLibrary = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllMedia({ per_page: 40 })
      setMediaItems(data)
    } catch (err) {
      console.error('❌ Failed to refresh media:', err)
    }
    setLoading(false)
  }, [])

  // Provide everything via context
  return (
    <MediaManagerContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        selectedMedia,
        selectMedia,
        mediaItems,
        refreshMediaLibrary,
        loading,
      }}
    >
      {children}
    </MediaManagerContext.Provider>
  )
}