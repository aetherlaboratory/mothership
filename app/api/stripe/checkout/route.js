// app/api/stripe/checkout/route.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const line_items = body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(parseFloat(item.price) * 100), // amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${body.origin}/success`,
      cancel_url: `${body.origin}/checkout`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe Checkout Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
