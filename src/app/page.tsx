"use client";

import { useState } from "react";
import Image from "next/image";
import { AboutParticlesWrapper } from "@/components/SceneWrapper";
import ManIcon from "@/components/ManIcon";

const FAQ_ITEMS = [
  { q: "What is Stratabin?", a: "Stratabin is a structured workspace that helps you turn scattered ideas into clear plans and actionable execution. Instead of writing notes that go nowhere, you organize ideas, visualize them as a flow, create tasks, and track progress—all in one place." },
  { q: "How is Stratabin different from note-taking apps?", a: "Most note apps let you write—few help you structure and act. Stratabin combines writing, planning, flow visualization, and task execution in one system. You can break ideas into sections, see how steps connect, and track what you've actually completed." },
  { q: "Can I use Stratabin with my team?", a: "Yes. Stratabin has a Team Workspace where you can create shared folders, invite members, and collaborate on projects. Admins can assign roles (Admin or Member) to team members. There's also a Daily Tasks feature where you can add tasks for the day, assign them to team members (or yourself), and track progress with checkboxes. Admins can manage everyone's tasks; members see and manage their own." },
  { q: "What is Strab AI?", a: "Strab AI is Stratabin's built-in AI assistant. It helps organize messy thoughts, highlight key points, and improve clarity when your ideas aren't structured. It works inside your projects and can also assist team plans." },
  { q: "Is Stratabin free?", a: "Stratabin is continuously evolving. Check the official Stratabin website for current pricing and availability." },
];

const FaqItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <div className={`border border-black/[0.06] rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-orange-50/50 border-orange-200 shadow-glow" : "bg-white hover:border-orange-200/50"}`}>
    <button onClick={onClick} className="w-full py-5 px-6 flex justify-between items-center text-left gap-4 hover:bg-white/50 transition-colors">
      <span className="font-semibold text-black">{question}</span>
      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-orange-100 text-orange-600 transition-all duration-300 ${isOpen ? "rotate-180 bg-orange-200" : ""}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </span>
    </button>
    {isOpen && <div className="px-6 pb-5"><p className="text-black/70 text-sm leading-relaxed">{answer}</p></div>}
  </div>
);

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-black/[0.04] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-black tracking-tight hover:text-orange-500 transition-colors">
            STRATABIN
          </a>
          <div className="flex gap-10">
            <a href="#what-is-stratabin" className="text-sm font-medium text-black/70 hover:text-orange-500 transition-colors relative group">
              What is Stratabin <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#faq" className="text-sm font-medium text-black/70 hover:text-orange-500 transition-colors relative group">
              FAQ <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#about" className="text-sm font-medium text-black/70 hover:text-orange-500 transition-colors relative group">
              About Us <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#about" className="text-sm font-medium text-black/70 hover:text-orange-500 transition-colors relative group">
              Founders <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="what-is-stratabin" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0">
          <Image
            src="https://img.freepik.com/free-photo/man-works-dark-room-uses-laptop-night_169016-55093.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Man working on laptop at night"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <div className="mb-8">
            <div className="logo-no-white inline-block">
              <Image
                src="/stratabin-logo.png"
                alt="Stratabin Logo"
                width={160}
                height={160}
                priority
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.05]">
            <span className="text-white/95">Turn Ideas Into </span>
            <span className="text-orange-400">Action</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
            A structured workspace designed to turn scattered ideas into clear plans and actionable execution.
          </p>
          <p className="text-base text-white/80 max-w-xl mx-auto mb-10">
            Organize, visualize, and execute your ideas in one place—no more disconnected notes.
          </p>
          <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]">
            Visit stratabin.com
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
      </section>

      {/* In Plain Terms */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-orange-300" />
        <div className="relative max-w-3xl mx-auto pl-8">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-6">In Plain Terms</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 leading-tight">
            Stratabin is an app that turns your ideas into action
          </h2>
          <p className="text-lg text-black/80 leading-relaxed mb-6">
            You know that feeling when you have a great idea, write it down somewhere, and never do anything with it? Stratabin fixes that. It&apos;s not just a note-taking app—it&apos;s a workspace where you <strong className="text-orange-600">write your ideas</strong>, <strong className="text-orange-600">break them into clear steps</strong>, <strong className="text-orange-600">see them as a visual flow</strong>, and <strong className="text-orange-600">track your progress</strong> as you actually get things done.
          </p>
          <p className="text-black/70 leading-relaxed">
            Think of it as a combination of a structured notebook, a project planner, and a progress tracker—all in one place.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-28 px-6 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(249,115,22,0.2)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_rgba(249,115,22,0.1)_0%,_transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">Vision</span>
          <blockquote className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            To help people move from <span className="text-orange-400">thinking to doing</span>.
          </blockquote>
          <p className="text-lg text-white/90 leading-relaxed mb-6">
            Most tools let you write ideas—few help you structure and act on them. Stratabin closes that gap by combining writing, planning, visualization, and execution in one system.
          </p>
          <p className="text-white/70 leading-relaxed">
            Whether you&apos;re planning a project, organizing thoughts for a presentation, or turning a side idea into a real plan, Stratabin keeps everything structured and actionable.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 px-6 bg-gradient-to-b from-[#fafafa] to-white">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            What you can do with Stratabin
          </h2>
          <p className="text-black/70 mb-16 max-w-2xl text-lg">
            Two workspaces—one for yourself, one for your team. Both let you organize ideas, plan execution, and track progress.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group p-10 rounded-3xl bg-white border border-black/[0.06] shadow-card hover:shadow-card-hover hover:border-orange-200 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-orange-500/20">1</div>
              <h3 className="text-2xl font-bold text-black mb-6">Individual Workspace</h3>
              <p className="text-black/75 leading-relaxed mb-6">
                For your personal projects and ideas. Create folders and add unlimited projects. Each project is a structured document where you can:
              </p>
              <ul className="text-black/70 space-y-3 text-sm leading-relaxed">
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▸</span> Write ideas in sections, visualize as a flow</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▸</span> Create tasks with timelines and phases</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▸</span> Use Strab AI to organize messy thoughts</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▸</span> Move, merge, or duplicate projects</li>
              </ul>
            </div>

            <div className="group p-10 rounded-3xl bg-white border border-black/[0.06] shadow-card hover:shadow-card-hover hover:border-orange-200 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-orange-500/20">2</div>
              <h3 className="text-2xl font-bold text-black mb-6">Team Workspace</h3>
              <p className="text-black/75 leading-relaxed mb-6">
                For collaborating with others. Create shared folders, invite members, and work on the same projects together.
              </p>
              <ul className="text-black/70 space-y-3 text-sm leading-relaxed">
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▸</span> Shared editing and structured collaboration</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▸</span> Shared goals and progress tracking</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▸</span> Strab AI for team insights</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▸</span> <strong>Team roles</strong> — Admins can set who is Admin or Member; the workspace owner stays fixed</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▸</span> <strong>Daily tasks</strong> — Add tasks by date, assign to team members (or yourself), mark them done, and filter to see only your tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-28 px-6 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(249,115,22,0.08)_0%,_transparent_30%,_transparent_70%,_rgba(249,115,22,0.05)_100%)]" />
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">How it works</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Five steps from idea to done</h2>
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-orange-500/50 via-orange-400/30 to-orange-500/50 hidden md:block" />
            <div className="space-y-0">
              {[
                { step: 1, title: "Write your ideas", desc: "Put your thoughts down in a structured format instead of scattered notes." },
                { step: 2, title: "Structure into sections", desc: "Break content into clear sections and expand each step by step." },
                { step: 3, title: "Visualize as a flow", desc: "See how each step connects and where your plan is heading." },
                { step: 4, title: "Plan tasks and timelines", desc: "Create tasks, set phases, and define when things need to happen." },
                { step: 5, title: "Execute and track progress", desc: "Complete tasks, report progress, and keep everything in one place." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-8 items-start py-6 relative group">
                  <span className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/30 flex items-center justify-center text-orange-400 font-bold border-2 border-orange-500/50 group-hover:bg-orange-500/40 transition-colors">
                    {step}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-1">{title}</h4>
                    <p className="text-white/70">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/50 text-sm mt-12 italic">Everything happens in one place. No switching between tools.</p>
        </div>
      </section>

      {/* Summary */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">One system for it all</h2>
          <p className="text-xl text-white/95 mb-8 leading-relaxed">
            Organize thinking · Structure ideas · Plan execution · Track progress · Collaborate
          </p>
          <p className="text-white/80 mb-10">
            Stratabin is evolving—enhanced AI, deeper integrations, and stronger collaboration tools coming soon.
          </p>
          <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold transition-all duration-300 border-2 border-white/30 hover:border-white/50 backdrop-blur-sm">
            Visit stratabin.com for more details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-28 px-6 bg-gradient-to-b from-[#f5f5f5] to-[#e8e8e8]">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4 text-center">About Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-16">Meet the founder</h2>

          <div className="relative bg-white rounded-[2rem] shadow-2xl border border-black/[0.04] overflow-hidden">
            <div className="absolute inset-0">
              <AboutParticlesWrapper />
            </div>
            <div className="relative flex flex-col lg:flex-row gap-16 items-center p-12 lg:p-16 z-10 pointer-events-none">
              <div className="flex-1 min-h-[340px] flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl border-2 border-orange-200/50 shadow-inner">
                <div className="w-52 h-52 text-orange-500/90 drop-shadow-lg">
                  <ManIcon className="w-full h-full" />
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 text-orange-600 text-xs font-bold tracking-widest border border-orange-200">
                  FOUNDER
                </span>
                <h3 className="text-3xl font-bold text-black">
                  Abhinand Antony <span className="text-gradient">aka Roschil</span>
                </h3>
                <p className="text-orange-600 font-semibold text-lg">Self-taught AI augmented dev / System Architect</p>
                <p className="text-black/80 text-lg">Automotive / Aerospace Devotee</p>
                <p className="text-black/70 leading-relaxed">
                  Building Stratabin to help people move from thinking to doing. Passionate about structured systems, clean architecture, and turning complex ideas into actionable plans.
                </p>
                <div className="space-y-4 pointer-events-auto">
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/roschh3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium transition-colors">
                      Instagram
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                    <a href="https://www.linkedin.com/in/roshil-antony-kj-9b73a92b9/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium transition-colors">
                      LinkedIn
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                  <div>
                    <p className="text-black/60 text-sm font-medium mb-2">Projects</p>
                    <div className="flex flex-wrap gap-3">
                      <a href="https://wilifunkgame.xyz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/5 hover:bg-orange-100 text-black hover:text-orange-600 font-medium transition-colors border border-black/5">
                        wilifunkgame.xyz
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                      <a href="https://gubicoolens.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/5 hover:bg-orange-100 text-black hover:text-orange-600 font-medium transition-colors border border-black/5">
                        gubicoolens.com
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-lg transition-colors">
            stratabin.com
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
          <p className="text-white/40 text-sm mt-4">© {new Date().getFullYear()} Stratabin. Built with care.</p>
        </div>
      </footer>
    </div>
  );
}
