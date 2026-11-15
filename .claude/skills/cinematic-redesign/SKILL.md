---
name: cinematic-redesign
description: Workflow de redesign completo com direção de arte e narrativa de movimento — auditoria, extração do design system, pesquisa, direção de arte, storyboard, Figma, aprovação, reconstrução, motion engine, responsividade mobile, testes, quality gate e entrega. Use para mudanças de tipo D (identidade/estrutura) ou pedidos de "redesign completo/cinematográfico".
---

# Workflow: cinematic-redesign

Cada ✋ = checkpoint de aprovação. Entrega local, sem deploy. Mantém a stack existente salvo aprovação explícita de migração (plano separado).

| # | Fase | Agente | Skill | Saída |
|---|---|---|---|---|
| 1 | Auditoria (visual, conteúdo, a11y, performance "antes") | qa-engineer, performance-engineer, brand-intelligence | visual-qa, performance-audit, brand-intelligence | Relatório "antes" + screenshots |
| 2 | Extração do design system atual (cores, tipos, espaçamentos, componentes) | design-taste-frontend | premium-ui | Inventário de tokens/componentes |
| 3 | Pesquisa (referências e componentes) | component-researcher | component-research | `components.md` |
| 4 | Direção de arte ✋ | design-taste-frontend | premium-ui (+ plugin taste-skill) | `art-direction.md` |
| 5 | Storyboard (sequência de seções e transições, por viewport) | motion-designer, design-taste-frontend | motion-design | Storyboard em markdown/frames |
| 6 | Figma | figma-design-engineer | figma-design | Frames 390/768/1440 |
| 7 | Aprovação ✋ | — | — | "Aprovado" registrado |
| 8 | Reconstrução (seção por seção, build verde a cada etapa) | creative-ui-engineer | premium-ui | Código |
| 9 | Motion engine (Motion; GSAP p/ scroll storytelling justificado) | motion-designer | motion-design | Animações + tabela |
| 10 | Responsividade mobile (390 primeiro, gestos, toque) | creative-ui-engineer, qa-engineer | visual-qa | Ajustes + screenshots |
| 11 | Testes | qa-engineer | visual-qa | `docs/qa/...` |
| 12 | Quality gate | todos os revisores | design-quality-gate, performance-audit | Resultado + antes/depois |
| 13 | Entrega ✋ | project-architect | — | Relatório final |

## Storyboard (formato)
| Cena | Seção | Mensagem | Movimento (desktop) | Movimento (mobile) | Reduced-motion |

## Regras
- O "cinematográfico" não pode custar acessibilidade nem performance: metas da `performance-audit` valem.
- Conteúdo existente é preservado; nada de copy ou dado novo inventado.
- Comparação antes/depois obrigatória (screenshots + métricas).
