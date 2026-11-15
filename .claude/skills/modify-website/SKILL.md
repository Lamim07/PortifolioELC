---
name: modify-website
description: Workflow para alterar um site existente com escopo controlado — entender, inspecionar, classificar a mudança (tipos A–D), pesquisar, revisar a estética, Figma opcional, aprovar, implementar, testar e comparar antes/depois. Use para ajustes, novas seções ou correções em um site que já existe.
---

# Workflow: modify-website

Cada ✋ = checkpoint de aprovação. Entrega local, sem deploy.

## Classificação da mudança
| Tipo | Escopo | Exemplos | Fases obrigatórias |
|---|---|---|---|
| **A** | Pontual, sem impacto visual amplo | trocar texto, link, imagem, corrigir bug de CSS | 1, 2, 3, 8, 9, 11 |
| **B** | Componente/seção isolada | refazer card, novo botão, ajustar responsivo de uma seção | + 5, 7, 10 |
| **C** | Nova seção ou várias seções | adicionar "Serviços", reorganizar a home | + 4, 6 (opcional), 10 |
| **D** | Mudança de identidade/estrutura | novo visual geral, nova navegação | **usar `cinematic-redesign`** |

## Fases
| # | Fase | Agente | Skill |
|---|---|---|---|
| 1 | Entender o pedido (o que, onde, por quê) | project-architect | project-planning |
| 2 | Inspecionar (código + página local, screenshots "antes" nos 3 viewports) | qa-engineer | visual-qa |
| 3 | Classificar A–D e listar arquivos do escopo ✋ (para A, basta confirmar) | project-architect | project-planning |
| 4 | Pesquisa de componentes | component-researcher | component-research |
| 5 | Revisão estética | design-taste-frontend | premium-ui |
| 6 | Figma (opcional) | figma-design-engineer | figma-design |
| 7 | Aprovação ✋ | — | — |
| 8 | Implementação controlada (só arquivos do escopo) | creative-ui-engineer / motion-designer | premium-ui, motion-design |
| 9 | Testes (build, typecheck, console, viewports) | qa-engineer | visual-qa |
| 10 | Comparação antes/depois + quality gate | qa-engineer, design-taste-frontend | design-quality-gate |
| 11 | Entrega ✋ | project-architect | — |

## Regras
- `git status` no início; não tocar em mudanças pré-existentes do usuário fora do escopo.
- Mudança que cresce de tipo → parar, reclassificar e pedir aprovação.
- Sem commit/push a menos que o usuário peça.

## Entrega
Diff resumido (`git diff --stat`), screenshots antes/depois, comandos e resultados, pendências.
