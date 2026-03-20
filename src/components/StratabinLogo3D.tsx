"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const ORANGE = "#FF6600";

// Top C-shaped frame (opens right) - torus segment
function TopFrame() {
  return (
    <mesh position={[0, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
      <torusGeometry args={[0.4, 0.06, 8, 32, Math.PI * 1.5]} />
      <meshBasicMaterial color={ORANGE} />
    </mesh>
  );
}

// Bottom C-shaped frame (opens left) - mirrored, slightly larger
function BottomFrame() {
  return (
    <mesh position={[0, -0.55, 0]} rotation={[0, 0, -Math.PI / 2]}>
      <torusGeometry args={[0.5, 0.07, 8, 32, Math.PI * 1.5]} />
      <meshBasicMaterial color={ORANGE} />
    </mesh>
  );
}

// Diamond plane - rhombus (square rotated 45°)
function DiamondPlane({ y }: { y: number }) {
  return (
    <mesh position={[0, y, 0]} rotation={[0, 0, Math.PI / 4]}>
      <planeGeometry args={[0.25, 0.25]} />
      <meshBasicMaterial color={ORANGE} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function StratabinLogo3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.8} position={[0, 0, 0.5]} rotation={[0.2, 0, 0]}>
        <TopFrame />
        <BottomFrame />
        <DiamondPlane y={0.25} />
        <DiamondPlane y={0.08} />
        <DiamondPlane y={-0.09} />
        <DiamondPlane y={-0.26} />
      </group>
    </Float>
  );
}
