---
name: figma-design
description: Fluxo do estúdio para usar o Figma como etapa de validação — criar variáveis e frames em 390/768/1440 a partir da direção estética, ou extrair especificação de um link Figma para código. Use na fase Figma dos workflows.
---

# figma-design

Usado por: `figma-design-engineer`.

## Pré-verificação (obrigatória)
1. Há dois caminhos de Figma nesta máquina (verificado em 2026-11-15):
   - **Conector Figma do claude.ai** — conectado e autenticado (`whoami` respondeu).
   - **Servidor `plugin:figma:figma`**: duplicata do conector que falha ao conectar (`InvalidHTTPResponse`). Pode ser ignorado; use o conector. Ver `docs/tool-inventory.md`.
2. Rodar `whoami` no início. Se falhar: registrar, avisar o usuário e seguir o workflow sem Figma (a fase vira "pulada", não "concluída").

## Skills oficiais obrigatórias (plugin Figma)
| Antes de… | Carregar |
|---|---|
| `use_figma` | `figma:figma-use` |
| `get_design_context` | `figma:figma-design-to-code` |
| criar tela/página no Figma | `figma:figma-generate-design` (+ `figma:figma-use`) |
| `create_new_file` | `figma:figma-create-new-file` |
| criar biblioteca/variáveis | `figma:figma-generate-library` |

## Código → Figma
1. Variáveis: cores, tipografia, espaçamento e raio a partir de `art-direction.md`.
2. Frames por seção em 390, 768 e 1440 px usando as variáveis.
3. Entregar o link ao usuário → **checkpoint de aprovação**.

## Figma → código
1. Usuário fornece o link (file key + node id).
2. Extrair contexto e variáveis; mapear para tokens Tailwind do projeto.
3. Entregar especificação ao `creative-ui-engineer`.

## Regras
- Não alterar permissões, compartilhamento ou times sem pedido.
- Não publicar bibliotecas na organização sem pedido.
