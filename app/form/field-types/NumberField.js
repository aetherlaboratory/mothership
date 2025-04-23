// app/form/field-types/NumberField.js

// ✅ Default config for this field type
export const defaultConfig = {
    placeholder: '123',
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field, formik }) {
    return (
      <input
        type="number"
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
    let schema = Yup.number()
    if (field.required) schema = schema.required('This field is required')
    return schema
  }
  