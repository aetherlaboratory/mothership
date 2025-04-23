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
        const response = await axios.get('/api/products');
        console.log("✅ Filtered Products Received:", response.data);
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
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded-lg shadow bg-white">
              <Link href={`/products/${product.slug}`}>
                <img
                  src={product.images[0]?.src}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-4 rounded cursor-pointer"
                />
              </Link>

              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
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
    className="w-full sm:w-1/2 bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition"
  >
    🛒 Add to Cart
  </button>

  <Link href={`/products/${product.slug}`} className="w-full sm:w-1/2">
    <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded text-sm border border-gray-300 hover:bg-gray-200 transition">
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
