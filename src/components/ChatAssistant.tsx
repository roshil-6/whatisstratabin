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
    content: "Stratabin offers: (1) Workspaces — Individual (private) or Team (shared with members). (2) Strategy — Writing planner + flow canvas to map ideas, questions, and decisions. (3) Projects — Organize work with folders, statuses, and progress tracking. (4) AI & Reports — Strab AI helps clarify ideas; reports show progress. (5) Community — Connect with other Stratabin users. (6) Extras — Calendar, tasks, timeline, and more.",
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
    content: "Invite people by email or username. Admins can invite others and manage daily tasks. Members can work on shared projects. Choose if the workspace is private or visible to others. Assign projects to team members and add daily tasks with checkboxes.",
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center overflow-hidden bg-white border border-orange-200/50 hover:scale-105 hover:shadow-xl transition-all duration-300"
        aria-label="Open chat assistant"
      >
        <Image src={EMOJI_URL} alt="Chat" width={56} height={56} className="object-cover w-full h-full" />
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md rounded-2xl bg-white border border-black/10 shadow-2xl overflow-hidden flex flex-col max-h-[70vh] animate-slide-up">
          <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-black/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-orange-200/50">
              <Image src={EMOJI_URL} alt="Assistant" width={40} height={40} className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="font-semibold text-black text-sm">Stratabin Guide</p>
              <p className="text-xs text-black/60">Tap a question to explore</p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 hover:bg-black/10 text-black/70 hover:text-black transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <p className="text-black/70 text-sm">Hi! 👋 Ask me anything about Stratabin:</p>
                <div className="flex flex-wrap gap-2">
                  {FIXED_QUESTIONS.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuestionClick(q)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        revealed.has(q.id)
                          ? "bg-orange-100 text-orange-700 border border-orange-200/50"
                          : "bg-orange-50 text-orange-700 border border-orange-200/30 hover:bg-orange-100 hover:border-orange-200/60 hover:shadow-sm"
                      }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${m.role === "user" ? "bg-orange-100 text-orange-900 px-4 py-2 rounded-2xl rounded-tr-sm" : "bg-black/[0.04] text-black px-4 py-3 rounded-2xl rounded-tl-sm"}`}>
                  {m.role === "user" ? (
                    <p className="text-sm font-medium">{m.content}</p>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-black/80 text-sm leading-relaxed">{m.content}</p>
                      {m.video && (
                        <div className="rounded-xl overflow-hidden border border-black/5 bg-black/5 aspect-video mt-2">
                          <video src={m.video} controls className="w-full h-full object-cover" playsInline>
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      {m.followUps && m.followUps.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {m.followUps.map((f, j) => (
                            <button
                              key={j}
                              onClick={() => handleFollowUp(f.label, f.content)}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200/40 hover:bg-orange-100 transition-colors"
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
            <div className="p-4 pt-0 border-t border-black/5">
              <p className="text-xs text-black/50 mb-2">More questions:</p>
              <div className="flex flex-wrap gap-2">
                {FIXED_QUESTIONS.filter((q) => !revealed.has(q.id)).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionClick(q)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200/40 hover:bg-orange-100 transition-colors"
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
