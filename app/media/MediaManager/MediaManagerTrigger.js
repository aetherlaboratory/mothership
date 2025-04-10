// File: /app/components/global/MediaManager/MediaManagerTrigger.js
// Description: Trigger component to open the global media manager modal anywhere in the app

'use client'

import React, { useContext } from 'react'
import { MediaManagerContext } from './MediaManagerProvider'

// Props allow reuse with different buttons/styles
export function MediaManagerTrigger({ children, className = '' }) {
  const { openModal } = useContext(MediaManagerContext)

  return (
    <button
      onClick={openModal}
      className={className || 'bg-blue-600 text-white px-4 py-2 rounded-md'}
    >
      {children || 'Open Media Manager'}
    </button>
  )
}
