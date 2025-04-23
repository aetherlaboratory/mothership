// app/utils/fetchFromWP.js

import axios from 'axios'

// ✅ Determine correct API base URL based on current location
const getBaseURL = () => {
  if (typeof window === 'undefined') return process.env.NEXT_PUBLIC_API_WP

  const hostname = window.location.hostname
  if (hostname === 'localhost') return process.env.NEXT_PUBLIC_API_LOCAL
  if (hostname.startsWith('192.')) return process.env.NEXT_PUBLIC_API_NETWORK
  return process.env.NEXT_PUBLIC_API_WP
}

// ✅ Attach JWT token if available
const getAuthHeaders = () => {
  if (typeof window === 'undefined') return {}
  const token = localStorage.getItem('userToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// ✅ Fetch WordPress data with optional auth header
export async function fetchWPData(endpoint, useAuth = true) {
  const base = getBaseURL()
  const url = `${base}/${endpoint}`
  const headers = useAuth ? getAuthHeaders() : {}

  try {
    const res = await axios.get(url, { headers })
    return res.data
  } catch (err) {
    console.error(`❌ Failed to fetch from ${url}:`, err)
    return []
  }
}
