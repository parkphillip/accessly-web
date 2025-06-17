
"use client";
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

// Based on: https://github.com/shuding/cobe

function GlobeDemo({ size = 600 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const globeRef = useRef<any>(null);
  const targetPhiRef = useRef(0);
  const phiRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create globe with optimized settings
    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(2, window.devicePixelRatio), // Limit pixel ratio for performance
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.3,
      dark: 0.85,
      diffuse: 3,
      mapSamples: 12000, // Reduced for better performance
      mapBrightness: 12,
      baseColor: [1, 1, 1],
      markerColor: [0.7, 0.7, 0.7],
      glowColor: [0.17, 0.32, 0.51],
      markers: [
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
      onRender: (state: any) => {
        // Reduce animation frequency to prevent scroll interference
        targetPhiRef.current += 0.001;
        phiRef.current += (targetPhiRef.current - phiRef.current) * 0.03;
        state.phi = phiRef.current;
      },
    });

    // Optimized mouse interaction that doesn't interfere with page scroll
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const deltaX = e.clientX - lastX;
      targetPhiRef.current += deltaX * 0.008; // Reduced sensitivity
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      isDragging = false;
    };

    // Use capture phase to prevent event bubbling
    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', handleMouseDown, { capture: true, passive: false });
    canvas.addEventListener('mousemove', handleMouseMove, { capture: true, passive: false });
    canvas.addEventListener('mouseup', handleMouseUp, { capture: true, passive: false });

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      if (canvas) {
        canvas.removeEventListener('mousedown', handleMouseDown, { capture: true });
        canvas.removeEventListener('mousemove', handleMouseMove, { capture: true });
        canvas.removeEventListener('mouseup', handleMouseUp, { capture: true });
      }
    };
  }, [size]);

  return (
    <div 
      className="globe-container w-full flex justify-center items-center"
      style={{
        minHeight: size,
        width: '100%',
        contain: 'layout style paint', // Optimize rendering
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ 
          width: size, 
          height: size, 
          maxWidth: "100%", 
          aspectRatio: 1,
          willChange: 'transform',
          pointerEvents: 'auto',
          touchAction: 'none', // Prevent touch scroll interference
        }}
        className="[filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.4))] focus:outline-none"
      />
    </div>
  );
}

export default React.memo(GlobeDemo);
