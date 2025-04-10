'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

const SubscriptionOrdersTab = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriptionOrders = async () => {
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

        // ✅ Filter orders where at least one item has 'subscription-plan' in its name or tag
        const filtered = res.data.filter((order) =>
          order.line_items?.some((item) =>
            item.name.toLowerCase().includes('subscription') ||
            item.meta_data?.some((meta) =>
              typeof meta.value === 'string' && meta.value.includes('subscription-plan')
            )
          )
        )

        setOrders(filtered)
        console.log('📄 Subscription Orders:', filtered)
      } catch (err) {
        console.error('❌ Failed to fetch subscription orders:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptionOrders()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Subscription Plans</h2>

      {loading && <p className="text-gray-500">Loading subscriptions...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No subscription plans found.</p>
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

export default SubscriptionOrdersTab
