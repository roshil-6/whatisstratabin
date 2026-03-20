"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ORANGE = "#f97316";
const PARTICLE_COUNT = 200;

// True hexagon - 6 vertices
const hexagonGeometry = (() => {
  const shape = new THREE.Shape();
  const r = 0.08;
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
})();

function FixedHexagonParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const basePositions = useRef<{ x: number; y: number; z: number }[]>([]);

  useMemo(() => {
    const positions: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 6 - 2,
      });
    }
    basePositions.current = positions;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const pointer = state.pointer;
    const mouseX = pointer.x * 10;
    const mouseY = -pointer.y * 10;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const pos = basePositions.current[i];
      const dx = pos.x - mouseX;
      const dy = pos.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 3.5);
      const push = influence * 0.4;
      const scale = 0.85 + influence * 0.35;

      dummy.current.position.set(
        pos.x + (dx / (dist || 0.01)) * push,
        pos.y + (dy / (dist || 0.01)) * push,
        pos.z
      );
      dummy.current.scale.setScalar(scale);
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[hexagonGeometry, undefined, PARTICLE_COUNT]} frustumCulled={false}>
      <meshBasicMaterial
        color={ORANGE}
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function HeroScene() {
  return <FixedHexagonParticles />;
}
