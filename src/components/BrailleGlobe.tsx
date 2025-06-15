import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import world110 from "@/data/world110.json";

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

function topoArcsToLonLat(topo: any) {
  const { scale, translate } = topo.transform;
  return topo.arcs.flatMap((arc: number[][]) => {
    let lastX = 0;
    let lastY = 0;
    return arc.map(([dx, dy]: number[]) => {
      lastX += dx;
      lastY += dy;
      return [
        lastX * scale[0] + translate[0],
        lastY * scale[1] + translate[1],
      ];
    });
  });
}

const landLonLat = topoArcsToLonLat(world110).slice(); // Use slice for a shallow copy as requested

const GlobeDots = () => {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors, sizes, pulseIndexes } = useMemo(() => {
    const radius = 2.5;

    const tempPositions: number[] = [];
    const tempColors: number[] = [];
    const tempSizes: number[] = [];
    const pulseIndexes: number[] = [];

    const navy = new THREE.Color('#2c5282');
    const white = new THREE.Color('#ffffff');
    const yellow = new THREE.Color('#fbbf24'); // Warm yellow

    let pointIndex = 0;

    landLonLat.forEach(([lon, lat], i) => {
      // down-sample: keep 1 of every 4 points to avoid millions
      if (i % 4 !== 0) return;

      const latR = THREE.MathUtils.degToRad(lat);
      const lonR = THREE.MathUtils.degToRad(lon);

      const x = radius * Math.cos(latR) * Math.cos(lonR);
      const y = radius * Math.sin(latR);
      const z = radius * Math.cos(latR) * Math.sin(lonR);

      tempPositions.push(x, y, z);

      let color;
      const rand = Math.random();
      if (rand > 0.985) {
        color = yellow;
        if (rand > 0.995) pulseIndexes.push(pointIndex);
      } else if (rand > 0.97) {
        color = white;
      } else {
        color = navy;
      }
      tempColors.push(color.r, color.g, color.b);
      tempSizes.push(Math.random() * 1.5 + 0.8);
      pointIndex++;
    });

    const positions = new Float32Array(tempPositions);
    const colors = new Float32Array(tempColors);
    const sizes = new Float32Array(tempSizes);

    return { positions, colors, sizes, pulseIndexes };
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x += delta * 0.02;

    const time = state.clock.getElapsedTime();
    const sizesAttribute = ref.current.geometry.attributes.size as THREE.BufferAttribute;
    
    pulseIndexes.forEach(i => {
      const initialSize = sizes[i];
      sizesAttribute.setX(i, initialSize + Math.sin(time * 2 + i) * 0.8);
    });

    sizesAttribute.needsUpdate = true;
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
