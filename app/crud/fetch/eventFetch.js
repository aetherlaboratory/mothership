'use server';

const API_URL = process.env.NEXT_PUBLIC_API_WP;
const EVENT_API = `${API_URL}/custom/v1/events`;

export async function fetchEvents() {
  try {
    const res = await fetch(EVENT_API);
    if (!res.ok) throw new Error('Failed to fetch events');
    const data = await res.json();

    const normalized = data.map((event) => ({
      ...event,
      title: { rendered: event.title },
      content: { rendered: event.content },
      meta: event.meta || {},
      _embedded: {
        'wp:featuredmedia': [
          { source_url: event.meta?.event_image || 'https://via.placeholder.com/100x100' }
        ]
      }
    }));

    return {
      source: 'wp',
      data: normalized
    };
  } catch (error) {
    console.error('[Event Fetch] Failed:', error);
    return { source: 'fallback', data: [] };
  }
}

export async function fetchEvent(id) {
  const res = await fetch(`${EVENT_API}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch event');
  const event = await res.json();

  return {
    ...event,
    title: { rendered: event.title },
    content: { rendered: event.content },
    meta: event.meta || {},
    _embedded: {
      'wp:featuredmedia': [
        { source_url: event.meta?.event_image || 'https://via.placeholder.com/100x100' }
      ]
    }
  };
}

export async function updateEvent(id, data, token) {
  const res = await fetch(`${EVENT_API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error('Failed to update event');
  return await res.json();
}
