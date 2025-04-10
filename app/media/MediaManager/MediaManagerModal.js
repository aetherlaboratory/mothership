// File: /app/components/global/MediaManager/MediaManagerModal.js
// Description: Main modal component that displays the media library UI and upload system

'use client'

import React, { useContext } from 'react'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import { MediaManagerContext } from './MediaManagerProvider'
import MediaGrid from './MediaGrid'
import MediaUploadDropzone from './MediaUploadDropzone'

// Main modal component using Headless UI <Dialog>
export function MediaManagerModal() {
  const { isOpen, closeModal } = useContext(MediaManagerContext)

  if (!isOpen) return null

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal container */}
      <div className="relative z-50 w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Modal header */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-100">
          <h2 className="text-xl font-semibold">Media Library</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {/* Upload zone column */}
          <div className="border-r p-4 bg-gray-50">
            <MediaUploadDropzone />
          </div>

          {/* Media grid display */}
          <div className="col-span-3 p-4 overflow-y-auto max-h-[80vh]">
            <MediaGrid />
          </div>
        </div>
      </div>
    </Dialog>
  )
}
