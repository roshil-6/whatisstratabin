"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

const LOGO_SRC = "/stratabin-logo.png";
/** Full-body art for corner button + modal header (remote WebP). */
const FAB_CHARACTER_SRC =
  "https://banner2.cleanpng.com/lnd/20240919/si/7426ea1a53ad8275e0339df0ae7441.webp";

type ChatMessage = {
  role: "bot" | "user";
  content: string;
  video?: string;
  followUps?: { label: string; content: string }[];
};

const FIXED_QUESTIONS = [
  {
    id: "stratabin",
    label: "Start here — what is Stratabin?",
    content:
      "Bottom line: Stratabin helps you stop losing ideas in random notes. You see your thinking as a map, write the plan, schedule and do the work, and optionally use AI (STRAB) to create new plans or sharpen the one you\u2019re already on\u2014from the dashboard and inside each project. In one sentence: think on the map \u2192 write it down \u2192 turn it into tasks and dates \u2192 use AI to stay on track.",
    followUps: [
      {
        label: "Dashboard vs inside a project?",
        content:
          "The dashboard is your home screen: all projects, folders, STRAB in the header for brand-new AI plans, profile, community, How to use. Inside a project is one workspace for that goal: flow map, writing, tasks, timeline & calendar, and STRAB that knows that project.",
      },
      {
        label: "The two STRABs?",
        content:
          "STRAB from the main dashboard (header): \u201cI want to start something new and have AI help me build the first version of the plan.\u201d STRAB inside a project: \u201cI\u2019m already working on this\u2014help me improve it, question it, and summarize it.\u201d That\u2019s the main split.",
      },
    ],
  },
  {
    id: "dashboard",
    label: "Your dashboard (home screen)",
    content:
      "This is where you see all your projects. A project is one big goal or idea\u2014like launch a product, plan a wedding, or grow the business. You can start a blank project and fill it in yourself, or use STRAB in the header when you want AI to help create a whole new plan from scratch (ideas, connections, and notes sketched out). You can also sort projects into folders, join team workspaces, open your profile, visit the community, or open How to use for the guide again.",
  },
  {
    id: "inside-project",
    label: "Inside one project",
    content:
      "You get one workspace for that goal. Most people use: Strategy / flow view\u2014a map of ideas (boxes and links), not just a long document. Writing\u2014overview, plans, notes in the same project. Tasks\u2014break work into todos and check them off. Timeline & calendar\u2014dates and phases so there\u2019s a when, not only a what. STRAB for this project knows that workspace: summaries, risks, what to do next, reports\u2014like a coach that\u2019s read your map, tasks, and writing.",
  },
  {
    id: "guide-site",
    label: "The guide website",
    content:
      "guide.stratabin.com is the friendly explanation: what Stratabin is, why it exists, and how it\u2019s meant to help you go from \u201cI have an idea\u201d to \u201cI\u2019m actually doing it.\u201d You can open it from the app whenever you want that story in normal language.",
  },
  {
    id: "individual",
    label: "Individual workspace (video)",
    content:
      "Your own private space. Only you can see it. Add as many projects as you need. Perfect for solo planning, personal goals, or organizing ideas before sharing with a team.",
    video: "/videos/strtabin%20ad%203.mp4",
  },
  {
    id: "team",
    label: "Team workspace (video)",
    content:
      "With teams you share workspaces: same projects, chat, and daily rhythm together\u2014instead of everyone in separate notes and chats. Invite people by email or username, or share an admin link; joiners are often auto-added to the workspace and group chat.",
    video: "/videos/workspace%20stratabin.mp4",
  },
  {
    id: "get-started",
    label: "How do I get started?",
    content:
      "Visit stratabin.com to sign up. Create a project from the dashboard\u2014blank or with STRAB in the header. Open the project to use the map, writing, tasks, and calendar; use STRAB there when you want help on that specific plan.",
  },
];

function BotFace({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#111] ring-1 ring-white/[0.08] ${className}`}
    >
      <Image
        src={LOGO_SRC}
        alt=""
        width={40}
        height={40}
        className="h-[62%] w-[62%] object-contain pointer-events-none select-none"
      />
    </div>
  );
}

function GuideLinks({ onPickInPageGuide }: { onPickInPageGuide?: () => void }) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      <a
        href="#complete-guide"
        onClick={() => onPickInPageGuide?.()}
        className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-300 transition-colors hover:bg-orange-500/20"
      >
        Full guide on this page
      </a>
      <a
        href="https://guide.stratabin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/75 transition-colors hover:bg-white/[0.08]"
      >
        guide.stratabin.com
      </a>
      <a
        href="https://stratabin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600"
      >
        stratabin.com
      </a>
    </div>
  );
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const close = useCallback(() => {
    setOpen(false);
    setMessages([]);
    setRevealed(new Set());
  }, []);

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
      <div
        className="chat-assistant-fab fixed z-[100] flex max-w-[min(17.5rem,calc(100vw-1.5rem))] flex-col items-end gap-3
          bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))]
          sm:bottom-6 sm:right-6 sm:max-w-[19rem]"
      >
        <div id="chat-fab-hint" className="w-full px-1 text-right">
          <p className="font-display text-base font-bold leading-snug text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.92),0_0_2px_rgba(0,0,0,0.6)] sm:text-lg">
            How to use Stratabin
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-orange-400 [text-shadow:0_2px_14px_rgba(0,0,0,0.88)] sm:text-[0.95rem]">
            Tap the character for quick answers
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="touch-manipulation group relative h-[8.75rem] w-[7.75rem] shrink-0 overflow-visible border-0 bg-transparent p-0 shadow-none transition-transform active:scale-[0.97] sm:h-[10.25rem] sm:w-[8.75rem] sm:hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          aria-label="Open Stratabin quick answers"
          aria-describedby="chat-fab-hint"
          aria-expanded={open}
        >
          <Image
            src={FAB_CHARACTER_SRC}
            alt=""
            fill
            sizes="(max-width: 640px) 160px, 200px"
            className="object-contain object-bottom pointer-events-none select-none drop-shadow-[0_18px_36px_rgba(0,0,0,0.55)] transition-transform duration-300 sm:group-hover:scale-[1.03]"
            priority
          />
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            data-lenis-prevent
            className="fixed inset-0 z-[100] bg-[#020202]/85 backdrop-blur-sm motion-reduce:backdrop-blur-none"
            aria-label="Close"
            onClick={close}
          />

          <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 pointer-events-none">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="how-to-use-title"
              data-lenis-prevent
              className="pointer-events-auto flex max-h-[min(92dvh,52rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-orange-500/20 bg-[#0c0c0c] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)] animate-fade-in"
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.08] px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative hidden h-14 w-12 shrink-0 overflow-visible bg-transparent sm:block">
                    <Image
                      src={FAB_CHARACTER_SRC}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-contain object-bottom pointer-events-none select-none drop-shadow-md"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 id="how-to-use-title" className="font-display text-lg font-bold text-white sm:text-xl">
                      How to use Stratabin
                    </h2>
                    <p className="mt-0.5 text-xs text-white/45 sm:text-sm">Tap a question below for the full answer.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="touch-manipulation shrink-0 rounded-xl border border-white/[0.1] bg-white/[0.05] p-2.5 text-white/50 transition-colors hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div
                className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-4 sm:px-6 sm:py-5 [-webkit-overflow-scrolling:touch] touch-pan-y bg-[#080808]"
              >
                {messages.length === 0 && (
                  <div className="space-y-5">
                    <div className="flex gap-3">
                      <BotFace className="hidden sm:block mt-0.5" />
                      <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-white/[0.08] bg-[#111] px-4 py-3 sm:px-5 sm:py-4">
                        <p className="text-sm font-medium leading-relaxed text-white/85">Hi! Pick any topic to see how Stratabin works.</p>
                        <p className="mt-2 text-xs text-white/40">Same quick Q&amp;A as before — videos where noted.</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-3 px-0.5 text-xs font-bold uppercase tracking-wider text-orange-400/80">Questions</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {FIXED_QUESTIONS.map((q) => (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => handleQuestionClick(q)}
                            className={`touch-manipulation rounded-xl border px-4 py-3.5 text-left text-sm font-medium leading-snug transition-colors ${
                              revealed.has(q.id)
                                ? "border-orange-500/25 bg-orange-500/10 text-orange-200"
                                : "border-white/[0.1] bg-[#121212] text-white/75 hover:border-orange-500/25 hover:bg-[#161616] hover:text-white"
                            }`}
                          >
                            {q.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <GuideLinks onPickInPageGuide={close} />
                  </div>
                )}

                {messages.length > 0 && (
                  <div className="space-y-5 pb-2">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex gap-2.5 sm:gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        {m.role === "bot" && <BotFace className="mt-1 hidden sm:block" />}
                        <div
                          className={`min-w-0 max-w-[min(100%,28rem)] sm:max-w-[min(100%,34rem)] ${
                            m.role === "user" ? "" : "flex-1"
                          }`}
                        >
                          {m.role === "user" ? (
                            <div className="rounded-2xl rounded-br-md bg-gradient-to-br from-orange-500 to-orange-600 px-4 py-3 text-sm font-medium leading-relaxed text-white shadow-lg shadow-orange-900/30">
                              {m.content}
                            </div>
                          ) : (
                            <div className="rounded-2xl rounded-tl-md border border-white/[0.08] bg-[#111] px-4 py-3.5 sm:px-5 sm:py-4">
                              <p className="text-sm leading-relaxed text-white/80">{m.content}</p>
                              {m.video && (
                                <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-white/[0.08] bg-black">
                                  <video src={m.video} controls className="h-full w-full object-cover" playsInline>
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                              )}
                              {m.followUps && m.followUps.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                                  {m.followUps.map((f, j) => (
                                    <button
                                      key={j}
                                      type="button"
                                      onClick={() => handleFollowUp(f.label, f.content)}
                                      className="touch-manipulation rounded-xl border border-orange-500/25 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-300 transition-colors hover:bg-orange-500/20 sm:text-sm"
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
                )}
              </div>

              {messages.length > 0 && (
                <div className="shrink-0 space-y-3 border-t border-white/[0.08] bg-[#0a0a0a] px-4 py-3 sm:px-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">More questions</p>
                  <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto">
                    {FIXED_QUESTIONS.filter((q) => !revealed.has(q.id)).map((q) => (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => handleQuestionClick(q)}
                        className="touch-manipulation rounded-lg border border-white/[0.1] bg-[#141414] px-3 py-2 text-left text-xs font-medium text-white/65 transition-colors hover:border-orange-500/25 hover:text-white"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                  <GuideLinks onPickInPageGuide={close} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
