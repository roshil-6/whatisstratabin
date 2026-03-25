import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        stratabin: {
          orange: "#f97316",
          "orange-light": "#fb923c",
          "orange-dark": "#ea580c",
          black: "#0a0a0a",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow": "0 0 40px -10px rgba(249, 115, 22, 0.3)",
        "glow-lg": "0 0 60px -15px rgba(249, 115, 22, 0.4)",
        "card": "0 4px 24px -4px rgba(0,0,0,0.08), 0 2px 8px -2px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 40px -8px rgba(0,0,0,0.12), 0 4px 16px -4px rgba(249,115,22,0.15)",
        "drop": "0 20px 50px -12px rgba(0,0,0,0.15), 0 8px 20px -8px rgba(249,115,22,0.1)",
        "drop-lg": "0 32px 64px -12px rgba(0,0,0,0.2), 0 12px 28px -8px rgba(249,115,22,0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "card-in": "cardIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        /** Mission detail panel — timed to feel aligned with Lenis scroll-to */
        "mission-reveal": "missionReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "float": "float 6s ease-in-out infinite",
        /** Chat assistant intro bubble — big side pop-in */
        "chat-intro-pop": "chatIntroPop 0.65s cubic-bezier(0.34, 1.45, 0.64, 1) both",
      },
      keyframes: {
        chatIntroPop: {
          from: { opacity: "0", transform: "translateX(28px) scale(0.88)" },
          to: { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        missionReveal: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        slideUp: { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        cardIn: { from: { opacity: "0", transform: "translateY(28px) scale(0.96)" }, to: { opacity: "1", transform: "translateY(0) scale(1)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "bounce-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: { "400": "400ms" },
    },
  },
  plugins: [],
};
export default config;
