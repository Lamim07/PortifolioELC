# 06 · Entrega do redesign "Planta do sistema" ✋

Data: 2026-11-15 · Entrega **local** (sem deploy, sem commit). Evidências em `tmp/after/` e `tmp/before/` (ignorados pelo git).

## Antes × depois
| Métrica | Antes | Depois | Fonte |
|---|---|---|---|
| JS (gzip) | 157 kB | **112 kB** | `pnpm build` |
| CSS (gzip) | 10,5 kB | **5,7 kB** | `pnpm build` |
| Imagens carregadas na home | 3,5 MB (2 PNG geradas + foto) | **235 kB** (só a foto do Insulfrio, lazy) | rede |
| LCP mobile (Slow 4G, CPU 4×) | 4 551 ms | **2 651 ms** | trace DevTools |
| CLS | 0,00 | 0,05 (troca de fonte) | Lighthouse |
| Lighthouse A11y / BP / SEO | 100 / 100 / 92 | **100 / 100 / 100** | Lighthouse mobile |
| Intro bloqueante | sim (clique obrigatório) | **não** | — |
| Erros de console | 0 | 0 | Playwright, 3 viewports × 2 modos de movimento |

Observação: o `vite preview` serve o JS sem compressão; em hospedagem com gzip/brotli o LCP tende a ser menor. Meta de 2,5 s ficou **150 ms acima** na medição local — desvio a aceitar ou atacar (ver pendências).

## O que mudou
- **Estrutura:** Hero → 01 Sobre → 02 Experiência → 03 Projetos → faixa de stack → 04 Habilidades → 05 Formação → 06 Contato. Navegação numerada na mesma ordem.
- **Código:** `src/App.jsx` virou só composição; seções novas em TypeScript em `src/components/site/` (`Header`, `Hero`, `Sections`, `primitives`) e contexto em `src/lib/portfolio-context.tsx`.
- **Tokens:** `tailwind.config.js` + `src/index.css` com variáveis CSS (papel/tinta/secundário/acento + superfícies invertidas) e **modo escuro automático** por `prefers-color-scheme`.
- **Fontes:** Instrument Sans + JetBrains Mono via Google Fonts (OFL), carregadas sem bloquear o render.
- **Removidos da página:** intro "IDE", canvas de partículas, dock flutuante, barras de porcentagem, glassmorphism. Conteúdo textual de `portfolio.js` preservado; só foram adicionados rótulos de interface (`ui`) que antes estavam fixos no código, mais "Copiar e-mail / Copiado".
- `public/robots.txt` criado (corrige o SEO 92 → 100). `index.html`: theme-color claro/escuro, sem preload da PNG de 1,6 MB.

## Motion (todas respeitam `prefers-reduced-motion`)
| Onde | Efeito |
|---|---|
| Header | esconde ao rolar para baixo, volta ao subir; barra de progresso em acento; indicador da seção ativa desliza; seletor de idioma com "pílula" animada; menu mobile abre com cortina e links em cascata |
| Hero | nome letra a letra atrás de máscara; ponto final com mola; grid técnico surge e some no scroll; diagrama de camadas se desenha, pacotes de dados descem entre camadas em loop, camadas reagem ao ponteiro (parallax por profundidade) e ao hover; botões magnéticos com preenchimento que varre |
| Seções | régua do cabeçalho se desenha; títulos sobem linha a linha |
| Sobre | frase-tese acende palavra a palavra com o scroll |
| Experiência | trilho desenhado pelo scroll (horizontal no desktop, vertical no mobile); marcadores acendem quando o trilho chega; responsabilidades entram em cascata |
| Projetos | foto abre de recorte (`clip-path`) para tela cheia com parallax; cursor circular "Visitar projeto" segue o mouse; status com pulso |
| Faixa de stack | marquee infinito com todas as tecnologias, pausa no hover |
| Habilidades | contador 00 → 40; linha de acento varre no hover; tags entram em cascata e preenchem no hover |
| Formação | réguas crescem; hover varre fundo e desloca título |
| Contato | e-mail com onda letra a letra no hover; botão copiar com troca animada; canais com linha e seta animadas |

Propriedades animadas: `transform`, `opacity`, `clip-path`, `stroke-dashoffset` (SVG do diagrama).

## Quality gate
| # | Critério | Resultado | Evidência |
|---|---|---|---|
| 1 | Build/typecheck | ✅ | `pnpm typecheck` e `pnpm build` sem erro |
| 2 | Estética | ✅ (autoavaliação) | segue a direção e os frames aprovados no Figma; sem neon/vidro/gradientes |
| 3 | Responsivo | ✅ | `tmp/after/{390,768,1440}-*.png`; overflow horizontal = 0 nos três |
| 4 | Console/rede | ✅ | 0 erros; 0 respostas 4xx/5xx |
| 5 | Acessibilidade | ✅ | Lighthouse 100; Tab percorre skip-link → logo → nav → idioma → CTAs com outline visível; menu fecha com Esc |
| 6 | Performance | ⚠️ ressalva | LCP 2,65 s (meta 2,5 s) |
| 7 | Motion | ✅ | rodado com `reducedMotion: reduce` nos 3 viewports, sem erros; conteúdo visível sem animação (`tmp/after/*-rm-*.png`) |
| 8 | Conteúdo | ✅ | nenhum dado novo; rótulos de UI listados acima |
| 9 | Ativos | ⚠️ | fontes OFL (Google Fonts); foto do Insulfrio já estava no repo — **licença/autoria a registrar** |
| 10 | Escopo | ✅ | só arquivos do site + `docs/redesign/` + `public/robots.txt` |

**Resultado: aprovado com ressalvas (itens 6 e 9).**

## Atualização 2026-11-15 — novos projetos
- Adicionados **Luis & Nubia** (https://www.weddingluisandnubia.com/) e **One Man Fishing — Bio** (https://onemanfishing.com/bio/) em `projectCatalog`.
- Descrições escritas a partir do próprio conteúdo dos sites (meta tags e navegação) — **revisar o texto**.
- Stack só com o que foi detectado: convite → React (`__reactFiber` no bundle); One Man Fishing → Next.js + React (`/_next/`, turbopack). Outras tecnologias usadas (Vite, Tailwind etc.) **a confirmar** por você.
- Repositórios: nenhum público encontrado em `github.com/Lamim07` → botão "Repositório" oculto (`repoUrl: "#"`).
- Imagens: capturas de tela dos próprios sites (desktop 1440×900 e mobile 390×844 @2x) em `public/assets/*-project.jpg` / `*-project-mobile.jpg`; mobile usa `<picture>` com a captura mobile. O convite mostra foto pessoal do casal — publicação a seu critério.
- Seção Projetos: numeração `01 / 03`, layout alternado (ficha à esquerda nos casos pares) no desktop.
- QA: build/typecheck OK; 3 viewports × 2 modos de movimento sem erros e sem overflow; 0 imagens quebradas.

## Pendências / não verificado
- LCP 150 ms acima da meta; opções: self-host das fontes em `public/fonts/` e/ou pré-render do HTML do hero.
- Safari/iOS real e Firefox não testados (só Chromium).
- Cursor customizado e efeitos de hover não são exercitados por teste automatizado.
- Arquivos que ficaram sem uso: `src/components/ui/timeline*.{tsx,css}`, `public/assets/office-intro.png` (a `hero-architecture.png` segue usada no `og:image`). `gsap` continua no `package.json`, mas não é mais importado. Não removi nada sem sua autorização.
- O mockup do Figma não tem os efeitos de movimento; o código é a referência de motion.
