// app/form/field-types/SectionField.js

// ✅ Default config for this field type
export const defaultConfig = {
    required: false,
  }
  
  // ✅ Renders the field in the form UI (as a visual separator)
  export function RenderField({ field }) {
    return (
      <hr className="my-6 border-t-2 border-gray-300" />
    )
  }
  
  // ✅ Yup validation schema generator (not required)
  export function validationSchema(field, Yup) {
    return Yup.mixed().notRequired()
  }
  