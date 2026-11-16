"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

// FlowButton: o botão escolhido pelo usuário como padrão em 05/11/2026 (origem 21st.dev, colado por ele).
// Adaptado ao Tailwind 3 e aos tokens da direção "Planta do sistema" (ink, paper, accent), sempre como link.
// No hover/foco: a pílula vira retângulo arredondado, o ícone troca de lado e um círculo enche o botão.
// Com prefers-reduced-motion, as mesmas mudanças acontecem sem animação.

type FlowButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** Ícone mostrado à direita e, no hover, entrando pela esquerda. */
  icon: ReactNode;
  /** Ação principal: já nasce preenchido de tinta e enche de violeta. */
  solid?: boolean;
  size?: "md" | "sm";
  children: ReactNode;
};

const ease = "ease-[cubic-bezier(0.23,1,0.32,1)]";
const spring = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

export function FlowButton({ icon, solid = false, size = "md", className, children, ...props }: FlowButtonProps) {
  return (
    <a
      {...props}
      className={cn(
        "group relative isolate inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full border font-semibold",
        "transition-[border-radius,border-color,color,transform] duration-[600ms] motion-reduce:transition-none",
        ease,
        "hover:rounded-xl focus-visible:rounded-xl active:scale-[0.97]",
        size === "md" ? "min-h-[52px] px-9 text-[15px]" : "min-h-10 px-8 text-sm",
        solid
          ? "border-transparent bg-ink text-paper"
          : "border-ink/40 text-ink hover:border-transparent hover:text-paper focus-visible:border-transparent focus-visible:text-paper",
        className,
      )}
    >
      {/* Ícone que entra pela esquerda */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -left-1/4 z-10 inline-flex transition-all duration-[800ms] group-hover:left-4 group-focus-visible:left-4 motion-reduce:transition-none",
          spring,
        )}
      >
        {icon}
      </span>

      {/* Texto */}
      <span className="relative z-10 inline-flex -translate-x-3 items-center gap-2 transition-transform duration-[800ms] ease-out group-hover:translate-x-3 group-focus-visible:translate-x-3 motion-reduce:transition-none">
        {children}
      </span>

      {/* Círculo que enche o botão */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 top-1/2 -z-0 aspect-square w-4 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
          "group-hover:w-[160%] group-hover:opacity-100 group-focus-visible:w-[160%] group-focus-visible:opacity-100 motion-reduce:transition-none",
          solid ? "bg-accent" : "bg-ink",
        )}
      />

      {/* Ícone que sai pela direita */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-4 z-10 inline-flex transition-all duration-[800ms] group-hover:-right-1/4 group-focus-visible:-right-1/4 motion-reduce:transition-none",
          spring,
        )}
      >
        {icon}
      </span>
    </a>
  );
}
