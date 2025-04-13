// app/food-orders/FoodOrderContent.js

'use client'

import Image from 'next/image'
import { useState } from 'react'
import mockOrders, { allergyOptions } from './mockOrders'

export default function FoodOrderContent() {
  const [selectedAllergy, setSelectedAllergy] = useState('')

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Customer Info */}
      <div className="lg:w-1/3 border p-4 rounded space-y-4 bg-gray-50">
        <h2 className="text-xl font-semibold">Customer Info</h2>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input type="text" value="John Doe" disabled className="w-full mt-1 p-2 border rounded bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="text" value="john@example.com" disabled className="w-full mt-1 p-2 border rounded bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input type="text" value="(555) 123-4567" disabled className="w-full mt-1 p-2 border rounded bg-white" />
        </div>
      </div>

      {/* Orders and Allergy Info */}
      <div className="lg:w-2/3 space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Item</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Custom Notes</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, index) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2 border">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={order.featured_image}
                        alt={order.title}
                        fill
                        className="object-cover rounded"
                        unoptimized
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 border font-medium">{order.title}</td>
                  <td className="px-4 py-2 border">${order.price}</td>
                  <td className="px-4 py-2 border text-sm text-gray-600">
                    {order.customization || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Allergy Info Section */}
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

        {/* Submit Button */}
        <div className="mt-6">
          <button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition">
            Submit Order
          </button>
        </div>
      </div>
    </div>
  )
}
