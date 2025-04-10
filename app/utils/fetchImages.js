
// utils/fetchImages.js

// This function fetches media post data (title, content, thumbnail, gallery images)
// from the custom WordPress REST API for a given post type: "photos" or "2dart".

export async function fetchImages(postType) {
    try {
      let endpoint = '';
  
      // Use dynamic environment variable to support dev/network/prod
      const baseURL = process.env.NEXT_PUBLIC_API_WP;
  
      if (postType === 'photo') {
        endpoint = `${baseURL}/custom/v1/photos`;
      } else if (postType === '2dart') {
        endpoint = `${baseURL}/custom/v1/2dart`;
      } else {
        throw new Error(`Unsupported post type: ${postType}`);
      }
  
      const res = await fetch(endpoint);
  
      if (!res.ok) {
        throw new Error(`Failed to fetch ${postType} data`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`fetchImages error (${postType}):`, error);
      return [];
    }
  }
  