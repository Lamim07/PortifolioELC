const { createHash } = require("node:crypto");
const { existsSync, readFileSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

const projectRoot = join(__dirname, "..");
const nextExecutable = join(
  projectRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "next.cmd" : "next",
);
const signatureFile = join(
  projectRoot,
  "node_modules",
  ".portfolio-dependencies",
);

function dependencySignature() {
  const hash = createHash("sha256");

  for (const filename of [
    "package.json",
    "pnpm-lock.yaml",
    "pnpm-workspace.yaml",
    ".npmrc",
  ]) {
    const filepath = join(projectRoot, filename);
    if (existsSync(filepath)) {
      hash.update(filename);
      hash.update(readFileSync(filepath));
    }
  }

  return hash.digest("hex");
}

if (process.argv[2] === "check") {
  const installedSignature = existsSync(signatureFile)
    ? readFileSync(signatureFile, "utf8").trim()
    : "";

  process.exit(
    existsSync(nextExecutable) && installedSignature === dependencySignature()
      ? 0
      : 1,
  );
}

if (process.argv[2] === "write") {
  if (!existsSync(nextExecutable)) {
    console.error("O Next.js nao foi instalado corretamente.");
    process.exit(1);
  }

  writeFileSync(signatureFile, `${dependencySignature()}\n`, "utf8");
  process.exit(0);
}

console.error("Uso: node scripts/dependency-state.cjs check|write");
process.exit(2);
