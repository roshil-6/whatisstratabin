"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ORANGE = "#f97316";

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

type FixedHexagonParticlesProps = {
  count: number;
  /** Skip every other frame + lighter pointer math — use behind long pinned scroll. */
  lowPower?: boolean;
};

function FixedHexagonParticles({ count, lowPower = false }: FixedHexagonParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const basePositions = useRef<{ x: number; y: number; z: number }[]>([]);
  const frameRef = useRef(0);

  useMemo(() => {
    const positions: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 6 - 2,
      });
    }
    basePositions.current = positions;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    if (lowPower) {
      frameRef.current += 1;
      if (frameRef.current % 2 !== 0) return;
    }

    const pointer = state.pointer;
    const mouseX = pointer.x * 10;
    const mouseY = -pointer.y * 10;
    const pushScale = lowPower ? 0.28 : 0.4;
    const influenceRadius = lowPower ? 4.2 : 3.5;

    for (let i = 0; i < count; i++) {
      const pos = basePositions.current[i];
      const dx = pos.x - mouseX;
      const dy = pos.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / influenceRadius);
      const push = influence * pushScale;
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
    <instancedMesh ref={meshRef} args={[hexagonGeometry, undefined, count]} frustumCulled={false}>
      <meshBasicMaterial color={ORANGE} transparent opacity={0.5} depthWrite={false} />
    </instancedMesh>
  );
}

export type HeroSceneProps = {
  /** Fewer particles + throttled updates (immersive section). */
  lowPower?: boolean;
};

export default function HeroScene({ lowPower = false }: HeroSceneProps) {
  const count = lowPower ? 72 : 200;
  return <FixedHexagonParticles count={count} lowPower={lowPower} />;
}
