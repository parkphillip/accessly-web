
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

const World = React.lazy(() => import("./ui/globe").then(module => ({ default: module.World })));

const GlobePlaceholder = () => (
  <div className="w-full h-full bg-subtle-gray rounded-full animate-pulse" />
);

export function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#2c5282", // brand-navy
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.3,
  };
  
  const colors = ["#e07a5f", "#81b29a", "#f2cc8f", "#6d6875"];
  
  const sampleArcs = [
    { order: 1, startLat: -19.88, startLng: -43.95, endLat: -22.90, endLng: -43.17, arcAlt: 0.1, color: colors[0] },
    { order: 2, startLat: 1.35, startLng: 103.81, endLat: 35.67, endLng: 139.65, arcAlt: 0.2, color: colors[1] },
    { order: 3, startLat: -33.86, startLng: 151.20, endLat: 22.31, endLng: 114.16, arcAlt: 0.3, color: colors[2] },
    { order: 4, startLat: 51.50, startLng: -0.12, endLat: 48.85, endLng: -2.35, arcAlt: 0.1, color: colors[3] },
    { order: 5, startLat: 34.05, startLng: -118.24, endLat: 48.85, endLng: -2.35, arcAlt: 0.2, color: colors[0] },
    { order: 6, startLat: 37.56, startLng: 126.97, endLat: 35.67, endLng: 139.65, arcAlt: 0.1, color: colors[1] },
  ];

  return (
    <div className="w-full h-full">
      <Suspense fallback={<GlobePlaceholder />}>
        <Canvas>
          <World data={sampleArcs} globeConfig={globeConfig} />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default GlobeDemo;
