'use client';
import { Field } from 'formik';

export default function EventMetaFields() {
  return (
    <>
      {/* Media Uploads */}
      <label className="font-medium">Event Image</label>
      <Field name="meta.event_image" type="text" className="border p-2 w-full" />

      <label className="font-medium">Event Video</label>
      <Field name="meta.event_video" type="text" className="border p-2 w-full" />

      {/* Website & Contact */}
      <label className="font-medium">Event Website URL</label>
      <Field name="meta.event_site_url" type="url" className="border p-2 w-full" />

      <label className="font-medium">Contact Email</label>
      <Field name="meta.event_email" type="email" className="border p-2 w-full" />

      {/* Description */}
      <label className="font-medium">Event Description</label>
      <Field name="meta.event_desc" as="textarea" rows="4" className="border p-2 w-full" />

      {/* Address Block */}
      <label className="font-medium">Address Line 1</label>
      <Field name="meta.event_address_1" type="text" className="border p-2 w-full" />

      <label className="font-medium">Address Line 2</label>
      <Field name="meta.event_address_2" type="text" className="border p-2 w-full" />

      <label className="font-medium">City</label>
      <Field name="meta.event_city" type="text" className="border p-2 w-full" />

      <label className="font-medium">State</label>
      <Field name="meta.event_state" type="text" className="border p-2 w-full" />

      <label className="font-medium">Country</label>
      <Field name="meta.event_country" type="text" className="border p-2 w-full" />

      <label className="font-medium">Zip Code</label>
      <Field name="meta.event_zip" type="text" className="border p-2 w-full" />

      {/* Attendance */}
      <label className="font-medium">Maximum Capacity</label>
      <Field name="meta.event_capacity" type="number" className="border p-2 w-full" />

      <label className="font-medium">Number of Tiers</label>
      <Field name="meta.event_tiers" type="number" className="border p-2 w-full" />
    </>
  );
}
