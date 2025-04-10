"use client";
import { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import CartCounter from "../cart/CartCounter";
import RandomProductLink from "./RandomProductLink";
import AuthStatusIcon from "../components/AuthStatusIcon";
import LogoutButton from "../components/LogoutButton";
import { navItems } from "./NavItems";
import { SearchIcon } from "lucide-react";
import { triggerSearchToggle } from "../hooks/useSearchToggle"; // ✅ added

const DesktopMenu = () => {
  const { totalItems } = useCart();
  const [cartCount, setCartCount] = useState(totalItems);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleCartUpdate = () => setCartCount(totalItems);
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [totalItems]);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4 z-40 relative w-full hidden lg:block">
      <div className="flex justify-center space-x-6">
        {navItems.map((menu) => (
          <div key={menu.label} className="relative dropdown-container">
            <button
              onClick={() => toggleDropdown(menu.label.toLowerCase())}
              className="px-4 py-2 hover:bg-gray-700 rounded"
            >
              {menu.label}
            </button>
            {openDropdown === menu.label.toLowerCase() && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded z-10">
                {menu.children.map((item) => {
                  if (item.label === "Cart") {
                    return (
                      <a key={item.label} href={item.href} className="block px-4 py-2 hover:bg-gray-200">
                        Cart <CartCounter />
                      </a>
                    );
                  }
                  if (item.label === "Checkout") {
                    return (
                      <a key={item.label} href={item.href} className="block px-4 py-2 hover:bg-gray-200">
                        {item.label}
                      </a>
                    );
                  }
                  if (item.label === "Downloads") {
                    return (
                      <div key="random-product-link">
                        <a href={item.href} className="block px-4 py-2 hover:bg-gray-200">Downloads</a>
                        <RandomProductLink />
                      </div>
                    );
                  }
                  if (item.label === "Logout") {
                    return <LogoutButton key="logout-btn" />;
                  }
                  return (
                    <a key={item.label} href={item.href} className="block px-4 py-2 hover:bg-gray-200">
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute flex gap-6 xl:gap-12 top-6 right-5 z-50">
        <SearchIcon
          className="text-white hover:text-blue-500 cursor-pointer"
          onClick={triggerSearchToggle} // ✅ toggles global state
        />
        <AuthStatusIcon />
      </div>
    </nav>
  );
};

export default DesktopMenu;
