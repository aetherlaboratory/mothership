// app/api/statistics/revenue/route.js

import { NextResponse } from "next/server";

// This handler calculates the total revenue from all WooCommerce orders
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/orders?per_page=100`,
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

    // Sum up the revenue from each order
    const totalRevenue = orders.reduce((acc, order) => {
      return acc + parseFloat(order.total);
    }, 0);

    return NextResponse.json({ totalRevenue });
  } catch (error) {
    console.error("Error fetching revenue:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}
