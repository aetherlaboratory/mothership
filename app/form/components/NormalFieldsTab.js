'use client'

import * as icons from 'lucide-react'
import fieldTypes from '../formFieldTypes.json'

export default function NormalFieldsTab({ onSelect }) {
  const normalFields = fieldTypes.fieldTypes.filter(field =>
    [
      'text',
      'textarea',
      'email',
      'number',
      'select',
      'checkbox',
      'radio',
      'icon_radio',
      'icon_checkbox',
      'date',
      'time',
      'phone',
      'url'
    ].includes(field.type)
  )

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {normalFields.map((field) => {
        const Icon = icons[field.icon] || icons.HelpCircle


        return (
          <button
            key={field.type}
            onClick={() => onSelect(field)}
            className="border border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-gray-100 transition"
          >
            <Icon className="w-10 h-10 mb-2 text-gray-700" />
            <span className="text-sm font-medium">{field.label}</span>
          </button>
        )
      })}
    </div>
  )
}
