// app/crud/fetch/videoFetch.js
'use server';

import videoDummyData from '../../dummy-data/videoDummyData.json';
import fs from 'fs/promises';
import path from 'path';

const API_URL = process.env.NEXT_PUBLIC_API_WP;
const DUMMY_DATA_PATH = path.join(process.cwd(), 'app/dummy-data/videoDummyData.json');

let isUsingDummy = false;

// ✅ Load all videos (WordPress first, fallback to dummy)
export async function fetchVideos() {
  try {
    const res = await fetch(`${API_URL}/wp/v2/films?per_page=20`);
    if (!res.ok) throw new Error('Failed to fetch WordPress films');
    const data = await res.json();
    isUsingDummy = false;
    return data;
  } catch (error) {
    console.warn('[Fallback] Loading local dummy videos');
    isUsingDummy = true;
    return videoDummyData;
  }
}

// ✅ Load single video by ID
export async function fetchVideo(id) {
  if (isUsingDummy) {
    const found = videoDummyData.find((item) => item.id === id);
    if (!found) throw new Error('Dummy video not found');
    return found;
  }

  const res = await fetch(`${API_URL}/wp/v2/films/${id}`);
  if (!res.ok) throw new Error('Failed to fetch WordPress video');
  return await res.json();
}

// ✅ Update a video (WordPress or dummy JSON file)
export async function updateVideo(id, newData, token) {
  if (isUsingDummy) {
    try {
      const index = videoDummyData.findIndex((v) => v.id === id);
      if (index === -1) throw new Error('Dummy video not found');

      const updated = {
        ...videoDummyData[index],
        title: { rendered: newData.title },
        content: { rendered: newData.content }
      };

      videoDummyData[index] = updated;
      await fs.writeFile(DUMMY_DATA_PATH, JSON.stringify(videoDummyData, null, 2));

      return updated;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update dummy video');
    }
  }

  const res = await fetch(`${API_URL}/wp/v2/films/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newData)
  });

  if (!res.ok) throw new Error('Failed to update WordPress video');
  return await res.json();
}
