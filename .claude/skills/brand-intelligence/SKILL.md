---
name: brand-intelligence
description: Pesquisa verificável de marca, público, tom de voz e concorrência para um site, com URL, data e grau de confiabilidade em cada fato. Use quando houver um negócio/cliente real por trás da página e antes de definir copy ou direção estética.
---

# brand-intelligence

Usado por: `brand-intelligence`.

## Fontes, em ordem de preferência
1. Material entregue pelo usuário (arquivos locais, respostas no chat).
2. Site oficial, perfis oficiais do negócio, Google Business Profile.
3. Imprensa, diretórios setoriais, registros públicos.
4. Concorrentes (somente para referência de mercado, nunca para copiar).

## Grau de confiabilidade
| Nível | Critério |
|---|---|
| Alta | Fonte oficial do próprio negócio ou informação dada pelo usuário |
| Média | Imprensa ou diretório reconhecido, informação recente (≤ 2 anos) |
| Baixa | Terceiros, agregadores, inferência, informação antiga |

## Saída: `research/<slug>/brand-brief.md`
```markdown
# Brand brief — <negócio>  (pesquisado em AAAA-MM-DD)
## Fatos
| Fato | Fonte (URL) | Acessado em | Confiabilidade |
## Posicionamento e público (síntese, citando os fatos acima)
## Tom de voz (3 adjetivos + exemplos do próprio material)
## Identidade visual existente (cores em hex, fontes, logo)
## Concorrentes/referências
| Nome | URL | O que fazem bem | O que evitar |
## Lacunas (pedir ao usuário)
```

## Regras
- Nunca inventar: depoimentos, números, clientes, prêmios, preços, endereços, horários.
- Fato sem fonte vai para "Lacunas".
- Não coletar dados pessoais de terceiros; não contornar login, paywall ou CAPTCHA.
- Criar `research/` só quando houver conteúdo real.
