// app/tickets/submitTickets.js
import axios from 'axios'

export async function submitTickets(tickets, eventId) {
  const results = []

  for (const ticket of tickets) {
    try {
      const res = await axios.post('/api/tickets/create', {
        name: ticket.name,
        price: ticket.price,
        description: ticket.description,
        perks: ticket.perks,
        tags: ['ticket', `event-${eventId}`],
      })
      results.push({ success: true, data: res.data })
    } catch (error) {
      results.push({ success: false, error: error.message })
    }
  }

  return results
}
