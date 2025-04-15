'use client'

import { useEffect, useState } from 'react'
import useAuthGuard from '@/app/hooks/useAuthGuard'
import React from 'react'

// ✅ Mock data simulating submitted food orders
const mockOrders = [
  {
    id: 1,
    user: { name: 'John Doe', email: 'john@example.com' },
    items: ['Burger', 'Fries', 'Coke'],
    method: 'Stripe',
    paid: true,
    total: 18.5,
    allergies: 'Peanuts',
    notes: 'No ice in Coke',
    timestamp: '2025-04-14T08:33:00Z'
  },
  {
    id: 2,
    user: { name: 'Sarah Smith', email: 'sarah@example.com' },
    items: ['Steak (Medium Rare)', 'Mashed Potatoes', 'Ice Cream'],
    method: 'CashApp',
    paid: false,
    total: 32.0,
    allergies: 'Lactose intolerant',
    notes: 'Extra ice cream, steak medium rare',
    timestamp: '2025-04-14T21:00:00Z'
  }
]

export default function AllFoodOrdersPage() {
  const { user, loading: authLoading } = useAuthGuard()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // ✅ Load mock data with delay for UI testing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timeout)
  }, [])

  // 🔐 Wait until user/auth is checked
  if (authLoading || loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        ⏳ Loading food orders...
      </div>
    )
  }

  // 🔐 Admin-only access check
  const allowedRoles = ['administrator', 'admin']
  const userRoles = user?.roles?.map(r => r.toLowerCase?.()) || []
  const isAllowed = userRoles.some(role => allowedRoles.includes(role))

  if (!isAllowed) {
    return (
      <div className="text-center py-10 text-lg text-red-600">
        ❌ You do not have permission to view this page.
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📦 All Food Orders</h1>

      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Paid</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <React.Fragment key={order.id}>
              {/* Primary Order Info */}
              <tr className="border-t hover:bg-gray-50 font-medium">
                <td className="p-2 border align-top">{index + 1}</td>
                <td className="p-2 border align-top">{order.user.name}</td>
                <td className="p-2 border align-top">{order.user.email}</td>
                <td className="p-2 border align-top">
                  {order.paid ? (
                    <span className="text-green-600">✅</span>
                  ) : (
                    <span className="text-red-600">❌</span>
                  )}
                </td>
                <td className="p-2 border align-top">${order.total.toFixed(2)}</td>
                <td className="p-2 border align-top">
                  {new Date(order.timestamp).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </td>
              </tr>

              {/* Expanded Order Info */}
              <tr className="bg-gray-50 text-gray-700 text-sm">
                <td colSpan={6} className="border-t p-2">
                  <table className="w-full table-auto">
                    <tbody>
                      <tr>
                        <td className="p-2 border-r md:w-1/3 align-top">
                          <strong>🧾 Items:</strong><br />
                          {order.items.join(', ')}
                        </td>
                        <td className="p-2 border-r md:w-1/3 align-top">
                          <strong>💳 Payment Method:</strong><br />
                          {order.method}
                        </td>
                        <td className="p-2 align-top">
                          <strong>📋 Notes:</strong><br />
                          {order.notes || '—'}
                          <br />
                          <strong>⚠️ Allergy:</strong> {order.allergies || 'None'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              {/* Spacer Row */}
              <tr>
                <td colSpan={6} className="py-3" />
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
