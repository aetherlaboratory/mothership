// app/events/[slug]/page.js

import { notFound } from 'next/navigation';
import EventPageContent from './EventPageContent';

async function getEventBySlug(slug) {
  const res = await fetch(`https://mothership.wordifysites.com/wp-json/custom/v1/event-by-slug/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function EventPage({ params }) {
  const { slug } = await Promise.resolve(params); // ✅ Safe access to dynamic route param
  const event = await getEventBySlug(slug);
  if (!event) return notFound();

  return <EventPageContent event={event} />;
}
