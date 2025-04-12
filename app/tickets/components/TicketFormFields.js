// app/tickets/components/TicketFormFields.js
'use client'

import React from 'react'

export default function TicketFormFields({ ticket, index, handleChange }) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">Ticket Tier {index + 1}</h2>
      <input
        className="w-full border p-2 mb-2"
        placeholder="Ticket Name (Product Title)"
        value={ticket.name}
        onChange={(e) => handleChange(index, 'name', e.target.value)}
      />
      <input
        className="w-full border p-2 mb-2"
        placeholder="Price"
        type="number"
        value={ticket.price}
        onChange={(e) => handleChange(index, 'price', e.target.value)}
      />
      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Description (Product Content)"
        value={ticket.description}
        onChange={(e) => handleChange(index, 'description', e.target.value)}
      />
      <textarea
        className="w-full border p-2"
        placeholder="Perks (comma-separated)"
        value={ticket.perks}
        onChange={(e) => handleChange(index, 'perks', e.target.value)}
      />
    </div>
  )
}
