import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { portfolioContent } from "@/data/portfolio";
import type { Language } from "@/lib/portfolio-context";
import "@/index.css";

// Fontes baixadas no build e servidas pelo próprio site (sem pedir nada ao Google em tempo de execução).
const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const SITE = "https://luiseduardolamim.com.br";
const IMAGE = `${SITE}/assets/hero-architecture.png`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1EFE8" },
    { media: "(prefers-color-scheme: dark)", color: "#111210" },
  ],
};

export function buildMetadata(language: Language): Metadata {
  const { seo } = portfolioContent[language];
  const path = language === "pt" ? "/pt" : "/";
  return {
    metadataBase: new URL(SITE),
    title: seo.title,
    description: seo.description,
    authors: [{ name: "Luis Eduardo Lamim Cardoso" }],
    icons: { icon: { url: "/assets/favicon.svg", type: "image/svg+xml" } },
    alternates: { canonical: path, languages: { en: "/", "pt-BR": "/pt", "x-default": "/" } },
    openGraph: {
      type: "website",
      url: path,
      siteName: "Luis Eduardo Lamim Cardoso",
      title: seo.title,
      description: seo.description,
      locale: language === "pt" ? "pt_BR" : "en_US",
      images: [IMAGE],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [IMAGE] },
  };
}

export function SiteHtml({ language, children }: { language: Language; children: React.ReactNode }) {
  return (
    <html lang={portfolioContent[language].seo.language} className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
