# Pesquisa · Botões (workflow modify-website, tipo B)

Data: 16/11/2026 · Branch `redesign/planta-do-sistema` · Nada foi instalado nesta fase.

## Situação atual
- Classe `.btn` em `src/index.css`: retângulo com cantos retos (`border-radius: 0`), borda de 1 px, preenchimento violeta que varre da esquerda no hover. Variações: `.btn-solid` e `.btn-sm`. Os botões ficam dentro de `<Magnetic>`, que os faz seguir o cursor.
- Há 7 botões `.btn` na página:
  - Header: "Vamos conversar".
  - Hero: "Explorar Trajetória" e "Ver Currículo".
  - Projetos: "Visitar Projeto" e "Repositório" em cada projeto.
- Outros controles também têm cantos retos, mas não são `.btn`:
  - seletor PT/EN;
  - botão MENU no celular;
  - botão "copiar e-mail" no Contato.
- Screenshots "antes": `tmp/btn-antes-{hero,proj}-{390,768,1440}.png`.

## Arquivos no escopo
- `src/index.css` (`.btn`).
- `src/components/site/Header.tsx`, `Hero.tsx` e `Sections.tsx` (só se o componente for trocado).
- Novo `src/components/ui/<botao>.tsx`, se for escolhido um componente.

## Candidatos
Pesos 25/25/15/15/10/10, notas de 0 a 10.

| Alternativa | Link (verificado em 2026-11-16) | Licença | Deps | Estética | Técnica | Stack | Perf | Licença | Esforço | Total |
|---|---|---|---|---|---|---|---|---|---|---|
| **A. `.btn` atual arredondado** (pílula, mantém a varredura violeta) | — (código do próprio repo) | do projeto | nenhuma | 9 | 9 | 10 | 10 | 10 | 10 | **95** |
| **B. FlowButton** (o botão que você escolheu como padrão em 05/11; código recuperado do `stash@{0}`) | origem 21st.dev, colado por você; autor e licença **a verificar** | a verificar | lucide-react (já instalado) | 8 | 8 | 8 | 10 | 6 | 7 | **80** |
| **C. Magic UI · Interactive Hover Button** | https://magicui.design/docs/components/interactive-hover-button | MIT (github.com/magicuidesign/magicui) | lucide-react (já instalado) | 7 | 6 | 8 | 10 | 10 | 7 | **76,5** |

### Detalhes de cada candidato
- **A. `.btn` arredondado:** só CSS (`rounded-full` e a varredura recortada pela borda arredondada). Mantém a identidade "Planta do sistema", o efeito magnético e o violeta. É o menor risco.
- **B. FlowButton:** pílula que vira retângulo arredondado no hover, com setas que trocam de lado e um círculo que enche o botão.
  - Adaptações necessárias:
    - o código usa variáveis do Tailwind v4 (`--color-white`, `bg-blue`), que precisam ser trocadas pelos tokens `ink`, `paper` e `accent`;
    - falta suporte a reduced-motion.
  - Já aceita `href`, ou seja, funciona como link.
- **C. Interactive Hover Button:** um ponto que cresce até preencher o botão, enquanto o texto sai e volta com uma seta.
  - Adaptações necessárias:
    - o texto aparece duplicado no HTML, então o leitor de tela lê duas vezes; é preciso `aria-hidden` na cópia;
    - só funciona como `<button>`, mas todos os nossos são links;
    - não tem variante sólida.

### Descartados
- **Aceternity · Hover Border Gradient** (https://ui.aceternity.com/components/hover-border-gradient): a borda em gradiente arco-íris briga com a regra de um único acento violeta, e a licença aparece atrelada a um plano pago.
- **shadcn/ui Button** (https://ui.shadcn.com/docs/components/button): a documentação atual cobre só o Tailwind v4 (este repo usa v3) e não traz efeito próprio; seria o mesmo que a alternativa A, com mais dependências.

## Revisão estética
- A página é editorial, com cards e linhas retas. Botões em pílula criam um contraste bom: deixam claro o que é clicável sem mudar a identidade.
- Para ficar coerente, os outros controles retos (PT/EN, MENU, copiar) devem seguir o mesmo raio.
- **Recomendação:** **A** (pílula com a varredura violeta atual). Se quiser um efeito novo, use **B** (FlowButton), adaptado aos tokens e com reduced-motion.

## Decisão (16/11/2026)
Você escolheu a **B · FlowButton**, com todos os controles arredondados. Implementado em `src/components/ui/flow-button.tsx` e aplicado aos 7 botões de ação. O seletor PT/EN, o botão MENU e o botão "copiar e-mail" ficaram em pílula. Screenshots "depois": `tmp/btn-depois-*.png` e `tmp/btn-hover-*.png`.
