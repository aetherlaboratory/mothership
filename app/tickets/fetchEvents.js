// app/tickets/fetchEvents.js
import axios from 'axios'

export async function fetchEvents() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_WP}/wp/v2/events?per_page=100&_fields=id,title,meta`)
    return { data: res.data, error: null }
  } catch (error) {
    console.error('Error fetching events:', error)
    return { data: [], error: error.message || 'Unknown error' }
  }
}
