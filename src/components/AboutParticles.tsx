"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ORANGE = "#f97316";
const COUNT = 80;

// Hexagon - 6 vertices
const particleGeometry = (() => {
  const shape = new THREE.Shape();
  const r = 0.07;
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

function HexagonParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const base = useRef<{ x: number; y: number; z: number }[]>([]);

  useMemo(() => {
    const positions: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 4,
      });
    }
    base.current = positions;
    return positions;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const p = state.pointer;
    const mx = p.x * 6;
    const my = -p.y * 6;

    for (let i = 0; i < COUNT; i++) {
      const pos = base.current[i];
      const drift = Math.sin(t * 0.5 + i * 0.1) * 0.06;
      const x = pos.x + drift;
      const y = pos.y + Math.cos(t * 0.3 + i * 0.07) * 0.05;
      const dx = x - mx;
      const dy = y - my;
      const d = Math.sqrt(dx * dx + dy * dy);
      const f = Math.max(0, 1 - d / 3) * 0.25;
      const scale = 0.95 + f * 0.2;
      dummy.current.position.set(
        x + (dx / (d || 0.01)) * f,
        y + (dy / (d || 0.01)) * f,
        pos.z
      );
      dummy.current.scale.setScalar(scale);
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[particleGeometry, undefined, COUNT]} frustumCulled={false}>
      <meshBasicMaterial
        color={ORANGE}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function AboutParticles() {
  return <HexagonParticles />;
}
