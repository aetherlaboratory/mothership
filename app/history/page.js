"use client";

import { useEffect, useState } from "react";
import CartHistory from "./CartHistory"; // ✅ Import Cart History tab

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState("Cart");
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    // ✅ Dynamically detect available history sections (for now, just "Cart")
    setTabs(["Cart"]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">History</h2>

      {/* Dynamic Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 ${
              activeTab === tab ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"
            }`}
          >
            {tab} History
          </button>
        ))}
      </div>

      {/* Dynamic Tab Content */}
      <div className="mt-4">
        {activeTab === "Cart" && <CartHistory />}
      </div>
    </div>
  );
};

export default HistoryPage;
