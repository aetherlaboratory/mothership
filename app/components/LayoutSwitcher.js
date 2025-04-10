"use client";
import React from "react";

const layouts = [
  { key: "grid", label: "Grid" },
  { key: "list", label: "List" },
  { key: "hero", label: "Hero" },
  { key: "masonry", label: "Masonry" }, // 👈 New Option
];

export default function LayoutSwitcher({ currentLayout, onChange }) {
  return (
    <div className="flex gap-2 justify-center mb-6 flex-wrap">
      {layouts.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-2 rounded-md border ${
            currentLayout === key
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border-blue-600"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
