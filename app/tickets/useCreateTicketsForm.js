// app/tickets/useCreateTicketsForm.js
import { useEffect, useState } from 'react'

export function useCreateTicketsForm(tierCount) {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    const newTickets = Array.from({ length: tierCount }, (_, i) => ({
      name: `Tier ${i + 1}`,
      price: '',
      description: '',
      perks: ''
    }))
    setTickets(newTickets)
  }, [tierCount])

  const handleChange = (index, field, value) => {
    setTickets((prev) => {
      const updated = [...prev]
      updated[index][field] = value
      return updated
    })
  }

  return {
    tickets,
    handleChange
  }
}
