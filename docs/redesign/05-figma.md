# 05 · Figma — frames para aprovação ✋

Arquivo: https://www.figma.com/design/yPP058oZVgq56DUmZN2WWT (time "Luis Eduardo e Nubia", assento Full)
Página "Redesign — Home":
| Frame | Node | Link |
|---|---|---|
| Home — 1440 | 1:2 | https://www.figma.com/design/yPP058oZVgq56DUmZN2WWT?node-id=1-2 |
| Home — 768 | 2:2 | https://www.figma.com/design/yPP058oZVgq56DUmZN2WWT?node-id=2-2 |
| Home — 390 | 3:2 | https://www.figma.com/design/yPP058oZVgq56DUmZN2WWT?node-id=3-2 |

Variáveis: coleção "Planta / tokens" com modos Claro/Escuro — `cor/papel`, `cor/tinta`, `cor/secundario`, `cor/acento`, espaçamentos de gutter/seção por viewport e `raio/padrao` = 0.

## Como foi feito
- Gerador `docs/redesign/mockup/build-mock.mjs` lê **o conteúdo real** de `src/data/portfolio.js` (PT) e escreve HTML estático por largura em `tmp/mock/`; importado com `html_to_figma` (camadas editáveis, não screenshot).
- Fontes renderizadas no Figma: Instrument Sans (Regular/Medium/SemiBold/Bold) e JetBrains Mono — ambas OFL; licença ainda a registrar via `brand-assets` antes de self-host.
- Ajustes manuais no Figma: e-mail do contato reduzido (72 px desktop / 38 px tablet) para caber numa linha; numeração das camadas do diagrama mobile movida para o lado do título.

## Limitações conhecidas
- Os frames são planos (sem componentes/auto layout ligados às variáveis); servem para validar a direção, não como biblioteca.
- Estados de hover, menu mobile aberto, modo escuro e versão EN não foram desenhados.
- Movimento descrito no storyboard (`04-direcao-de-arte.md`) não está representado no Figma.
- A cor `#512BD4` como cor de marca do .NET segue **a verificar**.
