"use client";
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

function GlobeDemo({ size = 600 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let targetPhi = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;
    let visible = false;
    let globe: ReturnType<typeof createGlobe> | null = null;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY;
      lastScrollY = y;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          targetPhi += delta * 0.003;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          if (!globe) {
            globe = createGlobe(canvas, {
              devicePixelRatio: 2,
              width: size * 2,
              height: size * 2,
              phi: 0,
              theta: 0.3,
              dark: 0.85,
              diffuse: 3,
              mapSamples: 16000,
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
                { location: [37.7595, -122.4367], size: 0 }
              ],
              onRender: (state) => {
                if (!visible) return;
                targetPhi += 0.002;
                phi += (targetPhi - phi) * 0.05;
                state.phi = phi;
              }
            });
          }
        } else {
          visible = false;
          if (globe) {
            globe.destroy();
            globe = null;
          }
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(canvas);

    let isDragging = false;
    let lastX = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !globe) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      targetPhi += dx * 0.01;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (globe) globe.destroy();
    };
  }, [size]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size, maxWidth: "100%", aspectRatio: 1 }}
        className="[filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.4))] focus:outline-none"
      />
    </div>
  );
}

export default React.memo(GlobeDemo);
