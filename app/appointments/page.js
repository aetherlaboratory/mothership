// app/appointments/page.js

'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Formik, Form, Field } from 'formik'
import UserModalButton from './components/UserModalButton'
import SmsModalButton from './components/SmsModalButton'
import EmailModalButton from './components/EmailModalButton'

const mockAppointments = [
  {
    id: 1,
    appointment_date: '2025-04-12',
    start_time: '14:00',
    end_time: '14:30',
    user_id: 42,
    user_name: 'Jane Doe',
    status: 'pending',
    slot_type: '30m',
    appointment_type: 'Consultation',
    created_by: 1,
    notes: 'Discuss tattoo design and pricing',
    image_gallery: []
  },
  {
    id: 2,
    appointment_date: '2025-04-14',
    start_time: '11:00',
    end_time: '12:00',
    user_id: 21,
    user_name: 'John Smith',
    status: 'confirmed',
    slot_type: '1hr',
    appointment_type: 'Follow-up',
    created_by: 1,
    notes: 'Healing check and touch-up discussion',
    image_gallery: []
  }
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (appointment) => {
    setSelected(appointment)
    setModalOpen(true)
  }

  const handleSave = (values) => {
    console.log('📝 Updated values:', values)
    setAppointments(prev => prev.map(app => app.id === values.id ? values : app))
    setModalOpen(false)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📋 Appointments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map(app => (
          <div key={app.id} className="bg-white rounded-2xl shadow p-4 border">
            <h2 className="font-semibold text-lg">{app.appointment_type} with {app.user_name}</h2>
            <p className="text-sm text-gray-600">{app.appointment_date} @ {app.start_time} - {app.end_time}</p>
            <p className="mt-1 text-xs">Status: <span className="capitalize font-medium">{app.status}</span></p>
            <p className="text-xs text-gray-500 mt-2">Notes: {app.notes}</p>

            <div className="mt-4 flex gap-2">
              <UserModalButton userId={app.user_id} userName={app.user_name} />
              <SmsModalButton userName={app.user_name} />
              <EmailModalButton userName={app.user_name} />
              <Button size="sm" onClick={() => openModal(app)}>Edit</Button>
              <Button size="sm" variant="destructive">Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="!max-w-none !w-screen !h-screen m-2 p-3 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>

          {selected && (
            <Formik
              initialValues={selected}
              onSubmit={handleSave}
            >
              {() => (
                <Form className="space-y-4 mt-4">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm">Appointment Date</label>
                        <Field name="appointment_date" type="date" className="w-full border p-2 rounded" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm">Start Time</label>
                          <Field name="start_time" type="time" className="w-full border p-2 rounded" />
                        </div>
                        <div>
                          <label className="block text-sm">End Time</label>
                          <Field name="end_time" type="time" className="w-full border p-2 rounded" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm">User Name</label>
                        <Field name="user_name" className="w-full border p-2 rounded" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm">Status</label>
                        <Field as="select" name="status" className="w-full border p-2 rounded">
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="canceled">Canceled</option>
                        </Field>
                      </div>
                      <div>
                        <label className="block text-sm">Slot Type</label>
                        <Field as="select" name="slot_type" className="w-full border p-2 rounded">
                          <option value="30m">30m</option>
                          <option value="1hr">1hr</option>
                          <option value="2hr">2hr</option>
                          <option value="3hr">3hr</option>
                          <option value="8hr">8hr</option>
                        </Field>
                      </div>
                    
                        <div>
  <label className="block text-sm">Appointment Type</label>
  <Field as="select" name="appointment_type" className="w-full border p-2 rounded">
    <option value="Consultation">Consultation</option>
    <option value="Service">Service</option>
    <option value="Follow Up">Follow Up</option>
  </Field>
</div>
                      
                      <div>
                        <label className="block text-sm">Notes</label>
                        <Field as="textarea" name="notes" className="w-full border p-2 rounded" rows={3} />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button type="submit">Save</Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
