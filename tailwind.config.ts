import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#080A12",
        graphite: "#121620",
        champagne: "#E7D8B8",
        signal: "#6EE7B7",
        voltage: "#7DD3FC",
        ember: "#FB7185"
      },
      boxShadow: {
        glow: "0 0 40px rgba(125, 211, 252, 0.18)",
        premium: "0 24px 80px rgba(0, 0, 0, 0.45)"
      },
      animation: {
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
        scan: "scan 1.65s ease-in-out infinite",
        rise: "rise 0.55s ease-out both"
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.58", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" }
        },
        scan: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
