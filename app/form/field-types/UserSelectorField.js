// app/form/field-types/UserSelectorField.js

'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

// ✅ Default config for this field type
export const defaultConfig = {
  multiple: true,
  required: false,
}

// ✅ Fetch and render registered WordPress users with custom profile image and search filter
export function RenderField({ field, formik }) {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users?per_page=100`)
        setUsers(res.data)
      } catch (err) {
        console.error('Failed to fetch users:', err)
      }
    }
    fetchUsers()
  }, [])

  const selected = formik.values[field.name] || []

  const toggleUser = (id) => {
    if (selected.includes(id)) {
      formik.setFieldValue(field.name, selected.filter((uid) => uid !== id))
    } else {
      formik.setFieldValue(field.name, [...selected, id])
    }
  }

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase()
    return (
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.username?.toLowerCase().includes(term)
    )
  })

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 w-full rounded"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredUsers.map((user) => {
          const isActive = selected.includes(user.id)
          const profileImage = user?.custom_profile_image || '/default-avatar.png'

          return (
            <div
              key={user.id}
              onClick={() => toggleUser(user.id)}
              className={`rounded-xl overflow-hidden cursor-pointer relative shadow ${
                isActive ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              }`}
            >
              <img
                src={profileImage}
                alt={user.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-2 text-center">
                <div className="font-semibold text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ✅ Yup validation schema
export function validationSchema(field, Yup) {
  return field.multiple
    ? Yup.array().of(Yup.number()).min(field.required ? 1 : 0)
    : Yup.number().nullable()
}
