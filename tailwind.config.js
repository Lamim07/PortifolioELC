/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070909",
        graphite: "#0d1211",
        line: "rgba(255, 255, 255, 0.12)",
        frost: "rgba(255, 255, 255, 0.055)",
        mint: "#42f2a8",
        aqua: "#75d8ff",
        amber: "#f3c565",
        bone: "#f4f7f4",
        muted: "#a7b1ae",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 42px rgba(66, 242, 168, 0.18)",
        panel: "0 28px 90px rgba(0, 0, 0, 0.38)",
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
        "steel-sheen":
          "linear-gradient(135deg, rgba(66,242,168,.95), rgba(117,216,255,.88) 58%, rgba(243,197,101,.86))",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        trace: {
          "0%": { strokeDashoffset: "540" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        scan: "scan 5s linear infinite",
        shimmer: "shimmer 5s ease-in-out infinite alternate",
        trace: "trace 4.5s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
