// app/products/[slug]/page.js

import axios from 'axios';
import SingleProduct from './SingleProduct';

// Server Component: Fetches product data at request time
export default async function ProductPage({ params }) {
  // Await params to unwrap the dynamic route parameters (fixes the error)
  const { slug } = await params; 

  // Fetch product data from WooCommerce using the slug
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_WP}/wc/v3/products/slug/${slug}`,
    {
      auth: {
        username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
        password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
      },
    }
  );
  const product = res.data;

  if (!product) {
    return <p>Product not found.</p>;
  }

  // Pass the product data to the client component for interactive features
  return (
    <div>
      <SingleProduct product={product} />
    </div>
  );
}
