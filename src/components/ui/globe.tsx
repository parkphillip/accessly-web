"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const cameraZ = 300;

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

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

const countries = {
  features: [
    // North America
    {
      geometry: {
        coordinates: [[[-140, 60], [-140, 20], [-60, 20], [-60, 70], [-140, 60]]],
        type: "Polygon"
      },
      properties: { name: "North America" },
      type: "Feature"
    },
    // South America
    {
      geometry: {
        coordinates: [[[-80, 10], [-80, -50], [-35, -50], [-35, 10], [-80, 10]]],
        type: "Polygon"
      },
      properties: { name: "South America" },
      type: "Feature"
    },
    // Europe
    {
      geometry: {
        coordinates: [[[-10, 70], [-10, 35], [40, 35], [40, 70], [-10, 70]]],
        type: "Polygon"
      },
      properties: { name: "Europe" },
      type: "Feature"
    },
    // Africa
    {
      geometry: {
        coordinates: [[[-20, 35], [-20, -35], [50, -35], [50, 35], [-20, 35]]],
        type: "Polygon"
      },
      properties: { name: "Africa" },
      type: "Feature"
    },
    // Asia
    {
      geometry: {
        coordinates: [[[40, 70], [40, 0], [140, 0], [140, 70], [40, 70]]],
        type: "Polygon"
      },
      properties: { name: "Asia" },
      type: "Feature"
    },
    // Australia
    {
      geometry: {
        coordinates: [[[110, -10], [110, -45], [155, -45], [155, -10], [110, -10]]],
        type: "Polygon"
      },
      properties: { name: "Australia" },
      type: "Feature"
    }
  ]
};

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);
  const [landPolygons, setLandPolygons] = useState<number[][][] | null>(null);
  const [landPoints, setLandPoints] = useState<{lat: number, lng: number, size: number, color: string}[]>([]);

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

  useEffect(() => {
    if (!landPolygons) return;

    const points: {lat: number, lng: number, size: number, color: string}[] = [];
    const navy = '#2c5282';
    
    const resolution = 2.0; // degrees
    for (let lat = -90; lat <= 90; lat += resolution) {
        for (let lng = -180; lng <= 180; lng += resolution) {
            if (isLand(lng, lat, landPolygons)) {
                points.push({
                    lat,
                    lng,
                    size: 0.5, // custom property to differentiate land points
                    color: navy
                });
            }
        }
    }
    setLandPoints(points);
  }, [landPolygons]);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // Initialize globe only once
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      (groupRef.current as any).add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    let allPoints: any[] = [];
    if (data) {
        const arcPoints: any[] = [];
        data.forEach(arc => {
            arcPoints.push({
                lat: arc.startLat,
                lng: arc.startLng,
                size: defaultProps.pointSize,
                color: arc.color,
                order: arc.order,
            });
            arcPoints.push({
                lat: arc.endLat,
                lng: arc.endLng,
                size: defaultProps.pointSize,
                color: arc.color,
                order: arc.order
            });
        });
        const filteredArcPoints = arcPoints.filter(
          (v, i, a) =>
            a.findIndex((v2) =>
              v2.lat === v.lat && v2.lng === v.lng
            ) === i,
        );
        allPoints = [...landPoints, ...filteredArcPoints];
    }

    globeRef.current
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(allPoints)
      .pointLat((d: any) => d.lat)
      .pointLng((d: any) => d.lng)
      .pointColor((d: any) => d.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius((d: any) => (d.size === 0.5 ? 0.1 : 0.2));

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );
  }, [
    isInitialized,
    data,
    landPoints,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;
    // Removed interval logic for pulsating rings
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffffff, 0);
  }, [gl, size]);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  return (
    <Canvas camera={{ fov: 50, near: 180, far: 1800, position: [0, 0, cameraZ] }}>
      <fog attach="fog" args={[0xffffff, 400, 2000]} />
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={globeConfig.autoRotateSpeed}
        autoRotate={globeConfig.autoRotate}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
