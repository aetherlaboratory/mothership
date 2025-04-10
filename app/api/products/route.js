import axios from 'axios';

export async function GET() {
  try {
    const url = `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/products`;

    console.log("🌐 Requesting:", url);
    console.log("🔐 Using Key:", process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY?.slice(0, 10), "...");

    const response = await axios.get(url, {
      auth: {
        username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
        password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
      },
    });

    // 🧼 Exclude downloadable products
    const nonDownloadableProducts = response.data.filter(product => !product.downloadable);

    return new Response(JSON.stringify(nonDownloadableProducts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("❌ WooCommerce API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return new Response(
      JSON.stringify({
        error: error.response?.data || error.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
