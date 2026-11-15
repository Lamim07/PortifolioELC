# Portfólio — Luis Eduardo

## Executar localmente

Use o inicializador abaixo no PowerShell ou dê dois cliques em `dev.cmd`:

```powershell
.\dev.cmd
```

O inicializador usa o Corepack para executar o pnpm 10.34.0, valida as dependências pelo `pnpm-lock.yaml` e inicia o Vite. A verificação só executa a instalação quando as dependências estiverem ausentes ou quando os arquivos de pacotes mudarem. Não é necessário instalar o pnpm globalmente.

Requisitos:

- Node.js 22 ou superior, com Corepack

Depois que o `dev.cmd` concluir a primeira instalação, o comando tradicional também fica disponível:

```powershell
corepack.cmd pnpm run dev
```

## Linha do tempo

O componente reutilizável está em `src/components/ui/timeline.tsx`; seus estilos estão em `src/components/ui/timeline.css`. A integração da experiência profissional fica em `src/App.jsx`, usando os dados bilíngues de `src/data/portfolio.js`. `timeline-demo.tsx` contém a demonstração com os dados de exemplo do componente.

Em desktop com espaço suficiente, o scroll vertical move os marcos horizontalmente. Em mobile, telas baixas e com `prefers-reduced-motion`, a trajetória é apresentada na vertical. As responsabilidades completas abrem em um diálogo acessível; `Escape` fecha o diálogo. O trecho horizontal aceita as teclas de seta, `Home` e `End` quando recebe foco.

O projeto mantém React e Vite, com Tailwind 3 já instalado. TypeScript foi adicionado para os novos componentes, sem exigir conversão dos arquivos JavaScript existentes. Para validar e gerar a versão de produção:

```powershell
corepack.cmd pnpm run typecheck
corepack.cmd pnpm run build
```

## Estrutura compatível com shadcn

`components.json` configura `@/components/ui` como pasta de componentes e `src/index.css` como stylesheet global. O alias `@` aponta para `src` no Vite e no TypeScript. Por isso, a pasta convencional `/components/ui` corresponde aqui a `src/components/ui`: manter essa convenção permite usar os imports dos exemplos e adicionar componentes pelo CLI sem caminhos inconsistentes.

A configuração já está pronta. Para acrescentar um componente shadcn posteriormente:

```powershell
corepack.cmd pnpm dlx shadcn@latest add button
```

Não é necessário executar `shadcn init`, reinstalar Tailwind ou migrar a página para outro framework. GSAP, ScrollTrigger e SplitText controlam apenas o novo componente, com animações e texto dividido revertidos quando ele é desmontado ou o idioma muda.
