"use client";

import { useState } from "react";
import Image from "next/image";

const EMOJI_URL = "https://img.freepik.com/free-psd/3d-rendering-emoji-icon_23-2149878818.jpg?semt=ais_hybrid&w=740&q=80";

type ChatMessage = { role: "bot" | "user"; content: string; video?: string; followUps?: { label: string; content: string }[] };

const FIXED_QUESTIONS = [
  {
    id: "stratabin",
    label: "Know about Stratabin!",
    content: "Stratabin is a structured workspace that helps you turn scattered ideas into clear plans and actionable execution. Instead of writing notes that go nowhere, you organize ideas, visualize them as a flow, create tasks, and track progress—all in one place.",
    followUps: [
      { label: "How is it different from note apps?", content: "Most note apps let you write—few help you structure and act. Stratabin combines writing, planning, flow visualization, and task execution in one system. You can break ideas into sections, see how steps connect, and track what you've actually completed." },
      { label: "What can I do with it?", content: "Create projects, map strategies on a visual canvas, add tasks with checkboxes, use AI (Strab AI) to organize messy thoughts, and collaborate with teams. You get workspaces, timelines, reports, and a community—all in one platform." },
    ],
  },
  {
    id: "features",
    label: "What are the main features?",
    content: "Stratabin offers: (1) Workspaces — Individual (private) or Team (shared with members). Team workspaces include a group chat; anyone who joins via the admin link is auto-added to it. (2) Strategy — Writing planner + flow canvas to map ideas, questions, and decisions. (3) Projects — Organize work with folders, statuses, and progress tracking. (4) AI & Reports — Strab AI helps clarify ideas; reports show progress. (5) Community — Connect with other Stratabin users. (6) Extras — Calendar, tasks, timeline, and more.",
  },
  {
    id: "individual",
    label: "Individual workspace breakdown",
    content: "Your own private space. Only you can see it. Add as many projects as you need. Perfect for solo planning, personal goals, or organizing ideas before sharing with a team.",
    video: "/videos/strtabin%20ad%203.mp4",
  },
  {
    id: "team",
    label: "Team workspace breakdown",
    content: "Invite people by email or username, or share an admin-provided link. When someone joins via that link, they are automatically added to the workspace and to its group chat. Admins can invite others and manage daily tasks. Members can work on shared projects and chat together. Choose if the workspace is private or visible to others. Assign projects to team members and add daily tasks with checkboxes.",
    video: "/videos/workspace%20stratabin.mp4",
  },
  {
    id: "get-started",
    label: "How do I get started?",
    content: "Visit stratabin.com to sign up and create your first workspace. Start with an Individual workspace to explore projects, the flow canvas, and tasks. When you're ready, create a Team workspace to collaborate with others.",
  },
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const handleQuestionClick = (q: (typeof FIXED_QUESTIONS)[0]) => {
    const alreadyRevealed = revealed.has(q.id);
    if (alreadyRevealed) return;

    setRevealed((prev) => new Set(prev).add(q.id));
    const msg: ChatMessage = {
      role: "bot",
      content: q.content,
      video: q.video,
      followUps: q.followUps,
    };
    setMessages((prev) => [...prev, { role: "user", content: q.label }, msg]);
  };

  const handleFollowUp = (label: string, content: string) => {
    setMessages((prev) => [...prev, { role: "user", content: label }, { role: "bot", content }]);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl shadow-[0_8px_32px_rgba(249,115,22,0.25)] flex items-center justify-center overflow-hidden bg-white border-2 border-orange-200/60 hover:scale-105 hover:shadow-[0_12px_40px_rgba(249,115,22,0.35)] hover:border-orange-300/80 transition-all duration-300"
        aria-label="Open chat assistant"
      >
        <Image src={EMOJI_URL} alt="Chat" width={64} height={64} className="object-cover w-full h-full" />
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-[calc(100vw-3rem)] max-w-[420px] rounded-3xl bg-white/95 backdrop-blur-xl border border-orange-200/30 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col max-h-[72vh] animate-slide-up">
          {/* Header */}
          <div className="relative px-5 py-4 bg-gradient-to-br from-orange-50 via-amber-50/80 to-orange-100/60 border-b border-orange-200/40">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.08)_0%,_transparent_60%)]" />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-orange-200/50 shadow-md">
                <Image src={EMOJI_URL} alt="Assistant" width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-black text-base">Stratabin Guide</p>
                <p className="text-xs text-black/55 truncate">Tap any question to explore</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-black/5 hover:bg-black/10 text-black/60 hover:text-black transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[linear-gradient(180deg,_#fafafa_0%,_#f5f5f5_100%)]">
            {messages.length === 0 && (
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 text-lg">👋</div>
                  <div>
                    <p className="text-black/80 text-sm font-medium">Hi! Ask me anything about Stratabin.</p>
                    <p className="text-black/50 text-xs mt-1">Choose a question below to get started.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-black/50 uppercase tracking-wider">Quick questions</p>
                  <div className="flex flex-wrap gap-2">
                    {FIXED_QUESTIONS.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => handleQuestionClick(q)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                          revealed.has(q.id)
                            ? "bg-orange-200/40 text-orange-800 border-2 border-orange-300/50 shadow-sm"
                            : "bg-white text-orange-700 border border-orange-200/50 hover:bg-orange-50 hover:border-orange-300/60 hover:shadow-md shadow-sm"
                        }`}
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] ${m.role === "user" ? "order-2" : "order-1"}`}>
                  {m.role === "user" ? (
                    <div className="px-4 py-2.5 rounded-2xl rounded-br-md bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
                      <p className="text-sm font-medium">{m.content}</p>
                    </div>
                  ) : (
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-black/6 shadow-sm">
                      <p className="text-black/85 text-sm leading-relaxed">{m.content}</p>
                      {m.video && (
                        <div className="rounded-xl overflow-hidden border border-black/8 bg-black/5 aspect-video mt-3 shadow-inner">
                          <video src={m.video} controls className="w-full h-full object-cover" playsInline>
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      {m.followUps && m.followUps.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-3 mt-2 border-t border-black/5">
                          {m.followUps.map((f, j) => (
                            <button
                              key={j}
                              onClick={() => handleFollowUp(f.label, f.content)}
                              className="px-3 py-2 rounded-lg text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200/50 hover:bg-orange-100 hover:border-orange-300/60 transition-colors"
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {messages.length > 0 && (
            <div className="p-4 pt-2 border-t border-black/5 bg-white/80">
              <p className="text-xs font-medium text-black/45 mb-2">More to explore</p>
              <div className="flex flex-wrap gap-2">
                {FIXED_QUESTIONS.filter((q) => !revealed.has(q.id)).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionClick(q)}
                    className="px-3 py-2 rounded-lg text-xs font-medium bg-orange-50/80 text-orange-700 border border-orange-200/40 hover:bg-orange-100 hover:border-orange-200/60 transition-colors"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
