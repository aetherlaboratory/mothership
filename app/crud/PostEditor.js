'use client';
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSession } from 'next-auth/react';

import { fetchPost, updatePost } from './fetch/blogFetch';
import { fetchVideo, updateVideo } from './fetch/videoFetch';
import { fetchAudio, updateAudio } from './fetch/audioFetch';
import { fetchArtwork, updateArtwork } from './fetch/artworkFetch';
import { fetchPhoto, updatePhoto } from './fetch/photographyFetch';
import { fetchEvent, updateEvent } from './fetch/eventFetch';
import { fetch3d, update3d } from './fetch/models3dFetch';

export default function PostEditor({ postId, source = 'wp', slug }) {
  const { data: session } = useSession();
  const [initialValues, setInitialValues] = useState(null);

  const fetchMap = {
    post: fetchPost,
    film: fetchVideo,
    audio: fetchAudio,
    artwork: fetchArtwork,
    photos: fetchPhoto,
    event: fetchEvent,
    '3dart': fetch3d
  };

  const updateMap = {
    post: updatePost,
    film: updateVideo,
    audio: updateAudio,
    artwork: updateArtwork,
    photos: updatePhoto,
    event: updateEvent,
    '3dart': update3d
  };

  const fetchFunc = fetchMap[slug] || fetchPost;
  const updateFunc = updateMap[slug] || updatePost;

  useEffect(() => {
    if (!postId || !fetchFunc) return;

    fetchFunc(postId, source)
      .then((data) => {
        if (!data) return;

        setInitialValues({
          title: data.title?.rendered || '',
          content: data.content?.rendered || '',
          meta: data.meta || {},
          featured: data._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
        });
      })
      .catch((err) => {
        console.error('Failed to load post data:', err);
      });
  }, [postId, source, fetchFunc]);

  if (!initialValues) return <p>Loading post…</p>;

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={async (values) => {
        try {
          await updateFunc(
            postId,
            {
              title: { rendered: values.title },
              content: { rendered: values.content },
              meta: values.meta
            },
            session?.user?.token,
            source
          );
          alert('Post updated!');
        } catch (err) {
          console.error(err);
          alert('Failed to update post.');
        }
      }}
    >
      <Form className="flex flex-col gap-4">
        {initialValues.featured && (
          <img
            src={initialValues.featured}
            alt="Featured"
            className="rounded w-full max-w-xs mb-4 border"
          />
        )}

        <label className="font-medium">Title</label>
        <Field name="title" className="border p-2 w-full" />

        <label className="font-medium">Content</label>
        <Field name="content" as="textarea" rows="10" className="border p-2 w-full" />

        {/* Add meta fields here */}
        <label className="font-medium">Event Image URL</label>
        <Field name="meta.event_image" className="border p-2 w-full" />

        <label className="font-medium">Event City</label>
        <Field name="meta.event_city" className="border p-2 w-full" />

        <label className="font-medium">Event State</label>
        <Field name="meta.event_state" className="border p-2 w-full" />

        <label className="font-medium">Event Capacity</label>
        <Field name="meta.event_capacity" type="number" className="border p-2 w-full" />

        <label className="font-medium">Event Tiers</label>
        <Field name="meta.event_tiers" type="number" className="border p-2 w-full" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Post
        </button>
      </Form>
    </Formik>
  );
}
