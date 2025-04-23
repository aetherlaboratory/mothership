'use client';
import { Field } from 'formik';

export default function FilmMetaFields() {
  return (
    <>
      <label className="font-medium">Film Length (mins)</label>
      <Field name="meta.film_length" type="number" className="border p-2 w-full" />

      <label className="font-medium">Film Genre</label>
      <Field name="meta.film_genre" className="border p-2 w-full" />

      <label className="font-medium">Film Year</label>
      <Field name="meta.film_year" type="number" className="border p-2 w-full" />
    </>
  );
}
