// app/form/field-types/HtmlField.js

// ✅ Default config for this field type
export const defaultConfig = {
    content: '<h2>Section Title</h2>',
    required: false,
  }
  
  // ✅ Renders the field in the form UI (raw HTML output)
  export function RenderField({ field }) {
    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: field.settings.content }}
      />
    )
  }
  
  // ✅ Yup validation schema generator (no validation needed)
  export function validationSchema(field, Yup) {
    return Yup.mixed().notRequired()
  }
  