'use client'
import { useEffect, useState } from 'react'
import { submitFormWizard } from '@/app/utils/submitForm'

export default function WizardFinalStep({ wizardData }) {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    // Validate and normalize the wizard data
    if (!Array.isArray(wizardData) || wizardData.length === 0) {
      alert('Form is incomplete or invalid.')
      return
    }

    const payload = {
      form_id: 'career_form',
      steps: wizardData.map((step, index) => ({
        step: step?.step || index + 1,
        fields: step?.fields || {}
      }))
    }

    console.log('🔁 Sending payload to WP:', payload)

    setSubmitting(true)
    const result = await submitFormWizard(payload)
    setSubmitting(false)

    if (result?.success) {
      alert('✅ Submission saved!')
    } else {
      alert('❌ Error submitting form: ' + (result?.error || 'Unknown Error'))
    }
  }

  return (
    <div className="text-center py-4">
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit Final Step'}
      </button>
    </div>
  )
}
