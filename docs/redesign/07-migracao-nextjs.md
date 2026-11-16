# 07 · Plano de migração Vite → Next.js

Status: **aprovado e executado em 16/11/2026** (idiomas como rotas `/` e `/pt`).
Branch: `redesign/planta-do-sistema`. A `main` não é tocada.

## Objetivo
Trocar o Vite pelo Next.js mantendo **o mesmo visual, conteúdo e animações** da direção "Planta do sistema". Nada de redesign: só a troca de framework, mais os ganhos que o Next traz de graça (HTML pré-renderizado e fontes hospedadas localmente → ataca a pendência do LCP mobile de 2,65 s).

## Versões (verificadas em 16/11/2026 com `npm view`)
| Pacote | Agora | Depois |
|---|---|---|
| next | — | 16.4.6 |
| react / react-dom | 18.3.1 | 19.3.1 (Next 16 App Router usa React 19) |
| @types/react / @types/react-dom | 18 | 19 |
| framer-motion | 11 | 11 (já aceita React 19) |
| tailwindcss | 3.4 | 3.4 (sem migrar para v4 agora) |
| vite, @vitejs/plugin-react | sim | **removidos** |

## Estrutura nova
```
src/app/layout.tsx        ← <html>, fontes via next/font, metadados base, ícone
src/app/page.tsx          ← página em inglês  (/)
src/app/pt/page.tsx       ← página em português (/pt)
src/components/site/Portfolio.tsx  ← o antigo App.jsx, como componente cliente
src/components/site/*     ← Header, Hero, Sections, primitives com "use client"
src/data, src/lib, src/index.css   ← iguais
public/                   ← igual (PDF, imagens, robots, verificação do Google)
next.config.ts, next-env.d.ts      ← novos
index.html, src/main.jsx, vite.config.js ← apagados
```

## Passos
1. Instalar dependências (next, react 19, tipos 19) e remover vite/plugin-react. **Precisa da sua aprovação.**
2. `next.config.ts` + `tsconfig.json` (plugin do Next, alias `@/` mantido, tira `vite/client`).
3. Layout: metadados do `index.html` viram `metadata` do Next (título, descrição, Open Graph, Twitter, canonical, theme-color, favicon). Fontes Instrument Sans e JetBrains Mono via `next/font/google` (baixadas no build e servidas pelo próprio site).
4. Idiomas como rotas: `/` inglês e `/pt` português, cada uma com seu `<html lang>`, título e descrição, e `hreflang` entre elas. O seletor EN/PT passa a navegar entre as rotas.
5. Componentes ganham `"use client"`; código que lê `window`/`document` continua dentro de `useEffect` (já está assim).
6. Scripts: `dev` → `next dev`, `build` → `next build`, `preview` → `next start` (mesmas portas 5173/4173). Atualizar `.claude/launch.json`, `dev.cmd`, README e `HISTORICO-DO-PROJETO.md`.
7. Verificação: `pnpm typecheck` e `pnpm build` sem erro; console limpo; screenshots antes × depois em 390×844, 768×1024 e 1440×900 (EN e PT) e com reduced-motion; `design-quality-gate`.

## Riscos e o que fica para você
- **Vercel:** se o projeto lá estiver com preset "Vite" (saída `dist`), na hora do merge na `main` será preciso trocar para "Next.js" no painel. Não mexo em hospedagem.
- **Idioma salvo:** quem visitou antes com PT salvo no navegador cai em `/`. Posso redirecionar para `/pt` na primeira visita se houver PT salvo (opcional).
- Nada é commitado sem pedido.
