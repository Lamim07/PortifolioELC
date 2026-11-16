# Histórico do projeto — Portfólio Luis Eduardo Lamim Cardoso

Documento de passagem de bastão: o que foi feito, onde está cada coisa e como retomar o trabalho em outro computador.
Última atualização: **16/11/2026**.

---

## 1. Resumo em uma frase
O portfólio foi **totalmente redesenhado** com o workflow `cinematic-redesign` do Premium Web Studio: saiu o visual "neon/hacker" com tela de entrada bloqueante e entrou a direção **"Planta do sistema"** — editorial, papel claro + tinta escura, um único acento violeta, muitas animações com propósito, modo escuro automático e três projetos reais na vitrine.

## 2. Linha do tempo

### Antes desta fase (já existia no repositório, sem commit)
- Montagem do **Premium Web Studio** dentro do repo: `CLAUDE.md`, agentes em `.claude/agents/`, skills em `.claude/skills/`, `skills-lock.json` (skills externas de `emilkowalski/skills`, MIT), `.mcp.json` (Chrome DevTools MCP e 21st MCP), `docs/architecture.md`, `docs/tool-inventory.md`.
- Preparação de stack: TypeScript (`tsconfig.json`, script `typecheck`), alias `@/`, shadcn/ui (`components.json`, `src/lib/utils.ts`), Playwright, GSAP, componente de timeline (`src/components/ui/timeline*`).

### Fase 1–3 · Auditoria, inventário e pesquisa
- Auditoria do site antigo com screenshots e métricas → `docs/redesign/01-auditoria.md`.
  Principais problemas: intro "IDE compilando" bloqueava o site; LCP mobile de **4,55 s**; 3,2 MB em imagens decorativas; barras de habilidade com porcentagens sem critério; fonte Inter declarada mas nunca carregada; canvas de partículas rodando sem parar.
- Inventário do design system antigo → `docs/redesign/02-design-system-atual.md`.
- Pesquisa de componentes → `docs/redesign/03-pesquisa.md` (decisão: construir sob medida, sem novas dependências).

### Fase 4 · Direção de arte (aprovada)
- `docs/redesign/04-direcao-de-arte.md`: conceito "Planta do sistema", paleta, tipografia, nova ordem das seções e storyboard de movimento.
- Aprovadas as remoções: intro bloqueante, porcentagens das habilidades, dock flutuante e canvas de partículas.

### Fase 5–7 · Figma (aprovado)
- Arquivo: **https://www.figma.com/design/yPP058oZVgq56DUmZN2WWT** (time "Luis Eduardo e Nubia"), página "Redesign — Home", frames 1440 / 768 / 390 e coleção de variáveis "Planta / tokens" (Claro/Escuro).
- Gerador dos mockups a partir do conteúdo real: `docs/redesign/mockup/build-mock.mjs` → registro em `docs/redesign/05-figma.md`.

### Fase 8–12 · Reconstrução, motion, QA e quality gate
- Pedido extra durante a fase: **"a página deve ter muitos efeitos animados e componentes bonitos"** — atendido mantendo acessibilidade e performance.
- Relatório completo com antes × depois e quality gate: `docs/redesign/06-entrega.md`.

| Métrica | Antes | Depois |
|---|---|---|
| Intro bloqueante | sim | não |
| LCP mobile (Slow 4G, CPU 4×) | 4,55 s | 2,65 s |
| JS gzip | 157 kB | 112 kB |
| Imagens na home | 3,5 MB | ~0,6 MB (lazy) |
| Lighthouse A11y / BP / SEO | 100 / 100 / 92 | 100 / 100 / 100 |

### Atualização · Novos projetos
- Adicionados **Luis & Nubia** (https://www.weddingluisandnubia.com/) e **One Man Fishing — Bio** (https://onemanfishing.com/bio/) ao lado do **Insulfrio**.
- Imagens = capturas de tela dos próprios sites (desktop + mobile).

### Atualização · Migração para Next.js (16/11/2026)
- Vite trocado por **Next.js 16.4.6 (App Router) + React 19**, mesmo visual, Tailwind 3 e framer-motion. Plano: `docs/redesign/07-migracao-nextjs.md`.
- Idiomas viraram rotas pré-renderizadas: `/` (inglês) e `/pt` (português), com `hreflang`. Fontes servidas pelo próprio site via `next/font`.
- Removidos: `index.html`, `src/main.jsx`, `vite.config.js`, `vite` e `@vitejs/plugin-react`. Branches extras e a VersaoClaude foram descartadas; restam `main` e `redesign/planta-do-sistema`.

## 3. Onde está cada coisa
| Caminho | Conteúdo |
|---|---|
| `src/data/portfolio.js` | **Todo o conteúdo** (PT/EN): perfil, textos, experiências, habilidades, formação, rótulos de interface (`ui`) e `projectCatalog` |
| `src/app/` | Rotas `/` e `/pt`, layouts por idioma e metadados (`site.tsx`) |
| `src/components/site/Portfolio.tsx` | Composição da página (antigo `App.jsx`) |
| `src/components/site/Header.tsx` | Header, navegação numerada, seletor de idioma, menu mobile |
| `src/components/site/Hero.tsx` | Nome animado, diagrama de camadas, CTAs |
| `src/components/site/Sections.tsx` | Sobre, Experiência, Projetos, faixa de stack, Habilidades, Formação, Contato, Footer |
| `src/components/site/primitives.tsx` | Peças de animação reutilizáveis (SectionHead, MaskLines, Reveal, ScrollWords, CountUp, Magnetic) |
| `src/lib/portfolio-context.tsx` | Contexto de idioma/conteúdo e curva de easing |
| `src/index.css` + `tailwind.config.js` | Tokens de cor (variáveis CSS, claro/escuro), fontes, botões |
| `public/assets/` | Currículo PDF, fotos/capturas dos projetos, favicon |
| `docs/redesign/` | Todos os relatórios do redesign (01 a 06) |

### Como adicionar um projeto
Copie um objeto de `projectCatalog` em `src/data/portfolio.js` e preencha `title`, `description` (pt/en), `stack` (pt/en), `status`, `imageUrl`, `imageAlt` (pt/en), `liveUrl` e `repoUrl` (`"#"` esconde o botão). Opcionais: `imageMobileUrl` (imagem usada abaixo de 768 px) e `imagePosition: "top"` (enquadra o topo da imagem). A numeração "01 / 03" e o layout alternado são automáticos.

## 4. Como retomar em outro computador
Pré-requisitos: **Git**, **Node ≥ 22** e **pnpm 10** (`corepack enable` ativa o pnpm declarado no `package.json`).

```bash
git clone https://github.com/Lamim07/PortifolioELC.git
cd PortifolioELC
git checkout redesign/planta-do-sistema
pnpm install
pnpm dev            # http://127.0.0.1:5173
```

Outros comandos: `pnpm build`, `pnpm typecheck`, `pnpm preview` (http://127.0.0.1:4173).
Para os testes com Playwright: `pnpm exec playwright install chromium`.

Configurações locais que **não** vão para o Git (refazer na máquina nova se precisar):
- `.claude/settings.local.json` (aprovações locais do Claude Code).
- Variável de ambiente `API_KEY_21ST` para o MCP do 21st (estava pendente).
- Plugins globais do Claude Code (taste-skill, superpowers, impeccable, frontend-design, Figma) e o conector Figma da conta.

## 5. Branch e deploy
- Todo este trabalho está na branch **`redesign/planta-do-sistema`**. A `main` **não foi alterada** — de propósito, porque o projeto foi preparado para deploy na Vercel e um push na `main` poderia publicar o site em produção.
- **Vercel:** antes do merge, conferir se o projeto lá está com o preset "Next.js" (antes era Vite, saída `dist`).
- Para publicar: abrir um Pull Request da branch para a `main` no GitHub e fazer o merge quando estiver satisfeito.

## 6. Pendências
- [ ] Revisar as descrições e a stack de **Luis & Nubia** e **One Man Fishing** (stack só com o que foi detectado: React; Next.js + React). Adicionar repositórios se existirem.
- [ ] LCP mobile 2,65 s (meta 2,5 s): fontes locais e HTML pré-renderizado já vieram com o Next — **medir de novo**.
- [ ] Registrar autoria/licença da foto do Insulfrio.
- [ ] Testar em Safari/iOS e Firefox (só Chromium foi testado).
- [ ] Decidir se remove o que ficou sem uso: `src/components/ui/timeline*`, `public/assets/office-intro.png` e a dependência `gsap`.
- [ ] Confirmar a cor de acento `#512BD4` (inspirada na cor do .NET).
