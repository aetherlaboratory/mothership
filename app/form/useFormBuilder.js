// app/form/useFormBuilder.js

'use client'

import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RenderFieldByType, getValidationSchemaForField } from './components/FieldRenderer'
import axios from 'axios'

export function useFormBuilder(formId) {
  const [formSchema, setFormSchema] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const res = await axios.get(`/wp-json/custom/v1/wizard-form?form_id=${formId}`)
        setFormSchema(res.data)
      } catch (err) {
        console.error('❌ Failed to fetch form:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSchema()
  }, [formId])

  const initialValues = {}
  const validationFields = {}

  if (formSchema?.steps) {
    formSchema.steps.forEach((step) => {
      step.fields.forEach((field) => {
        initialValues[field.name] = ''
        validationFields[field.name] = getValidationSchemaForField(field)
      })
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape(validationFields),
    onSubmit: async (values) => {
      console.log('📤 Submitting form:', values)
      // Submit logic goes here
    },
  })

  const RenderForm = () => {
    if (loading) return <div>Loading form...</div>
    if (!formSchema) return <div>No form found.</div>

    return (
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formSchema.steps.map((step, stepIndex) => (
          <div key={stepIndex} className="space-y-4">
            <h3 className="text-xl font-bold">{step.title}</h3>
            {step.fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <RenderFieldByType field={field} formik={formik} />
              </div>
            ))}
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    )
  }

  return { RenderForm, formik, formSchema, loading }
}
