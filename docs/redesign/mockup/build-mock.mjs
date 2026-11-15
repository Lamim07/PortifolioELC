// Gera mockups estáticos (1440/768/390) da direção "Planta do sistema" para importar no Figma.
// Uso: node docs/redesign/mockup/build-mock.mjs  → escreve tmp/mock/mock-<w>.html
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { portfolioContent, profile, getProjects } from "../../../src/data/portfolio.js";

const c = portfolioContent.pt;
const project = getProjects("pt")[0];
const img = "data:image/jpeg;base64," + readFileSync("public/assets/insulfrio-project.jpeg").toString("base64");

const T = {
  paper: "#F1EFE8", ink: "#111210", muted: "#5E5F58", accent: "#512BD4",
  line: "rgba(17,18,16,.14)", inkLine: "rgba(241,239,232,.16)", inkMuted: "#A3A39A", accentDark: "#A594F9",
};

const V = {
  1440: { pad: 64, h1: 156, h2: 72, big: 56, body: 18, gap: 120, cols: 4, mail: 80, mobile: false, tablet: false },
  768: { pad: 40, h1: 104, h2: 52, big: 40, body: 17, gap: 96, cols: 2, mail: 44, mobile: false, tablet: true },
  390: { pad: 16, h1: 60, h2: 38, big: 30, body: 16, gap: 72, cols: 1, mail: 30, mobile: true, tablet: false },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const arrow = (color = "currentColor", size = 16) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>`;
const down = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>`;

function diagram(w) {
  const layers = c.heroVisual.layers;
  const W = w, H = Math.round(w * 0.78), bh = Math.round(H * 0.2), bw = Math.round(W * 0.78);
  let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  layers.forEach((l, i) => {
    const x = Math.round(i * (W - bw) / 2), y = Math.round(18 + i * (H - bh - 36) / 2);
    s += `<rect x="${x + .5}" y="${y + .5}" width="${bw}" height="${bh}" stroke="${T.ink}" stroke-opacity=".9"/>`;
    s += `<text x="${x + 16}" y="${y + 28}" font-family="JetBrains Mono" font-size="12" fill="${T.muted}">${esc(l.split(" / ")[0])}</text>`;
    s += `<text x="${x + 16}" y="${y + bh - 18}" font-family="Instrument Sans" font-weight="600" font-size="${Math.round(bh * 0.3)}" fill="${T.ink}">${esc(l.split(" / ")[1])}</text>`;
    s += `<circle cx="${x + bw - 20}" cy="${y + 22}" r="5" fill="${T.accent}"/>`;
    if (i < layers.length - 1) {
      const nx = Math.round((i + 1) * (W - bw) / 2), ny = Math.round(18 + (i + 1) * (H - bh - 36) / 2);
      s += `<path d="M${x + bw - 20} ${y + bh} V${ny}" stroke="${T.accent}" stroke-width="1.5" stroke-dasharray="4 4"/>`;
      void nx;
    }
  });
  return s + `</svg>`;
}

function page(w) {
  const v = V[w];
  const cw = w - v.pad * 2;
  const m = v.mobile;
  const twoCol = !m;
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{width:${w}px;background:${T.paper};color:${T.ink};font-family:"Instrument Sans",sans-serif;font-size:${v.body}px;line-height:1.6;-webkit-font-smoothing:antialiased}
  .mono{font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:.02em;text-transform:uppercase}
  .wrap{padding:0 ${v.pad}px}
  .rule{border-top:1px solid ${T.line}}
  a{color:inherit;text-decoration:none}
  header{display:flex;align-items:center;justify-content:space-between;height:72px;padding:0 ${v.pad}px;border-bottom:1px solid ${T.line}}
  .brand{display:flex;align-items:center;gap:12px}
  .mark{width:36px;height:36px;border:1px solid ${T.ink};display:flex;align-items:center;justify-content:center;font-family:"JetBrains Mono";font-size:12px;font-weight:700}
  nav{display:flex;gap:28px}
  nav a{font-size:14px;font-weight:500} nav a span{font-family:"JetBrains Mono";font-size:11px;color:${T.muted};margin-right:6px}
  .lang{display:flex;border:1px solid ${T.line}} .lang span{padding:6px 10px;font-family:"JetBrains Mono";font-size:11px} .lang .on{background:${T.ink};color:${T.paper}}
  .btn{display:inline-flex;align-items:center;gap:10px;height:52px;padding:0 22px;font-size:15px;font-weight:600;border:1px solid ${T.ink}}
  .btn.primary{background:${T.ink};color:${T.paper}}
  .btn.small{height:40px;padding:0 16px;font-size:14px}
  h1{font-size:${v.h1}px;line-height:.9;letter-spacing:-.045em;font-weight:600}
  h2{font-size:${v.h2}px;line-height:1;letter-spacing:-.035em;font-weight:600}
  .big{font-size:${v.big}px;line-height:1.08;letter-spacing:-.03em;font-weight:500}
  .muted{color:${T.muted}}
  .sec{padding:${v.gap}px ${v.pad}px}
  .sechead{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:20px;border-bottom:1px solid ${T.line};margin-bottom:${Math.round(v.gap * .5)}px}
  .accent{color:${T.accent}}
  .dark{background:${T.ink};color:${T.paper}} .dark .muted{color:${T.inkMuted}} .dark .sechead{border-color:${T.inkLine}} .dark .accent{color:${T.accentDark}}
  .tag{font-size:14px;padding:4px 0}
  `;

  const navItems = c.navItems.filter((i) => i.href !== "#contato");
  const header = `<header>
    <div class="brand"><div class="mark">${profile.initials}</div>${m ? "" : `<div><div style="font-size:14px;font-weight:600;line-height:1.2">${profile.name}</div><div class="mono muted" style="font-size:11px">${c.header.role}</div></div>`}</div>
    ${!m && !v.tablet ? `<nav>${navItems.map((n, i) => `<a><span>0${i + 1}</span>${n.label}</a>`).join("")}</nav>` : ""}
    <div style="display:flex;gap:12px;align-items:center">
      ${m ? "" : `<div class="lang"><span class="on">PT</span><span>EN</span></div>`}
      ${m || v.tablet ? `<div class="mono" style="border:1px solid ${T.ink};height:40px;padding:0 14px;display:flex;align-items:center">Menu</div>` : `<a class="btn small primary">${c.header.contactCta} ${arrow(T.paper, 14)}</a>`}
    </div></header>`;

  const diagW = m ? cw : v.tablet ? 480 : 460;
  const hero = `<section class="wrap" style="padding-top:${m ? 40 : 72}px;padding-bottom:${m ? 48 : 72}px">
    <div class="mono muted" style="display:flex;flex-wrap:wrap;gap:8px 24px;margin-bottom:${m ? 28 : 40}px">
      <span class="accent">00 / Início</span><span>${c.hero.role} — ${c.hero.roles[0]}</span><span>${profile.location}</span>
    </div>
    <h1>Luis Eduardo<br/>Lamim Cardoso<span class="accent">.</span></h1>
    <div style="display:flex;${twoCol && !v.tablet ? "flex-direction:row;justify-content:space-between;align-items:flex-end" : "flex-direction:column"};gap:${m ? 40 : 56}px">
      <div style="flex:1">
        <p style="max-width:620px;margin-top:${m ? 24 : 36}px;font-size:${m ? 18 : 22}px;line-height:1.45" class="muted">${c.hero.statement}<strong style="color:${T.ink};font-weight:600">${c.hero.statementStrong}</strong></p>
        <div style="display:flex;${m ? "flex-direction:column" : ""};gap:12px;margin-top:${m ? 28 : 40}px">
          <a class="btn primary">${c.hero.explore} ${down}</a>
          <a class="btn">${c.hero.resume} ${arrow()}</a>
        </div>
      </div>
      <div style="flex:none">${diagram(diagW)}</div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(${m ? 1 : 3},1fr);margin-top:${m ? 48 : 72}px;border-top:1px solid ${T.line}">
      ${c.hero.stats.map((s, i) => `<div style="padding:20px ${m ? 0 : 24}px 0 ${i && !m ? 24 : 0}px;${i && !m ? `border-left:1px solid ${T.line};` : ""}${m && i ? `border-top:1px solid ${T.line};padding-bottom:0;margin-top:16px` : ""}">
        <div class="mono muted" style="font-size:11px">${s.label}</div><div style="font-size:16px;font-weight:600;margin-top:4px">${s.value}</div></div>`).join("")}
    </div></section>`;

  const sechead = (n, label, right = "") => `<div class="sechead"><span class="mono"><span class="accent">${n}</span> / ${label}</span><span class="mono muted">${right}</span></div>`;

  const about = `<section class="sec rule">${sechead("01", c.about.eyebrow, profile.location)}
    <div style="display:flex;${m ? "flex-direction:column" : ""};gap:${m ? 32 : 80}px">
      <p class="big" style="flex:1.2">${c.about.title}</p>
      <div style="flex:1;display:flex;flex-direction:column;gap:20px" class="muted">${c.about.paragraphs.map((p) => `<p>${p}</p>`).join("")}
        <dl style="display:grid;grid-template-columns:repeat(${m ? 1 : 3},1fr);gap:16px;margin-top:12px;padding-top:20px;border-top:1px solid ${T.line}">
        ${c.about.facts.map(([k, val]) => `<div><dt class="mono" style="font-size:11px">${k}</dt><dd style="color:${T.ink};font-weight:600;font-size:15px;margin-top:4px">${val}</dd></div>`).join("")}</dl>
      </div></div></section>`;

  const exps = [...c.experiences].sort((a, b) => a.startMonth.localeCompare(b.startMonth));
  const cardW = m ? cw : v.tablet ? cw : 560;
  const exp = `<section class="sec dark">${sechead("02", c.experienceHeading.eyebrow, "2025 — atual")}
    <h2 style="max-width:900px">${c.experienceHeading.title}</h2>
    <p class="muted" style="margin-top:12px;font-size:${m ? 16 : 20}px">Da qualidade ao desenvolvimento</p>
    <div style="position:relative;margin-top:${m ? 40 : 72}px;display:flex;${m || v.tablet ? "flex-direction:column;padding-left:28px" : "flex-direction:row;padding-top:36px"};gap:${m ? 40 : 48}px">
      <div style="position:absolute;${m || v.tablet ? "left:5px;top:6px;bottom:0;width:1px" : "left:0;right:0;top:5px;height:1px"};background:${T.inkLine}"></div>
      ${exps.map((e) => `<article style="position:relative;width:${m || v.tablet ? cw - 28 : cardW}px">
        <div style="position:absolute;${m || v.tablet ? "left:-28px;top:4px" : "left:0;top:-36px"};width:11px;height:11px;border-radius:50%;background:${T.accentDark}"></div>
        <div class="mono accent">${e.period}</div>
        <h3 style="font-size:${m ? 26 : 34}px;line-height:1.1;letter-spacing:-.02em;font-weight:600;margin-top:12px">${e.title}</h3>
        <div class="mono muted" style="margin-top:8px">${e.company} · ${e.location}</div>
        <p class="muted" style="margin-top:16px">${e.summary}</p>
        <ul style="list-style:none;margin-top:20px;border-top:1px solid ${T.inkLine}">${e.highlights.map((h) => `<li style="padding:10px 0;border-bottom:1px solid ${T.inkLine};font-size:15px">${h}</li>`).join("")}</ul>
      </article>`).join("")}
    </div>
    ${m || v.tablet ? "" : `<div class="mono muted" style="margin-top:48px">Role para acompanhar minha trajetória →</div>`}
  </section>`;

  const imgH = m ? Math.round(cw * 1.1) : v.tablet ? 460 : 640;
  const proj = `<section class="sec">${sechead("03", c.projectsHeading.eyebrow, "01 projeto")}
    <div style="display:flex;${m ? "flex-direction:column" : "justify-content:space-between;align-items:flex-end"};gap:20px;margin-bottom:${m ? 32 : 48}px">
      <h2>${c.projectsHeading.title}</h2><p class="muted" style="max-width:420px">${c.projectsHeading.intro}</p></div>
    <div style="width:${cw}px;height:${imgH}px;background:url('${img}') center/cover"></div>
    <div style="display:grid;grid-template-columns:${m ? "1fr" : "1.4fr 1fr"};gap:${m ? 28 : 64}px;margin-top:32px">
      <div><div class="mono accent">${project.status}</div><h3 style="font-size:${m ? 30 : 44}px;line-height:1.05;letter-spacing:-.03em;font-weight:600;margin-top:12px">${project.title}</h3>
      <p class="muted" style="margin-top:16px;max-width:620px">${project.description}</p></div>
      <dl style="border-top:1px solid ${T.line}">
        <div style="display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid ${T.line}"><dt class="mono muted">Stack</dt><dd style="font-size:15px;text-align:right">${project.stack.join(" · ")}</dd></div>
        <div style="display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid ${T.line}"><dt class="mono muted">Status</dt><dd style="font-size:15px">${c.projectUi.production}</dd></div>
        <div style="display:flex;gap:12px;padding-top:20px;${m ? "flex-direction:column" : ""}"><a class="btn primary small">${c.projectUi.visit} ${arrow(T.paper, 14)}</a><a class="btn small">${c.projectUi.repository} ${arrow(T.ink, 14)}</a></div>
      </dl></div></section>`;

  const stack = `<section class="sec rule">${sechead("04", c.skillsHeading.eyebrow, `${c.skillGroups.reduce((n, g) => n + g.skills.length, 0)} tecnologias`)}
    <h2 style="margin-bottom:${m ? 32 : 56}px">${c.skillsHeading.title}</h2>
    <div style="display:grid;grid-template-columns:repeat(${v.cols},1fr);gap:${m ? 0 : 32}px">
      ${c.skillGroups.map((g, i) => `<div style="border-top:1px solid ${T.ink};padding:20px 0 ${m ? 28 : 0}px">
        <div class="mono accent">0${i + 1}</div><h3 style="font-size:22px;line-height:1.2;font-weight:600;margin-top:10px">${g.title}</h3>
        <p class="muted" style="font-size:15px;margin-top:10px">${g.description}</p>
        <div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:4px 14px">${g.skills.map((s) => `<span class="tag">${s}</span>`).join("")}</div></div>`).join("")}
    </div></section>`;

  const edu = `<section class="sec rule">${sechead("05", c.educationHeading.eyebrow)}
    <h2 style="margin-bottom:${m ? 32 : 56}px">${c.educationHeading.title}</h2>
    <div>${c.education.map((e) => `<div style="display:grid;grid-template-columns:${m ? "1fr" : v.tablet ? "200px 1fr" : "320px 1fr 1fr"};gap:${m ? 6 : 24}px;padding:22px 0;border-top:1px solid ${T.line}">
      <div class="mono muted">${e.period}</div><div style="font-size:${m ? 20 : 22}px;font-weight:600;line-height:1.25">${e.title}</div>${v.tablet ? "" : `<div class="muted" style="font-size:15px">${e.institution}</div>`}</div>`).join("")}
      <div style="border-top:1px solid ${T.line}"></div></div></section>`;

  const contacts = [
    [c.contact.labels.linkedin, "/in/luis-eduardo-lamim-cardoso"],
    [c.contact.labels.whatsapp, profile.phone],
    [c.contact.labels.github, "@Lamim07"],
    ["Currículo", "PDF"],
  ];
  const contact = `<section class="sec dark">${sechead("06", c.contact.eyebrow)}
    <p class="big" style="max-width:900px">${c.contact.title}</p>
    <a style="display:block;margin-top:${m ? 40 : 64}px;font-size:${v.mail}px;line-height:1;letter-spacing:-.04em;font-weight:600;word-break:break-all">${m ? profile.email.replace("@", "<br/>@") : profile.email}</a>
    <div style="margin-top:${m ? 40 : 64}px;display:grid;grid-template-columns:repeat(${m ? 1 : v.tablet ? 2 : 4},1fr);gap:${m ? 0 : 24}px">
      ${contacts.map(([k, val]) => `<a style="display:flex;justify-content:space-between;align-items:center;padding:18px 0;border-top:1px solid ${T.inkLine}"><span><span class="mono muted" style="display:block;font-size:11px">${k}</span><span style="font-size:16px;font-weight:600">${val}</span></span>${arrow(T.paper, 18)}</a>`).join("")}
    </div></section>
    <footer class="dark" style="display:flex;justify-content:space-between;padding:24px ${v.pad}px;border-top:1px solid ${T.inkLine};font-size:14px"><span class="muted">© 2026 ${profile.name}</span><span>${c.footer.backToTop} ↑</span></footer>`;

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Mock ${w}</title><style>${css}</style></head><body>${header}${hero}${about}${exp}${proj}${stack}${edu}${contact}</body></html>`;
}

mkdirSync("tmp/mock", { recursive: true });
for (const w of [1440, 768, 390]) writeFileSync(`tmp/mock/mock-${w}.html`, page(w));
console.log("ok");
