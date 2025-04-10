'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { CreditCard, BadgeCheck, Info } from 'lucide-react'

const PayPalOrdersTab = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('/api/paypal/transactions')
        setTransactions(res.data || [])
        console.log('📨 PayPal Transactions:', res.data)
      } catch (err) {
        console.error('❌ PayPal fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CreditCard className="w-6 h-6 text-blue-500" />
        PayPal Orders
      </h2>

      {loading && <p className="text-gray-500">Loading PayPal transactions...</p>}
      {!loading && transactions.length === 0 && (
        <p className="text-gray-500">No PayPal orders found.</p>
      )}

      <ul className="space-y-4">
        {transactions.map((tx, idx) => {
          const detail = tx.transaction_info || {}
          const payer = tx.payer_info || {}

          return (
            <li key={idx} className="border p-4 rounded shadow-sm bg-white">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-blue-700 flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4 text-green-500" />
                  ID: {detail.transaction_id}
                </p>
                <p className="text-sm text-gray-500">{detail.transaction_initiation_date}</p>
              </div>
              <p>Status: {detail.transaction_status}</p>
              <p>Amount: {detail.transaction_amount?.value} {detail.transaction_amount?.currency_code}</p>
              <p>Customer: {payer.email_address || 'N/A'}</p>
              <p className="text-xs text-gray-400">Debug ID: {detail.debug_id || 'N/A'}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PayPalOrdersTab
