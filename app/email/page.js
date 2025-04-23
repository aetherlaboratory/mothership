'use client'

// Contact Form UI – app/email/page.js
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function EmailPage() {
  const [status, setStatus] = useState(null)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setStatus('sending')
      try {
        const res = await fetch('/api/send-contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (res.ok) {
          setStatus('success')
          resetForm()
        } else {
          throw new Error('Failed to send')
        }
      } catch (err) {
        setStatus('error')
      }
    },
  })

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">📧 Contact Us</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full border p-2 rounded"
          />
          {formik.errors.name && <p className="text-red-600 text-sm">{formik.errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full border p-2 rounded"
          />
          {formik.errors.email && <p className="text-red-600 text-sm">{formik.errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            rows="5"
            onChange={formik.handleChange}
            value={formik.values.message}
            className="w-full border p-2 rounded"
          />
          {formik.errors.message && <p className="text-red-600 text-sm">{formik.errors.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'success' && <p className="text-green-600">Message sent!</p>}
        {status === 'error' && <p className="text-red-600">Something went wrong.</p>}
      </form>
    </div>
  )
}
