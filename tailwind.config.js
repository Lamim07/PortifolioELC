/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: token("paper"),
        ink: token("ink"),
        muted: token("muted"),
        accent: token("accent"),
        // superfícies invertidas (seções escuras no tema claro)
        "inv-bg": token("inv-bg"),
        "inv-fg": token("inv-fg"),
        "inv-muted": token("inv-muted"),
        "inv-accent": token("inv-accent"),
      },
      fontFamily: {
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "Consolas", "monospace"],
      },
      letterSpacing: {
        display: "-0.045em",
        tightish: "-0.03em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(.22,1,.36,1)",
      },
      keyframes: {
        marquee: { from: { transform: "translate3d(0,0,0)" }, to: { transform: "translate3d(-50%,0,0)" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};
