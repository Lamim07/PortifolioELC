---
name: visual-qa
description: Roteiro de QA visual e funcional em ambiente local nos viewports 390×844, 768×1024 e 1440×900, com Playwright ou Chrome DevTools MCP, gerando screenshots e relatório com evidências. Use após qualquer implementação e para comparar antes/depois.
---

# visual-qa

Usado por: `qa-engineer`.

## Viewports
| Nome | Tamanho |
|---|---|
| mobile | 390×844 |
| tablet | 768×1024 |
| desktop | 1440×900 |

## Ferramenta
- **Chrome DevTools MCP** (`chrome-devtools`, configurado em `.mcp.json`) — disponível hoje: `new_page`, `resize_page`, `take_screenshot`, `take_snapshot`, `list_console_messages`, `list_network_requests`, `emulate`.
- **Playwright** — instalado neste repo (`@playwright/test` 1.65.1 + Chromium, verificado em 2026-11-15). Rodar scripts com `node tmp/qa/<script>.mjs` ou testes com `pnpm exec playwright test <arquivo>`. Exemplo:

```ts
// tmp/qa/shots.spec.ts (não versionado)
import { test } from '@playwright/test';
const sizes = [[390, 844], [768, 1024], [1440, 900]] as const;
for (const [w, h] of sizes) {
  test(`shot ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('http://127.0.0.1:5173/');
    await page.screenshot({ path: `tmp/qa/${w}x${h}.png`, fullPage: true });
  });
}
```

## Roteiro
1. Subir o app local (`pnpm dev` → `http://127.0.0.1:5173`; para performance usar `pnpm build && pnpm preview` → porta 4173).
2. Para cada viewport: screenshot full-page em `tmp/qa/<data>-<slug>/<viewport>.png` (pasta ignorada pelo git).
3. Verificar: overflow horizontal (`document.documentElement.scrollWidth > innerWidth`), console, rede, links e âncoras, foco por teclado, menus, formulários (sem envio externo), imagens com `alt`.
4. Reduced motion: repetir o mobile com `prefers-reduced-motion: reduce`.
5. Antes/depois (modify-website): mesmos viewports, mesmas rotas, lado a lado no relatório.

## Relatório
`docs/qa/AAAA-MM-DD-<slug>.md` — tabela viewport × verificação × resultado (OK/Falha) × evidência (caminho/saída).
