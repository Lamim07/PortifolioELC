---
name: project-planning
description: Transforma um briefing de site/landing page em plano com escopo, seções, stack, dependências, riscos e checkpoints de aprovação. Use no início de qualquer workflow do Premium Web Studio ou quando o pedido de web estiver vago.
---

# project-planning

Usado por: `project-architect`.

## Passos
1. **Ler o terreno** (antes de opinar): `git status`, `package.json`, lockfile, configs (`vite.config.*`, `tailwind.config.*`, `components.json`, `tsconfig.json`), estrutura de `src/`.
2. **Briefing mínimo** — se faltar, perguntar (máx. 5 perguntas, de uma vez):
   - Objetivo principal e ação desejada (contato, WhatsApp, compra, currículo).
   - Público e região.
   - Conteúdo real disponível (textos, fotos, logos, depoimentos com autorização).
   - Referências que o usuário gosta/não gosta.
   - Prazo e restrições (stack, orçamento de dependências).
3. **Escolher workflow** (ver roteador no `CLAUDE.md`).
4. **Escrever o plano** em `docs/plans/AAAA-MM-DD-<slug>.md`:

```markdown
# <Projeto> — plano
- Objetivo / métrica de sucesso:
- Público:
- Workflow: create-landing-page | modify-website (tipo A–D) | cinematic-redesign
- Stack: (a existente; mudanças exigem aprovação)
## Seções
| # | Seção | Objetivo | Conteúdo disponível? | Observações |
## Dependências novas
| Pacote | Versão verificada (npm view) | Motivo | Alternativa sem dependência |
## Riscos e lacunas
## Checkpoints de aprovação
## Critérios de aceite (testáveis)
```

5. **Checkpoint**: apresentar o plano e esperar aprovação explícita antes da próxima fase.

## Regras
- Nada de "TBD" sem dono; nada de dado inventado.
- Projeto existente mantém a stack. Migração de stack é um projeto à parte, com plano próprio.
- Sem deploy/hospedagem em nenhum plano.
