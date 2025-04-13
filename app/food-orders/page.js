// app/food-orders/page.js

'use client'

import React from 'react'
import FoodOrderContent from './FoodOrderContent'

export default function FoodOrdersPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Food Orders</h1>
      <FoodOrderContent />
    </div>
  )
}
