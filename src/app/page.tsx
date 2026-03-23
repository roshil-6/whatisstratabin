"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import ManIcon from "@/components/ManIcon";
import ChatAssistant from "@/components/ChatAssistant";
import CardTilt from "@/components/CardTilt";
import ImmersiveStage from "@/components/ImmersiveStage";
import { ATMOSPHERE_BLEND_SRC, HERO_OVERLAY_BLEND_SRC } from "@/lib/atmosphere";

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  { q: "What is Stratabin?", a: "Stratabin helps you stop losing ideas in random notes. You see your thinking as a map, write the plan, schedule and do the work, and optionally use AI to create new plans or sharpen the one you\u2019re already on\u2014through STRAB in the dashboard and in each project." },
  { q: "What is the dashboard?", a: "Your home screen is where you see all your projects. A project is one big goal or idea\u2014like \u201claunch a product,\u201d \u201cplan a wedding,\u201d or \u201cgrow the business.\u201d You can start a blank project, use STRAB in the header for AI help building a whole new plan, sort projects into folders, join team workspaces, open your profile, visit the community, or open \u201cHow to use\u201d for the guide again." },
  { q: "What do I do inside a project?", a: "You open one workspace for that goal. Most people move through: Strategy / flow view (a map of ideas\u2014boxes and links, not just a long document), Writing (overview, plans, notes in the same project), Tasks (break work into todos and check them off), Timeline & calendar (dates and phases so the plan has a when). STRAB for that project is AI that knows that workspace\u2014summaries, risks, what to do next, and reports." },
  { q: "In one sentence, how does Stratabin flow?", a: "Think on the map \u2192 write it down \u2192 turn it into tasks and dates \u2192 use AI to stay on track." },
  { q: "Are there two different STRABs?", a: "Yes, in the simple version: STRAB from the main dashboard (header) is for starting something new and having AI help build the first version of the plan. STRAB inside a project is for when you\u2019re already working on that thing\u2014help to improve it, question it, and summarize it. That\u2019s the main split to remember." },
  { q: "How is Stratabin different from note-taking apps?", a: "Most tools let you write ideas\u2014few help you structure and act. Stratabin combines a visual strategy map, writing, tasks, timeline and calendar, and optional AI in one place so you go from \u201cI have an idea\u201d to \u201cI\u2019m actually doing it.\u201d" },
  { q: "Can I use Stratabin with my team?", a: "Yes. With teams you can share workspaces: same projects, chat, and daily rhythm together\u2014instead of everyone living in separate notes and chats. Invite members, assign roles, and use shared tasks." },
  { q: "Where is the friendly guide?", a: "guide.stratabin.com explains what Stratabin is, why it exists, and how it\u2019s meant to help\u2014in normal language. You can open it from the app whenever you want that story again." },
  { q: "Is Stratabin free?", a: "Stratabin is continuously evolving. Check stratabin.com for current pricing and availability." },
];

const PERSONAL_FEATURES = [
  { title: "Private workspace", desc: "Your own space. Only you can see it. Add as many projects as you need.", icon: "\u25C9" },
  { title: "Writing & Flow canvas", desc: "Structure ideas in sections, then map them visually with Idea, Question, and Decision cards.", icon: "\u25C7" },
  { title: "Task list", desc: "Break your strategy into clear tasks. Add, check off, or remove. Track completion.", icon: "\u2713" },
  { title: "Timeline", desc: "Phases, milestones, and timeframes. Mark as planned, active, or done.", icon: "\u23F1" },
  { title: "Calendar & planner", desc: "Month or week view. Add events, set times, get reminders.", icon: "\uD83D\uDCC5" },
  { title: "STRAB AI", desc: "AI assistant that knows your project. Get reports and organize messy thoughts.", icon: "\u2726" },
  { title: "Dashboard", desc: "All your projects in one place. Folders, STRAB in the header for new plans, profile, community, and How to use.", icon: "\u25D0" },
  { title: "Reports", desc: "AI-generated snapshot: canvas summary, tasks, timeline, risks, and next actions.", icon: "\uD83D\uDCCA" },
];

const TEAM_SECTIONS = [
  {
    id: "collab",
    title: "Collaboration",
    desc: "Shared workspaces, group chat, daily tasks, and project management.",
    image: "/stratabin-team-workspace.png",
    features: [
      { title: "Shared workspace", desc: "Invite members by email or username. Work on shared projects.", icon: "\u25C8" },
      { title: "Group chat", desc: "Join via admin link and you\u2019re auto-added. Stay in sync.", icon: "\uD83D\uDCAC" },
      { title: "Daily tasks", desc: "Add tasks for the day, assign to members. Checkboxes to track.", icon: "\u2611" },
      { title: "Roles & permissions", desc: "Admin or Member. Admins invite, assign, and manage.", icon: "\uD83D\uDC64" },
      { title: "Project assignment", desc: "Assign projects to team members. See who owns what.", icon: "\u279C" },
      { title: "Activity feed", desc: "Recent updates across the workspace. Who did what, when.", icon: "\uD83D\uDCE1" },
    ],
  },
  {
    id: "community",
    title: "Community & Connect",
    desc: "Discover people, open profiles, chat, and control visibility.",
    image: "/stratabin-chat.png",
    features: [
      { title: "Community & discovery", desc: "Find people by username. Browse public projects for inspiration.", icon: "\uD83D\uDD0D" },
      { title: "Profiles", desc: "LinkedIn-style profiles focused on projects and work.", icon: "\uD83D\uDC64" },
      { title: "Chat", desc: "DM any team member or connect via workspaces.", icon: "\uD83D\uDCAC" },
      { title: "Join flow", desc: "Workspace ID or join link to onboard new members.", icon: "\uD83D\uDD17" },
      { title: "Visibility control", desc: "Workspaces can be private or public. Share when ready.", icon: "\uD83D\uDD12" },
    ],
  },
];

const MISSION_CARDS = [
  { id: "structured-thinking", title: "Structured thinking", desc: "Write ideas, break them into clear sections, and see them as a visual flow. No more scattered notes.", anchor: "#structured-thinking" },
  { id: "action-oriented", title: "Action-oriented", desc: "Create tasks, set timelines, and track progress. Everything you need to execute\u2014in one place.", anchor: "#action-oriented" },
  { id: "solo-or-team", title: "Solo or team", desc: "Work alone or invite your team. Shared workspaces, group chat, daily tasks, and roles\u2014all built in.", anchor: "#solo-or-team" },
];

/** Hash links that open mission panels — skipped by document capture so card onClick runs first */
const MISSION_DETAIL_HASHES = new Set(MISSION_CARDS.map((c) => c.anchor));

const MISSION_HASH_TO_ID: Record<string, string> = Object.fromEntries(
  MISSION_CARDS.map((c) => [c.anchor, c.id])
);

const NAV_SECTIONS = [
  { id: "hero", num: "01" },
  { id: "mission", num: "02" },
  { id: "complete-guide", num: "03" },
  { id: "features", num: "04" },
  { id: "faq", num: "05" },
  { id: "about", num: "06" },
];

const FaqItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "border-orange-500/20 bg-white/[0.03]" : "border-white/[0.06] hover:border-white/[0.1]"}`}>
    <button onClick={onClick} className="w-full py-5 px-6 flex justify-between items-center text-left gap-4 hover:bg-white/[0.02] transition-colors">
      <span className="font-semibold text-white">{question}</span>
      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-400 transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </span>
    </button>
    {isOpen && (
      <div className="px-6 pb-5 animate-fade-in">
        <p className="text-white/50 text-sm leading-relaxed">{answer}</p>
      </div>
    )}
  </div>
);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [navOpen, setNavOpen] = useState(false);
  const [expandedPersonalFeatures, setExpandedPersonalFeatures] = useState(false);
  const [expandedTeamSection, setExpandedTeamSection] = useState<string | null>(null);
  const [expandedMission, setExpandedMission] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("hero");

  /** Clears mission detail when navigating to #mission (header / back); read inside Lenis click capture */
  const dismissMissionDetailRef = useRef(() => {});
  dismissMissionDetailRef.current = () => setExpandedMission(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const id = MISSION_HASH_TO_ID[window.location.hash];
    if (id) setExpandedMission(id);
  }, []);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      /** Without this, touch scrolling stays on the “native” path and scrub timelines (immersive) desync on phones. */
      syncTouch: true,
      touchMultiplier: 0.92,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.animatedScroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });
    ScrollTrigger.refresh();

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onVpResize = () => {
      ScrollTrigger.refresh();
    };
    window.visualViewport?.addEventListener("resize", onVpResize);

    /** Lenis no-ops when target === targetScroll; nudge so repeated in-page nav always animates. */
    const smoothScrollToHash = (href: string, opts: { offset?: number; duration?: number } = {}) => {
      const { offset = -80, duration = 1.5 } = opts;
      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dest = rect.top + lenis.animatedScroll + offset;
      const rounded = Math.round(dest);
      if (Math.abs(rounded - Math.round(lenis.targetScroll)) < 2) {
        const nudge = rounded >= lenis.limit - 2 ? -2 : 2;
        lenis.scrollTo(rounded + nudge, { duration: 0.25, easing: (t: number) => t });
        requestAnimationFrame(() => {
          lenis.scrollTo(el, { offset, duration });
        });
        return;
      }
      lenis.scrollTo(el, { offset, duration });
    };

    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.length <= 1) return;
      /** Let mission cards handle expand + preventDefault in bubble phase */
      if (MISSION_DETAIL_HASHES.has(href)) return;
      e.preventDefault();
      e.stopPropagation();
      if (href === "#mission") dismissMissionDetailRef.current();
      smoothScrollToHash(href, { offset: -80, duration: 1.5 });
    };

    document.addEventListener("click", handleClick, true);

    /** Deep links — mission panels hydrate via useLayoutEffect + scroll effect; other hashes scroll here */
    const initialHash = typeof window !== "undefined" ? window.location.hash : "";
    if (initialHash && initialHash.length > 1 && !MISSION_DETAIL_HASHES.has(initialHash)) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          smoothScrollToHash(initialHash, { offset: -80, duration: 1.2 });
          ScrollTrigger.refresh();
        });
      });
    }

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.visualViewport?.removeEventListener("resize", onVpResize);
      gsap.ticker.remove(raf);
      lenisRef.current = null;
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && typeof value === "number") {
            window.scrollTo(0, value);
          }
          return window.scrollY || document.documentElement.scrollTop;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });
      ScrollTrigger.refresh();
    };
  }, []);

  useGSAP(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /** No hero scroll-scrub on any breakpoint — scrub + “bottom top” made “Turn ideas into action” finish only as the hero left view. */
    const applyHeroStaticVisible = (opts: { showScrollHint: boolean }) => {
      const introWords = gsap.utils.toArray<HTMLElement>(".hero-intro-word-inner");
      gsap.set(introWords, { yPercent: 0, autoAlpha: 1 });
      gsap.set(".hero-tag", { y: 0, autoAlpha: 1 });
      gsap.set(".hero-title-line-inner", { yPercent: 0, autoAlpha: 1 });
      gsap.set(".hero-title-line-2-inner", { yPercent: 0, autoAlpha: 1 });
      gsap.set(".hero-desc", { y: 0, autoAlpha: 1 });
      gsap.set(".hero-cta", { y: 0, autoAlpha: 1 });
      gsap.set(".hero-scroll", { autoAlpha: opts.showScrollHint ? 1 : 0 });
    };

    /** Scroll-scrubbed chapter (no pin — page keeps moving naturally). */
    const setupImmersiveStory = (opts: {
      end: string;
      pin: boolean;
      scrub: number;
      pinType?: "fixed" | "transform";
    }) => {
      gsap.set(".immersive-slide-1", { autoAlpha: 1, y: 0 });
      gsap.set([".immersive-slide-2", ".immersive-slide-3"], { autoAlpha: 0, y: 64 });
      gsap.set(".immersive-scroll-hint", { autoAlpha: 0, y: 20 });
      gsap.set(".immersive-progress-fill", { scaleY: 0, transformOrigin: "top center", force3D: true });
      gsap.set(".immersive-step", { opacity: 0.28 });
      gsap.set(".immersive-step-1", { opacity: 1 });
      gsap.set(".immersive-chapter-mark-1", { autoAlpha: 0.09 });
      gsap.set([".immersive-chapter-mark-2", ".immersive-chapter-mark-3"], { autoAlpha: 0 });
      gsap.set(".immersive-slide-1 .immersive-slide-title", { y: 0, autoAlpha: 1 });
      gsap.set(".immersive-slide-2 .immersive-slide-title, .immersive-slide-3 .immersive-slide-title", {
        y: 32,
        autoAlpha: 0.12,
      });
      gsap.set(".immersive-slide-2 .immersive-slide-body, .immersive-slide-3 .immersive-slide-body", {
        autoAlpha: 0,
        y: 22,
      });
      gsap.set(".immersive-floor", { opacity: 0.28, y: 24 });

      gsap.set(".immersive-scene-rotate", {
        transformPerspective: 1600,
        rotationY: -32,
        rotationX: 8,
        rotationZ: -2,
        z: -220,
        force3D: true,
      });
      gsap.set(".immersive-card-a", {
        x: -96,
        y: 52,
        z: 145,
        rotationY: -46,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gsap.set(".immersive-card-b", {
        x: 0,
        y: 0,
        z: 28,
        rotationY: 0,
        scale: 1.06,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gsap.set(".immersive-card-c", {
        x: 102,
        y: -44,
        z: -95,
        rotationY: 48,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#immersive-inner",
          start: "top top",
          end: opts.end,
          pin: opts.pin,
          scrub: opts.scrub,
          anticipatePin: opts.pin ? 1 : 0,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          ...(opts.pin && opts.pinType ? { pinType: opts.pinType } : {}),
        },
      });

      tl.to(".immersive-progress-fill", { scaleY: 1, duration: 1, ease: "none" }, 0)
        .to(
          ".immersive-glow",
          {
            duration: 0.55,
            ease: "none",
            "--gx": "62%",
            "--gy": "52%",
          } as gsap.TweenVars,
          0
        )
        .to(
          ".immersive-glow",
          {
            duration: 0.45,
            ease: "none",
            "--gx": "38%",
            "--gy": "36%",
          } as gsap.TweenVars,
          0.55
        )
        .to(".immersive-floor", { opacity: 0.52, y: -12, duration: 1, ease: "none" }, 0)
        .to(".immersive-chapter-mark-1", { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.18)
        .to(".immersive-chapter-mark-2", { autoAlpha: 0.11, duration: 0.28, ease: "power2.out" }, 0.22)
        .to(".immersive-slide-1", { autoAlpha: 0, y: -56, duration: 0.2, ease: "power2.in" }, 0.2)
        .to(".immersive-slide-2", { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.26)
        .to(".immersive-slide-2 .immersive-slide-title", { y: 0, autoAlpha: 1, duration: 0.38, ease: "power2.out" }, 0.28)
        .to(".immersive-slide-2 .immersive-slide-body", { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" }, 0.34)
        .to(".immersive-step-1", { opacity: 0.3, duration: 0.12 }, 0.2)
        .to(".immersive-step-2", { opacity: 1, duration: 0.2 }, 0.24)
        .to(".immersive-chapter-mark-2", { autoAlpha: 0, duration: 0.18, ease: "power2.in" }, 0.42)
        .to(".immersive-chapter-mark-3", { autoAlpha: 0.11, duration: 0.28, ease: "power2.out" }, 0.46)
        .to(".immersive-slide-2", { autoAlpha: 0, y: -56, duration: 0.18, ease: "power2.in" }, 0.44)
        .to(".immersive-slide-3", { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.5)
        .to(".immersive-slide-3 .immersive-slide-title", { y: 0, autoAlpha: 1, duration: 0.38, ease: "power2.out" }, 0.52)
        .to(".immersive-slide-3 .immersive-slide-body", { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" }, 0.58)
        .to(".immersive-step-2", { opacity: 0.3, duration: 0.12 }, 0.44)
        .to(".immersive-step-3", { opacity: 1, duration: 0.2 }, 0.48)
        .to(".immersive-scroll-hint", { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }, 0.74);

      tl.to(
        ".immersive-scene-rotate",
        { rotationY: 8, rotationX: -14, z: -40, rotationZ: 1, duration: 0.52, ease: "none" },
        0
      ).to(
        ".immersive-scene-rotate",
        { rotationY: 44, rotationX: -5, z: 95, rotationZ: -3, duration: 0.48, ease: "none" },
        0.52
      );
      tl.to(
        ".immersive-card-a",
        { x: -152, y: 22, z: 240, rotationY: -62, duration: 0.52, ease: "none" },
        0
      ).to(
        ".immersive-card-a",
        { x: -118, y: 8, z: 180, rotationY: -48, duration: 0.48, ease: "none" },
        0.52
      );
      tl.to(
        ".immersive-card-b",
        { rotationY: 22, z: 130, y: -22, scale: 0.98, duration: 0.52, ease: "none" },
        0
      ).to(
        ".immersive-card-b",
        { rotationY: 8, z: 95, y: -8, scale: 1, duration: 0.48, ease: "none" },
        0.52
      );
      tl.to(
        ".immersive-card-c",
        { x: 138, y: 36, z: -150, rotationY: 38, duration: 0.52, ease: "none" },
        0
      ).to(
        ".immersive-card-c",
        { x: 108, y: 18, z: -105, rotationY: 28, duration: 0.48, ease: "none" },
        0.52
      );

      return tl;
    };

    let mm: ReturnType<typeof gsap.matchMedia> | null = null;

    if (!prefersReduced) {
      mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        applyHeroStaticVisible({ showScrollHint: true });
        setupImmersiveStory({ end: "bottom top", pin: false, scrub: 0.35 });
      });
      mm.add("(max-width: 767px)", () => {
        applyHeroStaticVisible({ showScrollHint: false });
      });
    } else {
      gsap.set(
        [
          ".hero-intro-word-inner",
          ".hero-tag",
          ".hero-title-line-inner",
          ".hero-title-line-2-inner",
          ".hero-desc",
          ".hero-cta",
          ".hero-scroll",
          ".immersive-slide-1",
          ".immersive-slide-2",
          ".immersive-slide-3",
          ".immersive-scroll-hint",
          ".immersive-scene-rotate",
          ".immersive-card-a",
          ".immersive-card-b",
          ".immersive-card-c",
          ".immersive-progress-fill",
          ".immersive-step",
          ".immersive-step-1",
          ".immersive-step-2",
          ".immersive-step-3",
          ".immersive-chapter-mark-1",
          ".immersive-chapter-mark-2",
          ".immersive-chapter-mark-3",
          ".immersive-slide-title",
          ".immersive-slide-body",
          ".immersive-floor",
          ".immersive-glow",
        ],
        { clearProps: "all" }
      );
    }

    /** Scroll reveal — desktop only; mobile uses plain layout (CSS + no GSAP) */
    if (!prefersReduced && mm) {
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 64, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.15,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 86%",
                once: true,
              },
            }
          );
        });
      });
      mm.add("(max-width: 767px)", () => {
        gsap.set(gsap.utils.toArray<HTMLElement>(".reveal-up"), { clearProps: "all" });
      });
    } else {
      gsap.set(gsap.utils.toArray<HTMLElement>(".reveal-up"), { clearProps: "all" });
    }

    // Hero + immersive story = one chapter (nav 01) until Mission enters view
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      endTrigger: "#mission",
      end: "top center",
      onToggle: (self) => {
        if (self.isActive) setActiveSection("hero");
      },
    });

    NAV_SECTIONS.filter((s) => s.id !== "hero").forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActiveSection(id);
        },
      });
    });

    return () => {
      mm?.revert();
    };
  }, { scope: mainRef });

  /** Defer refresh one frame so layout (e.g. mission panel height) settles before recalculating triggers */
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [expandedMission, expandedPersonalFeatures, expandedTeamSection]);

  /** After a mission card opens the panel, Lenis smoothly scrolls the new section into view */
  useEffect(() => {
    if (!expandedMission) return;
    const lenis = lenisRef.current;
    if (!lenis) return;
    let cancelled = false;
    const ease = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      if (cancelled) return;
      const el = document.getElementById(expandedMission);
      const L = lenisRef.current;
      if (!el || !L) return;
      ScrollTrigger.refresh();
      L.scrollTo(el, {
        offset: -88,
        duration: prefersReduced ? 0 : 1.28,
        easing: ease,
      });
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });
    return () => {
      cancelled = true;
    };
  }, [expandedMission]);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#050505] text-white">
      {/* Side Navigation */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4" aria-label="Section navigation">
        {NAV_SECTIONS.map(({ id, num }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`group flex items-center gap-3 py-1 transition-all duration-300 ${activeSection === id ? "opacity-100" : "opacity-20 hover:opacity-50"}`}
          >
            <span className={`font-mono text-[10px] tracking-wider ${activeSection === id ? "text-orange-400" : "text-white"}`}>{num}</span>
            <span className={`h-px transition-all duration-500 ${activeSection === id ? "w-8 bg-orange-400" : "w-4 bg-white/40"}`} />
          </a>
        ))}
      </nav>

      {/* Top Header — glass + warm tint to match hero / site atmosphere */}
      <header className="site-header fixed top-0 left-0 right-0 z-40">
        <div className="relative overflow-hidden">
          {/* Desktop: glass fade. Mobile: solid #050505 — no backdrop-blur (avoids muddy “glassy” bar on phones). */}
          <div
            className="pointer-events-none absolute inset-0 bg-[#050505] md:bg-gradient-to-b md:from-[#050505]/88 md:via-[#050505]/45 md:to-transparent md:backdrop-blur-2xl md:backdrop-saturate-150"
            aria-hidden
          />
          {/* Soft orange bloom — toned down on mobile */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_120%_at_50%_-40%,rgba(249,115,22,0.11),transparent_52%)] opacity-50 mix-blend-soft-light md:opacity-90"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_80%_at_80%_-20%,rgba(251,191,36,0.05),transparent_45%)] mix-blend-soft-light max-md:opacity-60"
            aria-hidden
          />

          <div className="relative flex justify-between items-center px-6 lg:px-12 py-5">
            <a href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/stratabin-logo.png"
                alt="Stratabin"
                width={36}
                height={36}
                className="object-contain rounded-xl shrink-0 ring-1 ring-white/[0.06] shadow-sm shadow-black/20"
                priority
              />
              <span className="font-display font-bold text-lg text-white/95 group-hover:text-orange-400 transition-colors">
                Stratabin
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#mission" className="text-sm text-white/45 hover:text-orange-400/90 transition-colors">Mission</a>
              <a href="#complete-guide" className="text-sm text-white/45 hover:text-orange-400/90 transition-colors">Guide</a>
              <a href="#features" className="text-sm text-white/45 hover:text-orange-400/90 transition-colors">Features</a>
              <a href="#faq" className="text-sm text-white/45 hover:text-orange-400/90 transition-colors">FAQ</a>
              <a href="#about" className="text-sm text-white/45 hover:text-orange-400/90 transition-colors">About</a>
              <a
                href="https://stratabin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/25 hover:from-orange-500 hover:to-orange-600 hover:border-orange-400 shadow-sm shadow-orange-500/10 hover:shadow-orange-500/25 transition-all duration-300"
              >
                Get Started
              </a>
            </div>
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="md:hidden relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-white/90 hover:text-orange-400 bg-white/[0.04] hover:bg-orange-500/10 border border-white/[0.06] transition-colors"
              aria-label="Toggle menu"
            >
              {navOpen
                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="md:hidden relative overflow-hidden bg-[#050505]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(249,115,22,0.07),transparent_55%)]"
              aria-hidden
            />
            <div className="relative px-6 py-4 flex flex-col gap-1">
              {[
                { label: "Mission", href: "#mission" },
                { label: "Complete guide", href: "#complete-guide" },
                { label: "Features", href: "#features" },
                { label: "FAQ", href: "#faq" },
                { label: "About", href: "#about" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setNavOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm text-white/55 hover:text-orange-400 hover:bg-orange-500/[0.08] border border-transparent hover:border-orange-500/15 transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="https://stratabin.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setNavOpen(false)}
                className="py-3 px-4 rounded-xl text-sm font-medium text-center text-white bg-gradient-to-r from-orange-500/20 to-amber-500/15 border border-orange-500/30 hover:from-orange-500 hover:to-orange-600 mt-2 transition-all"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ══════════ HERO ══════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden pt-20 [perspective:1400px]"
      >
        {/* Oceanic ambient layers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="hero-ocean-blob hero-ocean-blob-a absolute -left-[20%] -top-[25%] h-[85vw] w-[85vw] max-w-[900px] max-h-[900px] rounded-full bg-orange-500/[0.12] blur-[100px] md:blur-[120px]" />
          <div className="hero-ocean-blob hero-ocean-blob-b absolute -right-[15%] bottom-[-20%] h-[75vw] w-[75vw] max-w-[780px] max-h-[780px] rounded-full bg-sky-500/[0.07] blur-[90px] md:blur-[110px]" />
          <div className="hero-ocean-blob hero-ocean-blob-c absolute left-1/2 top-1/2 h-[55vw] w-[55vw] max-w-[520px] max-h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.06] blur-[80px] md:blur-[100px]" />
        </div>

        {/* Subtle photo wash (blend) — same asset as immersive for continuity */}
        <div className="pointer-events-none absolute inset-0 z-[0] overflow-hidden" aria-hidden>
          <Image
            src={ATMOSPHERE_BLEND_SRC}
            alt=""
            fill
            className="object-cover opacity-[0.2] mix-blend-soft-light saturate-[0.72]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#050505]/70 via-transparent to-[#050505]/80 mix-blend-multiply" />
        </div>

        {/* Procreator blog texture — same soft-light blend language as atmosphere */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-[0.42] mix-blend-soft-light"
          aria-hidden
        >
          <Image
            src={HERO_OVERLAY_BLEND_SRC}
            alt=""
            fill
            className="object-cover saturate-[0.72] contrast-[1.02]"
            sizes="100vw"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(249,115,22,0.1),transparent)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-8 lg:px-24 lg:pl-28">
          <p className="hero-intro font-display mb-6 flex flex-wrap gap-x-[0.35em] gap-y-1 text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl md:text-4xl">
            {["Hey", "—", "meet", "Stratabin."].map((word, i) => (
              <span key={`intro-${i}-${word}`} className="hero-intro-word inline-block overflow-hidden pb-0.5">
                <span className="hero-intro-word-inner inline-block">{word}</span>
              </span>
            ))}
          </p>
          <p className="hero-tag text-orange-400 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            From thinking to doing
          </p>
          <h1 className="hero-title font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight mb-8">
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line-inner block">Turn ideas</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line-2-inner block text-gradient">into action</span>
            </span>
          </h1>
          <p className="hero-desc text-lg sm:text-xl text-white/40 max-w-xl mb-12 leading-relaxed">
            A structured workspace designed to turn scattered ideas into clear plans and actionable execution.
          </p>
          <div className="hero-cta flex flex-wrap gap-4">
            <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30">
              Get Started
            </a>
            <a href="#mission" className="px-8 py-4 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 font-medium transition-all duration-300">
              Explore
            </a>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-12 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      <ImmersiveStage />

      {/* ══════════ MISSION ══════════ (top blends from immersive tail — no harsh divider) */}
      <section
        id="mission"
        className="scroll-mt-24 bg-[#050505] px-6 pb-32 pt-6 md:px-24 md:pt-8 lg:pt-10"
      >
        <div className="max-w-6xl mx-auto lg:pl-16">
          <span className="reveal-up block text-orange-400/20 font-display text-8xl md:text-9xl font-bold leading-none select-none">02</span>
          <h2 className="reveal-up font-display text-4xl md:text-5xl font-bold -mt-6 mb-4">Our Mission</h2>
          <p className="reveal-up text-white/35 max-w-xl mb-16 text-lg">We help you move from thinking to doing.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {MISSION_CARDS.map((card, i) => (
              <CardTilt
                key={card.id}
                href={card.anchor}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setExpandedMission(card.id);
                }}
                className="reveal-up group block p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer"
                maxTilt={8}
              >
                <span className="text-4xl font-display font-bold text-orange-500/25 group-hover:text-orange-400/50 transition-colors">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{card.title}</h3>
                <p className="text-white/35 leading-relaxed mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-orange-400/50 text-sm font-medium group-hover:text-orange-400 transition-colors">
                  Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </CardTilt>
            ))}
          </div>
        </div>
      </section>

      {expandedMission === "structured-thinking" && (
        <section id="structured-thinking" className="py-24 px-6 lg:px-24 scroll-mt-24 border-t border-white/[0.04]">
          <div className="animate-mission-reveal motion-reduce:animate-none max-w-5xl mx-auto lg:pl-16">
            <a href="#mission" className="mb-8 inline-flex items-center gap-2 text-orange-400 font-medium text-sm hover:text-orange-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Mission
            </a>
            <div className="mb-8">
              <span className="text-4xl font-display font-bold text-orange-500/30">01</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 mb-2">Structured thinking</h2>
              <p className="text-lg text-white/50 max-w-2xl">Move from messy notes to a clear, visible strategy.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/[0.06] animate-slide-up" style={{ animationFillMode: "forwards" } as React.CSSProperties}>
                <Image src="/stratabin-split-workspace.png" alt="Writing and flow canvas" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
              </div>
              <div className="space-y-3">
                {[
                  { title: "Visual flow", desc: "Ideas live on a canvas as nodes, with connections so you see relationships." },
                  { title: "Organized writing", desc: "Long-form editor lets you break thoughts into sections, mapped onto the canvas." },
                  { title: "Branching & merging", desc: "Split one idea into branches or merge multiple projects into one strategy." },
                  { title: "Strategy map", desc: "Nodes map your logic; writing section holds the explanation." },
                  { title: "No more scatter", desc: "One place to capture ideas, structure them, and see how they connect." },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/20 hover:bg-white/[0.04] transition-all animate-slide-up" style={{ animationDelay: `${(i + 1) * 80}ms`, animationFillMode: "forwards" } as React.CSSProperties}>
                    <h4 className="font-display font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {expandedMission === "action-oriented" && (
        <section id="action-oriented" className="py-24 px-6 lg:px-24 scroll-mt-24 border-t border-white/[0.04]">
          <div className="animate-mission-reveal motion-reduce:animate-none max-w-5xl mx-auto lg:pl-16">
            <a href="#mission" className="mb-8 inline-flex items-center gap-2 text-orange-400 font-medium text-sm hover:text-orange-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Mission
            </a>
            <div className="mb-8">
              <span className="text-4xl font-display font-bold text-orange-500/30">02</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 mb-2">Action-oriented</h2>
              <p className="text-lg text-white/50 max-w-2xl">Turn strategy into execution, in one place.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
              <div className="space-y-3 order-2 lg:order-1">
                {[
                  { title: "Tasks", desc: "To-do lists tied to each project; completion tracked and shown on cards." },
                  { title: "Timelines", desc: "Timeline view for phases, milestones, and dependencies." },
                  { title: "Calendar", desc: "Strategic calendar for long-term planning; Weekly Planner for daily execution." },
                  { title: "\u201CWhat did I execute today?\u201D", desc: "Monitor view for today\u2019s output, blockers, and tomorrow\u2019s focus." },
                  { title: "Progress", desc: "Tasks done %, node counts, word counts, streaks, and execution logs." },
                  { title: "STRAB AI", desc: "Analysis, reports, and recommendations to spot gaps and next steps." },
                  { title: "Reports", desc: "AI-powered project reports, insights, and recommendations." },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/20 hover:bg-white/[0.04] transition-all animate-slide-up" style={{ animationDelay: `${(i + 1) * 60}ms`, animationFillMode: "forwards" } as React.CSSProperties}>
                    <h4 className="font-display font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] order-1 lg:order-2 border border-white/[0.06] animate-slide-up" style={{ animationFillMode: "forwards" } as React.CSSProperties}>
                <Image src="/stratabin-dashboard.png" alt="Dashboard and task execution" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}

      {expandedMission === "solo-or-team" && (
        <section id="solo-or-team" className="py-24 px-6 lg:px-24 scroll-mt-24 border-t border-white/[0.04]">
          <div className="animate-mission-reveal motion-reduce:animate-none max-w-5xl mx-auto lg:pl-16">
            <a href="#mission" className="mb-8 inline-flex items-center gap-2 text-orange-400 font-medium text-sm hover:text-orange-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Mission
            </a>
            <div className="mb-8">
              <span className="text-4xl font-display font-bold text-orange-500/30">03</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 mb-2">Solo or team</h2>
              <p className="text-lg text-white/50 max-w-2xl">Use the same system for personal work and team collaboration.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/[0.06] animate-slide-up" style={{ animationFillMode: "forwards" } as React.CSSProperties}>
                <Image src="/stratabin-team-workspace.png" alt="Team workspace" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Solo", desc: "Personal projects, folders, and a clean workspace." },
                  { title: "Team workspaces", desc: "Create workspaces, invite members, and assign roles." },
                  { title: "Projects", desc: "Shared projects with status tracking." },
                  { title: "Daily tasks", desc: "Shared task lists and daily tasks by team member." },
                  { title: "Community", desc: "Feed, People, and Chats for connections." },
                  { title: "Profiles", desc: "Project-focused profiles." },
                  { title: "Chat", desc: "DM any team member or connect via workspaces." },
                  { title: "Join flow", desc: "Workspace ID or join link to onboard." },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/20 hover:bg-white/[0.04] transition-all animate-card-in" style={{ animationDelay: `${(i + 1) * 70}ms`, animationFillMode: "forwards" } as React.CSSProperties}>
                    <h4 className="font-display font-bold text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="section-line" />

      {/* ══════════ COMPLETE GUIDE (PLAIN LANGUAGE) ══════════ */}
      <section id="complete-guide" className="py-32 px-6 lg:px-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto lg:pl-16 relative">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-orange-500/20 to-transparent" />
          <div className="md:pl-8 space-y-12">
            <span className="reveal-up block text-orange-400/20 font-display text-8xl md:text-9xl font-bold leading-none select-none">03</span>
            <header className="reveal-up space-y-4 -mt-6">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase">Complete guide</span>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight">
                Stratabin in plain language
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">
                Everything below is the full explanation: how the dashboard works, what happens inside a project, the two STRABs, teams, and the guide site&mdash;written for normal readers, not jargon.
              </p>
            </header>

            <div className="reveal-up rounded-2xl border border-orange-500/20 bg-orange-500/[0.06] p-6 md:p-8 space-y-3">
              <h3 className="font-display text-lg font-bold text-white">Bottom line</h3>
              <p className="text-white/60 leading-relaxed">
                Stratabin helps you stop losing ideas in random notes.
              </p>
              <p className="text-white/60 leading-relaxed">
                You see your thinking as a map, write the plan, schedule and do the work, and optionally use AI to create new plans or sharpen the one you&apos;re already on&mdash;especially through the links in the dashboard and in each project.
              </p>
            </div>

            <article className="reveal-up space-y-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-white">Your home screen (Dashboard)</h3>
              <p className="text-white/55 leading-relaxed">
                This is where you see all your projects.
              </p>
              <p className="text-white/55 leading-relaxed">
                Think of a project as one big goal or idea you&apos;re working on&mdash;like &ldquo;launch a product,&rdquo; &ldquo;plan a wedding,&rdquo; or &ldquo;grow the business.&rdquo;
              </p>
              <p className="text-white/70 font-medium">You can:</p>
              <ul className="list-disc pl-5 space-y-3 text-white/55 leading-relaxed marker:text-orange-400/80">
                <li>
                  Start a blank project and fill it in yourself, or
                </li>
                <li>
                  Use <strong className="text-white/75 font-semibold">STRAB in the header</strong> when you want the AI to help you create a whole new plan from scratch (a fresh workspace with ideas, connections, and notes already sketched out).
                </li>
              </ul>
              <p className="text-white/55 leading-relaxed pt-2">
                You can also sort projects into folders, join team workspaces if you work with others, open your profile, visit the community, or open the &ldquo;How to use&rdquo; link to the guide again.
              </p>
            </article>

            <article className="reveal-up space-y-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-white">Inside one project</h3>
              <p className="text-white/55 leading-relaxed">
                When you open a project, you&apos;re really opening <strong className="text-white/80">one workspace for that goal</strong>. People usually move through it like this:
              </p>

              <div className="space-y-6 border-l-2 border-orange-500/25 pl-5 md:pl-6">
                <div>
                  <h4 className="font-display font-bold text-orange-400/95 mb-2">Strategy / flow view</h4>
                  <p className="text-white/55 leading-relaxed">
                    You see a map of ideas&mdash;boxes and links, not just a long document. That&apos;s where you think clearly: what matters, what depends on what, open questions, decisions.
                  </p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-orange-400/95 mb-2">Writing</h4>
                  <p className="text-white/55 leading-relaxed">
                    When you&apos;re ready, you turn that thinking into real writing&mdash;overview, plans, notes&mdash;still inside the same project.
                  </p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-orange-400/95 mb-2">Tasks</h4>
                  <p className="text-white/55 leading-relaxed">
                    You break work into things to do and tick them off. That&apos;s where doing starts.
                  </p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-orange-400/95 mb-2">Timeline &amp; calendar</h4>
                  <p className="text-white/55 leading-relaxed">
                    You put dates and phases on it so the plan has a <em className="text-white/65 not-italic">when</em>, not only a <em className="text-white/65 not-italic">what</em>.
                  </p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-orange-400/95 mb-2">STRAB for this project</h4>
                  <p className="text-white/55 leading-relaxed">
                    That&apos;s the AI that knows this project: you can ask for summaries, risks, &ldquo;what should I do next?&rdquo;, and reports&mdash;like a coach that&apos;s read your map, tasks, and writing.
                  </p>
                </div>
              </div>

              <p className="text-white/70 font-medium leading-relaxed border border-white/[0.08] rounded-xl bg-white/[0.03] px-5 py-4">
                So in one sentence: think on the map &rarr; write it down &rarr; turn it into tasks and dates &rarr; use AI to stay on track.
              </p>
            </article>

            <article className="reveal-up space-y-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-white">Two different STRABs (simple version)</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="rounded-xl border border-white/[0.06] bg-black/20 p-5 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-400/90">STRAB from the main dashboard (header)</p>
                  <p className="text-white/55 leading-relaxed italic">
                    &ldquo;I want to start something new and have AI help me build the first version of the plan.&rdquo;
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/20 p-5 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-400/90">STRAB inside a project</p>
                  <p className="text-white/55 leading-relaxed italic">
                    &ldquo;I&apos;m already working on this thing&mdash;help me improve it, question it, and summarize it.&rdquo;
                  </p>
                </div>
              </div>
              <p className="text-white/50 leading-relaxed">
                That&apos;s the only split most people need to remember.
              </p>
            </article>

            <article className="reveal-up space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-white">Working with others</h3>
              <p className="text-white/55 leading-relaxed">
                If you use teams, you can share workspaces with people: same projects, chat, and daily rhythm together&mdash;instead of everyone living in separate notes and chats.
              </p>
            </article>

            <article className="reveal-up space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-white">The guide website</h3>
              <p className="text-white/55 leading-relaxed">
                <a href="https://guide.stratabin.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 font-semibold underline-offset-2 hover:underline">guide.stratabin.com</a>{" "}
                is the friendly explanation: what Stratabin is, why it exists, and how it&apos;s meant to help you go from &ldquo;I have an idea&rdquo; to &ldquo;I&apos;m actually doing it.&rdquo;
              </p>
              <p className="text-white/55 leading-relaxed">
                You can open it from the app whenever you want that story in normal language.
              </p>
            </article>

            <footer className="reveal-up rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.04] to-transparent p-6 md:p-8 space-y-4">
              <h3 className="font-display text-lg font-bold text-orange-400/95">Bottom line for &ldquo;normal&rdquo; readers</h3>
              <p className="text-white/60 leading-relaxed">
                Stratabin helps you stop losing ideas in random notes.
              </p>
              <p className="text-white/60 leading-relaxed">
                You see your thinking as a map, write the plan, schedule and do the work, and optionally use AI to create new plans or sharpen the one you&apos;re already on&mdash;especially through the links in the dashboard and in each project.
              </p>
            </footer>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ══════════ VISION ══════════ */}
      <section className="py-32 px-6 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(249,115,22,0.06),transparent)]" />
        <div className="relative max-w-4xl mx-auto lg:pl-16">
          <span className="reveal-up inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">Vision</span>
          <blockquote className="reveal-up font-display text-3xl md:text-4xl font-bold mb-8 leading-tight">
            To help people move from <span className="text-gradient">thinking to doing</span>.
          </blockquote>
          <p className="reveal-up text-lg text-white/50 leading-relaxed mb-12">
            Most tools let you write ideas&mdash;few help you structure and act on them. Stratabin closes that gap.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <a href="#features" className="reveal-up group block p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 hover:bg-white/[0.04] transition-all duration-300">
              <h4 className="font-display text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">Solo planning</h4>
              <p className="text-white/35 text-sm">Your own workspace. Organize ideas, create flows, track tasks&mdash;everything private.</p>
              <span className="inline-flex items-center gap-2 mt-4 text-orange-400/60 group-hover:text-orange-400 font-medium text-sm transition-colors">Learn more &rarr;</span>
            </a>
            <a href="#features" className="reveal-up group block p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 hover:bg-white/[0.04] transition-all duration-300">
              <h4 className="font-display text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">Team collaboration</h4>
              <p className="text-white/35 text-sm">Shared workspaces, group chat, daily tasks, and roles. Invite your team and ship together.</p>
              <span className="inline-flex items-center gap-2 mt-4 text-orange-400/60 group-hover:text-orange-400 font-medium text-sm transition-colors">Learn more &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" className="py-32 px-6 lg:px-24 scroll-mt-24">
        <div className="max-w-6xl mx-auto lg:pl-16">
          <span className="reveal-up block text-orange-400/20 font-display text-8xl md:text-9xl font-bold leading-none select-none">04</span>
          <h2 className="reveal-up font-display text-4xl md:text-5xl font-bold -mt-6 mb-4">Features</h2>
          <p className="reveal-up text-white/35 mb-16 max-w-2xl text-lg">
            From solo planning to team collaboration&mdash;everything in one platform.
          </p>

          {/* Personal Workspace */}
          <div className="reveal-up mb-16">
            <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
              <button
                onClick={() => setExpandedPersonalFeatures(!expandedPersonalFeatures)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-sm">{"\u25C9"}</span>
                    Personal Workspace
                  </h3>
                  <p className="text-white/35 max-w-xl">Your private space. Organize ideas, structure plans, and execute&mdash;all yours.</p>
                </div>
                <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500/10 text-orange-400 transition-transform duration-300 ${expandedPersonalFeatures ? "rotate-180" : ""}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              {expandedPersonalFeatures && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {PERSONAL_FEATURES.map((f, i) => (
                      <CardTilt
                        key={i}
                        className="group relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/20 hover:bg-white/[0.04] opacity-0 animate-card-in transition-colors"
                        style={{ animationDelay: `${(i + 1) * 80}ms`, animationFillMode: "forwards" } as React.CSSProperties}
                        maxTilt={5}
                      >
                        <span className="inline-flex w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 items-center justify-center font-bold text-base mb-3 group-hover:scale-110 transition-transform">
                          {f.icon}
                        </span>
                        <h4 className="font-display font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{f.title}</h4>
                        <p className="text-white/35 text-sm leading-relaxed">{f.desc}</p>
                      </CardTilt>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Team Workspace */}
          <div className="reveal-up">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-sm">{"\u25C8"}</span>
              Team Workspace
            </h3>
            <p className="text-white/35 mb-8 max-w-xl">Share, collaborate, and ship together. Tap a section to reveal.</p>
            <div className="space-y-4">
              {TEAM_SECTIONS.map((sec) => (
                <div key={sec.id} className="rounded-2xl border border-white/[0.06] overflow-hidden">
                  <button
                    onClick={() => setExpandedTeamSection(expandedTeamSection === sec.id ? null : sec.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                  >
                    <div>
                      <h4 className="font-display font-bold text-white">{sec.title}</h4>
                      <p className="text-white/35 text-sm mt-1">{sec.desc}</p>
                    </div>
                    <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500/10 text-orange-400 transition-transform duration-300 ${expandedTeamSection === sec.id ? "rotate-180" : ""}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </button>
                  {expandedTeamSection === sec.id && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="grid lg:grid-cols-2 gap-8 items-start">
                        <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-white/[0.06] opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" } as React.CSSProperties}>
                          <Image src={sec.image} alt={sec.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {sec.features.map((f, i) => (
                            <CardTilt
                              key={i}
                              className="group relative p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/20 hover:bg-white/[0.04] opacity-0 animate-card-in transition-colors"
                              style={{ animationDelay: `${(i + 1) * 80}ms`, animationFillMode: "forwards" } as React.CSSProperties}
                              maxTilt={4}
                            >
                              <span className="inline-flex w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 items-center justify-center font-bold text-sm mb-2">{f.icon}</span>
                              <h5 className="font-display font-bold text-white text-sm mb-1">{f.title}</h5>
                              <p className="text-white/35 text-xs leading-relaxed">{f.desc}</p>
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
            <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="reveal-up inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-semibold transition-all duration-300 border border-orange-500/20 hover:border-orange-500/30">
              Try Stratabin
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="py-32 px-6 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(249,115,22,0.03)_0%,transparent_30%,transparent_70%,rgba(249,115,22,0.02)_100%)]" />
        <div className="relative max-w-6xl mx-auto lg:pl-16">
          <span className="reveal-up inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">How it works</span>
          <h2 className="reveal-up font-display text-3xl md:text-4xl font-bold mb-4">Five steps from idea to done</h2>
          <p className="reveal-up text-white/35 mb-16 max-w-xl">Everything happens in one place. No switching between tools.</p>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Map", desc: "Strategy / flow view: ideas as boxes and links\u2014what matters, dependencies, questions, decisions." },
              { step: "02", title: "Write", desc: "Turn that thinking into real writing: overview, plans, notes\u2014still inside the same project." },
              { step: "03", title: "Tasks", desc: "Break work into things to do and tick them off. That\u2019s where doing starts." },
              { step: "04", title: "Schedule", desc: "Timeline & calendar: put dates and phases on it so the plan has a when." },
              { step: "05", title: "STRAB", desc: "Project-aware AI: summaries, risks, next steps, and reports to stay on track." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="reveal-up group">
                <span className="font-display text-4xl font-bold text-orange-500/20 group-hover:text-orange-400/40 transition-colors">{step}</span>
                <h4 className="font-display font-bold text-white text-lg mt-2 mb-2 group-hover:text-orange-400 transition-colors">{title}</h4>
                <p className="text-white/35 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-32 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto lg:pl-16">
          <span className="reveal-up inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">Testimonials</span>
          <h2 className="reveal-up font-display text-3xl md:text-4xl font-bold mb-4">Built for people who ship</h2>
          <p className="reveal-up text-white/35 mb-12 max-w-xl">Stratabin helps you move from idea to execution&mdash;faster.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Finally, a workspace that actually helps me turn ideas into action. The flow canvas is a game-changer.", author: "Product manager", tag: "Solo user" },
              { quote: "Our team uses Stratabin for every project. Daily tasks, shared workspaces, and the AI reports keep us aligned.", author: "Startup founder", tag: "Team" },
              { quote: "From scattered notes to a clear plan in one place. Stratabin is exactly what I needed.", author: "Writer & consultant", tag: "Solo user" },
            ].map((t, i) => (
              <div key={i} className="reveal-up p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-colors">
                <p className="text-white/60 mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <span className="text-orange-400 text-xs font-semibold uppercase tracking-wide">{t.tag}</span>
                <p className="text-white/30 text-sm mt-1">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ══════════ CTA ══════════ */}
      <section className="py-32 px-6 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(249,115,22,0.15),transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="reveal-up font-display text-3xl md:text-4xl font-bold mb-6">One system for it all</h2>
          <p className="reveal-up text-xl text-white/50 mb-8 leading-relaxed">
            Organize thinking &middot; Structure ideas &middot; Plan execution &middot; Track progress &middot; Collaborate
          </p>
          <p className="reveal-up text-white/30 mb-10">
            Stratabin is evolving&mdash;enhanced AI, deeper integrations, and stronger collaboration tools coming soon.
          </p>
          <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="reveal-up inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30">
            Get started at stratabin.com
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      <div className="section-line" />

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" className="py-32 px-6 lg:px-24 scroll-mt-24">
        <div className="max-w-2xl mx-auto lg:pl-16">
          <span className="reveal-up block text-orange-400/20 font-display text-8xl md:text-9xl font-bold leading-none select-none">05</span>
          <h2 className="reveal-up font-display text-3xl md:text-4xl font-bold -mt-6 mb-12">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="py-32 px-6 lg:px-24 scroll-mt-24">
        <div className="max-w-5xl mx-auto lg:pl-16">
          <span className="reveal-up block text-orange-400/20 font-display text-8xl md:text-9xl font-bold leading-none select-none">06</span>
          <h2 className="reveal-up font-display text-3xl md:text-4xl font-bold -mt-6 mb-16">Meet the founder</h2>

          <div className="reveal-up rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 p-10 lg:p-14">
              <div className="flex-1 min-h-[280px] flex items-center justify-center bg-gradient-to-br from-orange-500/5 to-orange-500/10 rounded-xl border border-orange-500/10">
                <div className="w-44 h-44 text-orange-400/80">
                  <ManIcon className="w-full h-full" />
                </div>
              </div>
              <div className="flex-1 space-y-5">
                <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest border border-orange-500/15">
                  FOUNDER
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Abhinand Antony <span className="text-gradient">aka Roschil</span>
                </h3>
                <p className="text-orange-400 font-semibold">Self-taught AI augmented dev / System Architect</p>
                <p className="text-white/50">Automotive / Aerospace Devotee</p>
                <p className="text-white/35 leading-relaxed">
                  Building Stratabin to help people move from thinking to doing. Passionate about structured systems, clean architecture, and turning complex ideas into actionable plans.
                </p>
                <div className="space-y-4 pt-2">
                  <div className="flex gap-3">
                    <a href="https://www.instagram.com/roschh3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-orange-500/30 text-white/70 hover:text-orange-400 font-medium text-sm transition-all">
                      Instagram
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/roshil-antony-kj-9b73a92b9/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-orange-500/30 text-white/70 hover:text-orange-400 font-medium text-sm transition-all">
                      LinkedIn
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                  <div>
                    <p className="text-white/30 text-sm font-medium mb-2">Projects</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "stratabin.com", url: "https://stratabin.com" },
                        { name: "wilifunkgame.xyz", url: "https://wilifunkgame.xyz" },
                        { name: "gubicoolens.com", url: "https://gubicoolens.com" },
                      ].map(({ name, url }) => (
                        <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-orange-500/30 text-white/50 hover:text-orange-400 text-sm transition-all">
                          {name}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatAssistant />

      {/* ══════════ FOOTER ══════════ */}
      <footer className="py-16 px-6 lg:px-24 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto lg:pl-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="font-display font-bold text-white hover:text-orange-400 transition-colors">
              stratabin.com
            </a>
            <div className="flex flex-wrap gap-8 justify-center text-sm text-white/25">
              <a href="#hero" className="hover:text-white/60 transition-colors">Home</a>
              <a href="#mission" className="hover:text-white/60 transition-colors">Mission</a>
              <a href="#complete-guide" className="hover:text-white/60 transition-colors">Guide</a>
              <a href="#features" className="hover:text-white/60 transition-colors">Features</a>
              <a href="#faq" className="hover:text-white/60 transition-colors">FAQ</a>
              <a href="#about" className="hover:text-white/60 transition-colors">About</a>
            </div>
            <a href="https://stratabin.com" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors">
              Get Started
            </a>
          </div>
          <p className="text-white/15 text-sm mt-10 text-center">&copy; {new Date().getFullYear()} Stratabin. Built with care.</p>
        </div>
      </footer>
    </div>
  );
}
