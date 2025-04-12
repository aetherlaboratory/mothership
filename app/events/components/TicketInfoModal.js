// app/events/components/TicketInfoModal.js
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Star } from 'lucide-react';

export default function TicketInfoModal({ isOpen, onClose, eventId }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('👀 useEffect triggered');
    console.log('🟢 isOpen:', isOpen, '| eventId:', eventId);

    if (!isOpen || !eventId) {
      console.warn('⚠️ Modal not open or missing eventId');
      return;
    }

    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      console.log('📡 Fetching tickets for eventId:', eventId);
      try {
        const res = await fetch(`/api/tickets/by-event?eventId=${eventId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('🎫 Tickets fetched:', data);

        if (!Array.isArray(data) || data.length === 0) {
          console.warn('⚠️ No tickets found');
        }

        const withQty = data.map((t) => ({ ...t, quantity: 1 }));
        const marked = markFeaturedTicket(withQty);
        setTickets(marked);
      } catch (err) {
        console.error('❌ Failed to load tickets:', err);
        setError(err.message);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [isOpen, eventId]);

  const markFeaturedTicket = (tickets) => {
    if (tickets.length < 3) return tickets;
    const maxPrice = Math.max(...tickets.map((t) => parseFloat(t.price)));
    return tickets.map((t) =>
      parseFloat(t.price) === maxPrice ? { ...t, featured: true } : t
    );
  };

  const handleQtyChange = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, quantity: qty } : t))
    );
  };

  const handleAddToCart = (ticket) => {
    console.log('🛒 Add to Cart:', ticket);
  };

  const handleBuyNow = (ticket) => {
    console.log('💳 Buy Now:', ticket);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black/50 px-4">
        <Dialog.Panel className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-xl">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            <X />
          </button>
          <Dialog.Title className="text-2xl font-bold mb-6 text-center">Ticket Options</Dialog.Title>

          {loading ? (
            <p className="text-center text-gray-500 animate-pulse">Loading tickets...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error loading tickets: {error}</p>
          ) : tickets.length === 0 ? (
            <div className="text-center text-gray-500">
              <Star className="mx-auto text-yellow-400 mb-2" size={24} />
              Tickets coming soon!
            </div>
          ) : (
            <div className="grid gap-6">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
                      {ticket.name}
                      {ticket.featured && <Star size={16} className="text-yellow-500" />}
                    </h3>
                    <span className="text-emerald-600 font-bold">
                      ${parseFloat(ticket.price).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{ticket.description}</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                    {ticket.perks?.split(',').map((perk, i) => (
                      <li key={i}>{perk.trim()}</li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <label htmlFor={`qty-${ticket.id}`} className="text-sm font-medium text-gray-700">
                        Quantity:
                      </label>
                      <input
                        id={`qty-${ticket.id}`}
                        type="number"
                        min={1}
                        value={ticket.quantity}
                        onChange={(e) => handleQtyChange(ticket.id, e.target.value)}
                        className="w-16 border rounded-md px-2 py-1 text-sm"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(ticket)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(ticket)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
