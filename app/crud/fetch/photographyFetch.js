'use server'

// ==============================
// /app/crud/fetch/photoFetch.js
// Handles GET and PUT requests to WordPress REST API for photo posts
// ==============================
const API_URL = process.env.NEXT_PUBLIC_API_WP;


// Fetch all photo posts
export async function fetchPhotos() {
  const res = await fetch(`${API_URL}/wp/v2/photos?per_page=20`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return await res.json();
}

// Fetch a single photo post by ID
export async function fetchPhoto(id) {
  const res = await fetch(`${API_URL}/wp/v2/photos/${id}`);
  if (!res.ok) throw new Error('Failed to fetch single post');
  return await res.json();
}

// Update a photo post using JWT token
export async function updatePhoto(id, data, token) {
  const res = await fetch(`${API_URL}/wp/v2/photos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update post');
  return await res.json();
}
