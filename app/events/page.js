'use client'
// Updated /app/events/page.js
import React, { useEffect, useState } from 'react';
import EventCard from './components/EventCard';
import { fetchEvents } from './utils/fetchEvents';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      const { data, error } = await fetchEvents();
      if (error) setError(error);
      else setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;
  if (events.length === 0) return <p className='text-center my-20'>No events available at the moment. Please check back later.</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsPage;
