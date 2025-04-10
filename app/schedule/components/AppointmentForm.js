'use client'

import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'

export default function AppointmentForm({ selectedDate, slotRange, slotSize, startHour, onComplete }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState({ type: null, text: '' })

  useEffect(() => {
    const checkUser = () => {
      const storedToken = localStorage.getItem('userToken')
      const storedUser = localStorage.getItem('userData')

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser))
          setToken(storedToken)
        } catch (e) {
          console.error('❌ Failed to parse userData:', e)
        }
      }

      setLoading(false)
    }

    checkUser()
    window.addEventListener('storage', checkUser)
    return () => window.removeEventListener('storage', checkUser)
  }, [])

  const initialValues = {
    notes: '',
    appointment_type: '',
    image_gallery: [],
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!user || !token) {
      setStatusMessage({ type: 'error', text: 'You must be logged in to submit.' })
      setSubmitting(false)
      return
    }

    const payload = {
      appointment_date: selectedDate.toISOString().split('T')[0],
      start_time: slotRange.startLabel,
      end_time: slotRange.endLabel,
      user_id: user.id,
      user_name: user.username || user.name,
      slot_type: slotSize + 'hr',
      created_by: user.id,
      status: 'pending',
      ...values,
    }

    try {
      const res = await axios.post(
        'https://mothership.wordifysites.com/wp-json/custom/v1/appointments',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      setStatusMessage({ type: 'success', text: 'Appointment booked successfully!' })
      onComplete?.()
    } catch (err) {
      console.error(err)
      setStatusMessage({ type: 'error', text: 'Failed to book appointment. Try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return null

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-semibold mb-3">Confirm Appointment</h3>

      <div className="text-sm bg-gray-50 p-3 rounded border mb-4">
        <p><strong>Date:</strong> {selectedDate.toDateString()}</p>
        <p><strong>Time:</strong> {slotRange.startLabel} → {slotRange.endLabel}</p>
        <p><strong>Duration:</strong> {slotSize} {slotSize > 1 ? 'Hours' : 'Hour'}</p>
        <p className="text-blue-600 mt-2">📌 All appointments are pending and will be reviewed.</p>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Appointment Type</label>
              <Field
                type="text"
                name="appointment_type"
                className="w-full border rounded p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <Field
                as="textarea"
                name="notes"
                rows="3"
                className="w-full border rounded p-2 text-sm"
              />
            </div>

            <div className="pt-3">
              <label className="block text-sm font-medium mb-1">Image Gallery</label>
              <div className="border-dashed border-2 border-gray-300 rounded p-4 text-center text-sm text-gray-500">
                Media uploader placeholder – hook in global media modal here later.
              </div>
            </div>

            {user ? (
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Booking...' : 'Book Appointment'}
                </button>
                {statusMessage.text && (
                  <span className={`text-sm ${statusMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                    {statusMessage.text}
                  </span>
                )}
              </div>
            ) : (
              <p className="text-sm text-red-600 font-medium">
                🔒 Please log in or register above to submit your appointment.
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}
