// app/form/field-types/RadioField.js

// ✅ Default config for this field type
export const defaultConfig = {
    options: ['Yes', 'No'],
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field, formik }) {
    return (
      <div className="space-y-1">
        {field.settings.options.map((option, index) => (
          <label key={index} className="flex items-center gap-2">
            <input
              type="radio"
              name={field.name}
              value={option}
              checked={formik.values[field.name] === option}
              onChange={() => formik.setFieldValue(field.name, option)}
            />
            {option}
          </label>
        ))}
      </div>
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    let schema = Yup.string()
    if (field.required) schema = schema.required('This field is required')
    return schema
  }
  