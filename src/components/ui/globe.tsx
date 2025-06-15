
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

// Function to convert latitude/longitude to a 3D vector on the sphere
const latLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

// Component to render a single arc
const Arc = ({ startLat, startLng, endLat, endLng, arcAlt, color }: any) => {
    const radius = 5; // Must match the globe's radius
    const startVec = latLonToVector3(startLat, startLng, radius);
    const endVec = latLonToVector3(endLat, endLng, radius);
    
    const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const midLength = midPoint.length();
    midPoint.normalize();
    midPoint.multiplyScalar(midLength + radius * arcAlt);

    const curve = new THREE.CubicBezierCurve3(startVec, midPoint, midPoint, endVec);
    const points = curve.getPoints(50);
    
    return <Line points={points} color={color} lineWidth={2} />;
};

// The main World component
export const World = ({ globeConfig, data }: any) => {
    const globeRef = useRef<THREE.Mesh>(null);
    const [mapTexture] = useLoader(TextureLoader, [
        'https://unpkg.com/three-globe@2.24.4/example/img/earth-dark.jpg',
    ]);

    useFrame((_, delta) => {
        if (globeRef.current && globeConfig.autoRotate) {
            globeRef.current.rotation.y += globeConfig.autoRotateSpeed * delta;
        }
    });

    return (
        <>
            <ambientLight color={globeConfig.ambientLight} intensity={1} />
            <directionalLight color={globeConfig.directionalLeftLight} position={[-100, 0, -100]} intensity={0.6} />
            <directionalLight color={globeConfig.directionalTopLight} position={[0, 100, 0]} intensity={0.6} />
            <pointLight color={globeConfig.pointLight} position={[0, 0, 10]} intensity={0.5} />
            
            <Sphere ref={globeRef} args={[5, 64, 64]}>
                <meshPhongMaterial 
                    map={mapTexture} 
                    color={globeConfig.globeColor}
                    emissive={globeConfig.emissive} 
                    emissiveIntensity={globeConfig.emissiveIntensity}
                    shininess={globeConfig.shininess}
                />
            </Sphere>
            
            {data.map((arc: any, index: number) => (
                <Arc key={index} {...arc} />
            ))}
        </>
    );
};
