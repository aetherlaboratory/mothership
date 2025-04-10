// app/menu/layoutClassic.js

'use client'

import Image from 'next/image'
import { Clock } from 'lucide-react'
import { useEffect } from 'react'

// Classic layout with full-size image on the left side
export default function LayoutClassic({ items }) {
  useEffect(() => {
    console.log('Classic View - Full items array:', items)
  }, [items])

  return (
    <div className="space-y-6">
      {items.map(item => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row gap-4 border-b pb-6"
        >
          {/* Thumbnail Image */}
          <div className="w-full sm:w-40 h-40 bg-gray-100 relative overflow-hidden rounded">
            <Image
              src={item.featuredImage}
              alt={item.title}
              width={160}
              height={160}
              unoptimized
              className="object-cover rounded"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <span className="text-lg font-semibold text-gray-800">

                ${item.price || 'N/A'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock size={14} />
              <span>{item.prepTime || '—'}</span>
            </div>

            {item.content && (
              <p className="text-sm text-gray-700">{item.content}</p>
            )}

            {Array.isArray(item.steps) && item.steps.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                {item.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
