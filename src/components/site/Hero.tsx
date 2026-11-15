import { useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/portfolio";
import { EASE, usePortfolio } from "@/lib/portfolio-context";
import { cn } from "@/lib/utils";
import { ArrowIcon, Magnetic } from "./primitives";

/** Nome com letras subindo em cascata atrás de máscara. */
function SplitName({ lines }: { lines: string[] }) {
  const reduce = useReducedMotion();
  let charIndex = 0;
  return (
    <h1 className="text-[clamp(3.6rem,10.8vw,10rem)] font-semibold leading-[0.9] tracking-display" aria-label={profile.name}>
      {lines.map((line, li) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
          {line.split(" ").map((word, wi) => (
            <span key={`${li}-${wi}`}>
              {wi > 0 ? " " : null}
              <span className="inline-block whitespace-nowrap">
              {[...word].map((char) => {
                const i = charIndex++;
                return (
                  <motion.span
                    key={`${li}-${i}`}
                    className="inline-block"
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.025 }}
                  >
                    {char}
                  </motion.span>
                );
              })}
              </span>
            </span>
          ))}
          {li === lines.length - 1 ? (
            <motion.span
              className="inline-block text-accent"
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.15 + charIndex * 0.025 + 0.1 }}
            >
              .
            </motion.span>
          ) : null}
        </span>
      ))}
    </h1>
  );
}

const W = 460;
const H = 360;
const BW = 359;
const BH = 72;

/** Diagrama de camadas: desenha no load, pacotes de dados descem entre camadas, camadas reagem ao ponteiro. */
function LayerDiagram({ layers, label, px, py }: { layers: string[]; label: string; px: MotionValue<number>; py: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const boxes = layers.map((layer, i) => {
    const [num, name] = layer.split(" / ");
    return { num, name, x: i * ((W - BW) / 2), y: 18 + i * ((H - BH - 36) / 2) };
  });

  return (
    <div className="relative w-full max-w-[460px]" aria-label={label} role="img">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" fill="none">
        {boxes.slice(0, -1).map((b, i) => {
          const next = boxes[i + 1];
          const cx = b.x + BW - 20;
          return (
            <g key={`c-${b.num}`}>
              <motion.path
                d={`M${cx} ${b.y + BH} V${next.y}`}
                className="stroke-accent"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.35, ease: EASE }}
              />
              {reduce ? null : (
                <motion.circle
                  r="3.5"
                  cx={cx}
                  className="fill-accent"
                  initial={{ cy: b.y + BH, opacity: 0 }}
                  animate={{ cy: [b.y + BH, next.y], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut", delay: 2 + i * 0.65 }}
                />
              )}
            </g>
          );
        })}
        {boxes.map((b, i) => (
          <Layer key={b.num} box={b} index={i} px={px} py={py} active={hover === i} onHover={setHover} />
        ))}
      </svg>
    </div>
  );
}

function Layer({
  box,
  index,
  px,
  py,
  active,
  onHover,
}: {
  box: { num: string; name: string; x: number; y: number };
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  active: boolean;
  onHover: (i: number | null) => void;
}) {
  const reduce = useReducedMotion();
  const depth = (index + 1) * 6;
  const x = useTransform(px, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(py, [-0.5, 0.5], [-depth * 0.6, depth * 0.6]);
  const perimeter = 2 * (BW + BH);

  return (
    <motion.g style={reduce ? undefined : { x, y }} onPointerEnter={() => onHover(index)} onPointerLeave={() => onHover(null)}>
      <motion.rect
        x={box.x + 0.5}
        y={box.y + 0.5}
        width={BW}
        height={BH}
        className={cn("transition-[fill,stroke] duration-300", active ? "fill-accent/10 stroke-accent" : "fill-paper stroke-ink")}
        strokeWidth="1"
        strokeDasharray={perimeter}
        initial={reduce ? false : { strokeDashoffset: perimeter, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.4 + index * 0.22, ease: EASE }}
      />
      <motion.g initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.9 + index * 0.22, ease: EASE }}>
        <text x={box.x + 18} y={box.y + 45} className="fill-ink font-sans text-[22px] font-semibold">
          {box.name}
        </text>
        <text x={box.x + BW - 70} y={box.y + 44} className="fill-muted font-mono text-[11px]">
          {box.num}
        </text>
      </motion.g>
      <motion.circle
        cx={box.x + BW - 20}
        cy={box.y + 22}
        r="5"
        className="fill-accent"
        initial={reduce ? false : { scale: 0 }}
        animate={{ scale: active ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: active ? 0 : 1 + index * 0.22 }}
      />
    </motion.g>
  );
}

export function Hero() {
  const { content } = usePortfolio();
  const { hero, heroVisual } = content;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 80, damping: 20 });
  const spy = useSpring(py, { stiffness: 80, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const nameParts = profile.name.split(" ");
  const lines = [nameParts.slice(0, 2).join(" "), nameParts.slice(2).join(" ")];

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    px.set(e.clientX / window.innerWidth - 0.5);
    py.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section id="inicio" ref={ref} onPointerMove={onMove} className="relative overflow-hidden pb-16 pt-[112px] md:pb-20 md:pt-[136px]">
      <motion.div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000,transparent)]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        style={reduce ? undefined : { opacity: gridOpacity }}
      />

      <div className="wrap relative">
        <motion.div
          className="label mb-8 flex flex-wrap gap-x-6 gap-y-2 text-muted md:mb-10"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-accent">00 / {content.ui.start}</span>
          <span>
            {hero.role} — {hero.roles[0]}
          </span>
          <span>{profile.location}</span>
        </motion.div>

        <motion.div style={reduce ? undefined : { y: nameY }}>
          <SplitName lines={lines} />
        </motion.div>

        <div className="mt-8 flex flex-col gap-12 md:mt-10 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-[640px]">
            {/* elemento de LCP: visível desde o 1º frame, só desliza (sem fade) */}
            <motion.p
              className="text-balance text-lg leading-snug text-muted md:text-[22px]"
              initial={reduce ? false : { y: 18 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            >
              {hero.statement}
              <strong className="font-semibold text-ink">{hero.statementStrong}</strong>
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
            >
              <Magnetic>
                <a className="btn btn-solid w-full sm:w-auto" href="#experiencia">
                  {hero.explore}
                  <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn w-full sm:w-auto" href={profile.resumeUrl} target="_blank" rel="noopener">
                  {hero.resume} <ArrowIcon />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <LayerDiagram layers={heroVisual.layers} label={heroVisual.layersLabel} px={spx} py={spy} />
        </div>

        <dl className="mt-14 grid border-t border-ink/15 md:mt-20 md:grid-cols-3">
          {hero.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={cn("py-5 md:px-6 md:first:pl-0", i > 0 && "border-t border-ink/15 md:border-l md:border-t-0")}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 1.1 + i * 0.1 }}
            >
              <dt className="label text-[11px] text-muted">{stat.label}</dt>
              <dd className="mt-1 font-semibold">{stat.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
