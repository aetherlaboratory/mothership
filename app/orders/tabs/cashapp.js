'use client'

import CashAppOrders from '../../subscriptions/components/cashappOrders'
import Image from 'next/image'

const CashAppOrdersTab = () => {
  return (
    <div className="space-y-6">
      {/* 💵 Cash App Header */}
      <div className="flex items-center space-x-3 border-b pb-2">
        <Image
          src="/cashapp.svg"
          alt="Cash App"
          width={150}
          height={33}
          priority
        />
        <h2 className="text-xl font-semibold text-gray-800">Cash App Orders</h2>
      </div>

      {/* 📋 List of orders */}
      <CashAppOrders />
    </div>
  )
}

export default CashAppOrdersTab
