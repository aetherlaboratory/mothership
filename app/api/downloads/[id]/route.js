// app/api/downloads/[id]/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';

// 🔐 WooCommerce keys from environment variables
const baseURL = process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL;
const consumerKey = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;

// 📦 GET /api/downloads/[id]
export async function GET(request, { params }) {
  const { id } = params;

  try {
    // 📡 Fetch product details from WooCommerce
    const response = await axios.get(`${baseURL}/wp-json/wc/v3/products/${id}`, {
      params: {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
      },
    });

    const product = response.data;

    // ❌ Not downloadable?
    if (!product.downloadable || !product.downloads || product.downloads.length === 0) {
      return NextResponse.json(
        { error: "Product is not a downloadable item." },
        { status: 400 }
      );
    }

    // ✅ Return file info
    const downloads = product.downloads.map(file => ({
      name: file.name,
      url: file.file,
    }));

    return NextResponse.json({ id: product.id, name: product.name, downloads });

  } catch (error) {
    console.error("❌ Download route error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve product or download info." },
      { status: 500 }
    );
  }
}
