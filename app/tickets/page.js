'use client'
// Updated /app/tickets/page.js
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchEventById } from '../events/utils/fetchEventById';

const TicketsPage = () => {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const loadEvent = async () => {
      const { data, error } = await fetchEventById(id);
      if (error) setError(error);
      else setEvent(data);
    };
    if (id) loadEvent();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: event.title.rendered }} />
      <p className="mb-1">📍 {event.meta.event_city}, {event.meta.event_state}</p>
      <p className="mb-3">📅 {event.meta.event_desc}</p>
      <p className="mb-6" dangerouslySetInnerHTML={{ __html: event.content.rendered }} />

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Reserve Ticket
      </button>
    </div>
  );
};

export default TicketsPage;
