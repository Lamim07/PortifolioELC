"use client";

import { createContext, useContext } from "react";
import { portfolioContent } from "@/data/portfolio";

export type Language = "pt" | "en";
export type Content = (typeof portfolioContent)["pt"];

type PortfolioState = {
  language: Language;
  setLanguage: (language: Language) => void;
  content: Content;
};

export const PortfolioContext = createContext<PortfolioState | null>(null);

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio precisa estar dentro de PortfolioContext.Provider");
  return context;
}

/** Curva padrão do site: saída rápida, pouso suave. */
export const EASE = [0.22, 1, 0.36, 1] as const;
