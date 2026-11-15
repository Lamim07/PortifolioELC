# 04 · Direção de arte + storyboard ✋ (aguardando aprovação)

## Conceito recomendado — "Planta do sistema"
Um portfólio de backend que se lê como **documentação de arquitetura bem escrita**: papel claro, tinta escura, linhas finas de desenho técnico, numeração de seções como camadas de uma solução .NET. O "cinema" vem da tipografia grande e de dois momentos coreografados — não de neon, vidro ou partículas.

Por que serve ao Luis: o trabalho dele é invisível ("o backend que ninguém vê"). A página torna esse trabalho visível desenhando a estrutura — camadas, dependências, log de entregas — em vez de decorar com efeitos de "hacker".

### Alternativa B — "Terminal noturno refinado"
Mantém o fundo escuro atual, mas com **um** acento só, tipografia carregada de verdade, sem glow/vidro/partículas. Menos ruptura, menos distinção. Use se quiser preservar a identidade escura.

## Sistema visual (conceito A)
| Elemento | Proposta |
|---|---|
| Fundo | papel `#F1EFE8`; seções de contraste em tinta `#111210` (Experiência e Contato) |
| Texto | tinta `#111210`; secundário `#5E5F58` (contraste ≥ 4,5:1 a verificar) |
| Acento único | violeta `#512BD4` (cor de marca do .NET — **a verificar** na brand guideline oficial antes de usar) em links, foco, marcadores e no diagrama |
| Linhas | `#111210` a 12 % — grid de 12 colunas visível em hairlines |
| Display | sans grotesca (Instrument Sans ou Geist), 600, tracking negativo; H1 até ~160 px no desktop |
| Mono | JetBrains Mono / Geist Mono para metadados (datas, numeração `01 /`, labels) — mínimo 12 px |
| Raio | 0 px (bordas retas de desenho técnico); botões retangulares |
| Imagem | só a foto real do Insulfrio (destaque grande). As duas PNGs geradas (escritório, arquitetura) saem — −3,2 MB |
| Modo escuro | segue `prefers-color-scheme` invertendo papel/tinta |

## Estrutura (nova ordem)
`00 Hero` → `01 Sobre` → `02 Experiência` → `03 Projetos` → `04 Stack` → `05 Formação` → `06 Contato` → Footer.
Projetos sobe para logo após a experiência (é o único trabalho público e merece aparecer antes das listas).

## Decisões que mudam conteúdo — preciso do seu ok
1. **Intro "IDE compilando" sai como tela bloqueante.** O trecho de código C# vira um painel pequeno dentro do hero (já visível, sem clique).
2. **Porcentagens das habilidades (88/78/84/91 %) são removidas**; os grupos e tags ficam iguais.
3. **Dock flutuante e canvas de partículas saem**; contatos ficam no header (1 CTA) e na seção Contato.
4. Os textos de `portfolio.js` são mantidos; só ajusto rótulos de interface (ex.: numeração de seção).

## Storyboard
| Cena | Seção | Mensagem | Movimento (desktop) | Movimento (mobile) | Reduced-motion |
|---|---|---|---|---|---|
| 0 | Hero | Quem é + o que faz | Nome entra em linhas com máscara (stagger 60 ms); diagrama de 3 camadas (Domínio/Aplicação/Dados) se desenha com `pathLength` em 900 ms | Mesmo, diagrama abaixo do nome, menor | Tudo estático, visível de imediato |
| 1 | Sobre | Manifesto: legado → base sustentável | Frase-tese em tipografia grande revela palavra a palavra ligada ao scroll (opacidade 0,2→1) | Revela por bloco, sem scrub | Texto pleno |
| 2 | Experiência | De qualidade a desenvolvimento | **Momento 1:** seção escura com pin; os 2 cargos passam como "commits" num trilho horizontal; datas mono contam | Lista vertical com linha do tempo à esquerda; sem pin | Lista vertical estática |
| 3 | Projetos | Trabalho real em produção | **Momento 2:** foto do Insulfrio abre de recorte estreito para tela cheia (`clip-path`) enquanto a ficha técnica entra ao lado | Foto em 4:5, ficha abaixo; fade simples | Foto já aberta |
| 4 | Stack | O que domino | Índice em 4 colunas; hover sublinha a tag | Acordeão por grupo | Sem transições |
| 5 | Formação | Em evolução | Linhas de tabela com régua que cresce da esquerda (200 ms) | Igual | Estático |
| 6 | Contato | Vamos conversar | E-mail em tipografia gigante; cursor de texto pisca uma vez | E-mail quebra por linha, botões grandes (≥ 48 px) | Sem piscar |

Durações de interface 150–250 ms; entradas 400–900 ms com `cubic-bezier(.22,1,.36,1)`; apenas `transform`, `opacity` e `clip-path`.

## Metas
LCP mobile < 2,5 s (antes 4,55 s) · JS ≤ antes · Lighthouse A11y 100 · zero erros de console · QA 390/768/1440.

## Próximo passo após aprovação
Fase 6 (Figma): frames 390/768/1440 via conector Figma (o plugin `figma` local falhou, o conector claude.ai funciona) **ou** pular para um protótipo codado direto, se preferir validar no navegador.
