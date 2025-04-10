// ✅ Cleaned-up WesternHemisphereMap.js (no loading, ready for markers)
"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { mapStyles } from "@/app/map/components/GeoStyles";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WesternHemisphereMap = ({ activeFilters = [], activeRegion }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (activeRegion === "west") {
      fetch("/dummy-data/maps/NA.json")
        .then((res) => res.json())
        .then((data) => {
          console.log("🧭 Loaded NA Customers:", data);
          setCustomers(data);
        })
        .catch((err) => console.error("❌ Fetch error:", err));
    }
  }, [activeRegion]);

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ rotate: [90, -15, 0], scale: 200 }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} style={mapStyles} />
            ))
          }
        </Geographies>

        {customers.map((cust) => {
          const show = activeFilters.includes("products") && cust.activeFilters.includes("products");
          if (!show) return null;

          return (
            <Marker
              key={cust.id}
              coordinates={[cust.location.lng, cust.location.lat]}
            >
              <circle r={4} fill="#2563EB" stroke="#1D4ED8" strokeWidth={1} />
              <text
                textAnchor="middle"
                y={-10}
                fontSize={9}
                fill="#111827"
                className="pointer-events-none"
              >
                📦 {cust.engagement.productsOwned}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
};

export default WesternHemisphereMap;
