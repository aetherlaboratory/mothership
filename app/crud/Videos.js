// app/crud/Videos.js
'use client';

import { fetchVideos } from './fetch/videoFetch';

export const meta = {
  slug: 'film',
  plural: 'films',
  label: 'Videos',
  postType: 'films',
  listType: 'thumbText',
  fetchAll: fetchVideos
};

export default function Video() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Video Manager</h2>
      <p>Manage your videos here.</p>
    </div>
  );
}
