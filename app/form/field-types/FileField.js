// app/form/field-types/FileField.js

// ✅ Default config for this field type
export const defaultConfig = {
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field, formik }) {
    const handleChange = (event) => {
      const file = event.currentTarget.files[0]
      formik.setFieldValue(field.name, file)
    }
  
    return (
      <input
        type="file"
        name={field.name}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full"
      />
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    let schema = Yup.mixed()
    if (field.required) schema = schema.required('This field is required')
    return schema
  }
  