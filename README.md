# Portfólio — Luis Eduardo

## Executar localmente

Use o inicializador abaixo no PowerShell ou dê dois cliques em `dev.cmd`:

```powershell
.\dev.cmd
```

O inicializador usa o Corepack para executar o pnpm 10.34.0, valida as dependências pelo `pnpm-lock.yaml` e inicia o Vite. A verificação só executa a instalação quando as dependências estiverem ausentes ou quando os arquivos de pacotes mudarem. Não é necessário instalar o pnpm globalmente.

Requisitos:

- Node.js 22 ou superior, com Corepack

Depois que o `dev.cmd` concluir a primeira instalação, o comando tradicional também fica disponível:

```powershell
corepack.cmd pnpm run dev
```
