---
name: component-research
description: Pesquisa e pontua até 3 componentes prontos por seção (21st.dev, Aceternity UI, Magic UI, shadcn/ui, Radix, Cult UI, React Bits, Uiverse e outros) com links verificados e pesos 25/25/15/15/10/10. Use depois do plano aprovado, antes de implementar.
---

# component-research

Usado por: `component-researcher`.

## Bibliotecas de referência
| Biblioteca | URL | Observação |
|---|---|---|
| shadcn/ui | https://ui.shadcn.com | Já configurado neste repo (`components.json`, estilo new-york) |
| Radix Primitives | https://www.radix-ui.com/primitives | Base acessível do shadcn |
| 21st.dev | https://21st.dev | Também via MCP `21st` (requer `API_KEY_21ST`) |
| Aceternity UI | https://ui.aceternity.com | Efeitos chamativos — usar com moderação |
| Magic UI | https://magicui.design | Componentes animados p/ landing pages |
| Cult UI | https://www.cult-ui.com | Componentes shadcn-compatíveis |
| React Bits | https://reactbits.dev | Animações/efeitos em React |
| Uiverse | https://uiverse.io | Elementos HTML/CSS da comunidade; verificar licença por item |

> Os URLs acima são pontos de partida. **Revalide cada link com WebFetch na data da pesquisa**; link que não abre é descartado.

## Processo
1. Para cada seção do plano, buscar candidatos (máx. 3 finalistas).
2. Abrir o link, confirmar: licença, dependências (ex.: `motion`, `@radix-ui/*`), compatibilidade com a stack (React 18, Vite, Tailwind 3 neste repo — vários componentes novos assumem Tailwind v4).
3. Pontuar 0–10 em cada critério e aplicar os pesos:

| Critério | Peso |
|---|---|
| Aderência à direção estética | 25 |
| Qualidade técnica e acessibilidade | 25 |
| Compatibilidade com a stack | 15 |
| Performance (peso, animações, JS) | 15 |
| Licença e manutenção | 10 |
| Esforço de adaptação (inverso) | 10 |

Nota final = Σ(nota × peso) / 10 → escala 0–100.

## Saída: `research/<slug>/components.md`
```markdown
## Seção: <nome>
| Alternativa | Link (verificado em AAAA-MM-DD) | Licença | Deps | Estética | Técnica | Stack | Perf | Licença | Esforço | Total |
**Recomendação:** <alternativa> — <motivo>
```

## Regras
- Não instalar nada nesta fase.
- "Construir do zero com shadcn/Radix" é sempre uma alternativa válida.
