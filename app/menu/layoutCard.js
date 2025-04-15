'use client'

import Image from 'next/image'
import { UtensilsCrossed, Clock, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

// ✅ Import custom food-orders hook
import { useFoodOrders } from '@/app/context/FoodOrderContext'

export default function LayoutCard({ items }) {
  useEffect(() => {
    console.log('Card View - Full items array:', items)
  }, [items])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <CardItem key={item.id} item={item} />
      ))}
    </div>
  )
}

function CardItem({ item }) {
  const [favorited, setFavorited] = useState(false)
  const { addToOrder } = useFoodOrders() // ✅ Add to order context

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition relative">
      <button
        onClick={() => setFavorited(!favorited)}
        className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full shadow"
      >
        <Heart size={18} className={favorited ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
      </button>

      <div className="w-full max-w-[300px] mx-auto aspect-square bg-gray-100 relative">
        <Image
          src={item.featuredImage}
          alt={item.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{item.title}</h2>
        <p className="text-gray-700 text-sm line-clamp-3">{item.content}</p>

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

        {/* ✅ Add to Order Button */}
        <button
          onClick={() => addToOrder(item)}
          className="mt-3 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Add to Order
        </button>
      </div>
    </div>
  )
}
