// app/form/field-types/CheckboxField.js

// ✅ Default config for this field type
export const defaultConfig = {
    options: ['Option 1', 'Option 2'],
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field, formik }) {
    const handleChange = (option) => {
      const value = formik.values[field.name] || []
      if (value.includes(option)) {
        formik.setFieldValue(
          field.name,
          value.filter((v) => v !== option)
        )
      } else {
        formik.setFieldValue(field.name, [...value, option])
      }
    }
  
    return (
      <div className="space-y-1">
        {field.settings.options.map((option, index) => (
          <label key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formik.values[field.name]?.includes(option)}
              onChange={() => handleChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    )
  }
  
  // ✅ Yup validation schema generator
  export function validationSchema(field, Yup) {
    let schema = Yup.array().of(Yup.string())
    if (field.required) schema = schema.min(1, 'At least one option is required')
    return schema
  }
  