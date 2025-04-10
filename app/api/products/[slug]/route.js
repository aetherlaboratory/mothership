// app/api/products/[slug]/route.js

import axios from 'axios';

// Updated signature: 'request' is the first parameter
export async function GET(request, { params }) {
  console.log("Params received:", params); // Log params for debugging

  const { slug } = params; // Extract slug

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is missing" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Construct URL without an extra /wp-json
    const url = `${process.env.NEXT_PUBLIC_API_WP}/wc/v3/products/slug/${slug}`;
    console.log("Requesting URL:", url);

    const response = await axios.get(url, {
      auth: {
        username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
        password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch product" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
