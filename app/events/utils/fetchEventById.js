// /app/events/utils/fetchEventById.js
const API_URL_SINGLE = "https://mothership.wordifysites.com/wp-json";

export const fetchEventById = async (id) => {
  try {
    console.log("Loading ticket data for event ID:", id);
    const res = await fetch(`${API_URL_SINGLE}/custom/v1/events/${id}`);
    if (!res.ok) throw new Error("Failed to fetch event");
    const data = await res.json();
    console.log("Event data:", data);
    return { data, error: null };
  } catch (err) {
    console.error("Error loading ticket data:", err);
    return { data: null, error: err.message };
  }
};