// app/form/field-types/UserLookupField.js

// ✅ Default config for this field type
export const defaultConfig = {
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field }) {
    return (
      <div className="border rounded px-4 py-2 bg-gray-50 text-gray-600">
        [ User Lookup Placeholder — Connect to WP Users ]
      </div>
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    return Yup.string().notRequired()
  }
  