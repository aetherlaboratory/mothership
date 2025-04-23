// app/form/field-types/RatingField.js

// ✅ Default config for this field type
export const defaultConfig = {
    max: 5,
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field, formik }) {
    const value = formik.values[field.name] || 0
  
    return (
      <div className="flex gap-2">
        {Array.from({ length: field.settings.max }, (_, i) => {
          const isActive = i < value
          return (
            <span
              key={i}
              onClick={() => formik.setFieldValue(field.name, i + 1)}
              className={`cursor-pointer text-2xl ${
                isActive ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          )
        })}
      </div>
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    let schema = Yup.number().min(0).max(field.settings.max)
    if (field.required) schema = schema.required('This field is required')
    return schema
  }
  