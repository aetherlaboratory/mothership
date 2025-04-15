'use client'

import Image from 'next/image'
import { Clock, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

// ✅ Import food order context hook
import { useFoodOrders } from '@/app/context/FoodOrderContext'

export default function LayoutClassic({ items }) {
  useEffect(() => {
    console.log('Classic View - Full items array:', items)
  }, [items])

  return (
    <div className="space-y-6">
      {items.map(item => (
        <ClassicItem key={item.id} item={item} />
      ))}
    </div>
  )
}

function ClassicItem({ item }) {
  const [favorited, setFavorited] = useState(false)
  const { addToOrder } = useFoodOrders() // ✅ Add to food order

  return (
    <div className="flex flex-col sm:flex-row gap-4 border-b pb-6 relative">
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

      <div className="flex-1 space-y-2 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{item.title}</h2>
          <span className="text-lg font-semibold text-gray-800">${item.price || 'N/A'}</span>
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

        {/* ✅ Add to Order + Favorite */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => addToOrder(item)}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Add to Order
          </button>

          <button
            onClick={() => setFavorited(!favorited)}
            className="p-1 rounded-full bg-white shadow"
          >
            <Heart size={18} className={favorited ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
          </button>
        </div>
      </div>
    </div>
  )
}
