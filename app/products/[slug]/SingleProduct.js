// app/products/[slug]/SingleProduct.js
'use client'; // This is a client component for interactivity

import { useCart } from 'react-use-cart';

export default function SingleProduct({ product }) {
  const { addItem } = useCart();

  // Function to handle "Add to Cart" and dispatch notification
  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    window.dispatchEvent(
      new CustomEvent("notify", { 
        detail: { message: `🛒 Added ${product.name} to cart!`, type: "success" } 
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">{product.name}</h2>
      <img
        src={product.images}
        alt={product.name}
        className="w-full h-80 object-cover mb-2 rounded"
      />
      <p>{product.description || "No description available."}</p>
      <p className="font-semibold text-lg">${product.price}</p>
      <div className="flex justify-center gap-4 mt-4">
        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}
