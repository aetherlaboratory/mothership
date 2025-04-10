'use client';

import { useEffect } from 'react';


export const meta = {
  slug: 'photo',
  plural: 'photos',
  label: 'Photography',
    postType: 'photos'
};

export default function Photography() {
  useEffect(() => {
    // Fetch or prepare data here
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Photography Manager</h2>
      <p>CRUD UI for WordPress blog posts goes here.</p>
    </div>
  );
}
