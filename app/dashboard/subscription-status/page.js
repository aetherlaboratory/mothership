'use client'

import { useEffect, useState } from 'react'
import { getUserData } from '../../utils/api'
import { CalendarDays, Clock3, Star, RefreshCcw } from 'lucide-react'

export default function SubscriptionStatusPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 🧠 Custom meta keys you're storing in WP user meta
  const PLAN_META_KEY = '_subscription_plan_name'
  const RANK_META_KEY = '_subscription_rank'
  const PURCHASE_META_KEY = '_subscription_last_purchase'

  // 🧠 Human-friendly plan labels (if needed)
  const rankLabel = {
    1: 'Free Tier',
    2: 'Flat Fee',
    3: 'Monthly',
    4: 'Annual'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken')
        if (!token) throw new Error('No token found')

        const userData = await getUserData(token)
        setUser(userData)
      } catch (err) {
        console.error('❌ Subscription data error:', err)
        setError('Unable to fetch subscription status.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 🔄 Parse timestamps
  const getRenewalDate = (timestamp, plan) => {
    const baseDate = new Date(timestamp)
    if (!timestamp || plan === 'Flat Fee' || plan === 'Free Tier') return null

    const renewal = new Date(baseDate)
    if (plan === 'Monthly') renewal.setMonth(baseDate.getMonth() + 1)
    if (plan === 'Annual') renewal.setFullYear(baseDate.getFullYear() + 1)
    return renewal.toDateString()
  }

  if (loading) return <p className="text-center mt-10">🔄 Loading subscription status...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  const meta = user?.meta || {}
  const planName = meta[PLAN_META_KEY] || 'Unknown Plan'
  const rank = meta[RANK_META_KEY] || 'N/A'
  const purchased = meta[PURCHASE_META_KEY]
  const renewal = getRenewalDate(purchased, planName)

  return (
    <main className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">📦 Subscription Status</h1>

      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span><strong>Plan:</strong> {planName}</span>
        </div>

        <div className="flex items-center gap-2">
          <RefreshCcw className="w-5 h-5 text-purple-500" />
          <span><strong>Rank:</strong> {rankLabel[rank] || rank}</span>
        </div>

        {purchased && (
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-blue-500" />
            <span><strong>Purchase Date:</strong> {new Date(purchased).toDateString()}</span>
          </div>
        )}

        {renewal && (
          <div className="flex items-center gap-2">
            <Clock3 className="w-5 h-5 text-green-600" />
            <span><strong>Next Renewal:</strong> {renewal}</span>
          </div>
        )}
      </div>
    </main>
  )
}
