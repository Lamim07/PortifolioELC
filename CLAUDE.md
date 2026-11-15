# CLAUDE.md — Premium Web Studio

## Identidade
Este repositório é o portfólio de Luis Eduardo Lamim Cardoso (dev C# .NET, Joinville/SC) e também a base do **Premium Web Studio**: um conjunto de agentes, skills e workflows para criar e modificar websites com qualidade de estúdio. Textos e documentação em **português**.

## Stack
- **Este repo (preservar, não migrar em silêncio):** React 18 + Vite 6 + Tailwind CSS 3 + shadcn/ui (`components.json`, estilo new-york, alias `@/` → `src/`) + `lucide-react` + `framer-motion` 11 + `gsap` 3.13 · TypeScript para arquivos novos (`tsconfig.json`) · gerenciador **pnpm** (`packageManager: pnpm@10.34.0`) · Node ≥ 22.
  - Testes: Playwright (`@playwright/test` 1.65.1, devDependency) com Chromium instalado.
  - Comandos: `pnpm dev` (http://127.0.0.1:5173) · `pnpm build` · `pnpm typecheck` · `pnpm preview` (http://127.0.0.1:4173).
- **Projetos novos (padrão):** Next.js App Router + TypeScript + Tailwind CSS v4 + Lucide + shadcn/ui/Radix + Motion; GSAP quando justificado; Playwright para testes. Verificar versões com `npm view <pacote> version` no dia.
- Migrar a stack de um projeto existente exige plano próprio e aprovação explícita.

## Regras globais
1. **Pesquisar antes de implementar.** Ler o código, a doc oficial e a stack real primeiro.
2. **Não inventar** comandos, links, versões, dados, depoimentos ou números. O que não foi verificado é marcado como "a verificar" e o que faltar fica como placeholder visível `[A DEFINIR: ...]`.
3. **Não declarar concluído sem evidência** (saída de comando, snapshot, screenshot ou relatório).
4. **Entrega sempre local.** É **proibido** fazer deploy ou configurar hospedagem (Vercel, Netlify, GitHub Pages, Cloudflare etc.) sem pedido explícito do usuário.
5. Não alterar configurações globais (`~/.claude`, `~/.claude.json`, variáveis do sistema) sem autorização.
6. Não instalar dependências sem aprovação; não fazer commit nem push sem pedido.
7. Imagens e ativos só com licença registrada (skill `brand-assets`).

## Agentes (`.claude/agents/`)
| Agente | Papel |
|---|---|
| `project-architect` | Escopo, plano, stack, roteamento e checkpoints |
| `brand-intelligence` | Pesquisa de marca com URL e confiabilidade; ativos licenciados |
| `component-researcher` | Até 3 componentes por seção, pontuados 25/25/15/15/10/10 |
| `design-taste-frontend` | Direção estética e revisão anti-genérica |
| `figma-design-engineer` | Design no Figma e Figma → código |
| `creative-ui-engineer` | Implementação da UI aprovada |
| `motion-designer` | Animação com propósito e reduced-motion |
| `qa-engineer` | QA visual/funcional em 390/768/1440 |
| `performance-engineer` | Lighthouse, Web Vitals e bundle |

## Skills
- **Internas (`.claude/skills/`):** `project-planning`, `brand-intelligence`, `brand-assets`, `component-research`, `premium-ui`, `figma-design`, `design-quality-gate`, `motion-design`, `visual-qa`, `performance-audit`.
- **Workflows:** `create-landing-page`, `modify-website`, `cinematic-redesign`.
- **Externas no projeto** (de `emilkowalski/skills`, MIT, controladas em `skills-lock.json`): `emil-design-eng`, `animate`, `choreograph`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `remove-animations`, `animation-performance`, `animation-vocabulary`, `pick-ui-library`, `break-ui`, `learn-taste`.
- **Plugins do usuário (escopo global, já instalados):** `taste-skill` (design-taste-frontend), `superpowers`, `impeccable`, `frontend-design`, plugin Figma.

## MCPs
| Servidor | Onde | Status |
|---|---|---|
| `chrome-devtools` | `.mcp.json` (projeto) | Servidor testado; aprovado em `.claude/settings.local.json` |
| `21st` (Magic MCP / 21st MCP) | `.mcp.json` (projeto) | Configurado; **pendente** `API_KEY_21ST` |
| Figma (conector claude.ai) | Conta do usuário | Testado (`whoami`) |
| `plugin:figma:figma` | Plugin | Duplicata do conector, falha ao conectar e pode ser ignorada |

Detalhes, versões e datas em `docs/tool-inventory.md`. Arquitetura em `docs/architecture.md`.

## Roteador de workflows (pelo escopo)
| Pedido | Workflow |
|---|---|
| Página/site/LP que ainda não existe | `create-landing-page` |
| Ajuste, correção, nova seção em site existente (tipos A–C) | `modify-website` |
| Nova identidade, nova estrutura, "redesign completo/cinematográfico" (tipo D) | `cinematic-redesign` |
| Dúvida | `project-architect` classifica e pergunta |

## Checkpoints de aprovação (✋ parar e esperar "ok" explícito)
Plano · direção estética/de arte · design (Figma ou especificação) antes de implementar · nova dependência · mudança de escopo/tipo · entrega final.

## Regras de teste
- Antes de dizer "pronto": `pnpm build` (e `pnpm typecheck` se houver TS) sem erro, página local sem erros de console, QA em **390×844, 768×1024 e 1440×900**, `prefers-reduced-motion` verificado quando houver animação, e skill `design-quality-gate` aplicada.
- Testes só contra `127.0.0.1`/`localhost`. Screenshots e artefatos temporários vão em `tmp/` (ignorado pelo git).
- Relatar o que **não** foi verificado.
