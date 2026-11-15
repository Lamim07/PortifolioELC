---
name: motion-design
description: Regras do estúdio para animação web — Motion (motion.dev) primeiro, GSAP só quando justificado, sempre com prefers-reduced-motion. Use ao adicionar, revisar ou remover animações e microinterações.
---

# motion-design

Usado por: `motion-designer`. Skills externas de apoio (instaladas no projeto, de `emilkowalski/skills`): `animate`, `choreograph`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `remove-animations`, `animation-performance`, `animation-vocabulary`, `emil-design-eng`.

## Escolha da ferramenta
1. **CSS** (transition/keyframes) — hover, foco, entradas simples.
2. **Motion** (https://motion.dev) — padrão para React: entradas, `AnimatePresence`, layout, gestos, scroll simples. Neste repo já existe `framer-motion@^11` (o pacote antigo do Motion); em projeto novo usar o pacote `motion`. Não adicionar os dois no mesmo projeto.
3. **GSAP** (https://gsap.com) — só para timelines longas, scroll storytelling com pin/scrub ou SVG complexo. Neste repo já existe `gsap@3.13.0`. Registrar o motivo da escolha.

## Regras
- Animar `transform` e `opacity`; evitar `width/height/top/left`.
- Durações: microinteração 120–200 ms; entrada de elemento 200–400 ms; transição de seção até ~700 ms.
- Easing com intenção (saída `ease-out`, nada de `linear` em UI).
- Nada de animar texto funcional, inputs ou ações de teclado frequentes.
- Coreografia: um foco por vez; stagger curto (30–60 ms).

## Reduced motion (obrigatório)
- CSS: `@media (prefers-reduced-motion: reduce) { ... }` reduzindo para fade simples ou nenhuma animação.
- Motion: `useReducedMotion()` ou `<MotionConfig reducedMotion="user">`.
- GSAP: `gsap.matchMedia()` com `(prefers-reduced-motion: reduce)`.
- Verificar com emulação (Chrome DevTools MCP `emulate` ou Playwright `reducedMotion: 'reduce'`).

## Entrega
Tabela: elemento | gatilho | propriedade | duração/easing | ferramenta | comportamento em reduced-motion.
