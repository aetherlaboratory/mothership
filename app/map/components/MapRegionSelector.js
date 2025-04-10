"use client";

import React from "react";
import {
  Flag,
  Globe,
  Globe2,
  // Fallback to reusing icons for east/west until custom SVGs or alt icons added
} from "lucide-react";
import clsx from "clsx";

const mapRegions = [
  { id: "usa", label: "USA", icon: <Flag size={18} />, color: "bg-blue-500" },
  { id: "world", label: "World", icon: <Globe size={18} />, color: "bg-purple-500" },
  { id: "west", label: "Western", icon: <Globe2 size={18} />, color: "bg-green-500" },
  { id: "east", label: "Eastern", icon: <Globe size={18} />, color: "bg-yellow-500" }, // reused
];

const MapRegionSelector = ({ activeRegion, setActiveRegion }) => {
  return (
    <div className="fixed left-6 top-1/3 flex flex-col gap-3 z-30">
      {mapRegions.map((region) => {
        const isActive = activeRegion === region.id;

        return (
          <button
            key={region.id}
            onClick={() => setActiveRegion(region.id)}
            className={clsx(
              "w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all",
              isActive ? "bg-blue-600 text-white" : `${region.color} opacity-80 hover:opacity-100 text-white`
            )}
            title={region.label}
          >
            {region.icon}
          </button>
        );
      })}
    </div>
  );
};

export default MapRegionSelector;
