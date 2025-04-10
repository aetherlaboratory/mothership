'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setPlaylist } from './store/videoPlayerSlice'
import fetchVideos from '../lib/fetchVideos'
import VideoPlayer from './components/videoPlayer'

export default function VideosPage() {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const playlist = await fetchVideos()
        if (!playlist.length) {
          console.warn('⚠️ Empty playlist')
        }
        dispatch(setPlaylist(playlist))
      } catch (err) {
        console.error('🔒 Playlist fetch error:', err)
        router.push('/login')
      }
    }

    loadVideos()
  }, [])

  return (
    <div className="p-6">
      <VideoPlayer />
    </div>
  )
}
