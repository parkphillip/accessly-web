
import React, { useRef, useMemo, Suspense } from 'react';
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

const GlobeDots = () => {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 6000;
    const radius = 2.5;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const navy = new THREE.Color('#2c5282');
    const terracotta = new THREE.Color('#e07a5f');

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions.set([x, y, z], i * 3);

      const color = new THREE.Color().lerpColors(terracotta, navy, (z + radius) / (2 * radius) * 0.8 + 0.2);
      colors.set([color.r, color.g, color.b], i * 3);

      sizes[i] = Math.random() * 1.5 + 0.5;
    }
    return { positions, colors, sizes };
  }, []);

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
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={0.5} />
          <GlobeDots />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BrailleGlobe;
