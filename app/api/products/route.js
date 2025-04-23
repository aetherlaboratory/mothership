// app/api/products/route.js

import axios from 'axios';

export async function GET() {
  try {
    const url = `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/products?per_page=100`;

    console.log("🌐 Requesting:", url);
    console.log("🔐 Using Key:", process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY?.slice(0, 10), "...");

    const response = await axios.get(url, {
      auth: {
        username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
        password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
      },
    });

    const allProducts = response.data;

    const filtered = allProducts.filter(product => {
      const isDownloadable = product.downloadable === true;

      const tags = product.tags || [];
      const hasExcludedTag = tags.some(tag => {
        const slug = tag?.slug?.toLowerCase?.() || '';
        return slug === 'subscription-plan' || slug.includes('ticket');
      });

      const shouldInclude = !isDownloadable && !hasExcludedTag;

      console.log(`🧪 [${product.name}]`, {
        isDownloadable,
        hasExcludedTag,
        shouldInclude,
      });

      return shouldInclude;
    });

    console.log("🎯 Products after filtering:", filtered.length);

    return new Response(JSON.stringify(filtered), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("❌ WooCommerce API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return new Response(
      JSON.stringify({
        error: error.response?.data || error.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
