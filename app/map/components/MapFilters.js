"use client";

import React, { useState } from "react";
import clsx from "clsx";

// Filter button definitions
const filters = [
  { id: "products", label: "Products", color: "bg-pink-500" },
  { id: "downloads", label: "Downloads", color: "bg-purple-500" },
  { id: "users", label: "Users", color: "bg-blue-500" },
  { id: "music", label: "Music", color: "bg-indigo-500" },
  { id: "videos", label: "Videos", color: "bg-red-500" },
  { id: "subscriptions", label: "Subscriptions", color: "bg-yellow-500" },
  { id: "events", label: "Events", color: "bg-green-500" },
  { id: "appointments", label: "Appointments", color: "bg-teal-500" },
];

const MapFilters = ({ activeFilters, setActiveFilters }) => {
  const toggleFilter = (id) => {
    if (activeFilters.includes(id)) {
      setActiveFilters(activeFilters.filter((item) => item !== id));
    } else {
      setActiveFilters([...activeFilters, id]);
    }
  };

  return (
    <div className="map-filters rounded-full drop-shadow-2xl bg-glass-light px-2 py-3 fixed z-30 right-0 left-0 md:top-12 md:mt-20 mx-auto flex flex-wrap gap-2 justify-center mb-6">
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        return (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={clsx(
              "px-3 py-1 text-sm rounded-full text-white font-medium transition-all",
              isActive ? "bg-blue-600" : `${filter.color} opacity-80 hover:opacity-100`
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default MapFilters;
