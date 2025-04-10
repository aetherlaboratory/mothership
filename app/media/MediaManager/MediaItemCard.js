// Description: Displays individual media item with thumbnail and delete logic

'use client'

import React, { useContext } from 'react'
import { MediaManagerContext } from './MediaManagerProvider'
import { deleteMedia } from '@/app/media/mediaActions'
import { Trash2, Image as ImageIcon, File } from 'lucide-react'

const getMediaPreview = (media) => {
  if (media.media_type === 'image') {
    return (
      <img
        src={media.source_url}
        alt={media.alt_text || media.title.rendered}
        className="w-full h-28 object-cover rounded-md"
      />
    )
  }

  if (media.media_type === 'file') {
    return (
      <div className="flex flex-col items-center justify-center h-28 bg-gray-50 rounded-md">
        <File className="w-6 h-6 text-gray-400" />
        <p className="text-xs text-gray-500 mt-1 truncate max-w-[90%]">
          {media.title.rendered}
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-28 bg-gray-100 rounded-md">
      <ImageIcon className="w-6 h-6 text-gray-400" />
    </div>
  )
}

export default function MediaItemCard({ media }) {
  const { selectMedia, refreshMediaLibrary } = useContext(MediaManagerContext)

  const handleInsert = () => {
    selectMedia(media)
    console.log('📌 Media selected:', media)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteMedia(media.id)
        alert('Media deleted.')
        if (refreshMediaLibrary) refreshMediaLibrary()
      } catch (err) {
        alert('Failed to delete media.')
      }
    }
  }

  return (
    <div className="relative group border rounded-md shadow-sm overflow-hidden hover:shadow-md transition">
      {getMediaPreview(media)}

      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={handleInsert}
          className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
        >
          Insert
        </button>
        <button
          onClick={handleDelete}
          className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}