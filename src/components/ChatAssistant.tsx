"use client";

import { useState } from "react";
import Image from "next/image";

const EMOJI_URL = "https://thumbs.dreamstime.com/b/d-icon-avatar-cartoon-boy-glasses-smiling-wearing-yellow-sweater-concept-happiness-warmth-344043680.jpg";

type ChatMessage = { role: "bot" | "user"; content: string; video?: string; followUps?: { label: string; content: string }[] };

const FIXED_QUESTIONS = [
  {
    id: "stratabin",
    label: "Start here — what is Stratabin?",
    content: "Bottom line: Stratabin helps you stop losing ideas in random notes. You see your thinking as a map, write the plan, schedule and do the work, and optionally use AI (STRAB) to create new plans or sharpen the one you\u2019re already on\u2014from the dashboard and inside each project. In one sentence: think on the map \u2192 write it down \u2192 turn it into tasks and dates \u2192 use AI to stay on track.",
    followUps: [
      { label: "Dashboard vs inside a project?", content: "The dashboard is your home screen: all projects, folders, STRAB in the header for brand-new AI plans, profile, community, How to use. Inside a project is one workspace for that goal: flow map, writing, tasks, timeline & calendar, and STRAB that knows that project." },
      { label: "The two STRABs?", content: "STRAB from the main dashboard (header): \u201cI want to start something new and have AI help me build the first version of the plan.\u201d STRAB inside a project: \u201cI\u2019m already working on this\u2014help me improve it, question it, and summarize it.\u201d That\u2019s the main split." },
    ],
  },
  {
    id: "dashboard",
    label: "Your dashboard (home screen)",
    content: "This is where you see all your projects. A project is one big goal or idea\u2014like launch a product, plan a wedding, or grow the business. You can start a blank project and fill it in yourself, or use STRAB in the header when you want AI to help create a whole new plan from scratch (ideas, connections, and notes sketched out). You can also sort projects into folders, join team workspaces, open your profile, visit the community, or open How to use for the guide again.",
  },
  {
    id: "inside-project",
    label: "Inside one project",
    content: "You get one workspace for that goal. Most people use: Strategy / flow view\u2014a map of ideas (boxes and links), not just a long document. Writing\u2014overview, plans, notes in the same project. Tasks\u2014break work into todos and check them off. Timeline & calendar\u2014dates and phases so there\u2019s a when, not only a what. STRAB for this project knows that workspace: summaries, risks, what to do next, reports\u2014like a coach that\u2019s read your map, tasks, and writing.",
  },
  {
    id: "guide-site",
    label: "The guide website",
    content: "guide.stratabin.com is the friendly explanation: what Stratabin is, why it exists, and how it\u2019s meant to help you go from \u201cI have an idea\u201d to \u201cI\u2019m actually doing it.\u201d You can open it from the app whenever you want that story in normal language.",
  },
  {
    id: "individual",
    label: "Individual workspace (video)",
    content: "Your own private space. Only you can see it. Add as many projects as you need. Perfect for solo planning, personal goals, or organizing ideas before sharing with a team.",
    video: "/videos/strtabin%20ad%203.mp4",
  },
  {
    id: "team",
    label: "Team workspace (video)",
    content: "With teams you share workspaces: same projects, chat, and daily rhythm together\u2014instead of everyone in separate notes and chats. Invite people by email or username, or share an admin link; joiners are often auto-added to the workspace and group chat.",
    video: "/videos/workspace%20stratabin.mp4",
  },
  {
    id: "get-started",
    label: "How do I get started?",
    content: "Visit stratabin.com to sign up. Create a project from the dashboard\u2014blank or with STRAB in the header. Open the project to use the map, writing, tasks, and calendar; use STRAB there when you want help on that specific plan.",
  },
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const handleQuestionClick = (q: (typeof FIXED_QUESTIONS)[0]) => {
    if (revealed.has(q.id)) return;
    setRevealed((prev) => new Set(prev).add(q.id));
    const msg: ChatMessage = { role: "bot", content: q.content, video: q.video, followUps: q.followUps };
    setMessages((prev) => [...prev, { role: "user", content: q.label }, msg]);
  };

  const handleFollowUp = (label: string, content: string) => {
    setMessages((prev) => [...prev, { role: "user", content: label }, { role: "bot", content }]);
  };

  return (
    <>
      {/* z-[100]: above header (z-40), side nav (z-50), pinned immersive */}
      <div className="chat-assistant-fab fixed z-[100] flex flex-col items-end gap-2 bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6">
        {!open && (
          <>
            {/* Desktop / tablet: full hint — avoids narrow-screen overflow + tap targets */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="px-3 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/30 whitespace-nowrap">
                Click me to know what is Stratabin quickly
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shrink-0" aria-hidden />
            </div>
            <p className="sm:hidden text-right text-[11px] font-semibold leading-snug text-orange-400/90 max-w-[7.5rem]">
              Tap for Stratabin guide
            </p>
          </>
        )}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="touch-manipulation w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 rounded-2xl shadow-[0_12px_40px_rgba(249,115,22,0.4)] flex items-center justify-center overflow-hidden bg-[#111] border-2 border-orange-500/50 ring-4 ring-orange-500/10 active:scale-95 sm:hover:scale-110 sm:hover:shadow-[0_16px_48px_rgba(249,115,22,0.5)] sm:hover:border-orange-500 sm:hover:ring-orange-500/20 transition-transform duration-300"
          aria-label="Open chat assistant"
          aria-expanded={open}
        >
          <Image src={EMOJI_URL} alt="" width={80} height={80} className="object-cover w-full h-full pointer-events-none" />
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Stratabin guide"
          /** Lenis (syncTouch) steals touch/wheel unless we opt this subtree out */
          data-lenis-prevent
          className="chat-assistant-panel fixed z-[100] flex min-h-0 flex-col overflow-hidden rounded-3xl bg-[#111]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.6)] animate-slide-up
            left-3 right-3 w-auto max-w-none
            h-[min(78dvh,calc(100dvh-7rem))] max-h-[min(78dvh,calc(100dvh-7rem))]
            bottom-[max(6.25rem,calc(env(safe-area-inset-bottom,0px)+5.5rem))]
            sm:left-auto sm:right-6 sm:h-[min(72vh,640px)] sm:max-h-[72vh] sm:w-[calc(100vw-3rem)] sm:max-w-[420px] sm:bottom-36"
        >
          <div className="relative shrink-0 px-5 py-4 bg-gradient-to-br from-[#1a1a1a] to-[#111] border-b border-white/[0.06]">
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-orange-500/20 shadow-md">
                <Image src={EMOJI_URL} alt="Assistant" width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-base">Stratabin Guide</p>
                <p className="text-xs text-white/40 truncate">Tap any question to explore</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="touch-manipulation w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          <div
            className="chat-assistant-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain p-5 space-y-5 bg-[linear-gradient(180deg,_#0a0a0a_0%,_#0f0f0f_100%)] [-webkit-overflow-scrolling:touch] touch-pan-y"
          >
            {messages.length === 0 && (
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 text-lg">{"\uD83D\uDC4B"}</div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Hi! Ask me anything about Stratabin.</p>
                    <p className="text-white/30 text-xs mt-1">Choose a question below to get started.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-wider">Quick questions</p>
                  <div className="flex flex-wrap gap-2">
                    {FIXED_QUESTIONS.map((q) => (
                      <button
                        type="button"
                        key={q.id}
                        onClick={() => handleQuestionClick(q)}
                        className={`touch-manipulation px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                          revealed.has(q.id)
                            ? "bg-orange-500/15 text-orange-300 border border-orange-500/25"
                            : "bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white/80"
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
                <div className="max-w-[88%]">
                  {m.role === "user" ? (
                    <div className="px-4 py-2.5 rounded-2xl rounded-br-md bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
                      <p className="text-sm font-medium">{m.content}</p>
                    </div>
                  ) : (
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.04] border border-white/[0.06]">
                      <p className="text-white/70 text-sm leading-relaxed">{m.content}</p>
                      {m.video && (
                        <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-black aspect-video mt-3">
                          <video src={m.video} controls className="w-full h-full object-cover" playsInline>
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      {m.followUps && m.followUps.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-3 mt-2 border-t border-white/[0.06]">
                          {m.followUps.map((f, j) => (
                            <button
                              type="button"
                              key={j}
                              onClick={() => handleFollowUp(f.label, f.content)}
                              className="touch-manipulation px-3 py-2 rounded-lg text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/15 hover:bg-orange-500/20 transition-colors"
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
            <div className="shrink-0 p-4 pt-2 border-t border-white/[0.06] bg-[#0a0a0a]/80">
              <p className="text-xs font-medium text-white/25 mb-2">More to explore</p>
              <div className="flex flex-wrap gap-2">
                {FIXED_QUESTIONS.filter((q) => !revealed.has(q.id)).map((q) => (
                  <button
                    type="button"
                    key={q.id}
                    onClick={() => handleQuestionClick(q)}
                    className="touch-manipulation px-3 py-2 rounded-lg text-xs font-medium bg-white/[0.04] text-white/50 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/70 transition-colors"
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
