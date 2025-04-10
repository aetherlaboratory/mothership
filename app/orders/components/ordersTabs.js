'use client'

import { useState } from 'react'

// ✅ Import each tab module
import CashAppOrdersTab from '../tabs/cashapp'
import ProductOrdersTab from '../tabs/products'
import DownloadOrdersTab from '../tabs/downloads'
import SubscriptionOrdersTab from '../tabs/subscriptions'
import PayPalOrdersTab from '../tabs/paypal'
import StripeOrdersTab from '../tabs/stripe'

const OrdersTabs = () => {
  // ✅ Track active tab index
  const [activeTab, setActiveTab] = useState(0)

  // ✅ Tab labels + component map
  const tabs = [
    { label: 'Cash App Orders', component: <CashAppOrdersTab /> },
    { label: 'Product Orders', component: <ProductOrdersTab /> },
    { label: 'Download Orders', component: <DownloadOrdersTab /> },
    { label: 'Subscriptions', component: <SubscriptionOrdersTab /> },
    { label: 'PayPal Orders', component: <PayPalOrdersTab /> },
    { label: 'Stripe Orders', component: <StripeOrdersTab /> }
  ]

  return (
    <div className="bg-white border rounded shadow">
      {/* 🔳 Tab Buttons */}
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 📦 Tab Content */}
      <div className="p-4">{tabs[activeTab].component}</div>
    </div>
  )
}

export default OrdersTabs
