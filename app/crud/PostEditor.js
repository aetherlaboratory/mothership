'use client';

import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import useAuth from '@/app/hooks/useAuth';

import { fetchPost, updatePost } from './fetch/blogFetch';
import { fetchVideo, updateVideo } from './fetch/videoFetch';
import { fetchAudio, updateAudio } from './fetch/audioFetch';
import { fetchPhoto, updatePhoto } from './fetch/photographyFetch';
import { fetchEvent, updateEvent } from './fetch/eventFetch';
import { fetch3d, update3d } from './fetch/models3dFetch';

import EventMetaFields from './meta-fields/EventMetaFields';
import FilmMetaFields from './meta-fields/FilmMetaFields';
import AudioMetaFields from './meta-fields/AudioMetaFields';
import Photo2DArtMetaFields from './meta-fields/Photo2DArtMetaFields';
import ThreeDArtMetaFields from './meta-fields/ThreeDArtMetaFields';

import MediaPickerField from '@/app/components/form/MediaPickerField';

export default function PostEditor({ postId, source = 'wp', slug }) {
  const { user, loading } = useAuth();
  const [initialValues, setInitialValues] = useState(null);

  const fetchMap = {
    post: fetchPost,
    film: fetchVideo,
    audio: fetchAudio,
    photos: fetchPhoto,
    '2dart': fetchPhoto,
    event: fetchEvent,
    '3dart': fetch3d
  };

  const updateMap = {
    post: updatePost,
    film: updateVideo,
    audio: updateAudio,
    photos: updatePhoto,
    '2dart': updatePhoto,
    event: updateEvent,
    '3dart': update3d
  };

  const fetchFunc = fetchMap[slug] || fetchPost;
  const updateFunc = updateMap[slug] || updatePost;

  const MetaFieldsComponent = {
    event: EventMetaFields,
    film: FilmMetaFields,
    audio: AudioMetaFields,
    photos: Photo2DArtMetaFields,
    '2dart': Photo2DArtMetaFields,
    '3dart': ThreeDArtMetaFields
  }[slug] || (() => null);

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

  if (!initialValues || loading) return <p>Loading post…</p>;

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={async (values) => {
        if (!user?.token) {
          alert('Not authenticated. Please log in.');
          return;
        }

        try {
          await updateFunc(
            postId,
            {
              title: { rendered: values.title },
              content: { rendered: values.content },
              meta: values.meta
            },
            user.token,
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
        <label className="font-medium">Title</label>
        <Field name="title" className="border p-2 w-full" />

        <label className="font-medium">Content</label>
        <Field name="content" as="textarea" rows="10" className="border p-2 w-full" />

        {/* ✅ Blog Featured Image via media modal */}
        {slug === 'post' && (
          <MediaPickerField
            name="meta.featured_image"
            label="Featured Image"
            buttonLabel="Choose Image"
          />
        )}

        {/* ✅ Post-type-specific meta fields */}
        <MetaFieldsComponent />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Post
        </button>
      </Form>
    </Formik>
  );
}
