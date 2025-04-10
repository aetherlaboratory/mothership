'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { loginUser } from '../../utils/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SubscriptionLoginForm = ({ selectedPlan }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      setLoading(true)
      setError(null)

      // ✅ Attempt to login
      const token = await loginUser(values.username, values.password)

      if (token) {
        localStorage.setItem('userToken', token)
        router.push(`/checkout?plan=${selectedPlan}`)
      } else {
        setError('Invalid login credentials. Please try again.')
      }

      setLoading(false)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-blue-500 text-center">🔄 Signing In...</p>}

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
        {loading ? 'Signing In...' : 'Login & Continue'}
      </button>
    </form>
  )
}

export default SubscriptionLoginForm
