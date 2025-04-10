// File: /app/components/global/MediaManager/MediaUploadDropzone.js
// Description: Upload media and refresh the media grid on success

'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadMedia } from '@/app/media/mediaActions'
import { useMediaManager } from '@/app/hooks/useMediaManager'
import { UploadCloud } from 'lucide-react'

export default function MediaUploadDropzone() {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [uploadedItems, setUploadedItems] = useState([])

  // Access global media manager context
  const { refreshMediaLibrary } = useMediaManager()

  // On file drop
  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true)
    setMessage('')
    setUploadedItems([])

    for (const file of acceptedFiles) {
      try {
        const uploaded = await uploadMedia(file)
        console.log('✅ Uploaded:', uploaded)
        setUploadedItems((prev) => [...prev, uploaded])
      } catch (err) {
        console.error('❌ Upload failed:', err)
        setMessage(`Failed to upload ${file.name}`)
      }
    }

    // Optionally notify user
    setMessage('Upload complete.')
    setUploading(false)

    // Refresh global media list
    if (refreshMediaLibrary) refreshMediaLibrary()
  }, [refreshMediaLibrary])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'video/*': [],
      'audio/*': [],
      'application/pdf': [],
    },
    multiple: true,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-6 text-center rounded-lg transition cursor-pointer
      ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
    >
      <input {...getInputProps()} />

      <div className="flex justify-center mb-2">
        <UploadCloud className="w-8 h-8 text-blue-500" />
      </div>

      <p className="text-sm text-gray-600">
        Drag and drop files here, or click to select files.
      </p>

      {uploading && (
        <p className="mt-2 text-blue-600 text-sm animate-pulse">Uploading...</p>
      )}

      {message && !uploading && (
        <p className="mt-2 text-green-600 text-sm">{message}</p>
      )}
    </div>
  )
}
