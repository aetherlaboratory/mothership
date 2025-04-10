"use client";

import { useCart } from "react-use-cart";

const CartCounter = () => {
  const { totalItems } = useCart(); // ✅ Only rely on Add to Cart

  return (
    <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
      {totalItems}
    </span>
  );
};

export default CartCounter;
