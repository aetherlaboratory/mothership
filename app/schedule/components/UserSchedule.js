'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ScheduleLoginForm from '@/app/components/ScheduleLoginForm'
import RegisterForm from '@/app/components/RegisterForm'
import { getUserData } from "@/app/utils/api";
// import { loginUser } from '@/app/lib/loginUser'

export default function UserSchedule() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    console.log('🔍 Checking stored token:', token)

    if (!token) {
      console.warn('🔴 No user token found.')
      setUser(null)
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        const userData = await getUserData(token)

        if (userData) {
          console.log('✅ User Data:', userData)
          setUser(userData)
        } else {
          console.warn('🔴 Token exists but API returned no user')
          setUser(null)
        }
      } catch (error) {
        console.error('❌ Error fetching user:', error)
        setUser(null)
      }

      setLoading(false)
    }

    fetchUser()
  }, [])

  if (loading) return null

  if (user && (user.name || user.username)) {
    return (
      <div className="border rounded bg-gray-50 p-4 mb-4">
        <p className="text-sm text-gray-700">👤 <strong>{user.name || user.username}</strong></p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    )
  }

  return (
    <div className="border rounded bg-yellow-50 p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <p className="text-sm text-gray-700">You must be logged in to schedule an appointment.</p>
      <div className="flex gap-2">
        <button
          onClick={() => setShowLogin(true)}
          className="px-4 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Log In
        </button>
        <button
          onClick={() => setShowRegister(true)}
          className="px-4 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
        >
          Register
        </button>
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Log In</h2>
            <ScheduleLoginForm
              onSuccess={(user, token) => {
                setUser(user)
                setShowLogin(false)
                window.dispatchEvent(new Event('storage'))
              }}
            />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setShowRegister(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            <RegisterForm />
          </div>
        </div>
      )}
    </div>
  )
}
