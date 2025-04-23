// app/form/components/FieldRenderer.js

import * as Yup from 'yup'
import * as TextField from '../field-types/TextField'
import * as TextareaField from '../field-types/TextareaField'
import * as EmailField from '../field-types/EmailField'
import * as NumberField from '../field-types/NumberField'
import * as SelectField from '../field-types/SelectField'
import * as CheckboxField from '../field-types/CheckboxField'
import * as RadioField from '../field-types/RadioField'
import * as IconRadioField from '../field-types/IconRadioField'
import * as IconCheckboxField from '../field-types/IconCheckboxField'
import * as DateField from '../field-types/DateField'
import * as TimeField from '../field-types/TimeField'
import * as PhoneField from '../field-types/PhoneField'
import * as UrlField from '../field-types/UrlField'
import * as FileField from '../field-types/FileField'
import * as PasswordField from '../field-types/PasswordField'
import * as HiddenField from '../field-types/HiddenField'
import * as HtmlField from '../field-types/HtmlField'
import * as SectionField from '../field-types/SectionField'
import * as RepeaterField from '../field-types/RepeaterField'
import * as RatingField from '../field-types/RatingField'
import * as SignatureField from '../field-types/SignatureField'
import * as ProductSelectorField from '../field-types/ProductSelectorField'
import * as EventPickerField from '../field-types/EventPickerField'
import * as FoodMenuField from '../field-types/FoodMenuField'
import * as UserLookupField from '../field-types/UserLookupField'
import * as PostReferenceField from '../field-types/PostReferenceField'
import * as UserSelectorField from '../field-types/UserSelectorField' // ✅ New import
import * as PostSelectorField from '../field-types/PostSelectorField'





const registry = {
  text: TextField,
  textarea: TextareaField,
  email: EmailField,
  number: NumberField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioField,
  icon_radio: IconRadioField,
  icon_checkbox: IconCheckboxField,
  date: DateField,
  time: TimeField,
  phone: PhoneField,
  url: UrlField,
  file: FileField,
  password: PasswordField,
  hidden: HiddenField,
  html: HtmlField,
  section: SectionField,
  repeater: RepeaterField,
  rating: RatingField,
  signature: SignatureField,
  product_selector: ProductSelectorField,
  event_picker: EventPickerField,
  food_menu: FoodMenuField,
  user_lookup: UserLookupField,
  post_reference: PostReferenceField,
  user_selector: UserSelectorField, // ✅ New registry entry
  post_selector: PostSelectorField, // ✅ Add this

}

export function RenderFieldByType({ field, formik }) {
  const FieldComponent = registry[field.type]?.RenderField
  if (!FieldComponent) return <div>Unsupported field: {field.type}</div>
  return <FieldComponent field={field} formik={formik} />
}

export function getValidationSchemaForField(field) {
  const getSchema = registry[field.type]?.validationSchema
  return getSchema ? getSchema(field, Yup) : Yup.mixed().notRequired()
}
