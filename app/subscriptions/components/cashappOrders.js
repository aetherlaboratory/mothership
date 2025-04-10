'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

const CashAppOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([])

  useEffect(() => {
    // 🔄 Load all local Cash App orders stored in browser (demo/test purposes)
    const local = localStorage.getItem('pendingCashAppOrder')
    if (local) {
      try {
        const parsed = JSON.parse(local)
        setPendingOrders([parsed]) // Later this could be an array of orders
        console.log('📦 Loaded pending Cash App order:', parsed)
      } catch (err) {
        console.error('❌ Failed to parse pendingCashAppOrder:', err)
      }
    }
  }, [])

  const handleApprove = (order) => {
    console.log('✅ Approving order:', order)

    // 🧪 Later: send update to WordPress, assign subscriber role, etc.
    window.dispatchEvent(new CustomEvent('notify', {
      detail: {
        message: `✅ Approved order from ${order.cashtag}`,
        type: 'success',
      },
    }))

    localStorage.removeItem('pendingCashAppOrder')
    setPendingOrders([])
  }

  const handleReject = (order) => {
    console.log('🛑 Rejected order:', order)

    // 🔒 Just remove from localStorage for now
    window.dispatchEvent(new CustomEvent('notify', {
      detail: {
        message: `❌ Rejected order from ${order.cashtag}`,
        type: 'error',
      },
    }))

    localStorage.removeItem('pendingCashAppOrder')
    setPendingOrders([])
  }

  if (pendingOrders.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        📭 No pending Cash App orders to review.
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">🧾 Pending Cash App Orders</h2>

      {pendingOrders.map((order, index) => (
        <div key={index} className="border-b pb-6 mb-6">
          <p className="mb-2">
            <strong>🧑‍💻 Cashtag:</strong> {order.cashtag || 'Unknown'}
          </p>
          <p className="mb-2">
            <strong>💵 Total:</strong> ${order.total.toFixed(2)}
          </p>
          <p className="mb-2">
            <strong>🕒 Time:</strong> {new Date(order.timestamp).toLocaleString()}
          </p>

          <ul className="mb-4 list-disc list-inside text-sm text-gray-700">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} × {item.quantity} — ${item.price.toFixed(2)} each
              </li>
            ))}
          </ul>

          <div className="flex gap-4">
            <button
              onClick={() => handleApprove(order)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              <CheckCircle className="w-5 h-5" />
              Approve
            </button>

            <button
              onClick={() => handleReject(order)}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              <XCircle className="w-5 h-5" />
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CashAppOrders
