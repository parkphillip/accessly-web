
"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";

// Based on: https://github.com/shuding/cobe

type Point = { x: number; y: number };

// Helper to get a point on a quadratic bezier curve
function getPointOnQuadraticBezier(t: number, p0: Point, p1: Point, p2: Point): Point {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;

  const x = mt2 * p0.x + 2 * mt * t * p1.x + t2 * p2.x;
  const y = mt2 * p0.y + 2 * mt * t * p1.y + t2 * p2.y;

  return { x, y };
}

// Helper to project lat/lon to 2D canvas coordinates
function project(lat: number, lon: number, phi: number, theta: number, radius: number) {
  const DEG_TO_RAD = Math.PI / 180;
  const latRad = lat * DEG_TO_RAD;
  const lonRad = lon * DEG_TO_RAD;

  // 3D coordinates on a unit sphere
  const x = Math.cos(latRad) * Math.cos(lonRad);
  const y = Math.sin(latRad);
  const z = Math.cos(latRad) * Math.sin(lonRad);

  // Rotate around Y-axis (phi)
  const x1 = Math.cos(phi) * x + Math.sin(phi) * z;
  const y1 = y;
  const z1 = -Math.sin(phi) * x + Math.cos(phi) * z;
  
  // Rotate around X-axis (theta)
  const x2 = x1;
  const y2 = Math.cos(theta) * y1 - Math.sin(theta) * z1;
  const z2 = Math.sin(theta) * y1 + Math.cos(theta) * z1;
  
  // Return null if point is on the back of the globe
  if (z2 < -0.1) {
    return null;
  }
  
  return {
    x: x2 * radius,
    y: -y2 * radius,
    z: z2,
  };
}

export default function GlobeDemo() {
  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const arcCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!globeCanvasRef.current || !arcCanvasRef.current) return;

    const globeCanvas = globeCanvasRef.current;
    const arcCanvas = arcCanvasRef.current;
    const ctx = arcCanvas.getContext("2d");

    if (!ctx) return;

    const width = 600;
    const height = 600;
    const dpr = window.devicePixelRatio || 1;
    globeCanvas.width = arcCanvas.width = width * dpr;
    globeCanvas.height = arcCanvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let phi = 0;
    let theta = 0.3;
    let targetPhi = 0;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      targetPhi += scrollDelta * 0.003;
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const arcs = [
        { start: [51.5072, -0.1276], end: [40.7128, -74.006], offset: 0 }, // London -> NY
        { start: [34.0522, -118.2437], end: [-33.8688, 151.2093], offset: 0.25 }, // LA -> Sydney
        { start: [1.3521, 103.8198], end: [37.5665, 126.978], offset: 0.5 }, // Singapore -> Seoul
        { start: [28.6139, 77.209], end: [51.5072, -0.1276], offset: 0.75 }, // New Delhi -> London
    ];

    const globe = createGlobe(globeCanvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: height * dpr,
      phi: 0,
      theta: 0.3,
      dark: 0.85,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 12,
      baseColor: [1, 1, 1],
      markerColor: [0.7, 0.7, 0.7],
      glowColor: [0.1, 0.4, 0.8],
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
      onRender: (state) => {
        targetPhi += 0.002;
        state.phi += (targetPhi - state.phi) * 0.05;
        phi = state.phi;
        theta = state.theta;
      },
    });

    let animationFrameId: number;
    const startTime = Date.now();
    const globeRadius = width / 2.5;

    function drawArcs() {
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(width / 2, height / 2);

        const time = (Date.now() - startTime) / 1000;

        arcs.forEach(arc => {
            const start = project(arc.start[0], arc.start[1], phi, theta, globeRadius);
            const end = project(arc.end[0], arc.end[1], phi, theta, globeRadius);
            
            if (start && end) {
                const controlZ = Math.max(start.z, end.z) + 0.3 * (1 - Math.abs(start.x/globeRadius));
                const midX = (start.x + end.x) / 2;
                const midY = (start.y + end.y) / 2;
                const control = {
                  x: midX * (1 + controlZ),
                  y: midY * (1 + controlZ)
                };

                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.quadraticCurveTo(control.x, control.y, end.x, end.y);
                ctx.strokeStyle = 'rgba(128, 160, 255, 0.25)';
                ctx.lineWidth = 1;
                ctx.stroke();

                const travelTime = 4;
                const progress = ((time / travelTime + arc.offset) % 1);
                
                const dot = getPointOnQuadraticBezier(progress, start, control, end);
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 2, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(220, 235, 255, 1)';
                ctx.fill();
            }
        });

        ctx.restore();
        animationFrameId = requestAnimationFrame(drawArcs);
    }
    
    drawArcs();

    return () => {
      globe.destroy();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="relative" style={{ width: 600, height: 600, maxWidth: "100%" }}>
        <canvas
          ref={globeCanvasRef}
          style={{ width: "100%", height: "100%", aspectRatio: 1 }}
          className="[filter:drop-shadow(0_10px_20px_rgba(20,50,120,0.6))]"
        />
        <canvas
          ref={arcCanvasRef}
          style={{ width: "100%", height: "100%", aspectRatio: 1, pointerEvents: 'none' }}
          className="absolute top-0 left-0"
        />
      </div>
    </div>
  );
}

export { GlobeDemo };
