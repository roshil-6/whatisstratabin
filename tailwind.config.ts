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
        "slide-up": "slideUp 0.5s ease-out forwards",
        "card-in": "cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        cardIn: { from: { opacity: "0", transform: "translateY(24px) scale(0.98)" }, to: { opacity: "1", transform: "translateY(0) scale(1)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
      },
      transitionDuration: { "400": "400ms" },
    },
  },
  plugins: [],
};
export default config;
