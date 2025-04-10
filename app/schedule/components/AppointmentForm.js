'use client'

import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { getUserData } from '@/app/utils/api'
import { postAppointment } from '@/app/utils/crudAppointment'

export default function AppointmentForm({ selectedDate, slotRange, slotSize, startHour, onComplete }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState({ type: null, text: '' })
  const [generatedTitle, setGeneratedTitle] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken')
    if (!storedToken) {
      setUser(null)
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        const userData = await getUserData(storedToken)
        if (userData) {
          setUser(userData)
          setToken(storedToken)

          const userKey = `appt-count-${userData.id}`
          const currentCount = parseInt(localStorage.getItem(userKey) || '0', 10)
          const nextCount = currentCount + 1
          const title = `${userData.name || userData.username} Appointment ${nextCount}`
          setGeneratedTitle(title)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error(error)
        setUser(null)
      }

      setLoading(false)
    }

    fetchUser()
  }, [])

  const initialValues = {
    notes: '',
    image_gallery: [],
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!user || !token) {
      setStatusMessage({ type: 'error', text: 'You must be logged in to submit.' })
      setSubmitting(false)
      return
    }

    const userKey = `appt-count-${user.id}`
    const currentCount = parseInt(localStorage.getItem(userKey) || '0', 10)
    const nextCount = currentCount + 1
    const title = `${user.name || user.username} Appointment ${nextCount}`
    localStorage.setItem(userKey, nextCount.toString())

    const payload = {
      title,
      appointment_date: selectedDate.toISOString().split('T')[0],
      start_time: slotRange.startLabel || slotRange.start || '',
      end_time: slotRange.endLabel || slotRange.end || '',
      user_id: user.id,
      user_name: user.username || user.name,
      slot_type: slotSize + 'hr',
      created_by: user.id,
      status: 'pending',
      ...values,
    }

    console.log('🧾 Final appointment payload:', payload)

    try {
      await postAppointment(token, payload)

      setStatusMessage({ type: 'success', text: 'Appointment booked successfully!' })

      window.dispatchEvent(
        new CustomEvent('notify', {
          detail: { message: '📅 Appointment submitted for review!', type: 'success' },
        })
      )

      onComplete?.()
    } catch (err) {
      console.error(err)
      setStatusMessage({ type: 'error', text: 'Failed to book appointment. Try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="mt-6 border-t pt-4 text-sm text-gray-600 bg-gray-50 border rounded p-4">
        ⏳ Checking login status before showing form...
      </div>
    )
  }

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-semibold mb-3">Confirm Appointment</h3>

      <div className="text-sm bg-gray-50 p-3 rounded border mb-4">
        <p><strong>Date:</strong> {selectedDate.toDateString()}</p>
        <p><strong>Time:</strong> {slotRange.startLabel || slotRange.start} → {slotRange.endLabel || slotRange.end}</p>
        <p><strong>Duration:</strong> {slotSize} {slotSize > 1 ? 'Hours' : 'Hour'}</p>
        <p className="text-blue-600 mt-2">📌 All appointments are pending and will be reviewed.</p>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {generatedTitle && (
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Appointment Title</label>
                <div className="p-2 text-sm bg-gray-100 border rounded text-gray-700">
                  {generatedTitle}
                </div>
              </div>
            )}

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

            {user && (user.name || user.username) ? (
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
