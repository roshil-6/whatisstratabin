"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import HeroScene from "./HeroScene";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });

const SLIDES = [
  {
    kicker: "Structure",
    title: "See the whole map",
    body: "Ideas stop living in scattered notes. Stratabin turns them into a visible flow you can steer before you ship.",
  },
  {
    kicker: "Execution",
    title: "From plan to progress",
    body: "Tasks, timelines, and calendars stay tied to the same strategy—so doing the work never breaks the picture.",
  },
  {
    kicker: "Scale",
    title: "You, or the whole team",
    body: "Stay solo in a private workspace, or invite collaborators with shared projects, chat, and daily rhythm.",
  },
];

export default function ImmersiveStage() {
  return (
    <section id="immersive" className="relative bg-[#030303]">
      <div
        id="immersive-inner"
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20 pt-28 md:py-24 md:pt-32"
      >
        {/* WebGL particle field — entire viewport, scrub rotates the stage in DOM on top */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.32] md:opacity-[0.38]">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              className="!h-full !w-full bg-transparent"
              gl={{ antialias: true, alpha: true }}
            >
              <HeroScene />
            </Canvas>
          </Suspense>
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#030303] via-[#030303]/80 to-[#030303]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(249,115,22,0.09),transparent_60%)]" />

        {/* CSS 3D card stack — parent rotation driven by GSAP scroll timeline */}
        <div className="immersive-scene-shell pointer-events-none absolute inset-y-0 left-0 z-[2] hidden w-[52%] md:block lg:w-[48%] [perspective:1400px]">
          <div className="absolute inset-0 flex items-center justify-center pl-6 lg:pl-16">
            <div className="immersive-scene-rotate relative h-[min(420px,55vh)] w-full max-w-[420px] [transform-style:preserve-3d]">
              <div className="immersive-card immersive-card-a absolute left-1/2 top-1/2 h-[13rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/[0.18] to-white/[0.02] shadow-[0_28px_90px_-24px_rgba(249,115,22,0.45)] ring-1 ring-white/5" />
              <div className="immersive-card immersive-card-b absolute left-1/2 top-1/2 h-[14rem] w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/[0.12] bg-white/[0.05] shadow-2xl backdrop-blur-md ring-1 ring-white/10" />
              <div className="immersive-card immersive-card-c absolute left-1/2 top-1/2 h-[11.5rem] w-[9rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/[0.08] bg-gradient-to-tl from-white/[0.08] to-transparent opacity-90 ring-1 ring-orange-500/10" />
            </div>
          </div>
        </div>

        {/* Story beats — stacked; opacity / y scrubbed */}
        <div className="relative z-[3] mx-auto w-full max-w-6xl px-8 md:pl-[46%] lg:px-24 lg:pl-[44%]">
          <div className="relative min-h-[220px] md:min-h-[280px]">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.kicker}
                className={`immersive-slide immersive-slide-${i + 1} max-w-xl ${i === 0 ? "relative" : "absolute inset-0"}`}
              >
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-orange-400/80">{slide.kicker}</p>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                  {slide.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/45 md:text-lg">{slide.body}</p>
              </div>
            ))}
          </div>

          <div className="immersive-scroll-hint mt-16 flex items-center gap-3 text-white/25">
            <div className="h-px w-10 bg-gradient-to-r from-orange-500/40 to-transparent" />
            <span className="text-[10px] font-medium uppercase tracking-[0.35em]">Keep scrolling</span>
          </div>
        </div>

        {/* Mobile: compact floating cards hint */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 gap-2 md:hidden">
          <div className="h-14 w-10 rounded-lg border border-white/10 bg-white/[0.04] shadow-lg" />
          <div className="h-16 w-11 -translate-y-1 rounded-lg border border-orange-500/20 bg-orange-500/10 shadow-lg" />
          <div className="h-14 w-10 rounded-lg border border-white/10 bg-white/[0.04] shadow-lg" />
        </div>
      </div>
    </section>
  );
}
