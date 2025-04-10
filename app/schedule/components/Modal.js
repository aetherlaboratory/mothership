'use client'

import React, { useState, useMemo } from 'react'
import { XCircle } from 'lucide-react'
import { format } from 'date-fns'
import AppointmentForm from './AppointmentForm'
import UserSchedule from './UserSchedule'

const slotOptions = [
  { label: '30 Minutes', value: 0.5 },
  { label: '1 Hour', value: 1 },
  { label: '2 Hours', value: 2 },
  { label: '3 Hours', value: 3 },
  { label: '8 Hours', value: 8 },
]

const allHalfHourSlots = Array.from({ length: 48 }, (_, i) => i * 0.5)

const formatHour = (h) => {
  const hour = Math.floor(h)
  const mins = h % 1 === 0.5 ? '30' : '00'
  const suffix = hour < 12 || hour === 24 ? 'AM' : 'PM'
  const display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return `${display}:${mins} ${suffix}`
}

export default function Modal({ onClose, selectedDate }) {
  const [slotSize, setSlotSize] = useState(1)
  const [startHour, setStartHour] = useState(null)

  const slotRange = useMemo(() => {
    if (startHour === null) return null

    const start = startHour
    const end = start + slotSize

    const formatTime = (hourFloat) => {
      const hour = Math.floor(hourFloat)
      const mins = (hourFloat % 1) === 0.5 ? '30' : '00'
      const period = hour < 12 || hour === 24 ? 'AM' : 'PM'
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      return `${hour12}:${mins} ${period}`
    }

    return {
      startLabel: formatTime(start),
      endLabel: formatTime(end),
    }
  }, [startHour, slotSize])

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white px-6 pb-6 pt-3 rounded-xl w-full m-1 top-0 fixed shadow-xl h-full overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          <XCircle className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Time Selection */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold mb-6">
              Book for {format(selectedDate, 'EEEE, MMMM do, yyyy')}
            </h2>

            {/* Slot Type Picker */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Select Time Slot Type:</h3>
              <div className="flex flex-wrap gap-2">
                {slotOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSlotSize(opt.value)
                      setStartHour(null)
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all ${
                      slotSize === opt.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Hour Picker */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Select Start Hour:</h3>
              <div className="grid grid-cols-6 gap-2 text-xs">
                {allHalfHourSlots.map((h, idx) => (
                  <button
                    key={idx}
                    onClick={() => setStartHour(h)}
                    className={`border rounded px-3 py-1 font-medium text-xs ${
                      startHour === h ? 'bg-blue-500 text-white shadow' : 'hover:bg-blue-100'
                    }`}
                  >
                    {formatHour(h)}
                  </button>
                ))}
              </div>
            </div>

            {/* Final Range Display */}
            {slotRange && (
              <div className="text-sm mt-4">
                <strong>Selected Range:</strong>{' '}
                <span className="text-blue-600">
                  {slotRange.startLabel} → {slotRange.endLabel}
                </span>
              </div>
            )}
            
            {/* Show User Info or Auth Options */}
<UserSchedule />

          </div>

          {/* Right Column: Appointment Form */}
          {slotRange && startHour !== null && (
            <div className="w-full lg:w-1/2">
              <AppointmentForm
                selectedDate={selectedDate}
                slotRange={slotRange}
                slotSize={slotSize}
                startHour={startHour}
                onComplete={onClose}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
