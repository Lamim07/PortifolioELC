import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import { portfolioContent } from "./data/portfolio";
import { PortfolioContext } from "@/lib/portfolio-context";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About, Contact, Education, Experience, Footer, Projects, Skills, StackMarquee } from "@/components/site/Sections";

function readLanguage() {
  try {
    return window.localStorage.getItem("portfolio-language-v2") === "pt" ? "pt" : "en";
  } catch {
    return "en";
  }
}

function App() {
  const [language, setLanguage] = useState(readLanguage);
  const content = portfolioContent[language];

  useEffect(() => {
    try {
      window.localStorage.setItem("portfolio-language-v2", language);
    } catch {
      /* armazenamento indisponível: idioma vale só nesta visita */
    }
    document.documentElement.lang = content.seo.language;
    document.title = content.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.seo.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", content.seo.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", content.seo.description);
  }, [content, language]);

  const value = useMemo(() => ({ language, setLanguage, content }), [language, content]);

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

export default App;
