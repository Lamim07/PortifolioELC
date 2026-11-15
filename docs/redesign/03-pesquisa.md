# 03 · Pesquisa de referências e componentes

## Situação das ferramentas
- **21st MCP: falhou ao conectar** nesta sessão (e `API_KEY_21ST` segue pendente). A busca em 21st.dev não foi feita.
- Por isso, e para não adicionar dependências, a recomendação é **construir as seções sob medida** com o que já está instalado (framer-motion 11, GSAP 3.13 com ScrollTrigger/SplitText, lucide-react). Nenhuma biblioteca de componentes nova.

## Decisão por seção
| Seção | Abordagem | Base existente | Nova dependência? |
|---|---|---|---|
| Hero | Tipografia + diagrama SVG de camadas desenhado no load | framer-motion | Não |
| Sobre | Bloco editorial com citação grande | — | Não |
| Experiência | "Log de commits" com pin horizontal no desktop, lista no mobile | GSAP ScrollTrigger (já usado na `Timeline`) | Não |
| Stack | Índice tipográfico em 4 colunas (sem porcentagens) | — | Não |
| Formação | Tabela/lista com datas alinhadas | — | Não |
| Projetos | Case grande em tela cheia com foto e ficha técnica | framer-motion | Não |
| Contato | E-mail em tipografia gigante + lista de canais | — | Não |

## Fontes (licença a registrar via `brand-assets`)
Candidatas OFL (Google Fonts), self-hosted em `public/fonts/` como `.woff2`, sem pacote npm:
- **Display/texto:** "Instrument Sans" ou "Geist" — a verificar disponibilidade/licença no dia.
- **Mono:** "JetBrains Mono" (OFL) ou "Geist Mono".
Status: **a verificar** (não baixado ainda).

## Não verificado
- Links de componentes de terceiros (Aceternity, Magic UI etc.): não pesquisados porque nenhum será usado nesta proposta.
