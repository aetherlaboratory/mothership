'use client';
import { Field } from 'formik';

export default function ThreeDArtMetaFields() {
  return (
    <>
      <label className="font-medium">3D Artwork Gallery (JSON)</label>
      <Field
        name="meta.three_gallery"
        as="textarea"
        rows="5"
        className="border p-2 w-full font-mono text-xs"
        placeholder='["https://example.com/image1.jpg", "https://example.com/image2.jpg"]'
      />

      <label className="font-medium mt-4">3D File URL (GLB, OBJ, etc.)</label>
      <Field name="meta.three_file" type="text" className="border p-2 w-full" />

      <label className="font-medium mt-4">Optional Video URL</label>
      <Field name="meta.three_video" type="text" className="border p-2 w-full" />

      <label className="font-medium mt-4">Code Snippet</label>
      <Field
        name="meta.three_code_snippet"
        as="textarea"
        rows="8"
        className="border p-2 w-full font-mono text-sm"
      />
    </>
  );
}
