"use client";

import Timeline, { type JourneyItem } from "@/components/ui/timeline";

const items: JourneyItem[] = [
  { id: "2020-march", year: "2020", month: "March", content: "Signal research turns scattered notes into a clear product thesis" },
  { id: "2020-november", year: "2020", month: "November", content: "Prototype sprint validates the experience with real operators" },
  { id: "2021-july", year: "2021", month: "July", content: "Founding release ships with the first live customer journeys" },
  { id: "2022-october", year: "2022", month: "October", content: "Community feedback reshapes the roadmap into sharper releases" },
  { id: "2023-april", year: "2023", month: "April", content: "Automation layer connects insight, publishing, and sales motion" },
  { id: "2025-september", year: "2025", month: "September", content: "Companion mobile workflows make the timeline travel-ready" },
  { id: "2026-may", year: "2026", month: "May", content: "New markets open with localized launches and faster onboarding" },
];
const settings = { textColor: "#ffffff", mutedTextColor: "#a1a1aa", activeColor: "#ff5f00", backgroundColor: "#0a0a0a", duration: 1.4 };

// Standalone demonstration. The portfolio supplies its own professional data.
export default function TimelineDemo(props: Partial<typeof settings>) {
  const current = { ...settings, ...props };
  return <main style={{ background: current.backgroundColor, color: current.textColor }}>
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em]">Product roadmap</p>
      <h1 className="max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Six years, one horizontal scroll.</h1>
      <p className="max-w-md text-sm leading-relaxed">Keep scrolling — the track slides sideways, and each milestone draws its stem and reveals its copy.</p>
    </section>
    <Timeline {...current} items={items} title="Product Storyline" periodLabel="2020 — 2026" />
    <section className="flex min-h-screen items-center justify-center px-6 text-center text-sm">From the first research note to a multi-market launch.</section>
  </main>;
}
