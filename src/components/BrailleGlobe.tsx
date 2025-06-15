import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

// Lat/Lon bounding boxes for continents (approximate)
const continents = [
  // North America
  { lon: [-168, -55], lat: [15, 75] },
  // South America
  { lon: [-81, -34], lat: [-55, 12] },
  // Europe & Asia
  { lon: [-10, 140], lat: [10, 75] },
  // Africa
  { lon: [-17, 51], lat: [-34, 37] },
  // Australia
  { lon: [113, 153], lat: [-43, -10] },
  // Antarctica
  { lon: [-180, 180], lat: [-85, -65] },
];

const isLand = (lon: number, lat: number, polygons: number[][][]): boolean => {
  for (const polygon of polygons) {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];
      const intersect = ((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
      if (intersect) {
        isInside = !isInside;
      }
    }
    if (isInside) return true;
  }
  return false;
};

const GlobeDots = () => {
  const ref = useRef<THREE.Points>(null!);
  const [landPolygons, setLandPolygons] = useState<number[][][] | null>(null);

  useEffect(() => {
    const landURL = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json";
    fetch(landURL)
      .then(res => res.json())
      .then(topoData => {
        if (!topoData.objects.land || !topoData.transform) return;

        const { land } = topoData.objects;
        const { arcs: allArcs, transform } = topoData;
        const { scale, translate } = transform;
        
        const decodedArcs = allArcs.map((arc: [number, number][]) => {
          let x = 0, y = 0;
          return arc.map(([dx, dy]: [number, number]) => {
            x += dx;
            y += dy;
            return [x, y];
          });
        });
        
        const polygons = land.geometries.map((geom: { arcs: number[][] }) => 
          geom.arcs.map((arcIndices: number[]) => 
            arcIndices.map((arcIndex: number) => {
              const arc = decodedArcs[arcIndex < 0 ? ~arcIndex : arcIndex];
              const points = arc.map((point: [number, number]) => [
                point[0] * scale[0] + translate[0],
                point[1] * scale[1] + translate[1],
              ]);
              return arcIndex < 0 ? points.slice().reverse() : points;
            }).flat()
          )
        ).flat();

        setLandPolygons(polygons);
      }).catch(console.error);
  }, []);

  const { positions, colors, sizes } = useMemo(() => {
    if (!landPolygons) {
        return {
            positions: new Float32Array(),
            colors: new Float32Array(),
            sizes: new Float32Array(),
        };
    }

    const maxPoints = 9000;
    const radius = 2.5;

    const tempPositions: number[] = [];
    const tempColors: number[] = [];
    const tempSizes: number[] = [];

    const navy = new THREE.Color('#2c5282');
    const white = new THREE.Color('#ffffff');
    const yellow = new THREE.Color('#fbbf24'); // Warm yellow

    let pointIndex = 0;
    
    continents.forEach(continent => {
        const density = Math.abs(continent.lon[1] - continent.lon[0]) * Math.abs(continent.lat[1] - continent.lat[0]);
        const numPoints = Math.floor(density * 0.06);

        for (let i = 0; i < numPoints && pointIndex < maxPoints; i++) {
            const lon = THREE.MathUtils.randFloat(continent.lon[0], continent.lon[1]);
            const lat = THREE.MathUtils.randFloat(continent.lat[0], continent.lat[1]);
            
            if (!isLand(lon, lat, landPolygons)) {
                continue;
            }
            
            const latRad = lat * (Math.PI / 180);
            const lonRad = lon * (Math.PI / 180);

            const x = radius * Math.cos(latRad) * Math.cos(lonRad);
            const y = radius * Math.sin(latRad);
            const z = radius * Math.cos(latRad) * Math.sin(lonRad);
            
            tempPositions.push(x, y, z);

            let color;
            const rand = Math.random();
            if (rand > 0.985) {
                color = yellow;
            } else if (rand > 0.97) {
                color = white;
            } else {
                color = navy;
            }
            tempColors.push(color.r, color.g, color.b);
            tempSizes.push(Math.random() * 1.5 + 0.8);
            pointIndex++;
        }
    });

    const positions = new Float32Array(tempPositions);
    const colors = new Float32Array(tempColors);
    const sizes = new Float32Array(tempSizes);

    return { positions, colors, sizes };
  }, [landPolygons]);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </points>
  );
};

const BrailleGlobe = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[1, 1, 1]} intensity={0.2} />
          <GlobeDots />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BrailleGlobe;
