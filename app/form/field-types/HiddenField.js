// app/form/field-types/HiddenField.js

// ✅ Default config for this field type
export const defaultConfig = {
    value: '',
    required: false,
  }
  
  // ✅ Renders the field in the form UI (hidden input)
  export function RenderField({ field, formik }) {
    return (
      <input
        type="hidden"
        name={field.name}
        value={formik.values[field.name] || field.settings.value || ''}
      />
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    let schema = Yup.string()
    return schema // Hidden fields are usually not required
  }
  