'use client'

import { useFoodOrders } from '@/app/context/FoodOrderContext'

export default function FoodOrderCounter() {
  const { orders } = useFoodOrders()

  if (orders.length === 0) return null

  return (
    <span className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm">
      {orders.length}
    </span>
  )
}
