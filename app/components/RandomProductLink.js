"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function RandomProductLink() {
  const [randomSlug, setRandomSlug] = useState(null); // Holds the randomly chosen product slug
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products from WooCommerce using consumer key/secret
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/products`,
          {
            auth: {
              username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
              password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
            },
          }
        );
        const products = response.data;
        // Select a random product from the list if available
        if (products && products.length > 0) {
          const randomIndex = Math.floor(Math.random() * products.length);
          setRandomSlug(products[randomIndex].slug);
        } else {
          setError("No products found.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Display loading or error messages if needed
  if (loading) return <p className="px-4 py-2">Loading random product...</p>;
  if (error) return <p className="px-4 py-2 text-red-500">{error}</p>;
  if (!randomSlug) return <p className="px-4 py-2">No products available.</p>;

  // Use the new Link component without an <a> child.
  return (
    <Link
      href={`/products/${randomSlug}`}
      className="block px-4 py-2 hover:bg-gray-200"
    >
      Single Product (Random)
    </Link>
  );
}
