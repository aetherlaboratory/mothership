'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useFoodOrders } from '@/app/context/FoodOrderContext'
import { allergyOptions } from './mockOrders'
import { useRouter } from 'next/navigation'
import UserFoodInfo from './UserFoodInfo' // ✅ User login component

export default function FoodOrderContent() {
  const router = useRouter() // ✅ Moved inside the component
  const { orders, removeFromOrder, clearOrders } = useFoodOrders()
  const [selectedAllergy, setSelectedAllergy] = useState('')

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* ✅ Left side: login-aware user panel */}
      <div className="lg:w-1/3">
        <UserFoodInfo />
      </div>

      {/* ✅ Right side: order table + allergy + submission */}
      <div className="lg:w-2/3 space-y-6">
        {orders.length === 0 ? (
          <p className="text-gray-500 italic">No items added to order yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Item</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Remove</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-2 border">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={order.featuredImage}
                          alt={order.title}
                          fill
                          className="object-cover rounded"
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 border font-medium">{order.title}</td>
                    <td className="px-4 py-2 border">${order.price}</td>
                    <td className="px-4 py-2 border text-sm">
                      <button
                        onClick={() => removeFromOrder(order.id)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ Allergy field */}
        <div className="mt-4">
          <label className="block font-medium text-lg mb-2">Allergy Information (for entire order)</label>
          <select
            value={selectedAllergy}
            onChange={e => setSelectedAllergy(e.target.value)}
            className="w-full max-w-md p-2 border rounded"
          >
            <option value="">Select Allergy</option>
            {allergyOptions.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* ✅ Submission + Clear (will be blocked by auth in next step) */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => router.push('/food-orders/checkout')}
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Submit Order
          </button>
          <button
            onClick={clearOrders}
            className="px-6 py-3 bg-gray-200 text-black rounded hover:bg-gray-300 transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
