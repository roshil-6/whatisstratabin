"use client";

/**
 * Founder 3D Scene - Abstract geometric representation.
 * Replace with a Pencil AI generated 3D model for enhanced visuals.
 * Import as: import { useGLTF } from '@react-three/drei'
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function AbstractAvatar() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Abstract head-like shape - geometric representation */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Body/torso - layered geometric forms */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.4]} />
          <meshStandardMaterial color="#f97316" metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Accent rings */}
        <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.05, 16, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

export default function FounderScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 2, 2]} color="#f97316" intensity={0.6} />
      <AbstractAvatar />
    </>
  );
}
