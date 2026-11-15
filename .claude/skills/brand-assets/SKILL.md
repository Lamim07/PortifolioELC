---
name: brand-assets
description: Inventaria, obtém e prepara imagens, logos, ícones e fontes de um site somente com licença verificada, registrando origem e licença de cada arquivo. Use sempre que uma página precisar de fotos, logos, ilustrações ou fontes.
---

# brand-assets

Usado por: `brand-intelligence`, `creative-ui-engineer`.

## Licenças aceitas
| Origem | Condição |
|---|---|
| Ativo do próprio cliente/usuário | Autorização do usuário registrada |
| Unsplash / Pexels | Licença da plataforma; registrar autor e URL da foto |
| CC0 / domínio público | Registrar URL |
| Lucide (ícones) | ISC — já é dependência deste repo (`lucide-react`) |
| Google Fonts | Licença por família (geralmente OFL); registrar |
| Comprado | Registrar recibo/licença fornecida pelo usuário |

Proibido: imagens de busca do Google sem licença, logos de terceiros como "clientes" sem autorização, fotos de pessoas reais em depoimentos inventados.

## Inventário: `research/<slug>/assets.md`
| Arquivo local | Origem (URL) | Autor | Licença | Uso permitido | Baixado em |

## Preparação
- Formatos: AVIF/WebP com fallback quando necessário; SVG para logos e ícones.
- Dimensões: no máximo 2× o tamanho exibido; informar `width`/`height` para evitar CLS.
- `alt` descritivo (decorativa → `alt=""`).
- Guardar em `public/` ou `src/assets/` conforme a convenção do projeto.

## Conclusão
- 100% dos arquivos usados constam no inventário com licença.
