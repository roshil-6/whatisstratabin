"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AboutParticlesWrapper } from "@/components/SceneWrapper";
import ManIcon from "@/components/ManIcon";
import ChatAssistant from "@/components/ChatAssistant";
import CardTilt from "@/components/CardTilt";

const FAQ_ITEMS = [
  { q: "What is Stratabin?", a: "Stratabin is a structured workspace that helps you turn scattered ideas into clear plans and actionable execution. Instead of writing notes that go nowhere, you organize ideas, visualize them as a flow, create tasks, and track progress—all in one place." },
  { q: "How is Stratabin different from note-taking apps?", a: "Most note apps let you write—few help you structure and act. Stratabin combines writing, planning, flow visualization, and task execution in one system. You can break ideas into sections, see how steps connect, and track what you've actually completed." },
  { q: "Can I use Stratabin with my team?", a: "Yes. Stratabin has a Team Workspace where you can create shared folders, invite members via email or an admin link, and collaborate on projects. When someone joins via the admin link, they are automatically added to the workspace group chat. Admins can assign roles (Admin or Member) to team members. There's also a Daily Tasks feature where you can add tasks for the day, assign them to team members (or yourself), and track progress with checkboxes. Admins can manage everyone's tasks; members see and manage their own." },
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

const PERSONAL_FEATURES = [
  { title: "Private workspace", desc: "Your own space. Only you can see it. Add as many projects as you need—ideas, plans, and tasks stay yours.", icon: "◉" },
  { title: "Writing & Flow canvas", desc: "Structure ideas in sections, then map them visually. Add Idea, Question, and Decision cards. Connect steps with lines to see the full flow.", icon: "◇" },
  { title: "Task list", desc: "Break your strategy into clear tasks. Add, check off, or remove. Strikethrough shows what you’ve completed.", icon: "✓" },
  { title: "Timeline", desc: "Phases, milestones, and timeframes. Mark as planned, active, or done. Expand or collapse to focus.", icon: "⏱" },
  { title: "Calendar & planner", desc: "Month or week view. Add events, set times, get reminders. See what you did today and what’s next.", icon: "📅" },
  { title: "STRAB AI", desc: "AI assistant that knows your project. Ask what to do next, get reports, or organize messy thoughts into clear plans.", icon: "✦" },
  { title: "Dashboard", desc: "Streak, progress points, project count, tasks done. Pin projects, mark focus, switch between views in one place.", icon: "◐" },
  { title: "Reports", desc: "AI-generated snapshot: canvas summary, tasks, timeline, risks, and suggested next actions for any project.", icon: "📊" },
];

const TEAM_SECTIONS = [
  {
    id: "collab",
    title: "Collaboration",
    desc: "Shared workspaces, group chat, daily tasks, and project management.",
    image: "/stratabin-team-workspace.png",
    features: [
      { title: "Shared workspace", desc: "Invite members by email or username. Work on shared projects. Choose private or public visibility.", icon: "◈" },
  { title: "Group chat", desc: "Join via admin link and you’re auto-added. See typing indicators, unread counts, and stay in sync.", icon: "💬" },
  { title: "Daily tasks", desc: "Add tasks for the day, assign to members or yourself. Checkboxes to track. Admins manage everyone; members see their own.", icon: "☑" },
  { title: "Roles & permissions", desc: "Admin or Member. Admins invite, assign, manage daily tasks. Members collaborate on shared projects.", icon: "👤" },
      { title: "Project assignment", desc: "Assign projects to team members. See who owns what. Merge projects when paths converge.", icon: "➜" },
      { title: "Activity feed", desc: "Recent updates across the workspace. Who did what, when. Stay in the loop without extra meetings.", icon: "📡" },
    ],
  },
  {
    id: "community",
    title: "Community & Connect",
    desc: "Discover people, open profiles, chat, and control visibility.",
    image: "/stratabin-chat.png",
    features: [
      { title: "Community & discovery", desc: "Find people by username. Open profiles, send DMs, invite to workspaces. Browse public projects for inspiration.", icon: "🔍" },
      { title: "Profiles", desc: "LinkedIn-style profiles focused on projects and work.", icon: "👤" },
      { title: "Chat", desc: "DM any team member or connect via workspaces.", icon: "💬" },
      { title: "Join flow", desc: "Workspace ID or join link to onboard new members.", icon: "🔗" },
      { title: "Visibility control", desc: "Workspaces can be private or public. Control what others see. Share when you're ready.", icon: "🔒" },
    ],
  },
];

const NAV_LINKS = [
  { href: "#what-is-stratabin", label: "What is Stratabin" },
  { href: "#mission", label: "Mission" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
  { href: "#about", label: "About Us" },
  { href: "#about", label: "Founders" },
];

const MISSION_CARDS = [
  { id: "structured-thinking", title: "Structured thinking", desc: "Write ideas, break them into clear sections, and see them as a visual flow. No more scattered notes that go nowhere.", anchor: "#structured-thinking" },
  { id: "action-oriented", title: "Action-oriented", desc: "Create tasks, set timelines, and track progress. Everything you need to execute on your ideas—in one place.", anchor: "#action-oriented" },
  { id: "solo-or-team", title: "Solo or team", desc: "Work alone or invite your team. Shared workspaces, group chat, daily tasks, and roles—all built in.", anchor: "#solo-or-team" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [navOpen, setNavOpen] = useState(false);
  const featuresRef = useRef<HTMLElement>(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [expandedMission, setExpandedMission] = useState<string | null>(null);
  const [expandedTeamSection, setExpandedTeamSection] = useState<string | null>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFeaturesVisible(true); }, { threshold: 0.1 });
    const el = featuresRef.current;
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation - Jeton/Osmo style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-display font-bold text-sm">S</span>
            <span className="text-lg font-display font-bold text-black tracking-tight">Stratabin guide</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-medium text-black/60 hover:text-black transition-colors">
                {link.label}
              </a>
            ))}
            <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors">
              Get Started
            </a>
          </div>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10" aria-label="Toggle menu">
            {navOpen ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-black/5 shadow-lg">
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setNavOpen(false)} className="py-3 px-4 rounded-lg text-sm font-medium text-black/80 hover:bg-black/5">
                  {link.label}
                </a>
              ))}
              <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" onClick={() => setNavOpen(false)} className="py-3 px-4 rounded-lg text-sm font-medium text-orange-600 hover:bg-orange-50 mt-2">Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero - Jeton/Osmo style: single value prop, bold typography */}
      <section id="what-is-stratabin" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-24 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-6">One workspace for ideas that become reality</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-8">
            Turn ideas <br className="hidden sm:block" />
            <span className="text-orange-400">into action</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            A structured workspace designed to turn scattered ideas into clear plans and actionable execution. Organize, visualize, and execute—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300">
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#features" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/5 font-medium transition-colors">
              Explore features
            </a>
          </div>
        </div>
      </section>

      {/* Mission cards - clickable, fading, transitional */}
      <section id="mission" className="py-24 px-6 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">Our Mission</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-4">
            Beyond note-taking — <span className="text-orange-600">our mission</span>
          </h2>
          <p className="text-black/60 max-w-2xl mb-16 text-lg">We help you move from thinking to doing.</p>
          <div className="grid md:grid-cols-3 gap-8 [perspective:1000px]">
            {MISSION_CARDS.map((card, i) => (
              <CardTilt
                key={card.id}
                href={card.anchor}
                onClick={() => setExpandedMission(card.id)}
                className="group block p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/[0.04] hover:border-orange-200/60 hover:bg-orange-50/40 hover:shadow-drop-lg opacity-0 animate-fade-in will-change-transform"
                style={{ animationDelay: `${(i + 1) * 150}ms`, animationFillMode: "forwards" } as React.CSSProperties}
                maxTilt={10}
              >
                <span className="text-3xl font-display font-bold text-orange-500/60 group-hover:text-orange-600 transition-colors duration-300">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl font-bold text-black mb-3 group-hover:text-orange-600 transition-colors duration-300">{card.title}</h3>
                <p className="text-black/70 leading-relaxed mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-orange-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </CardTilt>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — Structured thinking (expand on touch) */}
      <section id="structured-thinking" className="py-24 px-6 bg-gradient-to-b from-orange-50/30 to-white scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setExpandedMission(expandedMission === "structured-thinking" ? null : "structured-thinking")} className="w-full text-left">
            <span className="text-4xl font-display font-bold text-orange-500/50">01</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-2 mb-2">Structured thinking</h2>
            <p className="text-lg text-black/80 max-w-2xl">Move from messy notes to a clear, visible strategy.</p>
            <span className="inline-flex items-center gap-2 mt-4 text-orange-500 font-medium text-sm">
              {expandedMission === "structured-thinking" ? "Tap to collapse" : "Tap to reveal details"}
              <svg className={`w-4 h-4 transition-transform ${expandedMission === "structured-thinking" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
          </button>
          {expandedMission === "structured-thinking" && (
          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center mb-16 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-drop-lg aspect-[4/3] animate-slide-up" style={{ animationDelay: "0ms", animationFillMode: "forwards" } as React.CSSProperties}>
              <Image src="/stratabin-split-workspace.png" alt="Writing and flow canvas" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="space-y-4 [perspective:800px]">
              {[
                { title: "Visual flow", desc: "Ideas live on a canvas as nodes, with connections so you see relationships (e.g. “Marketing” → “Launch plan” → “Tasks”)." },
                { title: "Organized writing", desc: "Long-form editor (Writing Section) lets you break thoughts into sections, which you can map onto the canvas." },
                { title: "Branching & merging", desc: "Split one idea into branches or merge multiple projects into one strategy." },
                { title: "Strategy map", desc: "Nodes map your logic; writing section holds the explanation." },
                { title: "No more scatter", desc: "One place to capture ideas, structure them, and see how they connect." },
              ].map((item, i) => (
                <div key={i} className="card-transitional p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-black/[0.04] hover:border-orange-200/50 hover:shadow-drop animate-slide-up" style={{ animationDelay: `${(i + 1) * 80}ms`, animationFillMode: "forwards" } as React.CSSProperties}>
                  <h4 className="font-display font-bold text-black mb-1">{item.title}</h4>
                  <p className="text-black/65 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          )}
          {expandedMission === "structured-thinking" && <p className="text-orange-600 font-semibold">Summary: Visual structure for ideas instead of scattered notes.</p>}
        </div>
      </section>

      {/* 02 — Action-oriented (expand on touch) */}
      <section id="action-oriented" className="py-24 px-6 bg-white scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setExpandedMission(expandedMission === "action-oriented" ? null : "action-oriented")} className="w-full text-left">
            <span className="text-4xl font-display font-bold text-orange-500/50">02</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-2 mb-2">Action-oriented</h2>
            <p className="text-lg text-black/80 max-w-2xl">Turn strategy into execution, in one place.</p>
            <span className="inline-flex items-center gap-2 mt-4 text-orange-500 font-medium text-sm">
              {expandedMission === "action-oriented" ? "Tap to collapse" : "Tap to reveal details"}
              <svg className={`w-4 h-4 transition-transform ${expandedMission === "action-oriented" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
          </button>
          {expandedMission === "action-oriented" && (
          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center mb-16 animate-fade-in">
            <div className="space-y-4 order-2 lg:order-1 [perspective:800px]">
              {[
                { title: "Tasks", desc: "To-do lists tied to each project; completion tracked and shown on cards." },
                { title: "Timelines", desc: "Timeline view for phases, milestones, and dependencies." },
                { title: "Calendar", desc: "Strategic calendar for long-term planning; Weekly Planner for day-by-day execution." },
                { title: "“What did I execute today?”", desc: "Monitor view for today’s output, blockers, and tomorrow’s focus." },
                { title: "Progress", desc: "Tasks done %, node counts, word counts, streaks, and execution logs." },
                { title: "STRAB AI", desc: "Analysis, reports, and recommendations to spot gaps and next steps." },
                { title: "Reports", desc: "AI-powered project reports, insights, and recommendations." },
              ].map((item, i) => (
                <div key={i} className="card-transitional p-5 rounded-xl bg-white border border-black/[0.04] hover:border-orange-200/50 hover:shadow-drop animate-slide-up" style={{ animationDelay: `${(i + 1) * 60}ms`, animationFillMode: "forwards" } as React.CSSProperties}>
                  <h4 className="font-display font-bold text-black mb-1">{item.title}</h4>
                  <p className="text-black/65 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-drop-lg aspect-[4/3] order-1 lg:order-2 animate-slide-up" style={{ animationDelay: "0ms", animationFillMode: "forwards" } as React.CSSProperties}>
              <Image src="/stratabin-dashboard.png" alt="Dashboard and task execution" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
          )}
          {expandedMission === "action-oriented" && <p className="text-orange-600 font-semibold">Summary: Built-in tasks, timelines, calendar, and execution tracking.</p>}
        </div>
      </section>

      {/* 03 — Solo or team (expand on touch) */}
      <section id="solo-or-team" className="py-24 px-6 bg-gradient-to-b from-[#fafafa] to-orange-50/20 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setExpandedMission(expandedMission === "solo-or-team" ? null : "solo-or-team")} className="w-full text-left">
            <span className="text-4xl font-display font-bold text-orange-500/50">03</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-2 mb-2">Solo or team</h2>
            <p className="text-lg text-black/80 max-w-2xl">Use the same system for personal work and team collaboration.</p>
            <span className="inline-flex items-center gap-2 mt-4 text-orange-500 font-medium text-sm">
              {expandedMission === "solo-or-team" ? "Tap to collapse" : "Tap to reveal details"}
              <svg className={`w-4 h-4 transition-transform ${expandedMission === "solo-or-team" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
          </button>
          {expandedMission === "solo-or-team" && (
          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center mb-16 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-drop-lg aspect-[4/3] animate-slide-up" style={{ animationDelay: "0ms", animationFillMode: "forwards" } as React.CSSProperties}>
              <Image src="/stratabin-team-workspace.png" alt="Team workspace" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 [perspective:800px]">
              {[
                { title: "Solo", desc: "Personal projects, folders, and a clean workspace." },
                { title: "Team workspaces", desc: "Create workspaces, invite members, and assign roles (e.g. admin)." },
                { title: "Projects", desc: "Shared projects with status (Idea, Planning, Executing, Completed)." },
                { title: "Daily tasks", desc: "Shared task lists and daily tasks by team member." },
                { title: "Community", desc: "Feed, People, and Chats for activity, connections, and messaging." },
                { title: "Profiles", desc: "LinkedIn-style profiles focused on projects and work." },
                { title: "Chat", desc: "DM any team member or connect via workspaces." },
                { title: "Join flow", desc: "Workspace ID or join link to onboard new members." },
              ].map((item, i) => (
                <div key={i} className="card-transitional p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.04] hover:border-orange-200/50 hover:shadow-drop animate-card-in" style={{ animationDelay: `${(i + 1) * 70}ms`, animationFillMode: "forwards" } as React.CSSProperties}>
                  <h4 className="font-display font-bold text-black text-sm mb-1">{item.title}</h4>
                  <p className="text-black/65 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          )}
          {expandedMission === "solo-or-team" && <p className="text-orange-600 font-semibold">Summary: Works for individuals and teams with shared workspaces, chat, and community.</p>}
        </div>
      </section>

      {/* In Plain Terms */}
      <section className="py-24 px-6 bg-[#fafafa] relative">
        <div className="max-w-3xl mx-auto pl-0 md:pl-8 relative">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-orange-300 rounded-full" />
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-6">In Plain Terms</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-6 leading-tight">
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

      {/* Vision + Dual path - Phamily "Et vous?" style */}
      <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(249,115,22,0.2)_0%,_transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">Vision</span>
          <blockquote className="font-display text-3xl md:text-4xl font-bold mb-8 leading-tight">
            To help people move from <span className="text-orange-400">thinking to doing</span>.
          </blockquote>
          <p className="text-lg text-white/90 leading-relaxed mb-12">
            Most tools let you write ideas—few help you structure and act on them. Stratabin closes that gap.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <a href="#features" className="group block p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-white/[0.07] transition-all duration-300">
              <h4 className="font-display text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">Solo planning</h4>
              <p className="text-white/70 text-sm">Your own workspace. Organize ideas, create flows, track tasks—everything private.</p>
              <span className="inline-flex items-center gap-2 mt-4 text-orange-400 font-medium text-sm">Learn more →</span>
            </a>
            <a href="#features" className="group block p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-white/[0.07] transition-all duration-300">
              <h4 className="font-display text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">Team collaboration</h4>
              <p className="text-white/70 text-sm">Shared workspaces, group chat, daily tasks, and roles. Invite your team and ship together.</p>
              <span className="inline-flex items-center gap-2 mt-4 text-orange-400 font-medium text-sm">Learn more →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features - reactive cards, Personal & Team */}
      <section id="features" ref={featuresRef} className="py-28 px-6 bg-gradient-to-b from-white to-[#fafafa] scroll-mt-24 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">Features</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-4">
            Explore Stratabin
          </h2>
          <p className="text-black/60 mb-16 max-w-2xl text-lg">
            From solo planning to team collaboration—reactive cards for every capability.
          </p>

          {/* Personal Workspace */}
          <div className="mb-24">
            <h3 className="font-display text-xl md:text-2xl font-bold text-black mb-2 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">◉</span>
              Personal Workspace
            </h3>
            <p className="text-black/60 mb-8 max-w-xl">Your private space. Organize ideas, structure plans, and execute—all yours.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 [perspective:1000px]">
              {PERSONAL_FEATURES.map((f, i) => (
                <CardTilt
                  key={i}
                  className={`group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-black/[0.06] shadow-drop hover:shadow-drop-lg ${featuresVisible ? "animate-card-in" : "opacity-0"}`}
                  style={featuresVisible ? { animationDelay: `${i * 60}ms`, animationFillMode: "forwards" } : undefined}
                  maxTilt={6}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <span className="inline-flex w-11 h-11 rounded-xl bg-orange-100 text-orange-600 items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-400">
                    {f.icon}
                  </span>
                  <h4 className="font-display font-bold text-black mb-2 group-hover:text-orange-600 transition-colors duration-300">{f.title}</h4>
                  <p className="text-black/65 text-sm leading-relaxed">{f.desc}</p>
                </CardTilt>
              ))}
            </div>
          </div>

          {/* Team Workspace - section-wise, expand on touch */}
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-black mb-2 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-orange-200/60 text-orange-600 flex items-center justify-center font-bold text-sm">◈</span>
              Team Workspace
            </h3>
            <p className="text-black/60 mb-8 max-w-xl">Share, collaborate, and ship together. Tap a section to reveal.</p>
            <div className="space-y-6">
              {TEAM_SECTIONS.map((sec) => (
                <div key={sec.id} className="rounded-2xl border border-black/[0.06] overflow-hidden">
                  <button
                    onClick={() => setExpandedTeamSection(expandedTeamSection === sec.id ? null : sec.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-orange-50/30 transition-colors"
                  >
                    <div>
                      <h4 className="font-display font-bold text-black">{sec.title}</h4>
                      <p className="text-black/60 text-sm mt-1">{sec.desc}</p>
                    </div>
                    <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-orange-100 text-orange-600 transition-transform ${expandedTeamSection === sec.id ? "rotate-180" : ""}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </button>
                  {expandedTeamSection === sec.id && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="grid lg:grid-cols-2 gap-8 items-start">
                        <div className="relative rounded-xl overflow-hidden shadow-drop aspect-[4/3] opacity-0 animate-slide-up" style={{ animationDelay: "0ms", animationFillMode: "forwards" } as React.CSSProperties}>
                          <Image src={sec.image} alt={sec.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 [perspective:800px]">
                          {sec.features.map((f, i) => (
                            <CardTilt
                              key={i}
                              className="card-transitional group relative p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.04] hover:border-orange-200/50 hover:shadow-drop opacity-0 animate-card-in"
                              style={{ animationDelay: `${(i + 1) * 80}ms`, animationFillMode: "forwards" } as React.CSSProperties}
                              maxTilt={4}
                            >
                              <span className="inline-flex w-9 h-9 rounded-lg bg-orange-100 text-orange-600 items-center justify-center font-bold text-sm mb-3">{f.icon}</span>
                              <h5 className="font-display font-bold text-black text-sm mb-1">{f.title}</h5>
                              <p className="text-black/65 text-xs leading-relaxed">{f.desc}</p>
                            </CardTilt>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 font-semibold transition-all duration-300 hover:scale-105 shadow-sm">
              Try Stratabin
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* How it works - Phamily numbered steps 01, 02... */}
      <section className="py-28 px-6 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(249,115,22,0.08)_0%,_transparent_30%,_transparent_70%,_rgba(249,115,22,0.05)_100%)]" />
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">How it works</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Five steps from idea to done</h2>
          <p className="text-white/60 mb-16 max-w-xl">Everything happens in one place. No switching between tools.</p>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Write", desc: "Put your thoughts down in a structured format instead of scattered notes." },
              { step: "02", title: "Structure", desc: "Break content into clear sections and expand each step by step." },
              { step: "03", title: "Visualize", desc: "See how each step connects and where your plan is heading." },
              { step: "04", title: "Plan", desc: "Create tasks, set phases, and define when things need to happen." },
              { step: "05", title: "Execute", desc: "Complete tasks, report progress, and keep everything in one place." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="group">
                <span className="font-display text-4xl font-bold text-orange-500/50 group-hover:text-orange-400 transition-colors">{step}</span>
                <h4 className="font-display font-bold text-white text-lg mt-2 mb-2">{title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Jeton/Osmo style */}
      <section className="py-28 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">Hear it from users</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-4">Built for people who ship</h2>
          <p className="text-black/60 mb-12 max-w-xl">Stratabin helps you move from idea to execution—faster.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Finally, a workspace that actually helps me turn ideas into action. The flow canvas is a game-changer.", author: "Product manager", tag: "Solo user" },
              { quote: "Our team uses Stratabin for every project. Daily tasks, shared workspaces, and the AI reports keep us aligned.", author: "Startup founder", tag: "Team" },
              { quote: "From scattered notes to a clear plan in one place. Stratabin is exactly what I needed.", author: "Writer & consultant", tag: "Solo user" },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow">
                <p className="text-black/80 mb-4 leading-relaxed">{t.quote}</p>
                <span className="text-orange-500 text-xs font-semibold uppercase tracking-wide">{t.tag}</span>
                <p className="text-black/60 text-sm mt-1">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary CTA - Jeton style */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">One system for it all</h2>
          <p className="text-xl text-white/95 mb-8 leading-relaxed">
            Organize thinking · Structure ideas · Plan execution · Track progress · Collaborate
          </p>
          <p className="text-white/80 mb-10">
            Stratabin is evolving—enhanced AI, deeper integrations, and stronger collaboration tools coming soon.
          </p>
          <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-orange-600 hover:bg-white/95 font-semibold transition-all duration-300 shadow-lg">
            Get started at stratabin.com
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-12">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-28 px-6 bg-[#f5f5f5]">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4 text-center">About Us</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-black text-center mb-16">Meet the founder</h2>

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
                      <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/5 hover:bg-orange-100 text-black hover:text-orange-600 font-medium transition-colors border border-black/5">
                        stratabin.com
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
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

      {/* Chat assistant */}
      <ChatAssistant />

      {/* Footer - Jeton/Osmo style */}
      <footer className="py-16 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="font-display font-bold text-white hover:text-orange-400 transition-colors">
              stratabin.com
            </a>
            <div className="flex flex-wrap gap-8 justify-center text-sm text-white/50">
              <a href="#what-is-stratabin" className="hover:text-white transition-colors">Product</a>
              <a href="#mission" className="hover:text-white transition-colors">Mission</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
            </div>
            <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors">
              Get Started
            </a>
          </div>
          <p className="text-white/40 text-sm mt-10 text-center">© {new Date().getFullYear()} Stratabin. Built with care.</p>
        </div>
      </footer>
    </div>
  );
}
