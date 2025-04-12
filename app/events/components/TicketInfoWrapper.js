'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const TicketInfoButton = dynamic(() => import('./TicketInfoButton'));

export default function TicketInfoWrapper({ slug, eventId }) {
  return <TicketInfoButton slug={slug} eventId={eventId} />;
}
