// Gera as imagens Open Graph (1200×630) em public/assets/og-en.png e og-pt.png.
// Uso: node scripts/generate-og.mjs   (precisa de internet para baixar as fontes do Google Fonts)
// Visual "Planta do sistema": papel, tinta, grade de planta, monograma LC e ponto violeta.
import { chromium } from "@playwright/test";
import { existsSync } from "node:fs";

const LETTERS = "M6 7h4v14h5v4H6z M17 7h7v4h-3v10h3v4h-7z";

const copy = {
  en: { eyebrow: "Software Developer — .NET Backend", place: "Joinville, Santa Catarina", layers: ["Domain", "Application", "Data"] },
  pt: { eyebrow: "Software Developer — Backend .NET", place: "Joinville, Santa Catarina", layers: ["Domínio", "Aplicação", "Dados"] },
};

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@600;700&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#F1EFE8;color:#111210;font-family:"Instrument Sans";position:relative;overflow:hidden;
background-image:linear-gradient(rgba(17,18,16,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(17,18,16,.06) 1px,transparent 1px);background-size:64px 64px}
.mono{font-family:"JetBrains Mono";font-size:20px;letter-spacing:.02em;text-transform:uppercase}
.top{position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:20px}
.mark{width:64px;height:64px;border:2px solid #111210;display:grid;place-items:center;background:#F1EFE8}
.eyebrow{color:#5E5F58}.eyebrow b{color:#512BD4;font-weight:500}
h1{position:absolute;left:68px;top:184px;font-size:104px;line-height:.92;letter-spacing:-.045em;font-weight:700}
h1 i{display:inline-block;width:.16em;height:.16em;background:#512BD4;margin-left:.04em}
.layers{position:absolute;right:72px;bottom:64px;width:236px}
.layer{height:46px;border:2px solid #111210;background:#F1EFE8;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:20px;font-weight:600;position:relative}
.layer span{width:10px;height:10px;border-radius:50%;background:#512BD4}
.layer+.layer{margin-top:22px}
.l1{margin-right:40px}.l2{margin-left:20px;margin-right:20px}.l3{margin-left:40px}
.layer+.layer:before{content:"";position:absolute;top:-24px;right:22px;width:2px;height:22px;background:#512BD4}
.url{position:absolute;left:72px;bottom:72px}
</style></head><body>
<div class="top"><div class="mark"><svg viewBox="0 0 32 32" width="48" height="48"><path d="${LETTERS}" fill="#111210"/><rect x="26" y="22" width="3" height="3" fill="#512BD4"/></svg></div>
<p class="mono eyebrow"><b>${c.eyebrow}</b> &nbsp; ${c.place}</p></div>
<h1>Luis Eduardo<br>Lamim Cardoso<i></i></h1>
<div class="layers">${c.layers.map((l, i) => `<div class="layer l${i + 1}">${l}<span></span></div>`).join("")}</div>
<p class="mono url">luiseduardolamim.com.br</p>
</body></html>`;

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await chromium.launch(existsSync(chrome) ? { executablePath: chrome } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [lang, c] of Object.entries(copy)) {
  await page.setContent(html(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/assets/og-${lang}.png` });
  console.log(`public/assets/og-${lang}.png`);
}
await browser.close();
