// app/api/statistics/sales/route.js

import { NextResponse } from "next/server";

// GET handler for /api/statistics/sales
export async function GET() {
  try {
    // Calculate the ISO date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const isoDate = sevenDaysAgo.toISOString();

    // Build WooCommerce orders API URL with date filter
    const url = `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/orders?after=${isoDate}`;

    // Fetch recent orders using WooCommerce API keys
    const response = await fetch(url, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
          ).toString("base64"),
      },
    });

    const data = await response.json();

    // Return the count of orders placed in the last 7 days
    return NextResponse.json({ salesLast7Days: Array.isArray(data) ? data.length : 0 });
  } catch (error) {
    console.error("Error fetching recent sales:", error);
    return NextResponse.json({ error: "Unable to fetch sales data" }, { status: 500 });
  }
}
