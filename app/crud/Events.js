'use client';

import { useEffect, useState } from 'react';
import { fetchEvents, fetchEvent, updateEvent } from './fetch/eventFetch';

export const meta = {
  slug: 'event',
  plural: 'events',
  label: 'Events',
  postType: 'events',
  fetchAll: fetchEvents,
  fetchOne: fetchEvent,
  updateOne: updateEvent,
  listType: 'thumbText'
};


export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchEvents();
        setEvents(res);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Events Manager</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul className="list-disc ml-4">
          {events.map((event) => (
            <li key={event.id}>
              {event.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
