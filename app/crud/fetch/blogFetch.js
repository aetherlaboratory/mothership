'use server';

// ==============================
// /app/crud/fetch/blogFetch.js
// Handles GET and PUT requests to WordPress REST API for blog posts
// ==============================

const API_URL = process.env.NEXT_PUBLIC_API_WP;

// ✅ Load all blog posts from WordPress
export async function fetchPosts() {
  try {
    const res = await fetch(`${API_URL}/wp/v2/posts?per_page=20&_embed`);
    if (!res.ok) throw new Error('Failed to fetch WordPress posts');
    const data = await res.json();
    return {
      source: 'wp',
      data
    };
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    throw error;
  }
}

// ✅ Load a single blog post by ID
export async function fetchPost(id) {
  const res = await fetch(`${API_URL}/wp/v2/posts/${id}?_embed`);
  if (!res.ok) throw new Error('Failed to fetch WordPress post');
  return await res.json();
}

// ✅ Update a blog post (with logging for debugging)
export async function updatePost(id, newData, token) {
  console.log('📤 Updating post:', { id });
  console.log('📦 Payload:', JSON.stringify(newData, null, 2));
  console.log('🔐 Token:', token ? `${token.slice(0, 10)}...` : 'No token');

  const res = await fetch(`${API_URL}/wp/v2/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newData)
  });

  if (!res.ok) {
    const errorBody = await res.json();
    console.error('❌ Failed to update post:', errorBody);
    throw new Error('Failed to update WordPress post');
  }

  return await res.json();
}
