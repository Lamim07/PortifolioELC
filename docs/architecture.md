# Arquitetura — Premium Web Studio

Configurado em 2026-11-15. Este documento descreve **como as peças se conectam**. O status de cada ferramenta está em [`tool-inventory.md`](tool-inventory.md) e as regras de operação, em [`../CLAUDE.md`](../CLAUDE.md).

## Camadas

```
CLAUDE.md  ── regras globais + roteador
   │
   ├── Workflows (.claude/skills/)          create-landing-page · modify-website · cinematic-redesign
   │        │  cada fase aponta para 1 agente + 1..n skills, com checkpoints ✋
   │        ▼
   ├── Agentes (.claude/agents/)            project-architect · brand-intelligence · component-researcher
   │        │                               design-taste-frontend · figma-design-engineer · creative-ui-engineer
   │        │                               motion-designer · qa-engineer · performance-engineer
   │        ▼
   ├── Skills internas (.claude/skills/)    project-planning · brand-intelligence · brand-assets · component-research
   │                                        premium-ui · figma-design · design-quality-gate · motion-design
   │                                        visual-qa · performance-audit
   ├── Skills externas (.claude/skills/)    12 skills de emilkowalski/skills (skills-lock.json)
   ├── Plugins do usuário (~/.claude)       taste-skill · superpowers · impeccable · frontend-design · figma
   └── MCPs                                 chrome-devtools e 21st (.mcp.json) · Figma (conector claude.ai)
```

## Matriz agente × skill × ferramenta
| Agente | Skills internas | Skills/plugins externos | MCP / ferramentas |
|---|---|---|---|
| project-architect | project-planning | superpowers:brainstorming, superpowers:writing-plans | Bash, Read |
| brand-intelligence | brand-intelligence, brand-assets | — | WebSearch, WebFetch |
| component-researcher | component-research | pick-ui-library | WebFetch, MCP `21st` (quando autenticado) |
| design-taste-frontend | premium-ui | taste-skill:design-taste-frontend, frontend-design, impeccable, break-ui, learn-taste | — |
| figma-design-engineer | figma-design | figma:figma-use, figma:figma-design-to-code, figma:figma-generate-design, figma:figma-generate-library, figma:figma-create-new-file | Conector Figma |
| creative-ui-engineer | premium-ui, brand-assets | emil-design-eng | Bash (pnpm) |
| motion-designer | motion-design | animate, choreograph, review-animations, improve-animations, find-animation-opportunities, remove-animations, animation-performance, animation-vocabulary | Chrome DevTools MCP (emulação) |
| qa-engineer | visual-qa, design-quality-gate | superpowers:verification-before-completion | Chrome DevTools MCP; Playwright 1.65.1 |
| performance-engineer | performance-audit, design-quality-gate | animation-performance | Chrome DevTools MCP (lighthouse, trace) |

## Workflows (resumo)
| Workflow | Fases | Checkpoints ✋ |
|---|---|---|
| create-landing-page | briefing → brand intel → plano → componentes → direção estética → Figma → aprovação → implementação → motion → QA → quality gate → entrega local | plano, direção, design, entrega |
| modify-website | entender → inspecionar → classificar A–D → pesquisa → revisão estética → Figma (opcional) → aprovação → implementação controlada → testes → antes/depois → entrega | classificação, aprovação, entrega |
| cinematic-redesign | auditoria → design system → pesquisa → direção de arte → storyboard → Figma → aprovação → reconstrução → motion engine → mobile → testes → quality gate → entrega | direção, aprovação, entrega |

## Artefatos gerados pelos workflows (criados só quando há trabalho real)
| Caminho | Conteúdo | Versionado? |
|---|---|---|
| `docs/plans/` | Planos aprovados | Sim |
| `docs/qa/` | Relatórios de QA/quality gate | Sim |
| `research/<slug>/` | brand-brief, assets, components, art-direction | Sim (sem dados pessoais de terceiros) |
| `tmp/qa/` | Screenshots e scripts temporários | Não (`.gitignore`) |

## Decisões
- **Stack preservada:** o portfólio continua em React + Vite. A stack Next.js é o padrão apenas para projetos novos.
- **MCPs no escopo do projeto** (`.mcp.json`) para não alterar a configuração global. O Claude Code pede aprovação dos servidores de projeto no primeiro uso.
- **Windows:** o servidor stdio usa `cmd /c npx ...`, a forma que funcionou no teste local.
- **Privacidade:** o Chrome DevTools MCP roda com `--isolated` (perfil temporário) e `--no-usage-statistics`.
