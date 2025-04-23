'use client';
import { Field } from 'formik';

export default function Photo2DArtMetaFields() {
  return (
    <>
      <label className="font-medium">Image Gallery (JSON)</label>
      <Field
        name="meta.image_gallery"
        as="textarea"
        rows="5"
        className="border p-2 w-full font-mono text-xs"
        placeholder='["https://example.com/image1.jpg", "https://example.com/image2.jpg"]'
      />
    </>
  );
}
