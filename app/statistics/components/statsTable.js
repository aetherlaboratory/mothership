"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTopSellingProducts } from "../utils/fetchWooStats";

export default function StatsTable() {
  // ✅ Fetch top-selling products using TanStack Query v5 syntax
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topProducts"],
    queryFn: () => getTopSellingProducts(5),
  });

  // ✅ Display loading state
  if (isLoading) {
    return (
      <div className="p-4 text-muted-foreground text-sm">Loading top products...</div>
    );
  }

  // ✅ Display error state
  if (isError || !Array.isArray(data)) {
    return (
      <div className="p-4 text-destructive text-sm">Error loading product stats.</div>
    );
  }

  // ✅ Fallback for empty product list
  if (data.length === 0) {
    return (
      <div className="p-4 text-muted-foreground text-sm">
        No product sales found in the last 7 days.
      </div>
    );
  }

  // ✅ Render table of top-selling products
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-border rounded-md">
        <thead className="bg-muted">
          <tr>
            <th className="text-left py-2 px-3 font-semibold">Product</th>
            <th className="text-left py-2 px-3 font-semibold">Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-t border-border hover:bg-muted transition-colors"
            >
              <td className="py-2 px-3 font-medium">{item.name}</td>
              <td className="py-2 px-3">{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
