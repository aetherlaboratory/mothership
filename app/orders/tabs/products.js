'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

const ProductOrdersTab = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // 🔐 Load WooCommerce orders using consumer key + secret
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/orders`,
          {
            auth: {
              username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
              password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET
            }
          }
        )

        setOrders(res.data)
        console.log('📦 Woo Orders:', res.data)
      } catch (err) {
        console.error('❌ Failed to fetch WooCommerce orders:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">WooCommerce Product Orders</h2>

      {loading && <p className="text-gray-500">Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded shadow-sm">
            <p className="font-semibold text-blue-600">Order #{order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total: {order.total} {order.currency}</p>
            <p>Customer: {order.billing.first_name} {order.billing.last_name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductOrdersTab
