'use client'

import { useState } from 'react'
import AddFieldModal from '@/app/form/components/AddFieldModal'
import { submitFormWizard } from '@/app/utils/submitForm'

export default function FormBuilderPage() {
  const [fields, setFields] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleFieldSelect = (field) => {
    const newField = {
      ...field,
      name: `${field.type}_${fields.length + 1}`,
      label: field.label,
      required: false,
      settings: field.default || {}
    }

    setFields((prev) => [...prev, newField])
    setIsModalOpen(false)
  }

  const handleSubmit = async () => {
    if (fields.length === 0) {
      alert('No fields to submit.')
      return
    }

    const payload = {
      form_id: 'builder_test',
      steps: [
        {
          step: 1,
          fields: fields
        }
      ]
    }

    console.log('📤 Submitting:', payload)
    setSubmitting(true)
    const result = await submitFormWizard(payload)
    setSubmitting(false)

    if (result?.success) {
      alert('✅ Form saved successfully!')
    } else {
      alert('❌ Error: ' + (result?.error || 'Unknown'))
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Form Builder</h1>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={index}
            className="border rounded p-4 bg-gray-50 flex justify-between items-center"
          >
            <div>
              <strong>{field.label}</strong>
              <p className="text-xs text-gray-500">{field.type}</p>
            </div>
            <span className="text-xs text-gray-400">{field.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Field
        </button>

        <button
          onClick={handleSubmit}
          disabled={submitting || fields.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Save Form'}
        </button>
      </div>

      {/* Fullscreen modal */}
      <AddFieldModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFieldSelect={handleFieldSelect}
      />
    </div>
  )
}
