// /app/events/components/EventCard.js

'use client';
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  CalendarDays,
  MapPin,
  Users2,
  Mail,
  Globe,
  Ticket,
} from 'lucide-react';

const EventCard = ({ event }) => {
  // debug: print full event object to verify slug is present
  console.log('🟡 EventCard:', event);

  // extract title safely from WP object
  const eventTitle = typeof event.title === 'object' ? event.title?.rendered : event.title || 'Untitled Event';

  // extract slug for link
  const slug = event?.slug;

  // extract meta
  const {
    event_image,
    event_address_1,
    event_city,
    event_state,
    event_country,
    event_desc,
    event_video,
    event_site_url,
    event_email,
    event_capacity,
    event_tiers,
    event_date,
  } = event?.meta || {};

  // generate location string
  const location = [event_address_1, event_city, event_state, event_country].filter(Boolean).join(', ');

  // format date
  const formattedDate = event_date ? format(new Date(event_date), 'MMMM d, yyyy') : 'Date TBA';

  return (
    <div className="overflow-hidden rounded-2xl shadow-md border bg-white transition hover:shadow-lg">
      {/* header image */}
      {event_image && (
        <div className="w-full h-64 overflow-hidden">
          <img
            src={event_image}
            alt={eventTitle}
            className="w-full h-full object-cover object-center mx-0 mt-0 px-0 pt-0"
          />
        </div>
      )}

      {/* content */}
      <div className="p-6 space-y-3">
        <h2 className="text-3xl font-extrabold text-gray-900">
          {eventTitle}
        </h2>

        {location && (
          <p className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2 text-rose-500" />
            {location}
          </p>
        )}

        {event_date && (
          <p className="flex items-center text-sm text-gray-600">
            <CalendarDays size={16} className="mr-2 text-indigo-500" />
            {formattedDate}
          </p>
        )}

        {event_capacity && (
          <p className="flex items-center text-sm text-gray-600">
            <Users2 size={16} className="mr-2 text-emerald-600" />
            Capacity: {event_capacity}
          </p>
        )}

        {event_email && (
          <p className="flex items-center text-sm text-gray-600">
            <Mail size={16} className="mr-2 text-gray-500" />
            {event_email}
          </p>
        )}

        {event_site_url && (
          <p className="flex items-center text-sm text-gray-600">
            <Globe size={16} className="mr-2 text-blue-500" />
            <a href={event_site_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Website
            </a>
          </p>
        )}

        {event_desc && (
          <p className="text-gray-800 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: event_desc }} />
        )}

        {/* force render link regardless of slug safety */}
        <Link
          href={`/events/${slug || 'missing-slug'}`}
          className="mt-4 inline-flex items-center text-blue-600 font-semibold hover:underline"
        >
          <Ticket size={18} className="mr-2" />
          View Details / Tickets
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
