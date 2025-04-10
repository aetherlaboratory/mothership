'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import MapFilters from "@/app/map/components/MapFilters";
import MapRegionSelector from "@/app/map/components/MapRegionSelector";
const WorldMapView = dynamic(() => import("@/app/map/components/WorldMapView"), { ssr: false });

export default function MapPage() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeRegion, setActiveRegion] = useState("usa");

  return (
    <div>
      <h1 className="text-3xl text-gray-600 font-bold my-3 text-center relative z-30">Interactive Map Dashboard</h1>

      <MapRegionSelector activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      <MapFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

<div className="absolute top-0 w-full z-10">
      <WorldMapView activeRegion={activeRegion} />
      </div>
    </div>
  );
}
