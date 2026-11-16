# Portfólio — Luis Eduardo

Next.js 16 (App Router) + React 19 + Tailwind CSS 3 + framer-motion 11, em TypeScript, com pnpm 10.34.0.

## Executar localmente

Use o inicializador abaixo no PowerShell ou dê dois cliques em `dev.cmd`:

```powershell
.\dev.cmd
```

O inicializador usa o Corepack para executar o pnpm 10.34.0, valida as dependências pelo `pnpm-lock.yaml` e inicia o Next.js em http://127.0.0.1:5173. A instalação só roda quando as dependências estiverem ausentes ou quando os arquivos de pacotes mudarem. Não é necessário instalar o pnpm globalmente.

Requisitos: Node.js 22 ou superior, com Corepack.

Outros comandos:

```powershell
corepack.cmd pnpm run dev        # desenvolvimento, http://127.0.0.1:5173
corepack.cmd pnpm run typecheck  # TypeScript
corepack.cmd pnpm run build      # build de produção (.next/)
corepack.cmd pnpm run preview    # serve o build, http://127.0.0.1:4173
```

## Rotas e idiomas

- `/` — inglês · `/pt` — português. As duas páginas são pré-renderizadas no build.
- O seletor EN/PT do cabeçalho navega entre as rotas.
- Cada idioma tem o próprio layout raiz (`src/app/(en)/layout.tsx` e `src/app/(pt)/layout.tsx`) para ter `<html lang>`, título, descrição e `hreflang` corretos. O que é comum fica em `src/app/site.tsx` (metadados, fontes via `next/font`, CSS global).

## Onde está cada coisa

| Caminho | Conteúdo |
|---|---|
| `src/data/portfolio.js` | Todo o conteúdo (PT/EN) e o catálogo de projetos |
| `src/components/site/Portfolio.tsx` | Composição da página (antigo `App.jsx`) |
| `src/components/site/{Header,Hero,Sections,primitives}.tsx` | Seções e peças de animação (componentes cliente) |
| `src/index.css` + `tailwind.config.js` | Tokens de cor (claro/escuro), fontes e botões |
| `public/assets/` | Currículo PDF, imagens e favicon |

## Estrutura compatível com shadcn

`components.json` configura `@/components/ui` como pasta de componentes e `src/index.css` como stylesheet global. O alias `@` aponta para `src` (em `tsconfig.json`, lido pelo Next). Para acrescentar um componente:

```powershell
corepack.cmd pnpm dlx shadcn@latest add button
```
