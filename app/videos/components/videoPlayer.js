'use client'

import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-playlist'
import 'videojs-playlist-ui'
import { setActiveIndex, setPlaybackTime } from '../store/videoPlayerSlice'

export default function VideoPlayer() {
  const dispatch = useDispatch()
  const playerRef = useRef(null)

  const { playlist, activeIndex } = useSelector((state) => state.videoPlayer)

  useEffect(() => {
    if (!playlist.length || playerRef.current) return

    const player = videojs('video-player', {
      controls: true,
      autoplay: false,
      preload: 'auto',
      responsive: true,
      fluid: true,
    })

    const clonedPlaylist = playlist.map(item => ({ ...item }))

    player.playlist(clonedPlaylist)
    player.playlist.autoadvance(0)
    player.playlistUi()
    player.playlist.currentItem(activeIndex)

    player.on('playlistitem', () => {
      dispatch(setActiveIndex(player.playlist.currentItem()))
    })

    player.on('timeupdate', () => {
      dispatch(setPlaybackTime(player.currentTime()))
    })

    playerRef.current = player

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [playlist])

  // ✅ Watch activeIndex and manually trigger playlist switch
  useEffect(() => {
    if (playerRef.current && playlist.length) {
      const player = playerRef.current
      const current = player.playlist.currentItem()

      if (current !== activeIndex) {
        player.playlist.currentItem(activeIndex)
        player.play()
      }
    }
  }, [activeIndex])

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-screen-xl mx-auto">
      <div className="flex-1">
        <div className="aspect-video w-full max-w-full rounded-lg overflow-hidden border border-gray-300 shadow-lg relative z-0">
          <video
            id="video-player"
            className="video-js vjs-default-skin w-full h-full"
          />
        </div>
      </div>

      <div className="w-full md:w-1/3 max-h-[80vh] overflow-y-auto space-y-4">
        {playlist.map((item, i) => (
          <div
            key={i}
            onClick={() => dispatch(setActiveIndex(i))}
            className={`cursor-pointer p-3 rounded-lg flex gap-4 items-center transition border ${
              i === activeIndex ? 'border-blue-500 bg-blue-50 shadow' : 'border-gray-200 bg-white'
            }`}
          >
            <img
              src={item.poster}
              alt={item.name}
              className="w-28 h-16 rounded object-cover border border-gray-300"
            />
            <div className="flex-1">
              <div className="font-semibold text-sm">{item.name}</div>
              <div className="text-xs text-gray-500 line-clamp-2">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
