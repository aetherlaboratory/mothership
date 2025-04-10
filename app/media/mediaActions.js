// File: /app/media/mediaActions.js
// Description: WordPress Media API helper functions using JWT auth from a "service account" (admin user login)

// Dependencies
import axios from 'axios'

// WordPress API base and endpoint
const WP_API_BASE = process.env.NEXT_PUBLIC_API_WP
const WP_MEDIA_ENDPOINT = `${WP_API_BASE}/wp/v2/media`
const WP_JWT_ENDPOINT = `${WP_API_BASE}/jwt-auth/v1/token`

// 🔐 Generate JWT token from service account credentials (admin user from .env)
const getServiceJWT = async () => {
  try {
    const res = await axios.post(WP_JWT_ENDPOINT, {
      username: process.env.NEXT_PUBLIC_WP_ADMIN_USERNAME,
      password: process.env.NEXT_PUBLIC_WP_ADMIN_PASSWORD,
    })

    return res.data?.token
  } catch (err) {
    console.error('❌ Failed to get service JWT token:', err.response?.data || err.message)
    throw new Error('JWT generation failed')
  }
}

// 🔍 GET all media items from WordPress (pagination/search supported)
export const getAllMedia = async (params = {}) => {
  try {
    const token = await getServiceJWT()

    const res = await axios.get(WP_MEDIA_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    })

    return res.data
  } catch (err) {
    console.error('❌ Error fetching media:', err)
    return []
  }
}

// ⬆️ Upload new media file (image, video, audio, etc.)
export const uploadMedia = async (file) => {
  const token = await getServiceJWT()

  if (!token) throw new Error('JWT token not available')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('title', file.name)

  try {
    const res = await axios.post(WP_MEDIA_ENDPOINT, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Disposition': `attachment; filename="${file.name}"`,
        'Content-Type': file.type,
      },
    })

    return res.data
  } catch (err) {
    console.error('❌ Upload error:', err.response?.data || err.message)
    throw err
  }
}

// 🗑️ DELETE media by ID
export const deleteMedia = async (mediaId) => {
  try {
    const token = await getServiceJWT()

    const res = await axios.delete(`${WP_MEDIA_ENDPOINT}/${mediaId}?force=true`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  } catch (err) {
    console.error('❌ Delete error:', err.response?.data || err.message)
    throw err
  }
}

// ✏️ Update media item details (title, alt, caption, etc.)
export const updateMedia = async (mediaId, data = {}) => {
  try {
    const token = await getServiceJWT()

    const res = await axios.post(`${WP_MEDIA_ENDPOINT}/${mediaId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (err) {
    console.error('❌ Update error:', err.response?.data || err.message)
    throw err
  }
}
