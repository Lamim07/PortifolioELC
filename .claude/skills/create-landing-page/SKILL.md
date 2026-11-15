---
name: create-landing-page
description: Workflow completo para criar uma landing page ou site novo do zero — briefing, brand intel, plano, pesquisa de componentes, direção estética, Figma, aprovação, implementação, motion, QA, quality gate e entrega local. Use quando o usuário pedir uma página/LP/site que ainda não existe.
---

# Workflow: create-landing-page

Entrega **sempre local** (sem deploy/hospedagem). Cada ✋ é um checkpoint: parar e esperar aprovação explícita do usuário.

| # | Fase | Agente | Skill | Saída |
|---|---|---|---|---|
| 1 | Briefing | project-architect | project-planning | Respostas do briefing |
| 2 | Brand intel | brand-intelligence | brand-intelligence, brand-assets | `research/<slug>/brand-brief.md`, `assets.md` |
| 3 | Plano ✋ | project-architect | project-planning | `docs/plans/<data>-<slug>.md` |
| 4 | Pesquisa de componentes | component-researcher | component-research | `research/<slug>/components.md` |
| 5 | Direção estética ✋ | design-taste-frontend | premium-ui (+ plugin taste-skill) | `research/<slug>/art-direction.md` |
| 6 | Figma | figma-design-engineer | figma-design | Link dos frames (ou "pulada" com motivo) |
| 7 | Aprovação do design ✋ | — | — | "Aprovado" do usuário registrado |
| 8 | Implementação | creative-ui-engineer | premium-ui | Código + build OK |
| 9 | Motion | motion-designer | motion-design | Tabela de animações |
| 10 | QA | qa-engineer | visual-qa | `docs/qa/<data>-<slug>.md` |
| 11 | Quality gate | design-taste-frontend, qa-engineer, performance-engineer | design-quality-gate, performance-audit | Resultado do gate |
| 12 | Entrega local ✋ | project-architect | — | Relatório final |

## Stack
- Projeto novo: stack padrão do `CLAUDE.md` (Next.js App Router + TS + Tailwind v4 + shadcn/Radix + Lucide + Motion; GSAP/Playwright quando justificado). Versões verificadas com `npm view` no dia.
- Dentro de um repo existente (como este portfólio React + Vite): usar a stack existente.

## Regras
- Fase 2 pode ser curta se não houver negócio externo (ex.: portfólio pessoal) — os fatos vêm do usuário.
- Sem conteúdo real → placeholder `[A DEFINIR: ...]`, nunca texto inventado.
- Não pular checkpoints; se o usuário disser "pode seguir sem perguntar", registrar isso.

## Relatório de entrega (fase 12)
Arquivos criados/alterados · comandos executados com resultado · resultado do quality gate · placeholders pendentes · como rodar local (`pnpm dev`) · o que **não** foi verificado.
