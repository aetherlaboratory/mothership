// app/events/components/TicketInfoButton.js
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import TicketInfoModal from './TicketInfoModal';

export default function TicketInfoButton({ slug, eventId }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white mt-4"
      >
        View Ticket Info
      </Button>

      <TicketInfoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        eventId={eventId}
      />
    </>
  );
} 
