# 01 · Auditoria "antes" — portfólio atual

Data: 2026-11-15 · Build de produção servido em `http://127.0.0.1:4391` (a porta 4173 estava ocupada por outro projeto).
Evidências em `tmp/before/` (ignorado pelo git): `390-*.png`, `768-*.png`, `1440-*.png`, `report.html` (Lighthouse).

## Métricas
| Item | Valor | Fonte |
|---|---|---|
| `pnpm build` | OK, 6,85 s | saída do comando |
| JS | 463 kB (157 kB gzip) | vite build |
| CSS | 53,8 kB (10,5 kB gzip) | vite build |
| Imagens | `hero-architecture.png` 1,6 MB · `office-intro.png` 1,6 MB · `insulfrio-project.jpeg` 235 kB | `ls` |
| LCP mobile (Slow 4G, CPU 4×) | **4 551 ms** (render delay 3 987 ms) | trace Chrome DevTools |
| CLS | 0,00 | trace |
| Lighthouse mobile | A11y 100 · Best Practices 100 · SEO 92 | lighthouse_audit |
| Altura da página | 8 549 px (390) · 7 799 px (768) · 6 968 px (1440) | Playwright |
| Erros de console | 0 nos três viewports | Playwright |

## Achados
### Experiência / narrativa
1. **Intro bloqueante.** A tela "IDE compilando" trava o scroll até o usuário clicar. Recrutador vê um monitor antes de ver nome, cargo ou contato. É o maior custo de LCP (imagem de 1,6 MB + digitação de ~600 caracteres).
2. **Hero com três CTAs** (Explorar, Currículo, Contato) + dock flutuante + botão "Vamos conversar" no header: o mesmo destino aparece 3–4 vezes.
3. **Todas as seções usam o mesmo molde** (eyebrow mono verde + título gigante com gradiente + cards de vidro). Não há ritmo: Sobre, Formação e Contato são a mesma composição 2 colunas.
4. **Experiência:** a timeline com pin ocupa muito scroll para apenas 2 itens; em 1440 há ~800 px de área vazia.
5. **Projetos:** um único card centralizado em grade — o único trabalho real publicado tem o menor destaque visual da página.

### Estética (padrões "IA genérica")
- Preto + verde-menta + ciano + gradiente "steel-sheen", glow, glassmorphism, canvas de partículas, títulos com gradiente, tilt 3D em cards.
- **Barras de porcentagem nas habilidades (88 %, 78 %, 84 %, 91 %)**: autoavaliação sem unidade nem critério; lê como enfeite e convida desconfiança.
- Fonte declarada `Inter` mas **não carregada** (nenhum `@font-face`/link): no Windows cai em fonte do sistema; o visual muda conforme a máquina.

### Performance
- `AmbientCanvas` global roda `requestAnimationFrame` contínuo com comparação O(n²) entre nós, em todas as páginas, inclusive mobile.
- `hero-architecture.png` é pré-carregada mas fica **escondida no mobile** (só aparece como fundo a 30 %).
- Blur (`filter: blur`) em praticamente todas as entradas de seção; caro em GPU móvel.

### Acessibilidade
- Lighthouse: `label-content-name-mismatch` — o seletor de idioma mostra "PT/EN" mas o nome acessível é "Português/English"; a intro inteira é um `role="button"` com conteúdo interno.
- Reduced-motion: tratado na intro, no rotator e na timeline; o canvas apenas para de mover (continua desenhando a cada frame).

### SEO
- `robots.txt` inválido (Lighthouse: 44 erros — o servidor devolve o `index.html` como fallback). `index.html` em `lang="en"` fixo.

## O que preservar
Todo o conteúdo de `src/data/portfolio.js` (PT/EN), o seletor de idioma, o currículo em PDF, o projeto Insulfrio com foto, links de contato, metadados OG/canonical, a foto do projeto e a stack (React 18 + Vite 6 + Tailwind 3 + framer-motion + GSAP).

## Não verificado
- Lighthouse de performance oficial (só trace); dados de campo (CrUX: sem dados).
- Comportamento em Safari/iOS real.
