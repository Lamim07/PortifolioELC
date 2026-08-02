import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  CheckCircle2,
  Database,
  FileText,
  Github,
  Gauge,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  ServerCog,
  Terminal,
  X,
} from "lucide-react";
import {
  getProjects,
  portfolioContent,
  profile,
} from "./data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function createIntroCode(codeLog) {
  return `using Serilog;
using Portfolio.Core;
using Portfolio.Infrastructure;

namespace LuisEduardo.Portfolio;

public sealed class DeveloperProfile
{
    private readonly ILogger _logger;

    public DeveloperProfile()
    {
        _logger = Log.ForContext<DeveloperProfile>();
    }

    public async Task BuildAsync()
    {
        var stack = new[] { ".NET", "React", "SQL" };

        _logger.Information("${codeLog}");
        await Architecture.CreateCleanAsync(stack);
    }
}`;
}

const PortfolioContext = createContext(null);

function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used inside PortfolioContext.Provider");
  return context;
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function highlightCSharpLine(line) {
  const tokenPattern = /(\/\/.*$)|("(?:\\.|[^"\\])*")|\b(using|namespace|public|sealed|class|private|readonly|async|var|new|await|void|return)\b|\b([A-Z][A-Za-z0-9_]*)\b|\b(\d+)\b/g;
  const fragments = [];
  let cursor = 0;
  let match;

  while ((match = tokenPattern.exec(line)) !== null) {
    if (match.index > cursor) fragments.push(line.slice(cursor, match.index));

    const className = match[1]
      ? "text-[#6a9955]"
      : match[2]
        ? "text-[#ce9178]"
        : match[3]
          ? "text-[#569cd6]"
          : match[4]
            ? "text-[#4ec9b0]"
            : "text-[#b5cea8]";

    fragments.push(
      <span className={className} key={`${match.index}-${match[0]}`}>
        {match[0]}
      </span>
    );
    cursor = tokenPattern.lastIndex;
  }

  if (cursor < line.length) fragments.push(line.slice(cursor));
  return fragments;
}

function IntroExperience({ onEnter }) {
  const { content } = usePortfolio();
  const { intro } = content;
  const introCode = useMemo(() => createIntroCode(intro.codeLog), [intro.codeLog]);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [launching, setLaunching] = useState(false);
  const editorRef = useRef(null);
  const launchTimerRef = useRef(null);
  const launchingRef = useRef(false);
  const readyRef = useRef(false);
  const officePointerX = useMotionValue(0);
  const officePointerY = useMotionValue(0);
  const officeSceneX = useTransform(officePointerX, [-0.5, 0.5], [-8, 8]);
  const officeSceneY = useTransform(officePointerY, [-0.5, 0.5], [-5, 5]);
  const typedCode = introCode.slice(0, visibleCharacters);
  const typedLines = typedCode.split("\n");
  const progress = Math.round((visibleCharacters / introCode.length) * 100);
  const isReady = visibleCharacters === introCode.length;
  readyRef.current = isReady;

  const handleEnter = () => {
    if (!readyRef.current || launchingRef.current) return;
    launchingRef.current = true;
    setLaunching(true);
    launchTimerRef.current = window.setTimeout(onEnter, 1050);
  };

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") return;
    officePointerX.set(event.clientX / window.innerWidth - 0.5);
    officePointerY.set(event.clientY / window.innerHeight - 0.5);
  };

  useEffect(() => {
    setVisibleCharacters(0);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisibleCharacters(introCode.length);
      return undefined;
    }

    let typingInterval;
    const startTimer = window.setTimeout(() => {
      typingInterval = window.setInterval(() => {
        setVisibleCharacters((current) => {
          const next = Math.min(current + 3, introCode.length);
          if (next === introCode.length) window.clearInterval(typingInterval);
          return next;
        });
      }, 18);
    }, 380);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(typingInterval);
    };
  }, [introCode]);

  useEffect(() => {
    if (editorRef.current) editorRef.current.scrollTop = editorRef.current.scrollHeight;
  }, [visibleCharacters]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      const interactiveTarget = event.target instanceof Element && event.target.closest("button, a, input, select, textarea");
      if (event.key === "Enter" && !interactiveTarget) handleEnter();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(launchTimerRef.current);
    };
  }, []);

  return (
    <motion.section
      className={cn(
        "fixed inset-0 z-[100] overflow-hidden bg-[#030505] text-bone focus-visible:outline-none",
        isReady ? "cursor-pointer" : "cursor-wait"
      )}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
      transition={{ duration: 0.68, ease: [0.76, 0, 0.24, 1] }}
      onClick={handleEnter}
      onPointerMove={handlePointerMove}
      onKeyDown={(event) => {
        if (event.key === " " && event.target === event.currentTarget) {
          event.preventDefault();
          handleEnter();
        }
      }}
      role="button"
      tabIndex={0}
      aria-disabled={!isReady}
      aria-label={isReady ? intro.readyAria : intro.compilingAria}
    >
      <motion.div
        className="office-scene-frame absolute"
        style={{ x: officeSceneX, y: officeSceneY }}
        animate={launching ? { scale: 2.05, filter: "brightness(1.42) blur(1px)" } : { scale: 1, filter: "brightness(1) blur(0px)" }}
        transition={{ duration: 1.12, ease: [0.76, 0, 0.24, 1] }}
      >
        <img className="absolute inset-0 h-full w-full object-cover" src="/assets/office-intro.png" alt={intro.officeAlt} />
        <div className="office-image-shade pointer-events-none absolute inset-0" />

        <motion.div
          className="office-monitor-ui pointer-events-none absolute overflow-hidden bg-[#111214]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.25 }}
        >
          <div className="flex h-8 items-center border-b border-white/10 bg-[#18191b] px-2 sm:h-9 sm:px-3">
            <div className="flex gap-2" aria-hidden="true">
              <span className="size-2 rounded-full bg-[#ff5f56]" />
              <span className="size-2 rounded-full bg-[#ffbd2e]" />
              <span className="size-2 rounded-full bg-[#27c93f]" />
            </div>
            <span className="mx-auto truncate px-3 font-mono text-[8px] text-bone/50 sm:text-[10px]">Portfolio.sln | Visual Studio</span>
            <span className="font-mono text-[8px] text-mint/60">C#</span>
          </div>

          <div className="grid h-[calc(100%-32px)] grid-cols-1 sm:h-[calc(100%-36px)] sm:grid-cols-[36px_minmax(0,1fr)] lg:grid-cols-[36px_160px_minmax(0,1fr)]">
            <aside className="hidden border-r border-white/[0.08] bg-[#161719] py-2.5 sm:flex sm:flex-col sm:items-center sm:gap-4" aria-hidden="true">
              <Braces className="text-aqua" size={16} />
              <Layers3 className="text-bone/30" size={15} />
              <Database className="text-bone/30" size={15} />
              <Terminal className="text-bone/30" size={15} />
            </aside>

            <aside className="hidden border-r border-white/[0.08] bg-[#121315] lg:block" aria-label={intro.solutionExplorer}>
              <div className="border-b border-white/[0.08] px-2.5 py-2 font-mono text-[8px] font-bold uppercase text-bone/45">Solution explorer</div>
              <div className="grid gap-1.5 px-2.5 py-3 font-mono text-[9px] text-bone/45">
                <span className="text-bone/70">▾ Portfolio</span>
                <span className="pl-3">▾ Core</span>
                <span className="pl-5 text-aqua">C# DeveloperProfile.cs</span>
                <span className="pl-3">▸ Infrastructure</span>
                <span className="pl-3">▸ Web</span>
                <span className="pl-3 text-bone/30">appsettings.json</span>
              </div>
            </aside>

            <div className="grid min-w-0 grid-rows-[28px_minmax(0,1fr)_68px_18px] bg-[#111214] sm:grid-rows-[30px_minmax(0,1fr)_74px_19px]">
              <div className="flex items-end border-b border-white/[0.08] bg-[#151618]">
                <span className="flex h-full items-center gap-1.5 border-r border-t-2 border-r-white/[0.08] border-t-aqua bg-[#111214] px-2 font-mono text-[8px] text-bone/75 sm:text-[9px]">
                  <Braces size={10} className="text-aqua" />
                  DeveloperProfile.cs
                </span>
              </div>

              <div ref={editorRef} className="intro-code-scroll relative overflow-hidden px-1 py-2 font-mono text-[8px] leading-[1.55] sm:px-2 sm:text-[9px] lg:text-[10px] xl:text-[11px]" aria-hidden="true">
                <div className="absolute inset-y-0 left-8 w-px bg-white/[0.04] sm:left-10" />
                {typedLines.map((line, index) => {
                  const isCurrentLine = index === typedLines.length - 1 && visibleCharacters < introCode.length;

                  return (
                    <div className={cn("grid min-h-[1.55em] grid-cols-[28px_1fr] sm:grid-cols-[36px_1fr]", isCurrentLine && "bg-aqua/[0.035]")} key={`${index}-${line}`}>
                      <span className="select-none pr-1.5 text-right text-bone/20 sm:pr-2">{index + 1}</span>
                      <code className="whitespace-pre pl-1.5 text-[#d4d4d4] sm:pl-2">
                        {highlightCSharpLine(line)}
                        {isCurrentLine ? <span className="intro-code-caret ml-px inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-aqua" /> : null}
                      </code>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/[0.08] bg-[#0d0e10]">
                <div className="flex h-6 items-center gap-1.5 border-b border-white/[0.07] px-2 font-mono text-[7px] font-bold uppercase text-bone/40 sm:text-[8px]">
                  <Terminal size={9} /> {intro.output}
                </div>
                <div className="px-2 py-1.5 font-mono text-[7px] leading-4 text-bone/45 sm:text-[8px] lg:text-[9px]">
                  <p><span className="text-aqua">$</span> dotnet run --project Portfolio.Web</p>
                  <p className={visibleCharacters === introCode.length ? "text-mint" : "text-bone/35"}>
                    {visibleCharacters === introCode.length ? intro.readyOutput : intro.compilingOutput}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-[#136f63] px-2 font-mono text-[7px] text-white/85 sm:text-[8px]">
                <span>main*</span>
                <span>BOOT {progress}%</span>
              </div>
            </div>
          </div>

          <div className="intro-screen-scan pointer-events-none absolute inset-x-0 top-8 h-px bg-gradient-to-r from-transparent via-aqua/75 to-transparent sm:top-9" />

          <AnimatePresence>
            {isReady && !launching ? (
              <motion.div
                className="office-launch-overlay absolute inset-0 z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <motion.div
                  className="office-launch-control absolute top-1/2 flex min-w-[190px] items-center gap-3 rounded-lg border border-mint/45 bg-[#07110e]/95 px-4 py-3 text-left shadow-[0_18px_55px_rgba(0,0,0,.45),0_0_34px_rgba(66,242,168,.16)] backdrop-blur-xl"
                  initial={{ opacity: 0, scale: 0.72, filter: "blur(9px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.18 }}
                >
                  <span className="office-launch-icon grid size-10 shrink-0 place-items-center rounded-full bg-mint text-ink shadow-[0_0_24px_rgba(66,242,168,.38)]">
                    <Play className="translate-x-px fill-ink" size={17} />
                  </span>
                  <span>
                    <span className="block font-mono text-[8px] font-bold uppercase text-mint">{intro.buildComplete}</span>
                    <strong className="mt-0.5 block text-sm font-black text-bone">{intro.startPortfolio}</strong>
                  </span>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {launching ? (
              <motion.div
                className="pointer-events-none absolute inset-0 z-50 bg-[#eafff7]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.04, 0.18, 0.96] }}
                transition={{ duration: 1.08, times: [0, 0.42, 0.72, 1], ease: "easeIn" }}
              />
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        className="office-vignette pointer-events-none absolute inset-0"
        animate={launching ? { opacity: 0.18 } : { opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute left-4 top-4 font-mono text-[9px] font-bold uppercase text-white/45 sm:left-7 sm:top-6 sm:text-[10px]">
        LEC / Workspace
      </div>
      <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 font-mono text-[9px] font-bold uppercase text-mint/80 sm:right-7 sm:top-6 sm:text-[10px]">
        <span className="size-1.5 animate-pulse rounded-full bg-mint" />
        Build {progress}%
      </div>
      <div
        className="absolute left-1/2 top-12 z-[70] -translate-x-1/2 sm:top-4"
        onClick={(event) => event.stopPropagation()}
      >
        <LanguageSwitch />
      </div>

      <motion.div
        className="office-enter-hint pointer-events-none absolute bottom-5 left-1/2 flex min-h-11 items-center gap-3 whitespace-nowrap rounded-lg border border-white/15 bg-black/55 px-5 text-xs font-black text-white shadow-[0_16px_45px_rgba(0,0,0,.45)] backdrop-blur-xl sm:bottom-8 sm:text-sm"
        initial={{ opacity: 0, y: 12 }}
        animate={launching ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
        transition={launching ? { duration: 0.18 } : { duration: 0.6, delay: 0.85 }}
      >
        {isReady ? <Play className="shrink-0 fill-mint text-mint" size={16} /> : <Terminal className="shrink-0 text-aqua" size={16} />}
        <span className="sm:hidden">{isReady ? intro.mobileReady : intro.mobileCompiling}</span>
        <span className="hidden sm:inline">{isReady ? intro.desktopReady : intro.desktopCompiling}</span>
      </motion.div>
    </motion.section>
  );
}

function Reveal({ children, className = "", delay = 0, as = motion.div }) {
  const Component = as;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={fadeUp}
      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}

function AmbientCanvas({ global = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.42 };
    let frame = 0;
    let width = 0;
    let height = 0;
    let nodes = [];

    const createNodes = () => {
      const amount = global
        ? Math.max(28, Math.min(54, Math.floor(width / 28)))
        : Math.max(34, Math.min(68, Math.floor(width / 22)));
      nodes = Array.from({ length: amount }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        size: 1 + Math.random() * 2.2,
        phase: index * 0.38,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      createNodes();
    };

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height);

      const grid = ctx.createLinearGradient(0, 0, width, height);
      grid.addColorStop(0, "rgba(66, 242, 168, 0.16)");
      grid.addColorStop(0.55, "rgba(117, 216, 255, 0.10)");
      grid.addColorStop(1, "rgba(243, 197, 101, 0.08)");

      for (let x = 0; x < width; x += 44) {
        ctx.strokeStyle = "rgba(255,255,255,0.025)";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += 44) {
        ctx.strokeStyle = "rgba(255,255,255,0.022)";
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      nodes.forEach((node) => {
        if (!reduceMotion) {
          node.x += node.vx + (pointer.x - 0.5) * 0.18;
          node.y += node.vy + Math.sin(time * 0.001 + node.phase) * 0.05;
        }

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      });

      nodes.forEach((node, index) => {
        for (let next = index + 1; next < nodes.length; next += 1) {
          const other = nodes[next];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 142) {
            ctx.strokeStyle = `rgba(117,216,255,${0.13 * (1 - distance / 142)})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      nodes.forEach((node) => {
        ctx.fillStyle = grid;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });

      const px = pointer.x * width;
      const py = pointer.y * height;
      const glow = ctx.createRadialGradient(px, py, 0, px, py, Math.max(width, height) * 0.42);
      glow.addColorStop(0, "rgba(66, 242, 168, 0.16)");
      glow.addColorStop(0.35, "rgba(117, 216, 255, 0.06)");
      glow.addColorStop(1, "rgba(7, 9, 9, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      frame = window.requestAnimationFrame(draw);
    };

    const handlePointer = (event) => {
      pointer.x = event.clientX / window.innerWidth;
      pointer.y = event.clientY / window.innerHeight;
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, [global]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none inset-0 h-full w-full mix-blend-screen",
        global ? "fixed z-0 opacity-55" : "absolute opacity-75"
      )}
      aria-hidden="true"
    />
  );
}

function LanguageSwitch({ className = "" }) {
  const { language, setLanguage, content } = usePortfolio();

  return (
    <div
      className={cn("grid grid-cols-2 rounded-lg border border-white/[0.08] bg-white/[0.035] p-1", className)}
      role="group"
      aria-label={content.header.languageLabel}
    >
      {["pt", "en"].map((option) => {
        const active = language === option;
        const label = option === "pt" ? "Português" : "English";

        return (
          <button
            key={option}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            onClick={() => setLanguage(option)}
            className={cn(
              "grid h-8 min-w-9 place-items-center rounded-md px-2 font-mono text-[10px] font-black uppercase transition-colors",
              active ? "bg-mint text-ink" : "text-bone/55 hover:bg-white/[0.06] hover:text-bone"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function Header() {
  const { content } = usePortfolio();
  const { header, navItems } = content;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#inicio");
  const [hovered, setHovered] = useState(null);
  const desktopNavItems = navItems.filter((item) => item.href !== "#contato");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) setActive(`#${visibleSection.target.id}`);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.15, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300 sm:px-4",
        scrolled ? "pt-2" : "pt-3 sm:pt-4"
      )}
    >
      <nav
        className={cn(
          "pointer-events-auto relative mx-auto flex h-[64px] w-[min(1240px,100%)] items-center justify-between gap-3 overflow-visible rounded-lg border px-2.5 transition-all duration-300 sm:px-3",
          scrolled
            ? "border-white/15 bg-ink/[0.86] shadow-[0_18px_60px_rgba(0,0,0,.34)] backdrop-blur-2xl"
            : "border-white/10 bg-ink/60 backdrop-blur-xl"
        )}
        aria-label={header.navLabel}
      >
        <a
          className="group flex min-w-0 items-center gap-3 text-bone"
          href="#inicio"
          aria-label={header.homeLabel}
          onClick={() => setMenuOpen(false)}
        >
          <span className="nav-brand-mark relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-mint/35 bg-mint/[0.07] font-mono text-xs font-black text-mint shadow-glow transition-all duration-300 group-hover:border-aqua/55 group-hover:text-aqua">
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">{profile.initials}</span>
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-steel-sheen transition-transform duration-300 group-hover:scale-x-100" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <strong className="block truncate text-sm font-black leading-5">{profile.name.split(" ").slice(0, 2).join(" ")}</strong>
            <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase text-bone/45 transition-colors group-hover:text-mint/80">
              <span className="size-1 rounded-full bg-mint shadow-[0_0_8px_rgba(66,242,168,.8)]" />
              {header.role}
            </span>
          </span>
        </a>

        <div
          className="hidden items-center gap-0.5 rounded-lg border border-white/[0.06] bg-white/[0.025] p-1 lg:flex"
          onPointerLeave={() => setHovered(null)}
        >
          {desktopNavItems.map((item) => {
            const isActive = active === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onPointerEnter={() => setHovered(item.href)}
                className={cn(
                  "relative isolate flex h-9 items-center px-3 text-xs font-bold transition-colors duration-200 lg:px-4",
                  isActive ? "text-bone" : "text-muted hover:text-bone"
                )}
              >
                {hovered === item.href && !isActive ? (
                  <motion.span
                    layoutId="navigation-hover"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/[0.055]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                {isActive ? (
                  <motion.span
                    layoutId="navigation-active"
                    className="absolute inset-0 -z-10 rounded-lg border border-mint/20 bg-mint/[0.09] shadow-[inset_0_-2px_0_rgba(66,242,168,.65)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </a>
            );
          })}
        </div>

        <LanguageSwitch className="hidden lg:grid" />

        <a className="nav-contact-cta group relative hidden h-10 items-center gap-2 overflow-hidden rounded-lg border border-mint/35 bg-mint/[0.09] px-4 text-xs font-black text-bone transition-all duration-300 hover:border-mint/65 hover:bg-mint/[0.15] lg:inline-flex" href="#contato">
          <span className="relative z-10">{header.contactCta}</span>
          <ArrowUpRight className="relative z-10 text-mint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={16} />
        </a>

        <button
          className="relative grid size-10 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] text-bone transition-colors hover:border-mint/30 hover:bg-mint/10 lg:hidden"
          type="button"
          aria-label={menuOpen ? header.closeMenu : header.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -35, scale: 0.75 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 35, scale: 0.75 }}
              transition={{ duration: 0.18 }}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="pointer-events-auto mx-auto mt-2 w-[min(1240px,100%)] overflow-hidden rounded-lg border border-white/10 bg-graphite/[0.96] p-2 shadow-panel backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid gap-1">
              {navItems.map((item, index) => {
                const isActive = active === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "group flex min-h-12 items-center gap-3 rounded-lg border px-3 transition-all duration-200",
                      isActive
                        ? "border-mint/25 bg-mint/[0.09] text-bone"
                        : "border-transparent text-muted hover:border-white/10 hover:bg-white/[0.045] hover:text-bone"
                    )}
                  >
                    <span className={cn("font-mono text-[10px] font-bold", isActive ? "text-mint" : "text-bone/30")}>{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-sm font-bold">{item.label}</span>
                    <ArrowUpRight className="text-bone/25 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" size={15} />
                  </a>
                );
              })}
            </div>

            <LanguageSwitch className="mt-2 w-full" />

            <a
              className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-steel-sheen px-4 text-sm font-black text-ink"
              href={`mailto:${profile.email}`}
              onClick={() => setMenuOpen(false)}
            >
              <Mail size={17} />
              {header.sendMessage}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return <motion.div className="fixed left-0 top-0 z-[60] h-1 origin-left bg-steel-sheen" style={{ scaleX }} />;
}

function GlassCard({ children, className = "", as: Component = "div" }) {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -7;
    const rotateY = (x / rect.width - 0.5) * 7;

    card.style.setProperty("--glow-x", `${x}px`);
    card.style.setProperty("--glow-y", `${y}px`);
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
  };

  const reset = () => {
    const card = ref.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <Component
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className={cn("glass-card", className)}
    >
      {children}
    </Component>
  );
}

function SectionHeading({ eyebrow, title, intro, centered = false }) {
  return (
    <Reveal className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      <p className="mb-3 font-mono text-xs font-bold uppercase text-mint">{eyebrow}</p>
      <h2 className="text-4xl font-black leading-[1.02] text-bone sm:text-5xl lg:text-6xl">{title}</h2>
      {intro ? <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">{intro}</p> : null}
    </Reveal>
  );
}

function HeroVisual() {
  const { content } = usePortfolio();
  const { heroVisual } = content;
  const visualRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useTransform(pointerX, [-0.5, 0.5], [-14, 14]);
  const imageY = useTransform(pointerY, [-0.5, 0.5], [-10, 10]);
  const panelX = useTransform(pointerX, [-0.5, 0.5], [9, -9]);
  const panelY = useTransform(pointerY, [-0.5, 0.5], [7, -7]);

  const handlePointerMove = (event) => {
    const rect = visualRef.current?.getBoundingClientRect();
    if (!rect) return;

    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      ref={visualRef}
      className="hero-visual relative hidden h-[470px] lg:block"
      initial={{ opacity: 0, x: 44, filter: "blur(14px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="absolute inset-[6%_2%_4%_8%] border border-white/10" aria-hidden="true" />
      <div className="absolute -left-1 top-[15%] h-[66%] w-px bg-gradient-to-b from-transparent via-mint/70 to-transparent" />

      <motion.div
        className="hero-visual-image absolute inset-[2%_-5%_0_0] overflow-hidden"
        style={{ x: imageX, y: imageY }}
      >
        <img
          className="h-full w-full scale-[1.08] object-cover object-[67%_50%]"
          src="/assets/hero-architecture.png"
          alt={heroVisual.imageAlt}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#070909_0%,transparent_28%),linear-gradient(180deg,rgba(7,9,9,.12),rgba(7,9,9,.82))]" />
        <div className="hero-scan-line absolute inset-x-[22%] top-0 h-px bg-gradient-to-r from-transparent via-aqua to-transparent shadow-[0_0_18px_rgba(117,216,255,.72)]" />
      </motion.div>

      <motion.div
        className="absolute right-0 top-[10%] flex items-center gap-3 border border-mint/25 bg-ink/75 px-4 py-3 backdrop-blur-xl"
        style={{ x: panelX, y: panelY }}
      >
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-mint" />
        </span>
        <span>
          <span className="block font-mono text-[10px] font-bold uppercase text-mint">{heroVisual.statusLabel}</span>
          <strong className="mt-0.5 block text-xs text-bone">{heroVisual.statusValue}</strong>
        </span>
      </motion.div>

      <div className="absolute left-0 top-[31%] grid gap-2" aria-label={heroVisual.layersLabel}>
        {heroVisual.layers.map((layer, index) => (
          <motion.span
            key={layer}
            className="w-fit border-l-2 border-aqua/70 bg-ink/70 px-3 py-2 font-mono text-[10px] font-bold uppercase text-bone/75 backdrop-blur-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.65 + index * 0.12 }}
          >
            {layer}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="absolute bottom-0 right-[3%] w-[310px] border border-white/10 bg-[#080d0c]/90 p-4 shadow-panel backdrop-blur-2xl"
        style={{ x: panelX, y: panelY }}
      >
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase text-aqua">
            <Braces size={14} /> system.core
          </span>
          <span className="font-mono text-[10px] text-mint">BUILD 01</span>
        </div>
        <code className="block font-mono text-[11px] leading-6 text-bone/65">
          <span className="text-aqua">public sealed class</span> <span className="text-bone">Software</span>
          <br />
          {"{"}
          <br />
          <span className="pl-4 text-muted">Architecture</span> = <span className="text-mint">Clean</span>;
          <br />
          <span className="pl-4 text-muted">Data</span> = <span className="text-amber">WellModeled</span>;
          <br />
          {"}"}
        </code>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const { content } = usePortfolio();
  const { hero } = content;
  const statIcons = [ServerCog, Braces, ArrowUpRight];

  return (
    <section id="inicio" className="relative flex min-h-[90svh] items-center overflow-hidden pb-6 pt-28 lg:min-h-[92svh] lg:pb-0">
      <img
        className="absolute inset-0 h-full w-full object-cover object-[68%_50%] opacity-30 lg:hidden"
        src="/assets/hero-architecture.png"
        alt=""
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,9,.99)_0%,rgba(7,9,9,.92)_46%,rgba(7,9,9,.42)_100%),linear-gradient(180deg,rgba(7,9,9,.25)_0%,rgba(7,9,9,.95)_100%)] lg:bg-[radial-gradient(circle_at_77%_41%,rgba(31,110,89,.16),transparent_31%),linear-gradient(180deg,rgba(7,9,9,.22),rgba(7,9,9,.88))]" />
      <AmbientCanvas />
      <div className="absolute inset-0 bg-grid-fine bg-[length:56px_56px] opacity-[0.14] [mask-image:linear-gradient(180deg,transparent,black_24%,black_76%,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto w-[min(1240px,calc(100vw-32px))]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(440px,.98fr)] xl:gap-16">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-[720px]">
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-mint">
                <span className="size-1.5 rounded-full bg-mint shadow-[0_0_16px_rgba(66,242,168,.9)]" />
                {hero.role}
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase text-bone/55">
                <MapPin size={13} className="text-aqua" />
                {profile.location}
              </span>
            </motion.div>

          <motion.h1
            variants={fadeUp}
              className="max-w-5xl text-[48px] font-black leading-[0.92] text-bone sm:text-[64px] lg:text-[68px] xl:text-[82px]"
          >
              <span className="block">Luis Eduardo</span>
              <span className="hero-name-accent block">Cardoso.</span>
          </motion.h1>

            <motion.div variants={fadeUp} className="mt-7 flex max-w-2xl gap-4 sm:items-start">
              <span className="mt-2 hidden h-12 w-px shrink-0 bg-gradient-to-b from-mint to-aqua sm:block" />
              <p className="text-lg leading-8 text-bone/[0.78] sm:text-xl sm:leading-9">
                {hero.statement}
                <strong className="font-bold text-bone">{hero.statementStrong}</strong>
              </p>
            </motion.div>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="btn-primary group" href="#experiencia">
                {hero.explore}
                <ArrowDown className="transition-transform duration-300 group-hover:translate-y-1" size={18} />
            </a>
              <a className="btn-secondary group" href={profile.resumeUrl} target="_blank" rel="noopener">
                <FileText size={18} />
                {hero.resume}
                <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={16} />
            </a>
              <a className="btn-ghost hidden sm:inline-flex" href="#contato">
                <Mail size={18} />
                {hero.contact}
            </a>
          </motion.div>
          </motion.div>

          <HeroVisual />
        </div>

        <motion.div
          className="mt-10 grid grid-cols-3 border-y border-white/10 lg:mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.stats.map(({ label, value, shortValue }, index) => {
            const Icon = statIcons[index];

            return (
            <div key={label} className="group flex min-h-[82px] flex-col items-start justify-center gap-2 border-r border-white/10 px-3 py-3 last:border-r-0 sm:min-h-[76px] sm:flex-row sm:items-center sm:gap-3 sm:px-5 sm:py-4 sm:first:pl-0">
              <span className="grid size-9 shrink-0 place-items-center border border-white/10 bg-white/[0.04] text-aqua transition-colors duration-300 group-hover:border-mint/30 group-hover:text-mint">
                <Icon size={17} />
              </span>
              <span className="min-w-0">
                <span className="hidden font-mono text-[10px] font-bold uppercase text-bone/45 sm:block">{label}</span>
                <strong className="block text-[11px] leading-4 text-bone/80 sm:hidden">{shortValue}</strong>
                <strong className="mt-1 hidden text-xs leading-5 text-bone/80 sm:block">{value}</strong>
              </span>
                </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const { content } = usePortfolio();
  const { about } = content;

  return (
    <section id="sobre" className="relative pb-24 pt-0 sm:pb-32">
      <div className="mx-auto grid w-[min(1120px,calc(100vw-32px))] gap-12 lg:grid-cols-[0.85fr_1fr]">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} />
        <Reveal className="space-y-6 text-lg leading-9 text-bone/[0.78]">
          {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          <div className="grid gap-3 pt-4 sm:grid-cols-3">
            {about.facts.map(([label, value]) => (
              <GlassCard key={label} className="p-4">
                <span className="font-mono text-xs font-bold uppercase text-mint">{label}</span>
                <strong className="mt-1 block text-sm text-bone">{value}</strong>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  const { content } = usePortfolio();
  const { experienceHeading, experiences } = content;

  return (
    <section id="experiencia" className="relative py-24 sm:py-32">
      <div className="mx-auto w-[min(1120px,calc(100vw-32px))]">
        <SectionHeading eyebrow={experienceHeading.eyebrow} title={experienceHeading.title} centered />

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute bottom-8 left-[17px] top-8 w-px bg-gradient-to-b from-transparent via-mint/55 to-transparent" />

          <div className="grid gap-7">
            {experiences.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} className="relative grid grid-cols-[34px_1fr] gap-5">
                <div className="relative z-10 mt-6 size-4 rounded-full border-2 border-mint bg-ink shadow-glow" />
                <GlassCard as="article" className="p-6 sm:p-7">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-lg border border-amber/20 bg-amber/10 px-3 py-1 font-mono text-xs font-bold text-amber">
                      {item.period}
                    </span>
                    <span className="text-sm text-muted">
                      {item.company} | {item.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-bone">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-bone/75">{item.summary}</p>
                  <ul className="mt-6 grid gap-3">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm leading-7 text-bone/[0.78]">
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-mint" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const { content } = usePortfolio();
  const { skillsHeading, skillGroups } = content;
  const icons = [Layers3, Braces, Database, Gauge];

  return (
    <section id="habilidades" className="relative py-24 sm:py-32">
      <div className="mx-auto w-[min(1120px,calc(100vw-32px))]">
        <SectionHeading eyebrow={skillsHeading.eyebrow} title={skillsHeading.title} />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = icons[index];

            return (
              <Reveal key={group.title} delay={index * 0.08}>
                <GlassCard className="min-h-[340px] p-6">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-lg border border-mint/25 bg-mint/10 text-mint">
                      <Icon size={22} />
                    </span>
                    <span className="font-mono text-sm font-bold text-aqua">{group.metric}%</span>
                  </div>
                  <h3 className="text-2xl font-black text-bone">{group.title}</h3>
                  <p className="mt-3 min-h-[88px] text-sm leading-7 text-muted">{group.description}</p>

                  <div className="mt-5 h-2 overflow-hidden rounded-lg bg-white/[0.08]">
                    <motion.div
                      className="h-full rounded-lg bg-steel-sheen"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${group.metric}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.18 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CedapFramework() {
  const { content } = usePortfolio();
  const { cedapFramework, cedapHeading } = content;
  const icons = [Layers3, Database, ServerCog, Gauge, CheckCircle2];

  return (
    <section id="cedap-framework" className="relative border-y border-white/[0.06] bg-white/[0.018] py-24 sm:py-32">
      <div className="mx-auto w-[min(1120px,calc(100vw-32px))]">
        <SectionHeading
          eyebrow={cedapHeading.eyebrow}
          title={cedapHeading.title}
          intro={cedapFramework.intro}
          centered
        />

        <motion.dl
          className="mx-auto mt-10 grid max-w-3xl grid-cols-3 border-y border-white/10"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {cedapFramework.highlights.map((item, index) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="flex min-h-[104px] flex-col items-center justify-center border-r border-white/10 px-2 text-center last:border-r-0 sm:min-h-[116px] sm:px-5"
            >
              <dt className="order-2 mt-2 text-[10px] font-bold leading-4 text-muted sm:text-xs">{item.label}</dt>
              <dd className={cn("order-1 text-2xl font-black sm:text-3xl", index === 1 ? "text-aqua" : index === 2 ? "text-amber" : "text-mint")}>{item.value}</dd>
            </motion.div>
          ))}
        </motion.dl>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {cedapFramework.categories.map((category, index) => {
            const Icon = icons[index];
            const isLast = index === cedapFramework.categories.length - 1;

            return (
              <Reveal key={category.title} delay={index * 0.06} className={cn(isLast && "lg:col-span-2")}>
                <GlassCard as="article" className="h-full p-6 sm:p-7">
                  <div className={cn(isLast && "lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:gap-10")}>
                    <div>
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <span className="grid size-11 place-items-center rounded-lg border border-mint/25 bg-mint/10 text-mint">
                          <Icon size={22} />
                        </span>
                        <span className="font-mono text-[10px] font-bold text-bone/35">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="text-xl font-black text-bone sm:text-2xl">{category.title}</h3>
                    </div>

                    <div className={cn(isLast && "lg:border-l lg:border-white/10 lg:pl-10")}>
                      <p className={cn("mt-3 text-sm leading-7 text-muted", isLast && "lg:mt-0")}>{category.description}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {category.tags.map((tag) => (
                          <span className="tag" key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 grid gap-8 border-y border-white/10 py-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-12">
          <div>
            <p className="font-mono text-xs font-bold uppercase text-mint">{cedapHeading.practical}</p>
            <h3 className="mt-3 text-2xl font-black text-bone sm:text-3xl">{cedapHeading.competenciesTitle}</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              {cedapHeading.competenciesIntro}
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {cedapFramework.competencies.map((competency) => (
              <li key={competency} className="flex min-h-14 items-start gap-3 border-l border-mint/35 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-bone/[0.78]">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-mint" aria-hidden="true" />
                <span>{competency}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-6">
          <GlassCard className="p-6 sm:p-7 lg:flex lg:items-center lg:gap-10">
            <div className="lg:max-w-sm lg:shrink-0">
              <p className="font-mono text-xs font-bold uppercase text-amber">{cedapHeading.nextSteps}</p>
              <h3 className="mt-2 text-xl font-black text-bone sm:text-2xl">{cedapHeading.evolutionTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {cedapHeading.evolutionIntro}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 lg:mt-0">
              {cedapFramework.evolution.map((item) => (
                <span className="tag border-amber/20 bg-amber/[0.06] hover:border-amber/35 hover:bg-amber/10" key={item}>{item}</span>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

function Education() {
  const { content } = usePortfolio();
  const { education, educationHeading } = content;

  return (
    <section id="formacao" className="relative py-24 sm:py-32">
      <div className="mx-auto grid w-[min(1120px,calc(100vw-32px))] gap-12 lg:grid-cols-[0.85fr_1fr]">
        <SectionHeading eyebrow={educationHeading.eyebrow} title={educationHeading.title} />

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} className="grid gap-4">
          {education.map((item) => (
            <motion.article key={`${item.period}-${item.title}`} variants={fadeUp}>
              <GlassCard className="p-6">
                <p className="mb-2 font-mono text-xs font-bold uppercase text-amber">{item.period}</p>
                <h3 className="text-xl font-black text-bone">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.institution}</p>
              </GlassCard>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ArchitectureSketch({ accent, imageUrl, imageAlt, productionLabel }) {
  const color = accent === "amber" ? "#f3c565" : accent === "aqua" ? "#75d8ff" : "#42f2a8";

  return (
    <div className="relative h-44 overflow-hidden border-b border-white/10 bg-grid-fine bg-[length:28px_28px]">
      {imageUrl ? (
        <>
          <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" src={imageUrl} alt={imageAlt} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          <span className="absolute bottom-3 left-3 flex items-center gap-2 border border-white/15 bg-ink/75 px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-bone backdrop-blur-lg">
            <span className="size-1.5 rounded-full bg-mint shadow-[0_0_10px_rgba(66,242,168,.8)]" />
            {productionLabel}
          </span>
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `linear-gradient(135deg, ${color}24, rgba(255,255,255,.03) 55%, rgba(7,9,9,.25))`,
            }}
          />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 210" fill="none" aria-hidden="true">
            <path
              className="animate-trace"
              d="M78 154 C150 74 202 122 264 82 C338 34 392 72 452 38"
              stroke={color}
              strokeWidth="2"
              strokeDasharray="540"
              strokeLinecap="round"
              opacity="0.85"
            />
            {[80, 177, 266, 356, 452].map((x, index) => (
              <g key={x}>
                <rect x={x - 34} y={index % 2 ? 108 : 52} width="68" height="42" rx="8" fill="rgba(7,9,9,.58)" stroke="rgba(255,255,255,.15)" />
                <circle cx={x - 17} cy={(index % 2 ? 108 : 52) + 21} r="4" fill={color} opacity="0.9" />
                <path d={`M${x - 2} ${(index % 2 ? 108 : 52) + 16}h24M${x - 2} ${(index % 2 ? 108 : 52) + 26}h16`} stroke="rgba(244,247,244,.55)" strokeWidth="2" strokeLinecap="round" />
              </g>
            ))}
          </svg>
          <div className="absolute inset-x-0 top-0 h-20 animate-scan bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, index, ui }) {
  return (
    <Reveal delay={index * 0.08}>
      <GlassCard as="article" className="group flex min-h-full flex-col">
        <ArchitectureSketch
          accent={project.accent}
          imageUrl={project.imageUrl}
          imageAlt={project.imageAlt}
          productionLabel={ui.production}
        />
        <div className="flex flex-1 flex-col p-6">
          <p className="mb-3 font-mono text-xs font-bold uppercase text-mint">{project.status}</p>
          <h3 className="text-2xl font-black text-bone">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span className="tag" key={item}>{item}</span>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-4 pt-8 text-sm font-bold">
            <a
              className={cn("inline-flex items-center gap-2 text-mint transition-colors hover:text-aqua", project.liveUrl === "#" && "pointer-events-none opacity-55")}
              href={project.liveUrl}
              target={project.liveUrl !== "#" ? "_blank" : undefined}
              rel={project.liveUrl !== "#" ? "noopener" : undefined}
              aria-disabled={project.liveUrl === "#"}
            >
              {project.liveUrl === "#" ? ui.comingSoon : ui.visit} <ArrowUpRight size={15} />
            </a>
            {project.repoUrl !== "#" ? (
              <a
                className="inline-flex items-center gap-2 text-bone/75 transition-colors hover:text-bone"
                href={project.repoUrl}
                target="_blank"
                rel="noopener"
              >
                {ui.repository} <Github size={15} />
              </a>
            ) : null}
          </div>
        </div>
      </GlassCard>
    </Reveal>
  );
}

function Projects() {
  const { language, content } = usePortfolio();
  const projects = useMemo(() => getProjects(language), [language]);
  const { projectsHeading, projectUi } = content;

  return (
    <section id="projetos" className="relative py-24 sm:py-32">
      <div className="mx-auto w-[min(1120px,calc(100vw-32px))]">
        <SectionHeading
          eyebrow={projectsHeading.eyebrow}
          title={projectsHeading.title}
          intro={projectsHeading.intro}
          centered
        />

        <div
          className={cn("mt-14 grid gap-5", projects.length === 1 && "mx-auto max-w-2xl")}
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} ui={projectUi} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { content } = usePortfolio();
  const { contact } = content;
  const contacts = [
    { label: contact.labels.email, value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: contact.labels.linkedin, value: "/in/luis-eduardo-lamim-cardoso", href: profile.linkedinUrl, icon: Linkedin },
    { label: contact.labels.whatsapp, value: profile.phone, href: profile.whatsappUrl, icon: MessageCircle },
    { label: contact.labels.github, value: "@Lamim07", href: profile.githubUrl, icon: Github },
  ];

  return (
    <section id="contato" className="relative py-24 sm:py-32">
      <div className="mx-auto grid w-[min(1120px,calc(100vw-32px))] gap-12 lg:grid-cols-[0.9fr_1fr]">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} />

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-4">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            const disabled = contact.href === "#";

            return (
              <motion.a
                key={contact.label}
                variants={fadeUp}
                className={cn("group block", disabled && "pointer-events-none opacity-60")}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener" : undefined}
                aria-disabled={disabled}
              >
                <GlassCard className="flex items-center gap-4 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-mint/25 bg-mint/10 text-mint transition-colors group-hover:border-aqua/35 group-hover:text-aqua">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs font-bold uppercase text-amber">{contact.label}</span>
                    <strong className="mt-1 block break-words text-sm text-bone sm:text-base">{contact.value}</strong>
                  </span>
                </GlassCard>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const { content } = usePortfolio();

  return (
    <footer className="border-t border-white/10 py-8 text-sm text-muted">
      <div className="mx-auto flex w-[min(1120px,calc(100vw-32px))] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}.</p>
        <a className="inline-flex items-center gap-2 font-bold text-bone transition-colors hover:text-mint" href="#inicio">
          {content.footer.backToTop} <ArrowUpRight size={15} />
        </a>
      </div>
    </footer>
  );
}

function FloatingDock() {
  const { content } = usePortfolio();

  return (
    <div className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 rounded-lg border border-white/10 bg-ink/[0.78] p-2 shadow-panel backdrop-blur-xl md:flex">
      {[
        { href: profile.resumeUrl, icon: FileText, label: content.dock.resume },
        { href: `mailto:${profile.email}`, icon: Mail, label: content.dock.email },
        { href: profile.linkedinUrl, icon: Linkedin, label: content.dock.linkedin },
        { href: profile.whatsappUrl, icon: Phone, label: content.dock.whatsapp },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
            rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noopener" : undefined}
            className="group relative grid size-11 place-items-center rounded-lg text-muted transition-colors hover:bg-white/[0.07] hover:text-mint focus-visible:bg-white/[0.07] focus-visible:text-mint"
            aria-label={item.label}
          >
            <Icon size={18} />
            <span className="pointer-events-none absolute bottom-14 whitespace-nowrap rounded-lg border border-white/10 bg-graphite px-2 py-1 text-xs text-bone opacity-0 shadow-panel transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {item.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language-v2");
    return savedLanguage === "pt" ? "pt" : "en";
  });
  const [introVisible, setIntroVisible] = useState(true);
  const content = portfolioContent[language];

  useEffect(() => {
    window.localStorage.setItem("portfolio-language-v2", language);
    document.documentElement.lang = content.seo.language;
    document.title = content.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.seo.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", content.seo.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", content.seo.description);
  }, [content, language]);

  const enterPortfolio = () => {
    setIntroVisible(false);
    window.setTimeout(() => document.getElementById("main")?.focus(), 900);
  };

  return (
    <PortfolioContext.Provider value={{ language, setLanguage, content }}>
      <AnimatePresence>{introVisible ? <IntroExperience onEnter={enterPortfolio} /> : null}</AnimatePresence>
      {introVisible ? null : <AmbientCanvas global />}

      <motion.div
        className="relative z-10 min-h-screen overflow-hidden bg-transparent text-bone"
        animate={introVisible ? { scale: 0.985, opacity: 0.35, filter: "blur(12px)" } : { scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={introVisible}
      >
        <ScrollProgress />
        <a className="skip-link" href="#main">
          {content.skipLink}
        </a>
        <Header />

        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <CedapFramework />
          <Education />
          <Projects />
          <Contact />
        </main>

        <Footer />
        <FloatingDock />
      </motion.div>
    </PortfolioContext.Provider>
  );
}

export default App;
