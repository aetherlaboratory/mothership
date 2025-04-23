// app/form/field-types/FoodMenuField.js

// ✅ Default config for this field type
export const defaultConfig = {
    source: 'food',
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field }) {
    return (
      <div className="border rounded px-4 py-2 bg-gray-50 text-gray-600">
        [ Food Menu Placeholder — Connect to WP Food Items ]
      </div>
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    return Yup.string().notRequired()
  }
  