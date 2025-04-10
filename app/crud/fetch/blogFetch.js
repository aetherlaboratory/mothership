'use server';

// ==============================
// /app/crud/fetch/blogFetch.js
// Handles GET and PUT requests to WordPress REST API for blog posts
// ==============================

import blogDummyData from '../../dummy-data/blogDummyData.json';
import fs from 'fs/promises';
import path from 'path';

const API_URL = process.env.NEXT_PUBLIC_API_WP;
const DUMMY_DATA_PATH = path.join(process.cwd(), 'app/dummy-data/blogDummyData.json');

let isUsingDummy = false;

// ✅ Load all posts (WordPress first, fallback to dummy)
export async function fetchPosts() {
  try {
    const res = await fetch(`${API_URL}/wp/v2/posts?per_page=20`);
    if (!res.ok) throw new Error('Failed to fetch WordPress posts');
    const data = await res.json();
    isUsingDummy = false;
    return {
      source: 'wp',
      data
    };
  } catch (error) {
    console.warn('[Fallback] Loading local dummy posts');
    isUsingDummy = true;
    return {
      source: 'dummy',
      data: blogDummyData
    };
  }
}

// ✅ Load single post by ID
export async function fetchPost(id) {
  if (isUsingDummy) {
    const found = blogDummyData.find((item) => item.id === id);
    if (!found) throw new Error('Dummy post not found');
    return found;
  }

  const res = await fetch(`${API_URL}/wp/v2/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch WordPress post');
  return await res.json();
}

// ✅ Update a post (WordPress or dummy JSON file)
export async function updatePost(id, newData, token) {
  if (isUsingDummy) {
    try {
      const index = blogDummyData.findIndex((v) => v.id === id);
      if (index === -1) throw new Error('Dummy post not found');

      const updated = {
        ...blogDummyData[index],
        title: { rendered: newData.title },
        content: { rendered: newData.content }
      };

      blogDummyData[index] = updated;
      await fs.writeFile(DUMMY_DATA_PATH, JSON.stringify(blogDummyData, null, 2));

      return updated;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update dummy post');
    }
  }

  const res = await fetch(`${API_URL}/wp/v2/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newData)
  });

  if (!res.ok) throw new Error('Failed to update WordPress post');
  return await res.json();
}
