'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  CalendarDays,
  MapPin,
  Users2,
  Ticket,
} from 'lucide-react';
import TicketInfoWrapper from '@/app/events/components/TicketInfoWrapper';

export default function EventPageContent({ event }) {
  const { title, content, meta, id, slug } = event;
  const eventTitle = typeof title === 'object' ? title.rendered : title;

  const {
    event_image,
    event_address_1,
    event_city,
    event_state,
    event_country,
    event_date,
    event_capacity,
  } = meta || {};

  const location = [event_address_1, event_city, event_state, event_country]
    .filter(Boolean)
    .join(', ');

  const formattedDate = event_date
    ? format(new Date(event_date), 'MMMM d, yyyy')
    : 'Date TBA';

  const [ticketTiers, setTicketTiers] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`/api/tickets/by-event?eventId=${id}`);
        if (!res.ok) throw new Error('Failed to fetch tickets');
        const data = await res.json();
        const sorted = data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        setTicketTiers(sorted);
      } catch (e) {
        console.error('⚠️ Failed to load ticket tiers:', e);
      }
    };

    if (id) fetchTickets();
  }, [id]);

  return (
    <div className="w-full">
      {event_image && (
        <div
          className="w-full h-[60vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${event_image})` }}
        >
          <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/60 to-transparent w-full text-white">
            <h1 className="text-4xl font-bold">{eventTitle}</h1>
            {location && (
              <p className="flex items-center mt-2 text-sm">
                <MapPin size={16} className="mr-2 text-white" />
                {location}
              </p>
            )}
            {event_date && (
              <p className="flex items-center mt-1 text-sm">
                <CalendarDays size={16} className="mr-2 text-white" />
                {formattedDate}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 px-4 py-10 max-w-6xl mx-auto">
        <div className="w-full lg:w-1/3 space-y-6">
          {event_capacity && (
            <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Users2 size={18} className="mr-2 text-emerald-600" />
                Capacity
              </h3>
              <p className="text-gray-800 text-sm">
                {event_capacity} attendees maximum
              </p>
            </div>
          )}

          {ticketTiers.length > 0 && (
            <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Ticket size={18} className="mr-2 text-indigo-600" />
                Ticket Tiers
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                {ticketTiers.map((ticket) => (
                  <li key={ticket.id}>
                    {ticket.name} - 
                    <span className="text-emerald-700"> $ {ticket.price}</span>
                  
                  </li>
                ))}
              </ul>
            </div>
          )}

          <TicketInfoWrapper slug={slug} eventId={id} />
        </div>

        <div className="w-full lg:w-2/3 prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
}
