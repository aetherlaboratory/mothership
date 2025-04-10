'use client'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveIndex } from '../store/videoPlayerSlice'

export default function VideoPlaylist() {
  const dispatch = useDispatch()
  const { playlist, activeIndex } = useSelector((state) => state.videoPlayer)

  if (!playlist.length) {
    return <p className="text-center text-gray-500 mt-6">Loading video playlist...</p>
  }

  return (
    <div className="vjs-playlist mt-6 space-y-4 max-h-[70vh] overflow-y-auto">
      {playlist.map((video, i) => (
        <div
          key={i}
          onClick={() => dispatch(setActiveIndex(i))}
          className={`cursor-pointer p-2 border rounded transition ${
            i === activeIndex ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <img src={video.poster} alt={video.name} className="w-full h-40 object-cover rounded" />
          <div className="mt-2 font-bold text-sm">{video.name}</div>
          <div className="text-xs text-gray-500">{video.description}</div>
        </div>
      ))}
    </div>
  )
}
