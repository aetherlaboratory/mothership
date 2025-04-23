// app/form/field-types/SignatureField.js

// ✅ Default config for this field type
export const defaultConfig = {
    required: false,
  }
  
  // ✅ Renders the field in the form UI (as a basic placeholder until signature pad is added)
  export function RenderField({ field, formik }) {
    return (
      <div className="border border-dashed border-gray-400 p-6 text-center text-gray-500">
        [ Signature Pad Placeholder ]
      </div>
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    let schema = Yup.string()
    if (field.required) schema = schema.required('Signature is required')
    return schema
  }
  