// app/api/tickets/by-event/route.js
import { NextResponse } from 'next/server';


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');

    console.log('🔍 Incoming request for eventId:', eventId);

    if (!eventId) {
      console.warn('❌ Missing eventId in query params');
      return NextResponse.json({ error: 'Missing eventId' }, { status: 400 });
    }

    const wooURL = `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/products?per_page=100`;
    const authHeader =
      'Basic ' +
      Buffer.from(
        `${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
      ).toString('base64');

    console.log('🌐 Fetching WooCommerce products from:', wooURL);

    const res = await fetch(wooURL, {
      headers: {
        Authorization: authHeader,
      },
    });

    const products = await res.json();

    if (!res.ok) {
      console.error('❌ WooCommerce fetch failed:', products);
      return NextResponse.json({ error: products }, { status: res.status });
    }

    const filtered = products.filter((p) => {
      const tagNames = (p.tags || []).map((t) => t.name);
      return tagNames.includes('ticket') && tagNames.includes(`event-${eventId}`);
    });

    console.log(`✅ Found ${filtered.length} tickets for event-${eventId}`);

    return NextResponse.json(filtered);
  } catch (err) {
    console.error('🔥 API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
