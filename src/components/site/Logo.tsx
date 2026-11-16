import { cn } from "@/lib/utils";

// Monograma "LC em camadas": L e C desenhados como blocos de planta numa grade de 32,
// fechados pelo ponto violeta — o mesmo ponto que termina "Lamim Cardoso." no hero.
// As letras usam currentColor; o ponto usa o acento e vira papel quando o link recebe hover.
export const LOGO_LETTERS = "M6 7h4v14h5v4H6z M17 7h7v4h-3v10h3v4h-7z";
export const LOGO_DOT = { x: 26, y: 22, size: 3 };

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("block", className)} aria-hidden="true" focusable="false">
      <path d={LOGO_LETTERS} fill="currentColor" />
      <rect x={LOGO_DOT.x} y={LOGO_DOT.y} width={LOGO_DOT.size} height={LOGO_DOT.size} className="fill-accent transition-colors duration-300 group-hover:fill-paper" />
    </svg>
  );
}
