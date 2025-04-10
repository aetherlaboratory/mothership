"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ECommerceTab from "./tabs/Ecommerce";

const SettingsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ecommerce");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    console.log("🔍 Checking stored token:", token);

    if (!token) {
      console.warn("🔴 No user token found, redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return;
    }

    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <p className="text-center mt-10 text-gray-500">🔐 Redirecting to login...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">⚙️ Settings</h2>

      <div className="flex space-x-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("ecommerce")}
          className={`px-4 py-2 font-medium ${
            activeTab === "ecommerce" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"
          }`}
        >
          🛒 eCommerce
        </button>

        {/* Add more tab buttons here */}
      </div>

      <div>
        {activeTab === "ecommerce" && <ECommerceTab />}
      </div>
    </div>
  );
};

export default SettingsPage;
