// app/api/statistics/products/route.js

import { NextResponse } from "next/server";

// This handler responds to GET requests to /api/statistics/products
export async function GET() {
  try {
    // Fetch WooCommerce products using environment variables for credentials
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/products`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
            ).toString("base64"),
        },
      }
    );

    const products = await response.json();

    // Return the number of products as count
    return NextResponse.json({ count: products.length });
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
