// app/form/field-types/RepeaterField.js

// ✅ Default config for this field type
export const defaultConfig = {
    fields: [],
    required: false,
  }
  
  // ✅ Renders the field in the form UI
  export function RenderField({ field, formik }) {
    const values = formik.values[field.name] || []
  
    const addEntry = () => {
      const newEntry = {}
      field.settings.fields.forEach((f) => {
        newEntry[f.name] = ''
      })
      formik.setFieldValue(field.name, [...values, newEntry])
    }
  
    const removeEntry = (index) => {
      const updated = [...values]
      updated.splice(index, 1)
      formik.setFieldValue(field.name, updated)
    }
  
    return (
      <div className="space-y-4">
        {values.map((entry, index) => (
          <div key={index} className="border p-4 rounded">
            {field.settings.fields.map((subField, subIndex) => (
              <input
                key={subIndex}
                name={`${field.name}[${index}].${subField.name}`}
                value={entry[subField.name] || ''}
                onChange={(e) => {
                  const newValues = [...values]
                  newValues[index][subField.name] = e.target.value
                  formik.setFieldValue(field.name, newValues)
                }}
                placeholder={subField.placeholder || subField.name}
                className="border px-2 py-1 w-full mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => removeEntry(index)}
              className="text-red-600 text-sm mt-2"
            >
              Remove Entry
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addEntry}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add Entry
        </button>
      </div>
    )
  }
  
  // ✅ Yup validation schema generator (basic array with nested fields)
  export function validationSchema(field, Yup) {
    return Yup.array()
  }
  