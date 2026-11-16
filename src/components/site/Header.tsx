"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { profile } from "@/data/portfolio";
import { EASE, usePortfolio, type Language } from "@/lib/portfolio-context";
import { cn } from "@/lib/utils";
import { ArrowIcon, Magnetic } from "./primitives";

export function LanguageSwitch({ className }: { className?: string }) {
  const { language, setLanguage, content } = usePortfolio();
  return (
    <div className={cn("relative flex border border-ink/15", className)} role="group" aria-label={content.header.languageLabel}>
      {(["pt", "en"] as Language[]).map((option) => {
        const active = language === option;
        return (
          <button
            key={option}
            type="button"
            lang={option === "pt" ? "pt-BR" : "en"}
            title={option === "pt" ? "Português" : "English"}
            aria-pressed={active}
            onClick={() => setLanguage(option)}
            className={cn("relative z-10 min-h-9 min-w-10 px-2.5 font-mono text-[11px] uppercase transition-colors duration-300", active ? "text-paper" : "text-muted hover:text-ink")}
          >
            {active ? <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export function Header() {
  const { content } = usePortfolio();
  const { header, navItems, ui } = content;
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  // mesma ordem (e numeração) das seções na página
  const order = ["#sobre", "#experiencia", "#projetos", "#habilidades", "#formacao", "#contato"];
  const sortedItems = [...navItems].sort((a, b) => order.indexOf(a.href) - order.indexOf(b.href));
  const desktopItems = sortedItems.filter((item) => item.href !== "#contato");

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(!open && current > 480 && current > previous + 4);
    if (current < previous - 4) setHidden(false);
  });

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -60%", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={cn("fixed inset-x-0 top-0 z-50 border-b border-ink/10 backdrop-blur-md transition-colors duration-300", open ? "bg-paper" : "bg-paper/85")}
        initial={reduce ? false : { y: -80 }}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <nav className="wrap flex h-[72px] items-center justify-between gap-6" aria-label={header.navLabel}>
          <a href="#inicio" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="sr-only">{header.homeLabel}:</span>
            <span className="relative grid size-9 place-items-center overflow-hidden border border-ink font-mono text-xs font-bold">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />
              <span className="relative transition-colors duration-300 group-hover:text-paper">{profile.initials}</span>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-semibold">{profile.name}</span>
              <span className="label text-[11px] text-muted">{header.role}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {desktopItems.map((item, i) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a href={item.href} aria-current={isActive ? "true" : undefined} className="group relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium">
                    <span className={cn("font-mono text-[11px] transition-colors", isActive ? "text-accent" : "text-muted group-hover:text-accent")}>0{i + 1}</span>
                    <span className="relative">{item.label}</span>
                    {isActive ? <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-px h-px bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} /> : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <LanguageSwitch className="hidden md:flex" />
            <Magnetic className="hidden xl:inline-flex">
              <a className="btn btn-solid btn-sm" href="#contato">
                {header.contactCta} <ArrowIcon size={14} />
              </a>
            </Magnetic>
            <button
              type="button"
              className="label min-h-10 border border-ink px-4 xl:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? header.closeMenu : header.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-4 overflow-hidden">
                <motion.span className="block" animate={{ y: open ? -16 : 0 }} transition={{ duration: 0.35, ease: EASE }}>
                  <span className="block h-4 leading-4">{ui.menu}</span>
                  <span className="block h-4 leading-4">{ui.closeMenu}</span>
                </motion.span>
              </span>
            </button>
          </div>
        </nav>
        <motion.div aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent" style={{ scaleX: progress }} />
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col bg-inv-bg pt-[72px] text-inv-fg xl:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="wrap flex flex-1 flex-col justify-center gap-1">
              {sortedItems.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-inv-fg/15">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-3 text-[clamp(2rem,9vw,3.5rem)] font-semibold leading-tight tracking-tightish"
                    initial={reduce ? false : { y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.18 + i * 0.05 }}
                  >
                    <span className="font-mono text-xs font-normal text-inv-accent">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="wrap flex items-center justify-between gap-4 pb-8 pt-6">
              <a className="link-line text-sm font-semibold" href={`mailto:${profile.email}`}>{header.sendMessage}</a>
              <div className="flex border border-inv-fg/30 md:hidden">
                <LanguageSwitchInverse />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function LanguageSwitchInverse() {
  const { language, setLanguage } = usePortfolio();
  return (
    <>
      {(["pt", "en"] as Language[]).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          className={cn("min-h-10 min-w-11 px-3 font-mono text-xs uppercase", language === option ? "bg-inv-fg text-inv-bg" : "text-inv-muted")}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </>
  );
}
