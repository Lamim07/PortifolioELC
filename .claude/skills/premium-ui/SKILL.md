---
name: premium-ui
description: Padrões de interface premium e não genérica — tipografia, grid, espaçamento, cor, imagem, estados e acessibilidade — para implementar ou definir a direção visual de um site. Use ao definir direção estética ou ao implementar UI aprovada.
---

# premium-ui

Usado por: `design-taste-frontend`, `creative-ui-engineer`.
Complementa (não substitui) os plugins `taste-skill:design-taste-frontend`, `frontend-design:frontend-design` e `impeccable:impeccable`, instalados no escopo do usuário.

## Fundamentos
- **Tipografia**: no máximo 2 famílias; escala modular definida (ex.: 1.25); títulos com tracking ajustado; corpo 16–18 px, 60–75 caracteres por linha.
- **Grid**: container com largura máxima definida; colunas consistentes; margens laterais de 16 px no mobile.
- **Espaçamento**: escala de 4/8 px; ritmo vertical entre seções consistente; uma seção = uma ideia.
- **Cor**: 1 cor de marca + neutros + 1 acento; contraste AA (4,5:1 texto, 3:1 UI) verificado.
- **Imagem**: fotos reais/licenciadas (skill `brand-assets`); tratamento consistente (recorte, cor).
- **Estados**: hover, foco visível (`focus-visible`), ativo, desabilitado, loading, vazio, erro.
- **Momentos de assinatura**: 1–2 por página (hero, transição de seção), não em todo bloco.

## Implementação nesta stack (React + Vite + Tailwind 3 + shadcn)
- Tokens em `tailwind.config.js` (`theme.extend`) — neste repo `cssVariables: false` no `components.json`.
- Componentes shadcn em `src/components/ui`, utilitário `cn` em `src/lib/utils.ts`.
- Ícones: `lucide-react`.

## Checklist rápido antes de pedir revisão
- [ ] Nenhum item do checklist anti-genérico do agente `design-taste-frontend`.
- [ ] Hierarquia legível em 390 px sem zoom.
- [ ] Nenhum texto inventado; placeholders visíveis `[A DEFINIR: ...]`.
- [ ] Teclado: todos os interativos alcançáveis e com foco visível.
