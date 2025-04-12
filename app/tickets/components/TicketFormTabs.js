// app/tickets/components/TicketFormTabs.js
'use client'

import React from 'react'
import { Tab } from '@headlessui/react'
import TicketFormFields from './TicketFormFields'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TicketFormTabs({ tickets, handleChange }) {
  if (!tickets || tickets.length === 0) return null

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-2 border-b border-gray-300 mb-6 overflow-x-auto">
        {tickets.map((_, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              classNames(
                'px-4 py-2 text-sm font-medium rounded-t-md border-b-2',
                selected
                  ? 'bg-indigo-100 text-indigo-700 border-indigo-500'
                  : 'bg-white text-gray-500 border-transparent hover:bg-gray-100'
              )
            }
          >
            Tier {index + 1}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {tickets.map((ticket, index) => (
          <Tab.Panel key={index} className="focus:outline-none">
            <TicketFormFields
              ticket={ticket}
              index={index}
              handleChange={handleChange}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
