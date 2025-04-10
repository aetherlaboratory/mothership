// components/map/GeoStyles.js

const defaultGeoStyle = {
    fill: "#E5E7EB",
    stroke: "#9CA3AF",
    strokeWidth: 0.5,
    outline: "none",
  };
  
  const hoverGeoStyle = {
    fill: "#60A5FA",
    stroke: "#2563EB",
    outline: "none",
  };
  
  const pressedGeoStyle = {
    fill: "#2563EB",
    outline: "none",
  };
  
  export const mapStyles = {
    default: defaultGeoStyle,
    hover: hoverGeoStyle,
    pressed: pressedGeoStyle,
  };
  