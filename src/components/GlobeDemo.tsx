
"use client";

import { World } from "@/components/ui/globe";

const globeConfig = {
  pointSize: 1,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#38bdf8",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 1,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 37.7595,
    endLng: -122.4367,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 37.5665,
    endLng: 126.978,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
];

export default function GlobeDemo() {
  return (
    <div className="w-full h-full flex justify-center items-center filter drop-shadow-[0_20px_20px_rgba(128,128,128,0.3)]">
      <div style={{ width: 600, height: 600 }}>
        <World globeConfig={globeConfig} data={sampleArcs} />
      </div>
    </div>
  );
}

export { GlobeDemo };
