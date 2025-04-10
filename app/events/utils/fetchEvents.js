// /app/events/utils/fetchEvents.js
const API_URL = "https://mothership.wordifysites.com/wp-json";

export const fetchEvents = async () => {
  try {
    console.log("1. Loading events from:", `${API_URL}/custom/v1/events`);
    const res = await fetch(`${API_URL}/custom/v1/events`);
    if (!res.ok) throw new Error("Failed to fetch events");
    const data = await res.json();
    console.log("2. Events received:", data);
    return { data, error: null };
  } catch (err) {
    console.error("3. Error fetching events:", err);
    return { data: [], error: err.message };
  }
};