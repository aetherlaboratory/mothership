// app/tickets/page.js
'use client'

import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { fetchEvents } from './fetchEvents'
import { fetchEventTiers } from './fetchEventTiers'
import { useCreateTicketsForm } from './useCreateTicketsForm'
import { submitTickets } from './submitTickets'
import TicketFormTabs from './components/TicketFormTabs'

export default function TicketAdminPage() {
  const [events, setEvents] = useState([])
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [loadingTiers, setLoadingTiers] = useState(false)
  const [tierCount, setTierCount] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchEvents().then(({ data }) => {
      setEvents(data)
      setLoadingEvents(false)
    })
  }, [])

  useEffect(() => {
    if (!selectedEventId) return
    setLoadingTiers(true)
    fetchEventTiers(selectedEventId).then(({ tiers }) => {
      setTierCount(tiers)
      setModalOpen(true)
      setLoadingTiers(false)
    })
  }, [selectedEventId])

  const { tickets, handleChange } = useCreateTicketsForm(tierCount)

const handleSubmit = async () => {
  const result = await submitTickets(tickets, selectedEventId);
  console.log('Ticket creation results:', result);

  const createdCount = result.filter(r => r.success).length;

  window.dispatchEvent(
    new CustomEvent("notify", {
      detail: {
        message: `🎟️ Successfully created ${createdCount} ticket${createdCount !== 1 ? 's' : ''}!`,
        type: "success"
      }
    })
  );

  setModalOpen(false);
};


  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create Tickets</h1>

      {loadingEvents ? (
        <p className="text-gray-500">Loading events...</p>
      ) : (
        <select
          onChange={(e) => setSelectedEventId(parseInt(e.target.value))}
          className="w-full border p-2 mb-4"
        >
          <option>Select an Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title.rendered}
            </option>
          ))}
        </select>
      )}

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen bg-black/50 px-4">
          <Dialog.Panel className="!bg-white !rounded-xl !w-screen !h-[95vh] p-6 relative shadow-xl overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <Dialog.Title className="text-xl font-semibold mb-4">Create {tierCount} Tickets</Dialog.Title>

            {loadingTiers ? (
              <p>Loading ticket tiers...</p>
            ) : (
              <TicketFormTabs tickets={tickets} handleChange={handleChange} />
            )}

            {!loadingTiers && (
              <div className="mt-6 text-right">
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                  Submit Tickets
                </button>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
