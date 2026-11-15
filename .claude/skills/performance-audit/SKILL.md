---
name: performance-audit
description: Auditoria de performance local com Lighthouse, traces e análise de bundle/imagens via Chrome DevTools MCP, com metas de Core Web Vitals e plano de correções priorizado. Use no quality gate ou quando o site estiver lento.
---

# performance-audit

Usado por: `performance-engineer`.

## Preparação
1. `pnpm build` → anotar tamanhos dos arquivos em `dist/assets` (saída do Vite).
2. `pnpm preview` → `http://127.0.0.1:4173`.

## Medição (Chrome DevTools MCP)
1. `new_page` no preview; `emulate` para mobile com throttling de CPU/rede quando disponível.
2. `lighthouse_audit` (performance, accessibility, best-practices, seo).
3. `performance_start_trace` com reload → `performance_stop_trace` → `performance_analyze_insight` nos insights de LCP/CLS/render-blocking.
4. `list_network_requests` → maiores recursos, imagens sem dimensão/formato moderno.

Observação: o servidor envia URLs de trace à API CrUX do Google por padrão; para desativar, adicionar `--no-performance-crux` aos args em `.mcp.json` (decisão do usuário).

## Metas (mobile, laboratório)
| Métrica | Meta |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Acessibilidade | ≥ 95 |
| LCP | ≤ 2,5 s |
| CLS | ≤ 0,1 |
| TBT | ≤ 200 ms |
| JS inicial (gzip) | registrar; justificar se > 200 KB |

## Correções típicas (aplicar só com aprovação e no escopo)
- Imagens: AVIF/WebP, `width/height`, `loading="lazy"` abaixo da dobra, `fetchpriority="high"` no LCP.
- Fontes: `font-display: swap`, subset, preload só da principal.
- JS: `React.lazy` para seções pesadas; importar só o necessário do GSAP/Motion.

## Saída
Tabela antes/depois + lista impacto × esforço. Rotular como "laboratório".
