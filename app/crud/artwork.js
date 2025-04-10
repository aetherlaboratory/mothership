'use client';

import { useEffect } from 'react';

export const meta = {
  slug: '2dart',
  plural: null,
  label: 'Artwork',
    postType: '2dart'
};

export default function Artwork() {
  useEffect(() => {
    // Fetch or prepare data here
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Artwork Manager</h2>
      <p>CRUD UI for WordPress blog posts goes here.</p>
    </div>
  );
}
