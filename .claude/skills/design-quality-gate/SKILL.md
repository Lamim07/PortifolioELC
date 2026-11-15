---
name: design-quality-gate
description: Portão final de qualidade antes de entregar um site — consolida estética, QA visual, acessibilidade, performance, conteúdo e integridade de dados com evidências. Use como penúltima fase de todos os workflows; nada é "concluído" sem passar aqui.
---

# design-quality-gate

Consolida o trabalho de `design-taste-frontend`, `qa-engineer` e `performance-engineer`.

## Critérios (todos com evidência)
| # | Área | Critério | Evidência exigida |
|---|---|---|---|
| 1 | Build | `pnpm build` (e `pnpm typecheck` quando houver TS) sem erro | Saída do comando |
| 2 | Estética | Checklist anti-genérico sem reprovações | Parecer do `design-taste-frontend` |
| 3 | Responsivo | 390×844, 768×1024, 1440×900 sem overflow e com hierarquia legível | Screenshots em `tmp/qa/` (skill `visual-qa`) |
| 4 | Console/rede | 0 erros de console, 0 requisições 4xx/5xx locais | Lista do Chrome DevTools MCP |
| 5 | Acessibilidade | Lighthouse a11y ≥ 95; teclado e foco OK | Relatório |
| 6 | Performance | Metas da skill `performance-audit` ou desvio aceito | Relatório |
| 7 | Motion | `prefers-reduced-motion` respeitado | Teste com emulação |
| 8 | Conteúdo | Nenhum dado inventado; placeholders listados | Lista de placeholders |
| 9 | Ativos | Todas as imagens com licença registrada | `assets.md` |
| 10 | Escopo | Só arquivos do escopo aprovado mudaram | `git status` / `git diff --stat` |

## Resultado
- **Aprovado**: todos os critérios OK.
- **Aprovado com ressalvas**: desvios listados e aceitos pelo usuário.
- **Reprovado**: volta para a fase responsável com a lista de falhas.

Registrar o resultado no relatório de entrega. Sem evidência = não verificado (nunca "provavelmente OK").
