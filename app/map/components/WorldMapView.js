// ✅ New: WorldMapView.js (flat map with animated pan + zoom transitions)
"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { mapStyles } from "@/app/map/components/GeoStyles";

// 🌍 World countries TopoJSON
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// 🔭 Define projection targets by region
const views = {
  usa: { center: [-95, 38], scale: 800 },
  west: { center: [-90, 15], scale: 400 },
  east: { center: [60, 25], scale: 400 },
  world: { center: [0, 20], scale: 300 },
};

const ease = (start, end, step, totalSteps) =>
  start + (end - start) * (step / totalSteps);

const WorldMapView = ({ activeRegion }) => {
  const [viewState, setViewState] = useState(views.usa);
  const [currentRegion, setCurrentRegion] = useState("usa");

  useEffect(() => {
    if (!views[activeRegion] || activeRegion === currentRegion) return;

    const from = views[currentRegion];
    const to = views[activeRegion];
    const steps = 30;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step > steps) {
        clearInterval(interval);
        setViewState(to);
        setCurrentRegion(activeRegion);
        return;
      }

      const nextCenter = [
        ease(from.center[0], to.center[0], step, steps),
        ease(from.center[1], to.center[1], step, steps),
      ];
      const nextScale = ease(from.scale, to.scale, step, steps);

      setViewState({ center: nextCenter, scale: nextScale });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [activeRegion, currentRegion]);

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: viewState.center,
          scale: viewState.scale,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={mapStyles}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default WorldMapView;
