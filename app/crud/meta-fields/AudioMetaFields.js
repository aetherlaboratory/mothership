'use client';
import { Field } from 'formik';

export default function AudioMetaFields() {
  return (
    <>
      <label className="font-medium">Artist Name</label>
      <Field name="meta.artist_name" type="text" className="border p-2 w-full" />

      <label className="font-medium">Album Name</label>
      <Field name="meta.album_name" type="text" className="border p-2 w-full" />

      <label className="font-medium">Publishing Info</label>
      <Field name="meta.publishing_info" type="text" className="border p-2 w-full" />

      <label className="font-medium">Song Description</label>
      <Field name="meta.audio_desc" as="textarea" rows="4" className="border p-2 w-full" />

      <label className="font-medium">MP3 File URL</label>
      <Field name="meta.audio_mp3" type="text" className="border p-2 w-full" />
    </>
  );
}
