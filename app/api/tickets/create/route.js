// app/tickets/api/create.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const {
    name,
    price,
    description,
    perks = '',
    tags = [],
  } = body

  const wooURL = `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/products`

  try {
    const res = await fetch(wooURL, {
      method: 'POST',
      headers: {
        'Authorization':
          'Basic ' +
          Buffer.from(
            `${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
          ).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        regular_price: price.toString(),
        description,
        short_description: perks,
        type: 'simple',
        tags: tags.map((tag) => ({ name: tag })),
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
