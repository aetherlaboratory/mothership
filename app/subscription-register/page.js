'use client'

import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerUser, loginUser } from '../utils/api'
import { useRouter } from 'next/navigation'
import { useCart } from 'react-use-cart'

export default function SubscriptionRegisterPage() {
  const router = useRouter()
  const { items } = useCart()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [error, setError] = useState(null)

  // ✅ Check login state from localStorage (JWT presence)
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) setIsLoggedIn(true)
  }, [])

  // ✅ Shared success handler
  const handleSuccessRedirect = (message) => {
    window.dispatchEvent(new CustomEvent('notify', {
      detail: { message, type: 'success' }
    }))

    const hasSubscription = items.some(item => item.customData?.isSubscription)

    setTimeout(() => {
      router.push(hasSubscription ? '/checkout' : '/subscriptions')
    }, 1200)
  }

  // ✅ Registration Formik setup
  const registerForm = useFormik({
    initialValues: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6).required('Password is required')
    }),
    onSubmit: async (values) => {
      setIsRegistering(true)
      setError(null)

      const result = await registerUser(values)

      if (result) {
        window.dispatchEvent(new CustomEvent('notify', {
          detail: { message: '✅ Registered successfully! Logging you in...', type: 'success' }
        }))

        // Auto login
        const token = await loginUser(values.username, values.password)
        if (token) handleSuccessRedirect('🔒 Account ready. Redirecting...')
        else setError('❌ Could not auto-login.')
      } else {
        setError('❌ Registration failed.')
      }

      setIsRegistering(false)
    }
  })

  // ✅ Login Formik setup
  const loginForm = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      setIsLoggingIn(true)
      setError(null)

      const token = await loginUser(values.username, values.password)
      if (token) handleSuccessRedirect('🔐 Logged in successfully!')
      else setError('❌ Login failed. Check credentials.')

      setIsLoggingIn(false)
    }
  })

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10">Complete Your Subscription</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* New User Registration */}
        <div className="border p-6 rounded-lg shadow bg-white">
          <h2 className="text-xl font-semibold mb-4">👤 Create New Account</h2>

          <form onSubmit={registerForm.handleSubmit} className="space-y-4">
            {['username', 'first_name', 'last_name', 'email', 'password'].map((field, index) => (
              <div key={index}>
                <label className="block font-medium capitalize">{field.replace('_', ' ')}</label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  name={field}
                  {...registerForm.getFieldProps(field)}
                  className="w-full p-2 border rounded"
                />
                {registerForm.touched[field] && registerForm.errors[field] && (
                  <p className="text-red-500 text-sm">{registerForm.errors[field]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isRegistering}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isRegistering ? 'Registering...' : 'Register & Continue'}
            </button>
          </form>
        </div>

        {/* Existing User Login */}
        <div className="border p-6 rounded-lg shadow bg-white">
          <h2 className="text-xl font-semibold mb-4">🔑 Already Have an Account?</h2>

          {!isLoggedIn ? (
            <form onSubmit={loginForm.handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  {...loginForm.getFieldProps('username')}
                  className="w-full p-2 border rounded"
                />
                {loginForm.touched.username && loginForm.errors.username && (
                  <p className="text-red-500 text-sm">{loginForm.errors.username}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  {...loginForm.getFieldProps('password')}
                  className="w-full p-2 border rounded"
                />
                {loginForm.touched.password && loginForm.errors.password && (
                  <p className="text-red-500 text-sm">{loginForm.errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isLoggingIn ? 'Logging in...' : 'Login & Continue'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-green-600 font-semibold">✅ You are already logged in.</p>
              <button
                onClick={() => router.push('/checkout')}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Continue to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && <p className="text-center text-red-500 mt-6">{error}</p>}
    </main>
  )
}
