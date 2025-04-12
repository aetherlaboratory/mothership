// app/tickets/fetchEventTiers.js
import axios from 'axios';

export async function fetchEventTiers(eventId) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_WP}/custom/v1/events/${eventId}`);
    const tiers = res.data?.meta?.event_tiers || 0;
    return { tiers: parseInt(tiers), error: null };
  } catch (error) {
    console.error('Error fetching event tiers:', error);
    return { tiers: 0, error: error.message || 'Unknown error' };
  }
}
