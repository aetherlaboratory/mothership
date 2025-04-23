// app/form/field-types/DateField.js

// ✅ Default config for this field type
export const defaultConfig = {
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field, formik }) {
    return (
      <input
        type="date"
        name={field.name}
        value={formik.values[field.name] || ''}
        onChange={formik.handleChange}
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
  