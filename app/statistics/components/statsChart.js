'use client'

import React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import { useQuery } from '@tanstack/react-query'
import { getSalesLast7Days } from '../utils/fetchWooStats'

export default function StatsChart() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['salesLast7Days'],
    queryFn: getSalesLast7Days
  })

  return (
    <div className="w-full h-72 bg-card border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Sales (Last 7 Days)</h2>

      {isLoading ? (
        <p>Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
            <Line type="monotone" dataKey="total" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
