'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "react-use-cart";
import Link from "next/link";
import { registerTask, markTaskDone } from "../loading/loadingManager";
import LoadingStatus from "../loading/components/LoadingStatus";

const ProductsPage = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    registerTask("fetchProducts", 3);

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Now safe
        console.log("✅ WooCommerce Products Retrieved:", response.data);
        setProducts(response.data);
        markTaskDone("fetchProducts");
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products.");
        markTaskDone("fetchProducts");
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <LoadingStatus overlay={true} />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Products</h2>
      {products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded-lg shadow">
              <Link href={`/products/${product.slug}`}>
                <img
                  src={product.images[0]?.src}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2 rounded cursor-pointer"
                />
              </Link>

              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700">${product.price}</p>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                    });

                    window.dispatchEvent(
                      new CustomEvent("notify", {
                        detail: {
                          message: `🛒 Added ${product.name} to cart!`,
                          type: "success",
                        },
                      })
                    );
                  }}
                  className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                  🛒 Add to Cart
                </button>

                <Link href={`/products/${product.slug}`}>
                  <button className="flex-1 bg-gray-300 text-black p-2 rounded hover:bg-gray-400 transition">
                    View More
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;
