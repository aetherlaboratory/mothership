'use client';
import { useEffect } from 'react';
import { fetchPosts } from './fetch/blogFetch'; // ✅ you must import this

export const meta = {
  slug: 'post',
  plural: 'posts',
  label: 'Blog',
  postType: 'posts',
  fetchAll: fetchPosts // ✅ required for PostList
};

export default function Blog() {
  useEffect(() => {
    // Optional logic
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Blog Manager</h2>
      <p>Select a post on the left to edit it, or create a new one.</p>
    </div>
  );
}
