'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

const DownloadOrdersTab = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDownloadOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/orders`,
          {
            auth: {
              username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
              password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET
            }
          }
        )

        // ✅ Filter for orders containing downloadable line items
        const filtered = res.data.filter((order) =>
          order.line_items?.some(item => item.downloads && item.downloads.length > 0)
        )

        setOrders(filtered)
        console.log('📥 Download Orders:', filtered)
      } catch (err) {
        console.error('❌ Failed to fetch download orders:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDownloadOrders()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Download Product Orders</h2>

      {loading && <p className="text-gray-500">Loading download orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No download orders found.</p>
      )}

      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded shadow-sm">
            <p className="font-semibold text-blue-600">Order #{order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total: {order.total} {order.currency}</p>
            <p>Customer: {order.billing.first_name} {order.billing.last_name}</p>
            <ul className="mt-2 text-sm text-gray-700">
              {order.line_items.map((item) => (
                item.downloads?.length > 0 && (
                  <li key={item.id}>
                    🧾 {item.name} ({item.downloads.length} download link{item.downloads.length > 1 ? 's' : ''})
                  </li>
                )
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DownloadOrdersTab
