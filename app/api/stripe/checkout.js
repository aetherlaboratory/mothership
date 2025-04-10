// Inside /api/stripe/checkout.js (or .ts)
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  try {
    const { items, origin } = req.body

    // ✅ Get IP from request headers
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket?.remoteAddress ||
      'Unknown'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/thank-you?type=order`,
      cancel_url: `${origin}/cart`,
      // ✅ Save metadata including IP for admin panel
      metadata: {
        ip_address: ip,
        timestamp: new Date().toISOString(),
      },
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('❌ Stripe Checkout Error:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
