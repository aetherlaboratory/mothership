// app/menu/layoutCard.js

'use client'

import Image from 'next/image'
import { UtensilsCrossed, Clock } from 'lucide-react'
import { useEffect } from 'react'

// Card layout with square images
export default function LayoutCard({ items }) {
  useEffect(() => {
    console.log('Card View - Full items array:', items)
  }, [items])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <div
          key={item.id}
          className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          {/* Square Image */}
          <div className="w-full max-w-[300px] mx-auto aspect-square bg-gray-100 relative">

            <Image
              src={item.featuredImage}
              alt={item.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-700 text-sm line-clamp-3">
              {item.content}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t mt-2">
              <div className="flex items-center gap-1">
                <UtensilsCrossed size={14} />
                <span>${item.price || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{item.prepTime || '—'}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
