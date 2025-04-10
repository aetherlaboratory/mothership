
// /app/events/components/EventCard.js
import React from 'react';
import Link from 'next/link';

const EventCard = ({ event }) => {
  const { id, title, meta } = event;
  const { date, location, thumbnail } = meta || {};

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      {thumbnail && <img src={thumbnail} alt={title.rendered} className="rounded mb-3 w-full h-48 object-cover" />}
      <h2 className="text-xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: title.rendered }} />
      <p className="text-sm mb-1">📍 {location}</p>
      <p className="text-sm mb-3">📅 {date}</p>
      <Link href={`/tickets?id=${id}`} className="text-blue-500 hover:underline">
        View Details / Tickets →
      </Link>
    </div>
  );
};

export default EventCard;
