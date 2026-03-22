"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";
import HeroScene from "./HeroScene";

function CardLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex h-full min-h-[4rem] w-full items-center justify-center p-5 ${className}`}>
      <Image
        src="/stratabin-logo.png"
        alt="Stratabin"
        width={120}
        height={120}
        className="object-contain drop-shadow-[0_8px_32px_rgba(249,115,22,0.25)]"
      />
    </div>
  );
}

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });

const SLIDES = [
  {
    kicker: "Structure",
    title: "See the whole map",
    body: "Ideas stop living in scattered notes. Stratabin turns them into a visible flow you can steer before you ship.",
    mark: "01",
  },
  {
    kicker: "Execution",
    title: "From plan to progress",
    body: "Tasks, timelines, and calendars stay tied to the same strategy—so doing the work never breaks the picture.",
    mark: "02",
  },
  {
    kicker: "Scale",
    title: "You, or the whole team",
    body: "Stay solo in a private workspace, or invite collaborators with shared projects, chat, and daily rhythm.",
    mark: "03",
  },
];

export default function ImmersiveStage() {
  return (
    <section id="immersive" className="relative overflow-hidden bg-[#020202]">
      <div
        id="immersive-inner"
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20 pt-28 md:py-24 md:pt-32"
      >
        {/* Film grain + vignette */}
        <div
          className="immersive-grain pointer-events-none absolute inset-0 z-[5] opacity-[0.07] mix-blend-overlay"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]"
          aria-hidden
        />

        {/* Scroll-linked glow drift */}
        <div
          className="immersive-glow pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_var(--gx,50%)_var(--gy,45%),rgba(249,115,22,0.14)_0%,transparent_42%)] opacity-80"
          style={{ "--gx": "48%", "--gy": "42%" } as React.CSSProperties}
          aria-hidden
        />

        {/* WebGL particles */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.36] md:opacity-[0.44]">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 48 }}
              className="!h-full !w-full bg-transparent"
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
              <HeroScene />
            </Canvas>
          </Suspense>
        </div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#020202] via-[#030303]/88 to-[#020202]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_65%_at_40%_42%,rgba(249,115,22,0.11),transparent_58%)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(56,189,248,0.05),transparent_50%)]" />

        {/* Floor grid hint */}
        <div
          className="immersive-floor pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[38%] bg-[linear-gradient(to_top,rgba(249,115,22,0.04),transparent_55%),repeating-linear-gradient(90deg,transparent,transparent_47px,rgba(255,255,255,0.03)_47px,rgba(255,255,255,0.03)_48px),repeating-linear-gradient(0deg,transparent,transparent_47px,rgba(255,255,255,0.025)_47px,rgba(255,255,255,0.025)_48px)] opacity-40 [mask-image:linear-gradient(to_top,black,transparent)] [transform:perspective(400px)_rotateX(58deg)] [transform-origin:50%_100%]"
          aria-hidden
        />

        {/* 3D card stack */}
        <div className="immersive-scene-shell pointer-events-none absolute inset-y-0 left-0 z-[2] hidden w-[54%] md:block lg:w-[50%] [perspective:1600px]">
          <div className="absolute inset-0 flex items-center justify-center pl-4 lg:pl-14">
            <div className="immersive-scene-rotate relative h-[min(460px,58vh)] w-full max-w-[440px] [transform-style:preserve-3d]">
              {/* Accent ring */}
              <div className="immersive-orbit-ring pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/[0.12] [transform:translateZ(-80px)]" />

              <div className="immersive-card immersive-card-a absolute left-1/2 top-1/2 h-[14rem] w-[10.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.35rem] border border-orange-400/30 bg-gradient-to-br from-orange-500/[0.22] via-orange-600/[0.08] to-white/[0.02] shadow-[0_32px_100px_-28px_rgba(249,115,22,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/10 [background-image:linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_50%),repeating-linear-gradient(0deg,transparent,transparent_11px,rgba(255,255,255,0.04)_11px,rgba(255,255,255,0.04)_12px)]">
                <div className="absolute left-4 top-4 z-10 h-2 w-2 rounded-full bg-orange-400/80 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                <CardLogo className="[&_img]:max-h-[5.5rem] [&_img]:w-auto [&_img]:max-w-[85%]" />
              </div>
              <div className="immersive-card immersive-card-b absolute left-1/2 top-1/2 h-[15rem] w-[11.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.35rem] border border-white/[0.14] bg-white/[0.06] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl ring-1 ring-white/[0.08] [background-image:repeating-linear-gradient(90deg,transparent,transparent_15px,rgba(255,255,255,0.035)_15px,rgba(255,255,255,0.035)_16px)]">
                <div className="absolute bottom-5 left-5 right-5 z-10 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
                <CardLogo className="[&_img]:max-h-[7rem] [&_img]:w-auto [&_img]:max-w-[88%]" />
              </div>
              <div className="immersive-card immersive-card-c absolute left-1/2 top-1/2 h-[12rem] w-[9.25rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.25rem] border border-white/[0.1] bg-gradient-to-tl from-cyan-500/[0.06] via-white/[0.04] to-transparent opacity-95 shadow-xl ring-1 ring-cyan-400/10 [background-image:linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]">
                <div className="absolute right-4 top-4 z-10 flex gap-1">
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="h-1 w-1 rounded-full bg-white/15" />
                </div>
                <CardLogo className="[&_img]:max-h-[4.5rem] [&_img]:w-auto [&_img]:max-w-[82%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress rail */}
        <div className="pointer-events-none absolute left-5 top-1/2 z-[4] hidden -translate-y-1/2 md:block lg:left-8">
          <div className="flex flex-col items-center gap-5">
            <div className="relative h-52 w-[3px] overflow-hidden rounded-full bg-white/[0.07]">
              <div className="immersive-progress-fill absolute inset-x-0 top-0 h-full origin-top scale-y-0 rounded-full bg-gradient-to-b from-orange-400 via-orange-500 to-amber-500/40 shadow-[0_0_24px_rgba(249,115,22,0.45)]" />
            </div>
            <div className="flex flex-col gap-2.5">
              {[1, 2, 3].map((n) => (
                <div key={n} className={`immersive-step immersive-step-${n} flex items-center gap-2 opacity-35`}>
                  <span className="immersive-step-dot h-2 w-2 rounded-full border border-white/25 bg-white/10 shadow-inner" />
                  <span className="font-mono text-[9px] tracking-widest text-white/40">0{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Giant chapter watermark */}
        {SLIDES.map((slide, i) => (
          <div
            key={`mark-${slide.mark}`}
            className={`immersive-chapter-mark immersive-chapter-mark-${i + 1} pointer-events-none absolute right-[4%] top-1/2 z-[2] -translate-y-1/2 font-display text-[clamp(6rem,22vw,14rem)] font-bold leading-none text-white/[0.03] select-none md:right-[6%]`}
            aria-hidden
          >
            {slide.mark}
          </div>
        ))}

        {/* Copy column */}
        <div className="relative z-[3] mx-auto w-full max-w-6xl px-8 md:pl-[48%] lg:px-24 lg:pl-[46%]">
          <p className="mb-10 text-[10px] font-semibold uppercase tracking-[0.45em] text-white/25">
            Stratabin · one workspace
          </p>

          <div className="relative min-h-[240px] md:min-h-[300px]">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.kicker}
                className={`immersive-slide immersive-slide-${i + 1} max-w-xl ${i === 0 ? "relative" : "absolute inset-0"}`}
              >
                <p className="immersive-slide-kicker mb-4 text-[11px] font-bold uppercase tracking-[0.4em] text-orange-400/90">
                  {slide.kicker}
                </p>
                <h2 className="immersive-slide-title font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white md:text-[clamp(2.25rem,4.2vw,3.75rem)]">
                  {slide.title}
                </h2>
                <p className="immersive-slide-body mt-6 max-w-md text-base leading-relaxed text-white/40 md:text-lg md:leading-relaxed">
                  {slide.body}
                </p>
              </div>
            ))}
          </div>

          <div className="immersive-scroll-hint mt-20 flex items-center gap-4 text-white/30">
            <div className="h-px w-14 bg-gradient-to-r from-orange-400/60 via-orange-500/30 to-transparent" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Scroll to continue</span>
            <div className="hidden h-1 w-1 animate-pulse rounded-full bg-orange-400/80 sm:block" />
          </div>
        </div>

        {/* Mobile card hint — logo chips */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 z-[2] flex -translate-x-1/2 items-center gap-2 md:hidden">
          <div className="flex h-16 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] shadow-lg backdrop-blur-sm">
            <Image src="/stratabin-logo.png" alt="" width={32} height={32} className="object-contain opacity-80" />
          </div>
          <div className="flex h-[4.5rem] w-12 -translate-y-2 items-center justify-center rounded-xl border border-orange-500/30 bg-gradient-to-b from-orange-500/15 to-transparent shadow-[0_12px_40px_-10px_rgba(249,115,22,0.35)]">
            <Image src="/stratabin-logo.png" alt="" width={40} height={40} className="object-contain drop-shadow-md" />
          </div>
          <div className="flex h-16 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] shadow-lg backdrop-blur-sm">
            <Image src="/stratabin-logo.png" alt="" width={32} height={32} className="object-contain opacity-80" />
          </div>
        </div>
      </div>

      {/* Seamless handoff into Mission (matches page bg #050505) */}
      <div
        className="immersive-to-mission relative z-[6] w-full bg-gradient-to-b from-transparent via-[#050505]/85 to-[#050505] pt-6 md:pt-10"
        aria-hidden
      >
        <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-orange-500/20 to-transparent opacity-80" />
        <div className="h-12 md:h-16" />
      </div>
    </section>
  );
}
