"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import HeroScene from "./HeroScene";
import FounderScene from "./FounderScene";
import AboutParticles from "./AboutParticles";

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });

export function HeroSceneWrapper() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ touchAction: "none" }}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-black/5">
            <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="bg-transparent" gl={{ antialias: true }}>
          <HeroScene />
        </Canvas>
      </Suspense>
    </div>
  );
}

export function AboutParticlesWrapper() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ touchAction: "none" }}>
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="bg-transparent" gl={{ antialias: true }}>
          <AboutParticles />
        </Canvas>
      </Suspense>
    </div>
  );
}

export function FounderSceneWrapper() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Suspense
        fallback={
          <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-black/5 rounded-2xl">
            <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }} className="bg-transparent rounded-2xl">
          <FounderScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
