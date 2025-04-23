// app/form/field-types/PhoneField.js

// ✅ Default config for this field type
export const defaultConfig = {
    placeholder: '(555) 555-5555',
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field, formik }) {
    return (
      <input
        type="tel"
        name={field.name}
        value={formik.values[field.name] || ''}
        onChange={formik.handleChange}
        placeholder={field.settings.placeholder}
        className="border rounded px-2 py-1 w-full"
      />
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    let schema = Yup.string()
    if (field.required) schema = schema.required('This field is required')
    return schema
  }
  