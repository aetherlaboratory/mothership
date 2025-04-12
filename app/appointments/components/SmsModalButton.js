// app/appointments/components/SmsModalButton.js

'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'

export default function SmsModalButton({ userName }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <MessageSquare className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send SMS to {userName}</DialogTitle>
          </DialogHeader>

          <form className="space-y-4">
            <div>
              <label className="block text-sm">Phone Number</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="Enter phone number..." />
            </div>
            <div>
              <label className="block text-sm">Message</label>
              <textarea className="w-full border p-2 rounded" rows={4} placeholder="Type your message..." />
            </div>
            <div>
              <label className="block text-sm">Optional Image Attachment</label>
              <input type="file" className="w-full border p-2 rounded" />
            </div>
            <div className="text-right">
              <Button type="button">Send SMS</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}