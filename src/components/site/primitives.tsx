import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { EASE } from "@/lib/portfolio-context";
import { cn } from "@/lib/utils";

/** Cabeçalho de seção: número em acento + rótulo, com régua que se desenha. */
export function SectionHead({ index, label, aside, inverse = false }: { index: string; label: string; aside?: string; inverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="relative mb-12 flex items-baseline justify-between gap-6 pb-5 md:mb-16">
      <span className="label overflow-hidden">
        <motion.span
          className="inline-block"
          initial={reduce ? false : { y: "110%" }}
          animate={inView ? { y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className={inverse ? "text-inv-accent" : "text-accent"}>{index}</span> / {label}
        </motion.span>
      </span>
      {aside ? (
        <motion.span
          className={cn("label", inverse ? "text-inv-muted" : "text-muted")}
          initial={reduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {aside}
        </motion.span>
      ) : null}
      <motion.span
        aria-hidden="true"
        className={cn("absolute inset-x-0 bottom-0 h-px origin-left", inverse ? "bg-inv-fg/20" : "bg-ink/15")}
        initial={reduce ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.1, ease: EASE }}
      />
    </div>
  );
}

/** Título com linhas que sobem de trás de uma máscara. */
export function MaskLines({ lines, className, delay = 0, as: Tag = "h2" }: { lines: ReactNode[]; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p" }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduce = useReducedMotion();

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "105%", rotate: 2 }}
            animate={inView ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Entrada simples (fade + subida) acionada pela viewport. */
export function Reveal({ children, className, delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Texto que acende palavra a palavra conforme o scroll. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  // piso de 0.5 mantém contraste ≥ 3:1 (texto grande) mesmo antes de "acender"
  const opacity = useTransform(progress, range, [0.5, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span aria-hidden="true" className="mr-[0.25em] inline-block" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

/** Contador numérico que roda quando entra na tela. */
export function CountUp({ value, format = (n) => String(n) }: { value: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(value);
      return undefined;
    }
    const controls = animate(0, value, { duration: 1.4, ease: EASE, onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{format(display)}</span>;
}

/** Wrapper magnético: o elemento segue levemente o ponteiro (só mouse). */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div className={cn("inline-flex", className)} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}

/** Ícone de seta diagonal (sem dependência extra além do lucide já instalado). */
export function ArrowIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
