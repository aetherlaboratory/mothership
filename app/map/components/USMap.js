// app/map/components/USMap.js
"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { mapStyles } from "@/app/map/components/GeoStyles";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const USMap = ({ activeFilters = [], activeRegion }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredByState, setFilteredByState] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load customer data
  useEffect(() => {
    if (activeRegion === "usa") {
      setIsLoading(true);
      fetch("/dummy-data/maps/NA.json")
        .then((res) => res.json())
        .then((data) => {
          console.log("📥 Loaded Customer Data:", data);
          setCustomers(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("❌ Error loading data:", err);
          setIsLoading(false);
        });
    }
  }, [activeRegion]);

  // Filter customers (just for 'products' filter for now)
  useEffect(() => {
    if (!customers.length) return;

    const result = {};

    customers.forEach((cust) => {
      const match = activeFilters.includes("products");
      if (match && cust.activeFilters.includes("products")) {
        const state = cust.location.state;
        if (!result[state]) result[state] = { totalCustomers: 0, totalProducts: 0 };
        result[state].totalCustomers += 1;
        result[state].totalProducts += cust.engagement.productsOwned || 0;
      }
    });

    console.log("📊 Products Filtered Summary:", result);
    setFilteredByState(result);
  }, [customers, activeFilters]);

  return (
    <div style={{ width: "100%", margin: "0 auto", position: "relative" }}>
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white/70 z-10">
          <div className="text-lg font-semibold text-gray-700">Loading map data...</div>
        </div>
      )}

      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              const summary = filteredByState[stateName];
              const show = summary && summary.totalCustomers > 0;
              const centroid = geoCentroid(geo);

              return (
                <g key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    style={mapStyles}
                    onClick={() => console.log("🗺️ Clicked State:", stateName)}
                  />
                  {show && (
                    <Marker coordinates={centroid}>
                      <text
                        textAnchor="middle"
                        fontSize={10}
                        fill="#111827"
                        style={{ pointerEvents: "none" }}
                      >
                        📦 {summary.totalProducts}
                      </text>
                    </Marker>
                  )}
                </g>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default USMap;
