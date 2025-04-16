'use client'

import { useEffect, useState } from 'react'
import useAuthGuard from '@/app/hooks/useAuthGuard'
import getAllFoodOrders from '@/app/utils/getAllFoodOrders'
import React from 'react'

export default function AllFoodOrdersPage() {
  const { user, loading: authLoading } = useAuthGuard()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('userToken')
      const result = await getAllFoodOrders(token)

      if (result.success) {
        setOrders(result.data)
      } else {
        console.error(result.error)
      }

      setLoading(false)
    }

    fetchOrders()
  }, [])

  if (authLoading || loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        ⏳ Loading food orders...
      </div>
    )
  }

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
    <>
      <tr key={`${order.id}-top`} className="border-t hover:bg-gray-50 font-medium">
        <td className="p-2 border align-top">{index + 1}</td>
        <td className="p-2 border align-top">{order.user_name || 'N/A'}</td>
        <td className="p-2 border align-top">{order.user_email || '—'}</td>
        <td className="p-2 border align-top">
          {order.paid ? (
            <span className="text-green-600">✅</span>
          ) : (
            <span className="text-red-600">❌</span>
          )}
        </td>
        <td className="p-2 border align-top">
          ${parseFloat(order.total || 0).toFixed(2)}
        </td>
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
      <tr key={`${order.id}-detail`} className="bg-gray-50 text-gray-700 text-sm">
        <td colSpan={6} className="border-t p-2">
          <table className="w-full table-auto">
            <tbody>
              <tr>
                <td className="p-2 border-r md:w-1/3 align-top">
                  <strong>🧾 Items:</strong><br />
                  {Array.isArray(order.items)
                    ? order.items.map(i => i.name || i.title).join(', ')
                    : '—'}
                </td>
                <td className="p-2 border-r md:w-1/3 align-top">
                  <strong>💳 Payment Method:</strong><br />
                  {order.method || '—'}
                </td>
                <td className="p-2 align-top">
                  <strong>📋 Notes:</strong><br />
                  {order.notes || '—'}
                  <br />
                  <strong>⚠️ Allergy:</strong> {order.allergy_note || 'None'}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr key={`${order.id}-spacer`}>
        <td colSpan={6} className="py-3" />
      </tr>
    </>
  ))}
</tbody>

      </table>
    </div>
  )
}
