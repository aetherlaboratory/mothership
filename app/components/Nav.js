"use client";
import { useState, useEffect } from "react";
import { Menu, X, SearchIcon } from "lucide-react";
import MobileNavModal from "../components/MobileNavModal";
import DesktopMenu from "../components/DesktopMenu"; // ✅ Import desktop version

const Nav = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      {/* Mobile menu toggle (shown only on md and down) */}
      <button
  className="block lg:hidden relative top-4 left-4 z-50 p-2 rounded bg-gray-800 text-white"
  onClick={() => setMobileNavOpen((prev) => !prev)}
>
  {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
</button>


      <MobileNavModal isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <DesktopMenu /> {/* 🖥️ Only visible on lg+ screens */}
    </>
  );
};

export default Nav;
