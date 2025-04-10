// app/videos/utils/fetchVideos.js

import axios from 'axios'

// Fetch video playlist from WordPress with localStorage token auth
const fetchVideos = async () => {
  const token = localStorage.getItem('userToken')

  console.log('🔍 Checking stored token in fetchVideos():', token)

  if (!token) {
    throw new Error('No token found in localStorage')
  }

  try {
    console.log('📡 Requesting /custom/v1/films from WordPress...')

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_WP}/custom/v1/films`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('✅ Raw response:', res.data)

    // Convert API response to Video.js playlist format
    const formatted = res.data.map((video, index) => ({
      name: video.title || `Untitled Video ${index}`,
      description: video.video_desc || '',
      sources: [{ src: video.video_file, type: 'video/mp4' }],
      poster: video.poster_image || '',
    }))

    console.log('🎞️ Final formatted playlist:', formatted)

    return formatted

  } catch (err) {
    console.error('❌ Failed to fetch video data:', err)
    return []
  }
}

export default fetchVideos
