
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { BrailleChar } from '../utils/brailleTranslator';

interface BrailleBook3DProps {
  pages: BrailleChar[][];
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface BookPageProps {
  brailleChars: BrailleChar[];
  pageNumber: number;
  isCurrentPage: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
  onHover: (char: BrailleChar | null) => void;
  hoveredChar: BrailleChar | null;
}

const BookPage: React.FC<BookPageProps> = ({ 
  brailleChars, 
  pageNumber, 
  isCurrentPage, 
  position, 
  rotation,
  onHover,
  hoveredChar
}) => {
  const pageRef = useRef<THREE.Group>(null);
  const { raycaster, camera } = useThree();
  const [mouse] = useState(new THREE.Vector2());

  const handlePointerMove = (event: any) => {
    if (!isCurrentPage) return;
    
    // Update mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Find intersected braille characters
    if (pageRef.current) {
      const intersects = raycaster.intersectObjects(pageRef.current.children, true);
      
      if (intersects.length > 0) {
        // Find the closest braille character
        const closestChar = brailleChars.find((char) => {
          const worldPos = new THREE.Vector3(...char.position);
          pageRef.current?.localToWorld(worldPos);
          return worldPos.distanceTo(intersects[0].point) < 0.02;
        });
        
        onHover(closestChar || null);
      } else {
        onHover(null);
      }
    }
  };

  return (
    <group 
      ref={pageRef} 
      position={position} 
      rotation={rotation}
      onPointerMove={handlePointerMove}
    >
      {/* Page background */}
      <mesh>
        <planeGeometry args={[1.5, 2]} />
        <meshLambertMaterial color="#f8f9fa" side={THREE.DoubleSide} />
      </mesh>
      
      {/* Braille characters */}
      {brailleChars.map((char, index) => {
        const isHovered = hoveredChar === char;
        const displayText = isHovered ? char.english : char.braille;
        
        return (
          <Text
            key={index}
            position={char.position}
            fontSize={0.03}
            color={isHovered ? "#2c5282" : "#343a40"}
            anchorX="left"
            anchorY="top"
            font="/fonts/JetBrainsMono-Regular.woff"
            material-transparent
            material-opacity={1}
          >
            {displayText}
          </Text>
        );
      })}
      
      {/* Page number */}
      <Text
        position={[0, -0.9, 0.01]}
        fontSize={0.02}
        color="#6c757d"
        anchorX="center"
        anchorY="center"
      >
        {pageNumber + 1}
      </Text>
    </group>
  );
};

const Book3D: React.FC<BrailleBook3DProps> = ({ pages, currentPage, onPageChange }) => {
  const bookRef = useRef<THREE.Group>(null);
  const [hoveredChar, setHoveredChar] = useState<BrailleChar | null>(null);

  useFrame((state) => {
    if (bookRef.current) {
      // Subtle floating animation
      bookRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  const visiblePages = useMemo(() => {
    // Show current page and next page (book spread)
    return [
      { data: pages[currentPage] || [], index: currentPage, isLeft: true },
      { data: pages[currentPage + 1] || [], index: currentPage + 1, isLeft: false }
    ].filter(page => page.data.length > 0);
  }, [pages, currentPage]);

  return (
    <group ref={bookRef}>
      {/* Book cover/binding */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[1.6, 2.1, 0.05]} />
        <meshLambertMaterial color="#2c5282" />
      </mesh>
      
      {/* Pages */}
      {visiblePages.map((page) => (
        <BookPage
          key={page.index}
          brailleChars={page.data}
          pageNumber={page.index}
          isCurrentPage={Math.abs(page.index - currentPage) <= 1}
          position={page.isLeft ? [-0.4, 0, 0.01] : [0.4, 0, 0.01]}
          rotation={[0, 0, 0]}
          onHover={setHoveredChar}
          hoveredChar={hoveredChar}
        />
      ))}
    </group>
  );
};

const BrailleBook3D: React.FC<BrailleBook3DProps> = (props) => {
  return (
    <div className="w-full h-[500px] bg-gradient-to-b from-subtle-gray to-light-bg rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-2, 2, 2]} intensity={0.3} />
        
        <Book3D {...props} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default BrailleBook3D;
