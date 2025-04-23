// app/form/field-types/TextareaField.js

// ✅ Default config for this field type
export const defaultConfig = {
    placeholder: 'Write your response...',
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field, formik }) {
    return (
      <textarea
        name={field.name}
        value={formik.values[field.name] || ''}
        onChange={formik.handleChange}
        placeholder={field.settings.placeholder}
        className="border rounded px-2 py-1 w-full h-24"
      />
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    let schema = Yup.string()
    if (field.required) schema = schema.required('This field is required')
    return schema
  }
  