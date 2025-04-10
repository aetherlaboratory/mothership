'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { loginUser } from '@/app/lib/loginUser'

const ScheduleLoginForm = ({ onSuccess }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      setError(null)

      try {
        const user = await loginUser(values.username, values.password)
        const token = localStorage.getItem('userToken')

        if (user && token) {
          localStorage.setItem('userData', JSON.stringify(user))
          onSuccess?.(user, token)

          window.dispatchEvent(
            new CustomEvent('notify', {
              detail: {
                message: '✅ Successfully logged in!',
                type: 'success',
              },
            })
          )
        } else {
          throw new Error('Login succeeded but user or token is missing.')
        }
      } catch (err) {
        console.error('❌ Login error:', err)
        setError(err.message || 'Login failed.')
      }

      setLoading(false)
    },
  })

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-blue-500 text-center">🔄 Logging in...</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            {...formik.getFieldProps('username')}
            className="w-full p-2 border rounded"
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm">{formik.errors.username}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            {...formik.getFieldProps('password')}
            className="w-full p-2 border rounded"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default ScheduleLoginForm
