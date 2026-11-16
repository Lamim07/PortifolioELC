"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { portfolioContent } from "@/data/portfolio";
import { PortfolioContext, type Language } from "@/lib/portfolio-context";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About, Contact, Education, Experience, Footer, Projects, Skills, StackMarquee } from "@/components/site/Sections";

// Cada idioma tem a própria rota: "/" em inglês e "/pt" em português. O seletor EN/PT navega entre elas.
export function Portfolio({ language }: { language: Language }) {
  const router = useRouter();
  const content = portfolioContent[language];

  const value = useMemo(
    () => ({
      language,
      content,
      setLanguage: (next: Language) => {
        if (next !== language) router.push(next === "pt" ? "/pt" : "/");
      },
    }),
    [language, content, router],
  );

  return (
    <PortfolioContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          {content.skipLink}
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <StackMarquee />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </PortfolioContext.Provider>
  );
}
