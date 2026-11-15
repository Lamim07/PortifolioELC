# Inventário de ferramentas

Status: **Disponível** (instalado ou acessível, sem configuração do estúdio) · **Configurada** (configurada, não exercitada) · **Testada** (operação real executada com sucesso) · **Pendente** (falta ação do usuário ou decisão) · **Indisponível** (falhou ou não existe).

Data de verificação de todas as linhas: **2026-11-15**, salvo indicação.

## Ambiente
| Item | Valor verificado |
|---|---|
| SO | Windows 11 Pro |
| Node | v22.23.5 |
| npx | 10.9.9 |
| pnpm | **10.34.0**, no PATH via shim do corepack em `%APPDATA%\npm` (pasta de usuário que já estava no PATH). Instalado com `corepack enable pnpm --install-directory "%APPDATA%\npm"`, porque `corepack enable` padrão falha com EPERM em `C:\Program Files\nodejs`. Os shims `.ps1` foram removidos porque a política de execução do PowerShell bloqueia scripts; o PowerShell usa o `pnpm.CMD`. Verificado no Git Bash, no cmd, no Windows PowerShell 5 e no pwsh 7 |
| Chrome | `C:\Program Files\Google\Chrome\Application\chrome.exe` presente |
| Claude Code CLI (`claude`) | não está no PATH do shell; a sessão roda no app desktop |

## MCPs
| Ferramenta | Origem | Status | Versão | Escopo | Capacidades confirmadas | Agentes | Limitações |
|---|---|---|---|---|---|---|---|
| Chrome DevTools MCP (`chrome-devtools`) | https://github.com/ChromeDevTools/chrome-devtools-mcp (Apache-2.0) | **Testada** (servidor) · aprovado em `.claude/settings.local.json` (`enabledMcpjsonServers`, arquivo não versionado) | 1.13.0 (`chrome-devtools-mcp@latest`) | Projeto (`.mcp.json`) | Handshake MCP; `tools/list` retornou 33 ferramentas (incl. `lighthouse_audit`, `performance_*`, `resize_page`, `emulate`, `take_screenshot`); `new_page` com URL `data:` abriu a página "MCP OK"; `take_snapshot` retornou a árvore com o heading esperado | qa-engineer, performance-engineer, motion-designer | O teste foi um cliente JSON-RPC via stdio (script Node local), **não** pela sessão do Claude Code: o servidor do `.mcp.json` só carrega numa sessão nova, após aprovação. Sem a capacidade MCP *roots*, ferramentas de arquivo ficam restritas ao diretório temporário. A ferramenta de performance envia URLs de trace à CrUX (desligável com `--no-performance-crux`) |
| 21st MCP (antigo "Magic MCP") | https://github.com/21st-dev/magic-mcp (ISC) — o repositório informa que "Magic MCP is now the 21st MCP" | **Pendente** (configurada sem chave) | endpoint HTTP `https://21st.dev/api/mcp`; CLI `@21st-dev/cli` 1.18.0 | Projeto (`.mcp.json`, header `x-api-key: ${API_KEY_21ST}`) | Endpoint existe: `POST initialize` sem chave → HTTP 401 | component-researcher | Exige chave nova em https://21st.dev/mcp (chaves antigas da Magic foram resetadas, segundo o README). A chave deve ficar em variável de ambiente, nunca no repo |
| Figma — conector claude.ai | Conector da conta claude.ai do usuário | **Testada** | — | Conta do usuário (sessão) | `whoami` autenticado; planos "student" (seat Full) e "starter" (seat View), Code Layers habilitado | figma-design-engineer | Os planos retornados são *student/starter*, não "Pro"; confirmar com o usuário se a conta Pro é outra |
| Figma — `plugin:figma:figma` | Servidor HTTP do plugin Figma carregado na sessão (não consta em `~/.claude/plugins/installed_plugins.json`) | **Indisponível** | — | Plugin | — | — | Falha no início da sessão: `InvalidHTTPResponse` ao buscar `https://mcp.figma.com/.well-known/oauth-protected-resource`. Um `curl` posterior ao mesmo URL retornou HTTP 200, o que sugere falha transitória. A reconexão automática foi tentada em 2026-11-15 e falhou de novo com o mesmo erro. **Segundo o usuário, este servidor é uma duplicata do conector Figma do claude.ai, que já funciona.** A falha não tem impacto e não exige ação; o estúdio usa só o conector |

## Skills e plugins
| Ferramenta | Origem / licença | Status | Versão | Escopo | Capacidades | Agentes | Limitações |
|---|---|---|---|---|---|---|---|
| Taste Skill (`taste-skill:design-taste-frontend`) | https://github.com/Leonxlnx/taste-skill (MIT) | **Disponível** | 2.5.1 (commit `f6b7657`) | Usuário (plugin) | Skill listada e carregável na sessão | design-taste-frontend | **Não duplicada** no projeto. As outras skills do autor foram movidas para `Leonxlnx/taste-skill-classics` e `Leonxlnx/imagegen-skills` (não instaladas) |
| Superpowers | marketplace `claude-plugins-official` | **Disponível** | 7.0.2 | Usuário (plugin) | brainstorming, writing-plans, verification-before-completion etc. | project-architect, qa-engineer | Apenas documentado |
| Impeccable | https://github.com/pbakaus/impeccable | **Disponível** | 4.8.0 | Usuário (plugin) | Skill `impeccable:impeccable` e agentes auxiliares | design-taste-frontend | — |
| frontend-design | Plugin da sessão | **Disponível** | — | Usuário | Skill `frontend-design:frontend-design` | design-taste-frontend | Versão não verificada |
| Emil Kowalski skills | https://github.com/emilkowalski/skills (MIT) | **Configurada** (instaladas) | via `skills@1.8.1`, hashes em `skills-lock.json` | Projeto (`.claude/skills/`, modo cópia) | 12 skills: emil-design-eng, animate, choreograph, review-animations, improve-animations, find-animation-opportunities, remove-animations, animation-performance, animation-vocabulary, pick-ui-library, break-ui, learn-taste. Conteúdo revisado: só markdown, sem scripts | motion-designer, creative-ui-engineer, design-taste-frontend, component-researcher | Ficaram de fora por não se aplicarem à stack web: animate-expo, mobile-native, apple-design, gestures, prototype, ask-emil, ask-sonner, write-swift. Comando usado: `npx -y skills@1.8.1 add emilkowalski/skills -a claude-code --copy -y -s <lista>` |
| "Task Skill" | Erro de digitação de "Taste Skill" (o usuário confirmou em 2026-11-15) | **Resolvida** | — | — | Coberta pela linha "Taste Skill" acima | — | Nada a instalar |

## Bibliotecas de projeto
| Ferramenta | Status | Versão no repo | Última no npm (2026-11-15) | Observação |
|---|---|---|---|---|
| framer-motion | Disponível | ^11.15.0 (instalado) | — | Pacote antigo do Motion. Em projeto novo, usar `motion` (14.14.0) |
| gsap | Disponível | 3.13.0 | 3.15.1 | — |
| lucide-react | Disponível | ^0.468.0 | 1.73.0 | Atualizar só com aprovação |
| tailwindcss | Disponível | ^3.4.17 | 4.3.5 | O repo continua no v3; v4 só em projeto novo |
| shadcn/ui | Configurada | `components.json` (new-york, `cssVariables: false`) | — | `src/components/ui`, `src/lib/utils.ts` |
| Playwright (`@playwright/test`) | **Testada** | 1.65.1 (devDependency, versão fixa) + Chromium (`%LOCALAPPDATA%\ms-playwright`) | 1.65.1 | Instalado com aprovação do usuário: `pnpm add -D @playwright/test@1.65.1` e `pnpm exec playwright install chromium`. Smoke test (`tmp/qa/smoke.mjs`, fora do git) contra `pnpm dev`: 390×844, 768×1024 e 1440×900, cada um com e sem `reducedMotion: 'reduce'`. Resultado: título correto, 0 erros de console, sem overflow horizontal e screenshots gerados em `tmp/qa/` |
| next | Indisponível (neste repo) | — | 16.4.6 | Padrão só para projetos novos |
