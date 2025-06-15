
"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";

// Based on: https://github.com/shuding/cobe

export default function GlobeDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let targetPhi = 0;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      // Adjust target rotation based on scroll. The multiplier controls sensitivity.
      targetPhi += scrollDelta * 0.003;
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 0.85,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 12,
      baseColor: [1, 1, 1], // White for landmass dots
      markerColor: [0.7, 0.7, 0.7], // Neutral grey for markers
      glowColor: [0.1, 0.4, 0.8], // Blue tint for the globe
      markers: [
        // Extracted from previous sample data
        { location: [-19.885592, -43.951191], size: 0.05 },
        { location: [28.6139, 77.209], size: 0.05 },
        { location: [1.3521, 103.8198], size: 0.05 },
        { location: [51.5072, -0.1276], size: 0.05 },
        { location: [-33.8688, 151.2093], size: 0.05 },
        { location: [34.0522, -118.2437], size: 0.05 },
        { location: [37.5665, 126.978], size: 0.05 },
        { location: [40.7128, -74.006], size: 0 },
        { location: [37.7595, -122.4367], size: 0 },
      ],
      onRender: (state) => {
        // Add a slow, constant rotation to the target.
        targetPhi += 0.002;
        // Smoothly interpolate to the target rotation, which is affected by both scrolling and the constant rotation.
        phi += (targetPhi - phi) * 0.05;
        state.phi = phi;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
        className="[filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.4))]"
      />
    </div>
  );
}

export { GlobeDemo };
