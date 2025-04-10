// File: /app/lib/api/wordpress/mediaApi.js
// Description: Alternative location for WordPress media API logic (can mirror mediaActions.js or be used server-side)

import axios from 'axios'

// WP base media endpoint using public env variable
const BASE_URL = process.env.NEXT_PUBLIC_API_WP
const MEDIA_ENDPOINT = `${BASE_URL}/wp/v2/media`

// Basic Auth from WP App Password and username
const AUTH_HEADER = {
  Authorization: `Basic ${btoa(
    `${process.env.NEXT_PUBLIC_WP_USERNAME}:${process.env.NEXT_PUBLIC_WP_APP_PASSWORD}`
  )}`,
}

// Get all media
export async function fetchMedia(params = {}) {
  try {
    const res = await axios.get(MEDIA_ENDPOINT, {
      headers: AUTH_HEADER,
      params,
    })
    return res.data
  } catch (err) {
    console.error('❌ Failed to fetch media:', err)
    return []
  }
}

// Upload a new media file
export async function uploadToWordPress(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('title', file.name)

  try {
    const res = await axios.post(MEDIA_ENDPOINT, formData, {
      headers: {
        ...AUTH_HEADER,
        'Content-Disposition': `attachment; filename="${file.name}"`,
        'Content-Type': file.type,
      },
    })
    return res.data
  } catch (err) {
    console.error('❌ Failed to upload media:', err)
    throw err
  }
}

// Delete media by ID
export async function deleteWordPressMedia(id) {
  try {
    const res = await axios.delete(`${MEDIA_ENDPOINT}/${id}?force=true`, {
      headers: AUTH_HEADER,
    })
    return res.data
  } catch (err) {
    console.error('❌ Failed to delete media:', err)
    throw err
  }
}

// Update metadata (title, alt, caption)
export async function updateWordPressMedia(id, data = {}) {
  try {
    const res = await axios.post(`${MEDIA_ENDPOINT}/${id}`, data, {
      headers: {
        ...AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (err) {
    console.error('❌ Failed to update media:', err)
    throw err
  }
}
