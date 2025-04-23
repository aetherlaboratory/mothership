// app/form/field-types/PostReferenceField.js

// ✅ Default config for this field type
export const defaultConfig = {
    post_type: 'custom',
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field }) {
    return (
      <div className="border rounded px-4 py-2 bg-gray-50 text-gray-600">
        [ Post Reference Placeholder — Connect to WP Posts of type "{field.settings.post_type}" ]
      </div>
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    return Yup.string().notRequired()
  }
  