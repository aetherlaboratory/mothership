import { buffer } from 'micro'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const sig = req.headers['stripe-signature']
  const buf = await buffer(req)

  let event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // ✅ Handle events here
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    console.log('✅ Stripe checkout completed:', session)
    // You can update user roles or store subscription metadata here
  }

  res.json({ received: true })
}
