"use client";

import dynamic from "next/dynamic";
import { CartProvider } from "react-use-cart";

// ✅ Use dynamic import to disable SSR
const DynamicCart = dynamic(() => import("../components/Cart"), { ssr: false });

const CartPage = () => {
  return (
    <CartProvider>
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <DynamicCart />
      </div>
    </CartProvider>
  );
};

export default CartPage;
