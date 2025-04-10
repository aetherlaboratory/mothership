// File: /app/hooks/useMediaManager.js
// Description: Hook to access media manager modal state and selected media

'use client'

import { useContext } from 'react'
import { MediaManagerContext } from '@/app/media/MediaManager/MediaManagerProvider'

// Custom hook to simplify access to media manager context
export const useMediaManager = () => {
  const context = useContext(MediaManagerContext)

  if (!context) {
    throw new Error('useMediaManager must be used within a MediaManagerProvider')
  }

  return context
}
