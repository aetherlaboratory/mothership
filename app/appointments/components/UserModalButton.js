// app/appointments/components/UserModalButton.js

'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'

export default function UserModalButton({ userId, userName }) {
  const [open, setOpen] = useState(false)

  // Mock user data for layout preview
  const userData = {
    id: userId,
    name: userName,
    email: `${userName.toLowerCase().replace(/\s/g, '')}@example.com`,
    role: 'Client',
    joined: '2024-08-15',
    avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${userName}`
  }

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <User className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-4">
            <img src={userData.avatar} alt="avatar" className="w-20 h-20 rounded-full mx-auto" />
            <h3 className="text-lg font-semibold">{userData.name}</h3>
            <p className="text-sm text-gray-500">ID: {userData.id}</p>
            <p className="text-sm text-gray-500">Email: {userData.email}</p>
            <p className="text-sm text-gray-500">Role: {userData.role}</p>
            <p className="text-sm text-gray-500">Joined: {userData.joined}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
