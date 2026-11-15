import { useMemo, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Check, Copy, Github, Linkedin, MessageCircle, FileText, ArrowUp } from "lucide-react";
import { getProjects, profile } from "@/data/portfolio";
import { EASE, usePortfolio } from "@/lib/portfolio-context";
import { cn } from "@/lib/utils";
import { ArrowIcon, CountUp, Magnetic, MaskLines, Reveal, ScrollWords, SectionHead } from "./primitives";

/* ───────────────────────── 01 Sobre ───────────────────────── */
export function About() {
  const { content } = usePortfolio();
  const { about } = content;
  return (
    <section id="sobre" className="wrap py-20 md:py-28 xl:py-32">
      <SectionHead index="01" label={about.eyebrow} aside={profile.location} />
      <div className="grid gap-10 xl:grid-cols-[1.2fr_1fr] xl:gap-20">
        <ScrollWords text={about.title} className="text-[clamp(1.9rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-tightish" />
        <div className="space-y-5 text-muted">
          {about.paragraphs.map((p, i) => (
            <Reveal key={p} delay={i * 0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
          <dl className="grid gap-4 border-t border-ink/15 pt-5 sm:grid-cols-3">
            {about.facts.map(([k, v], i) => (
              <Reveal key={k} delay={0.15 + i * 0.08} y={14}>
                <dt className="label text-[11px]">{k}</dt>
                <dd className="mt-1 text-[15px] font-semibold text-ink">{v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 02 Experiência ───────────────────────── */
export function Experience() {
  const { content } = usePortfolio();
  const { experienceHeading, experiences, ui } = content;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const items = useMemo(() => [...experiences].sort((a, b) => a.startMonth.localeCompare(b.startMonth)), [experiences]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const rail = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experiencia" className="bg-inv-bg py-20 text-inv-fg md:py-28 xl:py-32">
      <div className="wrap">
        <SectionHead index="02" label={experienceHeading.eyebrow} aside={ui.experiencePeriod} inverse />
        <MaskLines lines={[experienceHeading.title]} className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-none tracking-tightish" />
        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-inv-muted md:text-xl">{ui.experienceSubtitle}</p>
        </Reveal>

        <div ref={ref} className="relative mt-14 grid gap-12 pl-8 md:mt-20 xl:grid-cols-2 xl:gap-12 xl:pl-0 xl:pt-10">
          {/* trilho: vertical no mobile, horizontal no desktop; desenhado pelo scroll */}
          <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-1.5 w-px bg-inv-fg/15 xl:inset-x-0 xl:bottom-auto xl:top-[5px] xl:h-px xl:w-auto" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-[5px] top-1.5 w-px origin-top bg-inv-accent xl:hidden"
            style={reduce ? undefined : { scaleY: rail }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-[5px] hidden h-px origin-left bg-inv-accent xl:block"
            style={reduce ? undefined : { scaleX: rail }}
          />

          {items.map((item, i) => (
            <ExperienceCard key={item.id} item={item} index={i} total={items.length} progress={rail} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Exp = ReturnType<typeof usePortfolio>["content"]["experiences"][number];

function ExperienceCard({ item, index, total, progress }: { item: Exp; index: number; total: number; progress: ReturnType<typeof useSpring> }) {
  const reduce = useReducedMotion();
  const threshold = (index + 0.15) / total;
  const dotScale = useTransform(progress, [threshold - 0.05, threshold], [1, 1.5]);
  const dotGlow = useTransform(progress, [threshold - 0.05, threshold], [0, 1]);

  return (
    <motion.article
      className="relative"
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.12 }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute -left-8 top-1 size-[11px] rounded-full bg-inv-accent xl:-top-10 xl:left-0"
        style={reduce ? undefined : { scale: dotScale }}
      >
        <motion.span className="absolute -inset-2 rounded-full border border-inv-accent" style={reduce ? { opacity: 0 } : { opacity: dotGlow }} />
      </motion.span>
      <p className="label text-inv-accent">{item.period}</p>
      <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.15rem)] font-semibold leading-tight tracking-tightish">{item.title}</h3>
      <p className="label mt-2 text-inv-muted">
        {item.company} · {item.location}
      </p>
      <p className="mt-4 max-w-[560px] text-inv-muted">{item.summary}</p>
      <ul className="mt-6 max-w-[560px] border-t border-inv-fg/15">
        {item.highlights.map((h, i) => (
          <motion.li
            key={h}
            className="group flex gap-3 border-b border-inv-fg/15 py-2.5 text-[15px]"
            initial={reduce ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.06 }}
          >
            <span className="font-mono text-[11px] leading-6 text-inv-muted transition-colors group-hover:text-inv-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">{h}</span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

/* ───────────────────────── 03 Projetos ───────────────────────── */
export function Projects() {
  const { content, language } = usePortfolio();
  const { projectsHeading, projectUi, ui } = content;
  const projects = useMemo(() => getProjects(language), [language]);

  return (
    <section id="projetos" className="wrap py-20 md:py-28 xl:py-32">
      <SectionHead index="03" label={projectsHeading.eyebrow} aside={ui.projectCount(projects.length)} />
      <div className="mb-10 flex flex-col gap-5 md:mb-14 xl:flex-row xl:items-end xl:justify-between">
        <MaskLines lines={[projectsHeading.title]} className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-none tracking-tightish" />
        <Reveal delay={0.15} className="max-w-[440px] text-muted">
          <p>{projectsHeading.intro}</p>
        </Reveal>
      </div>
      <div className="grid gap-24 md:gap-32">
        {projects.map((project, index) => (
          <ProjectCase
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
            labels={{ ...projectUi, stack: ui.stackLabel, status: ui.statusLabel }}
          />
        ))}
      </div>
    </section>
  );
}

type Project = ReturnType<typeof getProjects>[number] & { imagePosition?: string; imageMobileUrl?: string };

function ProjectCase({
  project,
  index,
  total,
  labels,
}: {
  project: Project;
  index: number;
  total: number;
  labels: { production: string; visit: string; repository: string; comingSoon: string; stack: string; status: string };
}) {
  const flip = index % 2 === 1;
  const pad = (n: number) => String(n).padStart(2, "0");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(14% 22% 14% 22%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const sx = useSpring(cx, { stiffness: 300, damping: 26 });
  const sy = useSpring(cy, { stiffness: 300, damping: 26 });
  const [cursor, setCursor] = useState(false);
  const live = project.liveUrl !== "#";

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    cx.set(e.clientX - rect.left);
    cy.set(e.clientY - rect.top);
  };

  return (
    <article>
      <motion.a
        ref={ref}
        href={live ? project.liveUrl : undefined}
        target="_blank"
        rel="noopener"
        aria-label={`${labels.visit}: ${project.title}`}
        className={cn("group relative block aspect-[4/5] overflow-hidden bg-ink/5 md:aspect-[16/9] xl:aspect-[2.05/1]", !reduce && "md:cursor-none")}
        style={reduce ? undefined : { clipPath: clip }}
        onPointerMove={onMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setCursor(true)}
        onPointerLeave={() => setCursor(false)}
      >
        {project.imageMobileUrl ? (
          <picture className="contents">
            <source media="(max-width: 767px)" srcSet={project.imageMobileUrl} />
            <motion.img
              src={project.imageUrl}
              alt={project.imageAlt}
              loading="lazy"
              decoding="async"
              className={cn(
                "size-full object-cover transition-[filter] duration-700 group-hover:brightness-105",
                project.imagePosition === "top" ? "origin-top object-top" : "object-center",
              )}
              style={reduce ? undefined : { scale }}
            />
          </picture>
        ) : (
        <motion.img
          src={project.imageUrl}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          className={cn(
            "size-full object-cover transition-[filter] duration-700 group-hover:brightness-105",
            project.imagePosition === "top" ? "origin-top object-top" : "object-center",
          )}
          style={reduce ? undefined : { scale }}
        />
        )}
        <AnimatePresence>
          {cursor && !reduce ? (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-center text-[13px] font-semibold leading-tight text-paper"
              style={{ x: sx, y: sy }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
            >
              <span className="flex flex-col items-center gap-1">
                <ArrowIcon size={18} />
                {labels.visit}
              </span>
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.a>

      <div className={cn("mt-8 grid gap-8 xl:gap-16", flip ? "xl:grid-cols-[1fr_1.4fr]" : "xl:grid-cols-[1.4fr_1fr]")}>
        <div className={cn(flip && "xl:order-2")}>
          <Reveal>
            <p className="label flex flex-wrap gap-x-4 gap-y-1">
              <span className="text-muted">
                {pad(index + 1)} / {pad(total)}
              </span>
              <span className="text-accent">{project.status}</span>
            </p>
          </Reveal>
          <MaskLines as="h3" lines={[project.title]} className="mt-3 text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-tightish" />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[620px] text-muted">{project.description}</p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className={cn(flip && "xl:order-1")}>
          <dl className="border-t border-ink/15 text-[15px]">
            <div className="flex justify-between gap-6 border-b border-ink/15 py-3.5">
              <dt className="label text-muted">{labels.stack}</dt>
              <dd className="text-right">{project.stack.join(" · ")}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-ink/15 py-3.5">
              <dt className="label text-muted">{labels.status}</dt>
              <dd className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {live ? labels.production : labels.comingSoon}
              </dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {live ? (
              <Magnetic>
                <a className="btn btn-solid btn-sm w-full sm:w-auto" href={project.liveUrl} target="_blank" rel="noopener">
                  {labels.visit} <ArrowIcon size={14} />
                </a>
              </Magnetic>
            ) : null}
            {project.repoUrl !== "#" ? (
              <Magnetic>
                <a className="btn btn-sm w-full sm:w-auto" href={project.repoUrl} target="_blank" rel="noopener">
                  <Github size={15} /> {labels.repository}
                </a>
              </Magnetic>
            ) : null}
          </div>
        </Reveal>
      </div>
    </article>
  );
}

/* ───────────────────────── Faixa de stack ───────────────────────── */
export function StackMarquee() {
  const { content } = usePortfolio();
  const all = useMemo(() => [...new Set(content.skillGroups.flatMap((g) => g.skills))], [content.skillGroups]);
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {all.map((s) => (
        <li key={s} className="flex items-center whitespace-nowrap px-5 text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-tightish md:px-8">
          {s}
          <span className="ml-10 size-2 rotate-45 bg-accent md:ml-16" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-mask group overflow-hidden border-y border-ink/15 py-6 md:py-8" aria-label={content.skillsHeading.title}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ───────────────────────── 04 Stack ───────────────────────── */
export function Skills() {
  const { content } = usePortfolio();
  const { skillsHeading, skillGroups, ui } = content;
  const reduce = useReducedMotion();
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section id="habilidades" className="wrap py-20 md:py-28 xl:py-32">
      <SectionHead index="04" label={skillsHeading.eyebrow} aside={ui.skillCount(total)} />
      <div className="mb-12 flex flex-col gap-4 md:mb-16 xl:flex-row xl:items-end xl:justify-between">
        <MaskLines lines={[skillsHeading.title]} className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-none tracking-tightish" />
        <p className="font-mono text-[clamp(3rem,7vw,6rem)] font-medium leading-none text-accent" aria-hidden="true">
          <CountUp value={total} format={(n) => String(n).padStart(2, "0")} />
        </p>
      </div>
      <div className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            className="group relative pb-10 pt-5"
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-ink" />
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <p className="label text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2.5 text-[22px] font-semibold leading-tight transition-transform duration-500 ease-out group-hover:translate-x-1">{group.title}</h3>
            <p className="mt-2.5 text-[15px] text-muted">{group.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill, si) => (
                <motion.li
                  key={skill}
                  className="border border-ink/15 px-2.5 py-1 text-[13px] transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-paper"
                  initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.25 + i * 0.08 + si * 0.025 }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── 05 Formação ───────────────────────── */
export function Education() {
  const { content } = usePortfolio();
  const { education, educationHeading } = content;
  const reduce = useReducedMotion();

  return (
    <section id="formacao" className="wrap pb-20 md:pb-28 xl:pb-32">
      <SectionHead index="05" label={educationHeading.eyebrow} />
      <MaskLines lines={[educationHeading.title]} className="mb-12 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-none tracking-tightish md:mb-16" />
      <ol>
        {education.map((item, i) => (
          <li key={`${item.period}-${item.title}`} className="group relative">
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left bg-ink/15"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
            />
            <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-accent/[0.06] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <motion.div
              className="relative grid gap-1.5 py-6 md:grid-cols-[200px_1fr] md:gap-6 xl:grid-cols-[320px_1fr_1fr]"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08 }}
            >
              <span className="label pt-1 text-muted transition-colors group-hover:text-accent">{item.period}</span>
              <span className="text-xl font-semibold leading-snug transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-[22px]">{item.title}</span>
              <span className="text-[15px] text-muted md:col-start-2 xl:col-start-auto">{item.institution}</span>
            </motion.div>
          </li>
        ))}
      </ol>
      <div className="h-px bg-ink/15" />
    </section>
  );
}

/* ───────────────────────── 06 Contato ───────────────────────── */
function WaveText({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap" aria-hidden="true">
      {[...text].map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-[0.12em] group-hover:text-inv-accent"
          style={{ transitionDelay: `${i * 12}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Contact() {
  const { content } = usePortfolio();
  const { contact, dock, ui } = content;
  const [copied, setCopied] = useState(false);
  const [user, domain] = profile.email.split("@");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* sem permissão de clipboard: o link mailto continua disponível */
    }
  };

  const channels = [
    { label: contact.labels.linkedin, value: "/in/luis-eduardo-lamim-cardoso", href: profile.linkedinUrl, icon: Linkedin },
    { label: contact.labels.whatsapp, value: profile.phone, href: profile.whatsappUrl, icon: MessageCircle },
    { label: contact.labels.github, value: "@Lamim07", href: profile.githubUrl, icon: Github },
    { label: dock.resume, value: "PDF", href: profile.resumeUrl, icon: FileText },
  ];

  return (
    <section id="contato" className="bg-inv-bg py-20 text-inv-fg md:py-28 xl:py-32">
      <div className="wrap">
        <SectionHead index="06" label={contact.eyebrow} inverse />
        <MaskLines as="p" lines={[contact.title]} className="max-w-[900px] text-balance text-[clamp(1.9rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-tightish" />

        <div className="mt-12 flex flex-col gap-5 md:mt-16 xl:flex-row xl:items-end xl:justify-between">
          <a href={`mailto:${profile.email}`} className="group block text-[clamp(1.9rem,5.6vw,5rem)] font-semibold leading-none tracking-display" aria-label={`${contact.labels.email}: ${profile.email}`}>
            <span className="block sm:inline">
              <WaveText text={user} />
            </span>
            <span className="block sm:inline">
              <WaveText text={`@${domain}`} />
            </span>
          </a>
          <button type="button" onClick={copy} className="label inline-flex min-h-11 w-fit shrink-0 items-center gap-2 whitespace-nowrap border border-inv-fg/30 px-4 transition-colors hover:border-inv-accent hover:text-inv-accent">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? "ok" : "copy"} className="inline-flex items-center gap-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? ui.copied : ui.copyEmail}
              </motion.span>
            </AnimatePresence>
            <span className="sr-only" aria-live="polite">
              {copied ? ui.copied : ""}
            </span>
          </button>
        </div>

        <ul className="mt-12 grid md:mt-16 md:grid-cols-2 md:gap-x-6 xl:grid-cols-4">
          {channels.map((ch, i) => {
            const Icon = ch.icon;
            const external = ch.href.startsWith("http") || ch.href.endsWith(".pdf");
            return (
              <li key={ch.label}>
              <Reveal delay={i * 0.08} y={18}>
                <a
                  href={ch.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener" : undefined}
                  className="group relative flex items-center justify-between gap-4 overflow-hidden border-t border-inv-fg/15 py-5"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-inv-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="flex items-center gap-3">
                    <Icon size={18} className="text-inv-muted transition-colors group-hover:text-inv-accent" aria-hidden="true" />
                    <span>
                      <span className="label block text-[11px] text-inv-muted">{ch.label}</span>
                      <span className="font-semibold">{ch.value}</span>
                    </span>
                  </span>
                  <ArrowIcon size={18} className="transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-inv-accent" />
                </a>
              </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  const { content } = usePortfolio();
  return (
    <footer className="border-t border-inv-fg/15 bg-inv-bg text-inv-fg">
      <div className="wrap flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-inv-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#inicio" className="group inline-flex items-center gap-2 font-semibold">
          <span className="link-line">{content.footer.backToTop}</span>
          <ArrowUp size={15} className="transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
