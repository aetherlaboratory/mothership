"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "react-use-cart"; // ✅ Import useCart
import CartCounter from "../cart/CartCounter"; // ✅ Import CartCounter
import RandomProductLink from "./RandomProductLink";
import AuthStatusIcon from "../components/AuthStatusIcon";
import LogoutButton from '../components/LogoutButton';
import { X, ChevronLeft } from "lucide-react";
import { navItems } from "./NavItems"; // ✅ relative path from same folder


const MobileNavModal = ({ isOpen, onClose }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  if (!isOpen) return null;

  const handleBack = () => setSelectedMenu(null);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 text-white overflow-y-auto min-h-screen px-6 py-4 transition-all duration-300">
      {/* Close button */}
      <div className="flex justify-between items-center mb-6">
        {selectedMenu && (
          <button onClick={handleBack} className="flex items-center text-sm">
            <ChevronLeft className="mr-1" /> Back
          </button>
        )}
        <button onClick={onClose}>
          <X size={28} />
        </button>
      </div>

      {!selectedMenu ? (
        // Top-level Menu
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <button
                  onClick={() => setSelectedMenu(item)}
                  className="w-full flex items-center justify-between text-left hover:text-gray-300"
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={20} />
                    {item.label}
                  </div>
                  <ChevronLeft className="rotate-180" size={16} />
                </button>
              ) : (
                <Link href={item.href} className="flex items-center gap-2 hover:text-gray-300">
                  <item.icon size={20} />
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : (
        // Submenu
        <ul className="space-y-4">
          {selectedMenu.children.map((sub) => (
            <li key={sub.label}>
              <Link href={sub.href} className="flex items-center gap-2 hover:text-gray-300">
                {sub.icon && <sub.icon size={20} />}
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MobileNavModal;
