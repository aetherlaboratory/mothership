import Stripe from 'stripe'

// 🔐 Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function GET(req) {
  try {
    // 🧾 Fetch the 10 most recent checkout sessions
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
      expand: ['data.customer_details']
    })

    return new Response(JSON.stringify(sessions.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('❌ Failed to fetch Stripe sessions:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500
    })
  }
}
