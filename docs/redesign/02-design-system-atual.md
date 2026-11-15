# 02 · Inventário do design system atual

Fonte: `tailwind.config.js`, `src/index.css`, `src/App.jsx`, `src/components/ui/timeline.*`.

## Cores
| Token | Valor | Uso |
|---|---|---|
| `ink` | `#070909` | fundo |
| `graphite` | `#0d1211` | painéis, menu mobile |
| `bone` | `#f4f7f4` | texto |
| `muted` | `#a7b1ae` | texto secundário |
| `mint` | `#42f2a8` | acento principal, eyebrows, foco |
| `aqua` | `#75d8ff` | acento 2 |
| `amber` | `#f3c565` | acento 3 (datas, labels) |
| `line` / `frost` | brancos 12 % / 5,5 % | bordas, vidro |
| `steel-sheen` | gradiente mint→aqua→amber | botão primário, barras, progresso |

Três acentos competindo + gradiente: nenhum é "a" cor da marca.

## Tipografia
- Sans: `Inter` (não carregada) — pesos 700/900 em quase tudo.
- Mono: `SFMono-Regular, Consolas` — eyebrows, labels, código.
- Escala: H1 48→82 px, H2 36→60 px, corpo 16–20 px, labels mono 7–11 px (abaixo do legível em vários pontos da intro).

## Espaçamento e grid
- Container `min(1120px, 100vw-32px)` (hero/header 1240).
- Seções `py-24 sm:py-32`. Raio `rounded-lg` (8 px) em tudo.

## Componentes
| Componente | Onde | Observação |
|---|---|---|
| `IntroExperience` | gate inicial | 260 linhas, imagem 1,6 MB |
| `Header` + menu mobile | topo | nav com `layoutId`, CTA, idioma |
| `LanguageSwitch` | header/intro/menu | manter |
| `RoleRotator` | hero | rotação de cargos |
| `HeroVisual` | hero desktop | imagem + painéis parallax |
| `GlassCard` | todas as seções | tilt 3D + brilho |
| `SectionHeading` / `Reveal` | todas | fade+blur |
| `Timeline` (TSX, GSAP + SplitText) | experiência | adaptado de Hyperiux Vault |
| `ProjectCard` / `ArchitectureSketch` | projetos | |
| `FloatingDock`, `ScrollProgress`, `AmbientCanvas` | global | redundantes/caros |

## Motion
framer-motion para reveals (`fadeUp` com blur 10 px, 0,82 s), springs no nav; GSAP ScrollTrigger + SplitText na timeline; keyframes Tailwind `floaty/scan/shimmer/trace`.
