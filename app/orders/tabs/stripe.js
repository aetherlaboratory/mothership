'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CreditCard,
  CalendarClock,
  User,
  Globe
} from 'lucide-react'

const StripeOrdersTab = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStripeOrders = async () => {
      try {
        const res = await axios.get('/api/stripe/sessions') // 🧠 Custom API route
        setSessions(res.data || [])
        console.log('💳 Stripe Sessions:', res.data)
      } catch (err) {
        console.error('❌ Stripe sessions fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStripeOrders()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Stripe Orders</h2>

      {loading && <p className="text-gray-500">Loading Stripe sessions...</p>}
      {!loading && sessions.length === 0 && (
        <p className="text-gray-500">No Stripe orders found.</p>
      )}

      <ul className="space-y-4">
        {sessions.map((session) => {
          const date = new Date(session.created * 1000).toLocaleString()
          const email = session.customer_details?.email || 'Unknown'
          const name = session.customer_details?.name || 'No Name'
          const ip = session.metadata?.ip_address || 'N/A'
          const currency = session.currency?.toUpperCase()
          const total = (session.amount_total / 100).toFixed(2)

          return (
            <li key={session.id} className="border p-4 rounded shadow-sm bg-white">
              <div className="flex items-center space-x-2 text-blue-600 mb-1">
                <CreditCard className="w-4 h-4" />
                <span className="font-semibold">Session ID:</span>
                <span className="truncate">{session.id}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <CalendarClock className="w-4 h-4 text-purple-600" />
                <span>{date}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-4 h-4 text-green-600" />
                <span>{name}</span> • <span>{email}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <Globe className="w-4 h-4 text-amber-600" />
                <span>IP:</span>
                <span>{ip}</span>
              </div>

              <div className="mt-2 font-semibold text-lg text-gray-900">
                💰 ${total} {currency} — {session.payment_status}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default StripeOrdersTab
