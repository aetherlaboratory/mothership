// app/lib/downloads.js

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL;
const consumerKey = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;

export async function fetchDownloadableProducts() {
  try {
    const response = await axios.get(
      `${baseURL}/wp-json/wc/v3/products`,
      {
        params: {
          consumer_key: consumerKey,
          consumer_secret: consumerSecret,
          per_page: 50,
          downloadable: true,
        },
      }
    );

    const products = response.data;

    const downloadableProducts = products
      .filter(product => product.downloadable === true)
      .map(product => ({
        id: product.id,
        name: product.name,
        image: product.images?.[0]?.src || null, // ✅ thumbnail
        downloads: product.downloads.map((file) => ({
          name: file.name,
          url: file.file,
        })),
      }));

    return downloadableProducts;

  } catch (error) {
    console.error("❌ Error fetching downloadable products:", error);
    return [];
  }
}
