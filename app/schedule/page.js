'use client'

import React, { useState, useMemo } from 'react'
import {
  startOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isToday,
  format
} from 'date-fns'
import { CalendarDays } from 'lucide-react'
import Modal from './components/Modal'
import './calendarStyles.css'


export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handleDayClick = (date) => {
    setSelectedDate(date)
    setModalOpen(true)
  }

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Generate 42 days starting from Sunday of first week
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 })
    return Array.from({ length: 42 }, (_, i) => addDays(start, i))
  }, [currentDate])

  // Chunk days into 6 rows for the calendar
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <div className="calendar-bg bg-gray-50 mb-7 flex flex-col">
      {/* Header */}
      {/* <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
        <CalendarDays className="w-7 h-7" />
        Full Schedule
      </h1> */}

<div className="">
      {/* Month Navigation */}
      <div className="month-header bg-gray-700 w-full px-3 py-5 flex items-center justify-between mx-auto">
        <button onClick={goToPrevMonth} className="text-center rounded-full bg-gray-900 pl-3 pr-4 py-2 rounded text-white">⫷</button>
        <h2 className="text-2xl text-white font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button onClick={goToNextMonth} className="text-center rounded-full bg-gray-900 pl-4 pr-3 py-2 rounded text-white">⫸</button>
      </div>

      {/* Calendar Table */}
      <div className="w-full mx-auto">
        <table className="w-full border-collapse table-fixed calendar-table">
          <thead>
            <tr className="bg-gray-700 text-white">
              {weekdays.map((day) => (
                <th key={day} className="py-2 text-center font-semibold">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((date, di) => {
                  const isCurrentMonth = isSameMonth(date, currentDate)
                  const isTodayDate = isToday(date)

                  const tdClass = [
                    'h-24',
                    'text-center',
                    'align-top',
                    'border',
                    'p-2',
                    'cursor-pointer',
                    'select-none',
                    'rounded',
                    'transition-all',
                    isTodayDate ? 'today-cell text-white font-bold' : '',
                    !isCurrentMonth ? 'text-gray-400' : '',
                    'hover:bg-blue-100'
                  ].join(' ')
                  

                  return (
                    <td
                      key={di}
                      onClick={() => handleDayClick(date)}
                      className={tdClass}
                    >
                      {format(date, 'd')}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      {/* Modal */}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} selectedDate={selectedDate} />
      )}
    </div>
  )
}
