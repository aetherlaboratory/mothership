// app/form/field-types/EventPickerField.js

// ✅ Default config for this field type
export const defaultConfig = {
    source: 'event',
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field }) {
    return (
      <div className="border rounded px-4 py-2 bg-gray-50 text-gray-600">
        [ Event Picker Placeholder — Connect to WP Events ]
      </div>
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    return Yup.string().notRequired()
  }
  