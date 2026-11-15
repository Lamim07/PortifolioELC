// Adapted from Hyperiux Vault: https://vault.hyperiux.com
"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type FocusEvent } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "./timeline.css";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText);

export type JourneyItem = {
  id: string;
  year: string;
  month: string;
  content: string;
  title?: string;
  period?: string;
  company?: string;
  location?: string;
  highlights?: string[];
};

export type TimelineProps = {
  items: JourneyItem[];
  id?: string;
  title?: string;
  periodLabel?: string;
  scrollLabel?: string;
  detailsLabel?: string;
  closeLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  duration?: number;
  scrollDuration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getSnapshot = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerSnapshot = () => false;

export default function Timeline({
  items,
  id = "journey",
  title = "Professional journey",
  periodLabel,
  scrollLabel = "Scroll to explore",
  detailsLabel = "View responsibilities",
  closeLabel = "Close",
  textColor = "#f4f7f4",
  mutedTextColor = "#a7b1ae",
  activeColor = "#42f2a8",
  backgroundColor = "transparent",
  imageUrl = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
  imageAlt = "Office workspace",
  duration,
  scrollDuration = 1.2,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedItem, setSelectedItem] = useState<JourneyItem | null>(null);
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const normalizedDuration = Math.max(0.2, duration ?? scrollDuration);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track || !items.length) return;

    const media = gsap.matchMedia();
    media.add({ all: "all", horizontal: "(min-width: 900px) and (min-height: 680px)", reduce: REDUCED_MOTION_QUERY }, (context) => {
      if (context.conditions?.reduce) return;
      const horizontal = Boolean(context.conditions?.horizontal);
      const nodes = Array.from(section.querySelectorAll<HTMLElement>(".vault-timeline__item"));
      const splits: SplitText[] = [];
      let travel: gsap.core.Tween | undefined;

      if (horizontal) {
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        travel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: viewport,
            pinType: "transform",
            start: "top 96px",
            end: () => `+=${Math.max(450, distance() + viewport.clientHeight * 0.45)}`,
            scrub: 0.35,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        triggerRef.current = travel.scrollTrigger ?? null;
        gsap.fromTo(section.querySelector(".vault-timeline__progress"), { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top 96px", end: () => `+=${Math.max(450, distance() + viewport.clientHeight * 0.45)}`, scrub: 0.35, invalidateOnRefresh: true },
        });
      }

      nodes.forEach((node, index) => {
        const triggerSettings = horizontal
          ? { trigger: node, containerAnimation: travel, start: "left 92%", end: "left 62%", scrub: 0.25 }
          : { trigger: node, start: "top 88%", toggleActions: "play none none none" };

        gsap.from(node.querySelector(".vault-timeline__stem"), {
          ...(horizontal ? { scaleY: 0, transformOrigin: index % 2 ? "top" : "bottom" } : { scaleX: 0, transformOrigin: "left" }),
          duration: normalizedDuration * 0.55,
          scrollTrigger: triggerSettings,
        });
        gsap.from(node.querySelector(".vault-timeline__dot"), {
          scale: 0,
          duration: normalizedDuration * 0.5,
          ease: "back.out(1.8)",
          scrollTrigger: triggerSettings,
        });
        node.querySelectorAll<HTMLElement>("[data-timeline-reveal]").forEach((element) => {
          splits.push(SplitText.create(element, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(split) {
              return gsap.from(split.lines, { yPercent: 100, opacity: 0, duration: normalizedDuration, stagger: 0.06, ease: "power2.out", scrollTrigger: triggerSettings });
            },
          }));
        });
      });

      return () => {
        splits.forEach((split) => split.revert());
        triggerRef.current = null;
      };
    }, section);

    return () => media.revert();
  }, [items, normalizedDuration, reducedMotion]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!selectedItem) { if (dialog.open) dialog.close(); return; }
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedItem]);

  function handleKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    const trigger = triggerRef.current;
    if (!trigger || event.target !== event.currentTarget) return;
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const progress = event.key === "Home" ? 0 : event.key === "End" ? 1 : Math.max(0, Math.min(1, trigger.progress + (event.key === "ArrowRight" ? 0.3 : -0.3)));
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: "instant" });
  }

  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    const trigger = triggerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const item = (event.target as HTMLElement).closest<HTMLElement>(".vault-timeline__item");
    if (!trigger || !viewport || !track || !item) return;
    const rect = item.getBoundingClientRect();
    if (rect.left >= 16 && rect.right <= viewport.clientWidth - 16) return;
    const target = item.offsetLeft + (item.parentElement?.offsetLeft ?? 0) - (viewport.clientWidth - item.offsetWidth) / 2;
    const progress = Math.max(0, Math.min(1, target / Math.max(1, track.scrollWidth - viewport.clientWidth)));
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: "instant" });
  }

  const style = { color: textColor, backgroundColor, "--timeline-active": activeColor, "--timeline-muted": mutedTextColor } as CSSProperties;

  return (
    <section ref={sectionRef} id={id} className={`vault-timeline${reducedMotion ? " vault-timeline--reduced" : ""}`} style={style} aria-label={title}>
      <div ref={viewportRef} className="vault-timeline__viewport" tabIndex={0} onKeyDown={handleKeyboard} onFocusCapture={handleFocus} aria-label={scrollLabel}>
        <div ref={trackRef} className="vault-timeline__track">
          <div className="vault-timeline__intro">
            <div className="vault-timeline__image"><img src={imageUrl} alt={imageAlt} loading="lazy" decoding="async" width={700} height={900} onLoad={() => ScrollTrigger.refresh()} /></div>
            <div className="vault-timeline__intro-copy"><span className="vault-timeline__eyebrow">{periodLabel}</span><h3>{title}</h3><p>{scrollLabel}<ArrowRight size={16} aria-hidden="true" /></p></div>
          </div>
          <div className="vault-timeline__events">
            <div className="vault-timeline__baseline" aria-hidden="true"><div className="vault-timeline__progress" /></div>
            <ol className="vault-timeline__list">
              {items.map((item) => (
                <li key={item.id} className="vault-timeline__item">
                  <div className="vault-timeline__stem" aria-hidden="true" />
                  <div className="vault-timeline__dot" aria-hidden="true" />
                  <article className="vault-timeline__card">
                    <p className="vault-timeline__date">{item.period ?? `${item.month} ${item.year}`}</p>
                    <h4 data-timeline-reveal>{item.title ?? `${item.year} ${item.month}`}</h4>
                    {item.company ? <p className="vault-timeline__company">{item.company}<span> · {item.location}</span></p> : null}
                    <p className="vault-timeline__description" data-timeline-reveal>{item.content}</p>
                    {item.highlights?.length ? <button type="button" className="vault-timeline__details" onClick={() => setSelectedItem(item)} aria-label={`${detailsLabel}: ${item.title ?? item.year}`}>{detailsLabel}<ArrowUpRight size={15} aria-hidden="true" /></button> : null}
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <dialog ref={dialogRef} className="vault-timeline__dialog" aria-labelledby={`${id}-detail-title`} onCancel={() => setSelectedItem(null)} onClose={() => setSelectedItem(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelectedItem(null); }}>
        {selectedItem ? <div className="vault-timeline__dialog-content">
          <button className="vault-timeline__close" type="button" aria-label={closeLabel} onClick={() => setSelectedItem(null)}><X size={20} /></button>
          <p className="vault-timeline__date">{selectedItem.period ?? `${selectedItem.month} ${selectedItem.year}`}</p>
          <h3 id={`${id}-detail-title`}>{selectedItem.title}</h3>
          <p className="vault-timeline__company">{selectedItem.company} · {selectedItem.location}</p>
          <p className="vault-timeline__description">{selectedItem.content}</p>
          <ul>{selectedItem.highlights?.map((highlight) => <li key={highlight}><CheckCircle2 size={17} aria-hidden="true" /><span>{highlight}</span></li>)}</ul>
        </div> : null}
      </dialog>
    </section>
  );
}
