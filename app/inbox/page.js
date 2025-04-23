'use client'

// Admin Inbox – app/inbox/page.js
import { useEffect, useState } from 'react'

export default function InboxPage() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('/messages.json')
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      } else {
        console.error('Failed to load inbox messages')
      }
    }

    fetchMessages()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📥 Admin Inbox</h1>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="text-sm text-gray-500">{new Date(msg.date).toLocaleString()}</div>
              <h2 className="text-lg font-semibold">{msg.name} ({msg.email})</h2>
              <p className="mt-2">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
