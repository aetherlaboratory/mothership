// app/api/statistics/orders/route.js

import { NextResponse } from "next/server";

// This handler responds to GET requests to /api/statistics/orders
export async function GET() {
  try {
    // Fetch WooCommerce orders
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/orders`,
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

    const orders = await response.json();

    // Return the number of orders as count
    return NextResponse.json({ count: orders.length });
  } catch (error) {
    console.error("Error fetching WooCommerce orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
