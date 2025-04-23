// app/form/field-types/SelectField.js

// ✅ Default config for this field type
export const defaultConfig = {
    options: ['Option 1', 'Option 2'],
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field, formik }) {
    return (
      <select
        name={field.name}
        value={formik.values[field.name] || ''}
        onChange={formik.handleChange}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="">Select an option</option>
        {field.settings.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    let schema = Yup.string()
    if (field.required) schema = schema.required('This field is required')
    return schema
  }
  