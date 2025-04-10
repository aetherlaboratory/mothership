// File: /app/components/global/MediaManager/mediaManagerUtils.js
// Description: Utility functions for media formatting, type checks, and preview helpers

// Checks if file is an image based on mime type
export const isImage = (mime) => {
    return mime?.startsWith('image/')
  }
  
  // Checks if file is a video
  export const isVideo = (mime) => {
    return mime?.startsWith('video/')
  }
  
  // Checks if file is audio
  export const isAudio = (mime) => {
    return mime?.startsWith('audio/')
  }
  
  // Checks if file is a PDF
  export const isPDF = (mime) => {
    return mime === 'application/pdf'
  }
  
  // Format file size in bytes into human-readable string
  export const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
  }
  
  // Get extension from filename
  export const getFileExtension = (filename) => {
    return filename?.split('.').pop().toLowerCase()
  }
  
  // Get safe alt text from WP media object
  export const getAltText = (media) => {
    return media?.alt_text || media?.title?.rendered || 'Media'
  }
  