// /app/api/statistics/top-products/route.js

import { NextResponse } from "next/server";

// Protect route: only allow GET
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || 5;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/reports/top_sellers?per_page=${limit}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Basic ${btoa(
            `${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
          )}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`WooCommerce API error: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Top Products Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch top products" }),
      { status: 500 }
    );
  }
}
