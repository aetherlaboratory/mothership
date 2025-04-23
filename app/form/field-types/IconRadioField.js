// app/form/field-types/IconRadioField.js

import * as icons from 'lucide-react'

// ✅ Default config for this field type
export const defaultConfig = {
  options: [
    { label: 'Option 1', value: 'option1', icon: 'Star', svg: null },
    { label: 'Option 2', value: 'option2', icon: 'Heart', svg: null }
  ],
  required: false,
}

// ✅ Renders the field in the form UI
export function RenderField({ field, formik }) {
  const selected = formik.values[field.name] || ''

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {field.settings.options.map((option, index) => {
        const isActive = selected === option.value
        const Icon = icons[option.icon] || null

        return (
          <div
            key={index}
            onClick={() => formik.setFieldValue(field.name, option.value)}
            className={`border rounded-xl p-4 cursor-pointer text-center transition relative flex flex-col items-center justify-center ${
              isActive ? 'ring-2 ring-blue-500' : 'hover:bg-gray-100'
            }`}
          >
            {option.svg ? (
              <div
                className="w-10 h-10 mb-2"
                dangerouslySetInnerHTML={{ __html: option.svg }}
              />
            ) : Icon ? (
              <Icon className="w-10 h-10 mb-2 text-gray-700" />
            ) : (
              <div className="w-10 h-10 mb-2 bg-gray-200" />
            )}
            <span className="text-sm font-medium mt-1">{option.label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ✅ Yup validation schema generator
export function validationSchema(field, Yup) {
  let schema = Yup.string()
  if (field.required) schema = schema.required('This field is required')
  return schema
}
