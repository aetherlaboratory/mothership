'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getUserCount,
  getProductCount,
  getOrderCount,
  getTotalRevenue
} from '../utils/fetchWooStats'

export default function SummaryCards() {
  // Fetch each stat via react-query
  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ['userCount'],
    queryFn: getUserCount
  })

  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['productCount'],
    queryFn: getProductCount
  })

  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ['orderCount'],
    queryFn: getOrderCount
  })

  const { data: revenue, isLoading: loadingRevenue } = useQuery({
    queryKey: ['totalRevenue'],
    queryFn: getTotalRevenue
  })

  const cards = [
    {
      title: 'Total Users',
      value: users,
      loading: loadingUsers
    },
    {
      title: 'Products',
      value: products,
      loading: loadingProducts
    },
    {
      title: 'Orders',
      value: orders,
      loading: loadingOrders
    },
    {
      title: 'Revenue',
      value: `$${parseFloat(revenue || 0).toFixed(2)}`,
      loading: loadingRevenue
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
        >
          <p className="text-sm text-muted-foreground">{card.title}</p>
          <h2 className="text-2xl font-bold mt-1">
            {card.loading ? 'Loading...' : card.value}
          </h2>
        </div>
      ))}
    </div>
  )
}
