// Edite este arquivo para atualizar informações pessoais e todo o conteúdo do portfólio.
export const profile = {
  name: "Luis Eduardo Lamim Cardoso",
  initials: "LC",
  location: "Joinville, Santa Catarina",
  currentCompany: "Laboratório CEDAP",
  resumeUrl: "/assets/luis-eduardo-lamim-cardoso-curriculo.pdf",
  email: "luiseduardolamimcardoso@gmail.com",
  phone: "+55 47 99927-0044",
  whatsappUrl: "https://wa.me/5547999270044",
  linkedinUrl: "https://www.linkedin.com/in/luis-eduardo-lamim-cardoso-4a1411314",
  githubUrl: "https://github.com/Lamim07",
};

const portuguese = {
  seo: {
    language: "pt-BR",
    title: "Luis Eduardo Lamim Cardoso | Backend .NET",
    description:
      "Desenvolvedor backend .NET com foco em arquitetura, SQL, modelagem de dados e sistemas corporativos.",
  },
  skipLink: "Ir para o Conteúdo",
  navItems: [
    { href: "#sobre", label: "Sobre" },
    { href: "#experiencia", label: "Experiência" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#formacao", label: "Formação" },
    { href: "#projetos", label: "Projetos" },
    { href: "#contato", label: "Contato" },
  ],
  intro: {
    codeLog: "Inicializando experiência...",
    readyAria: "Iniciar portfólio",
    compilingAria: "DeveloperProfile sendo compilado",
    officeAlt: "Escritório de desenvolvimento com um monitor sobre a mesa",
    solutionExplorer: "Explorador da solução",
    output: "Saída",
    readyOutput: "Build concluído. Experiência pronta.",
    compilingOutput: "Compilando experiência do portfólio...",
    buildComplete: "Build concluído",
    startPortfolio: "Iniciar Portfólio",
    mobileReady: "Iniciar portfólio",
    mobileCompiling: "Compilando...",
    desktopReady: "Clique em qualquer lugar para iniciar",
    desktopCompiling: "Compilando DeveloperProfile...",
  },
  header: {
    navLabel: "Navegação principal",
    homeLabel: "Voltar ao início",
    role: "Backend .NET",
    contactCta: "Vamos conversar",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    sendMessage: "Enviar uma mensagem",
    languageLabel: "Selecionar idioma",
  },
  heroVisual: {
    imageAlt: "Representação abstrata de uma arquitetura de software em camadas",
    statusLabel: "Status do sistema",
    statusValue: "Pronto para evoluir",
    layersLabel: "Camadas de especialidade",
    layers: ["01 / Domínio", "02 / Aplicação", "03 / Dados"],
  },
  hero: {
    role: "Software Developer",
    roles: ["Backend .NET", "Arquitetura de software", "SQL e sistemas corporativos"],
    statement: "Construo o backend que ninguém vê, mas todo produto precisa:",
    statementStrong: " organizado, performático e pronto para evoluir.",
    explore: "Explorar Trajetória",
    resume: "Ver Currículo",
    contact: "Contato",
    stats: [
      { label: "Núcleo técnico", value: ".NET / SQL / arquitetura em camadas", shortValue: ".NET + SQL" },
      { label: "Atuação atual", value: `Software Developer @ ${profile.currentCompany}`, shortValue: "CEDAP" },
      { label: "Em evolução", value: "Engenharia de Software", shortValue: "Software" },
    ],
  },
  about: {
    eyebrow: "Sobre mim",
    title: "Arquitetura, performance e manutenção como prioridade.",
    paragraphs: [
      "Sou desenvolvedor com foco em backend .NET e atuação na evolução de sistemas corporativos. Tenho experiência prática com organização em camadas, separação de responsabilidades, refatoração orientada à arquitetura e integração com bancos relacionais.",
      "Meu trabalho combina visão técnica e cuidado com o produto: busco transformar sistemas legados em bases mais compreensíveis, performáticas e sustentáveis, sem perder a objetividade que o ambiente corporativo exige.",
    ],
    facts: [
      ["Foco", "Backend .NET"],
      ["Base", profile.location],
      ["Atual", profile.currentCompany],
    ],
  },
  experienceHeading: { eyebrow: "Experiência", title: "Trajetória Profissional" },
  experiences: [
    {
      period: "Setembro de 2025 - atual",
      title: "Software Developer",
      company: "Laboratório CEDAP",
      location: "Joinville, SC",
      summary:
        "Desenvolvimento de aplicações desktop com WinForms e backend .NET, atuando na modernização de sistema corporativo interno e na melhoria de fluxos críticos.",
      highlights: [
        "Aplicação de princípios de arquitetura e reorganização de camadas.",
        "Modelagem de regras de negócio com foco em manutenção e clareza.",
        "Otimização de consultas SQL e melhorias de performance.",
        "Refatoração de trechos críticos para reduzir acoplamento.",
        "Integração com banco relacional legado em Microsoft Access.",
        "Documentação técnica e organização estrutural do sistema.",
      ],
    },
    {
      period: "Março de 2025 - agosto de 2025",
      title: "Estágio de Assistente de Laboratório",
      company: "Laboratório CEDAP",
      location: "Joinville, SC",
      summary:
        "Atuação no setor de Gestão da Qualidade, desenvolvendo e apoiando o método de site assessment para acompanhamento da estrutura física do laboratório.",
      highlights: [
        "Organização de relatórios sobre condição e estrutura física.",
        "Colaboração com Gestão da Qualidade e comissão interna de prevenção de acidentes.",
        "Contato direto com processos, indicadores e melhoria de rotinas internas.",
      ],
    },
  ],
  skillsHeading: { eyebrow: "Habilidades", title: "Stack e competências" },
  skillGroups: [
    {
      title: "Backend e arquitetura",
      description: "Construção de aplicações organizadas e rastreáveis, com separação de responsabilidades e manutenção sustentável.",
      skills: [".NET", "C#", ".NET Framework 4.8", "WinForms", "Arquitetura em camadas", "Injeção de dependências", "Factory Pattern", "DTOs", "AutoMapper", "async/await", "LINQ", "Refatoração"],
      metric: 88,
    },
    {
      title: "Frontend moderno",
      description: "Desenvolvimento de interfaces responsivas com componentes reutilizáveis, build moderno e estilização utilitária.",
      skills: ["JavaScript", "React", "Vite", "Tailwind CSS", "HTML", "Design responsivo"],
      metric: 78,
    },
    {
      title: "SQL e modelagem",
      description: "Modelagem de regras e integração com bancos relacionais, incluindo contextos legados.",
      skills: ["SQL", "SQL Server", "ADO.NET", "OLE DB", "Microsoft Access", "Consultas parametrizadas", "Transações", "Modelagem de dados", "Performance"],
      metric: 84,
    },
    {
      title: "Qualidade, desktop e entrega",
      description: "Práticas de qualidade, componentização de interfaces desktop, versionamento e distribuição de aplicações corporativas.",
      skills: ["Git", "ClickOnce", "Crystal Reports", "GDI+", "DataGridView", "ApplicationContext", "Mutex", "Documentação XML", "Guard clauses", "Componentes reutilizáveis", "Organização", "Qualidade", "Colaboração"],
      metric: 91,
    },
  ],
  educationHeading: { eyebrow: "Formação", title: "Aprendizado em evolução constante" },
  education: [
    { period: "Fevereiro de 2025 - julho de 2029", title: "Engenharia de Software", institution: "Universidade da Região de Joinville" },
    { period: "2022 - 2024", title: "Ensino Médio", institution: "Exathum" },
    { period: "Fevereiro de 2018 - novembro de 2022", title: "Graduação na Língua Inglesa", institution: "Rockfeller Joinville America" },
    { period: "Idiomas", title: "Espanhol fluente e inglês intermediário-avançado", institution: "Rotary International e Upper Maddison College" },
  ],
  projectsHeading: {
    eyebrow: "Projetos",
    title: "Trabalhos Selecionados",
    intro: "Projetos reais nos quais transformei necessidades de negócio em experiências digitais funcionais.",
  },
  projectUi: {
    production: "Website em produção",
    comingSoon: "Projeto em breve",
    visit: "Visitar Projeto",
    repository: "Repositório",
  },
  contact: {
    eyebrow: "Contato",
    title: "Vamos conversar sobre tecnologia, backend e evolução de sistemas.",
    labels: { email: "E-mail", linkedin: "LinkedIn", whatsapp: "WhatsApp", github: "GitHub" },
  },
  footer: { backToTop: "Voltar ao Topo" },
  dock: { resume: "Currículo", email: "E-mail", linkedin: "LinkedIn", whatsapp: "WhatsApp" },
};

const english = {
  seo: {
    language: "en",
    title: "Luis Eduardo Lamim Cardoso | .NET Backend Developer",
    description:
      ".NET backend developer focused on architecture, SQL, data modeling, and corporate systems.",
  },
  skipLink: "Skip to content",
  navItems: [
    { href: "#sobre", label: "About" },
    { href: "#experiencia", label: "Experience" },
    { href: "#habilidades", label: "Skills" },
    { href: "#formacao", label: "Education" },
    { href: "#projetos", label: "Projects" },
    { href: "#contato", label: "Contact" },
  ],
  intro: {
    codeLog: "Initializing experience...",
    readyAria: "Start portfolio",
    compilingAria: "DeveloperProfile is compiling",
    officeAlt: "Development office with a monitor on the desk",
    solutionExplorer: "Solution Explorer",
    output: "Output",
    readyOutput: "Build completed. Experience ready.",
    compilingOutput: "Compiling portfolio experience...",
    buildComplete: "Build completed",
    startPortfolio: "Start Portfolio",
    mobileReady: "Start Portfolio",
    mobileCompiling: "Compiling...",
    desktopReady: "Click anywhere to start",
    desktopCompiling: "Compiling DeveloperProfile...",
  },
  header: {
    navLabel: "Main navigation",
    homeLabel: "Back to the beginning",
    role: ".NET Backend",
    contactCta: "Let's talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    sendMessage: "Send a message",
    languageLabel: "Select language",
  },
  heroVisual: {
    imageAlt: "Abstract representation of a layered software architecture",
    statusLabel: "System status",
    statusValue: "Ready to evolve",
    layersLabel: "Areas of expertise",
    layers: ["01 / Domain", "02 / Application", "03 / Data"],
  },
  hero: {
    role: "Software Developer",
    roles: [".NET Backend", "Software architecture", "SQL & corporate systems"],
    statement: "I build the backend no one sees, but every product needs:",
    statementStrong: " structured, performant, and ready to evolve.",
    explore: "Explore my journey",
    resume: "Download My CV",
    contact: "Contact",
    stats: [
      { label: "Technical core", value: ".NET / SQL / layered architecture", shortValue: ".NET + SQL" },
      { label: "Current role", value: `Software Developer @ ${profile.currentCompany}`, shortValue: "CEDAP" },
      { label: "In progress", value: "Software Engineering", shortValue: "Software" },
    ],
  },
  about: {
    eyebrow: "About me",
    title: "Architecture, performance, and maintainability as priorities.",
    paragraphs: [
      "I am a developer focused on .NET backend engineering and the evolution of corporate systems. My hands-on experience includes layered organization, separation of responsibilities, architecture-oriented refactoring, and relational database integration.",
      "My work combines technical judgment with product awareness: I aim to turn legacy systems into more understandable, performant, and sustainable foundations without losing the objectivity required in corporate environments.",
    ],
    facts: [
      ["Focus", ".NET Backend"],
      ["Based in", profile.location],
      ["Current", profile.currentCompany],
    ],
  },
  experienceHeading: { eyebrow: "Experience", title: "Professional journey" },
  experiences: [
    {
      period: "September 2025 - Present",
      title: "Software Developer",
      company: "Laboratório CEDAP",
      location: "Joinville, Brazil",
      summary:
        "Development of desktop applications with WinForms and .NET backend technologies, contributing to the modernization of an internal corporate system and improvements to critical workflows.",
      highlights: [
        "Application of architectural principles and layer reorganization.",
        "Business rule modeling focused on clarity and maintainability.",
        "SQL query optimization and performance improvements.",
        "Refactoring of critical areas to reduce coupling.",
        "Integration with a legacy Microsoft Access relational database.",
        "Technical documentation and structural organization of the system.",
      ],
    },
    {
      period: "March 2025 - August 2025",
      title: "Laboratory Assistant Intern",
      company: "Laboratório CEDAP",
      location: "Joinville, Brazil",
      summary:
        "Worked with the Quality Management team, developing and supporting a site assessment method used to monitor the laboratory's physical infrastructure.",
      highlights: [
        "Organized reports on physical conditions and infrastructure.",
        "Collaborated with Quality Management and the internal accident prevention committee.",
        "Worked directly with processes, indicators, and improvements to internal routines.",
      ],
    },
  ],
  skillsHeading: { eyebrow: "Skills", title: "Technology stack and capabilities" },
  skillGroups: [
    {
      title: "Backend and Architecture",
      description: "Building organized and traceable applications with clear responsibilities and sustainable maintenance.",
      skills: [".NET", "C#", ".NET Framework 4.8", "WinForms", "Layered architecture", "Dependency Injection", "Factory Pattern", "DTOs", "AutoMapper", "async/await", "LINQ", "Refactoring"],
      metric: 88,
    },
    {
      title: "Modern frontend",
      description: "Developing responsive interfaces with reusable components, modern build tooling, and utility-first styling.",
      skills: ["JavaScript", "React", "Vite", "Tailwind CSS", "HTML", "Responsive Design"],
      metric: 78,
    },
    {
      title: "SQL and modeling",
      description: "Modeling business rules and integrating relational databases, including legacy environments.",
      skills: ["SQL", "SQL Server", "ADO.NET", "OLE DB", "Microsoft Access", "Parameterized queries", "Transactions", "Data modeling", "Performance"],
      metric: 84,
    },
    {
      title: "Quality, desktop and delivery",
      description: "Quality practices, desktop UI componentization, version control, and corporate application delivery.",
      skills: ["Git", "ClickOnce", "Crystal Reports", "GDI+", "DataGridView", "ApplicationContext", "Mutex", "XML documentation", "Guard clauses", "Reusable components", "Organization", "Quality", "Collaboration"],
      metric: 91,
    },
  ],
  educationHeading: { eyebrow: "Education", title: "Continuous learning and growth" },
  education: [
    { period: "February 2025 - July 2029", title: "Software Engineering", institution: "Universidade da Região de Joinville" },
    { period: "2022 - 2024", title: "High School", institution: "Exathum" },
    { period: "February 2018 - November 2022", title: "English Language Program", institution: "Rockfeller Joinville America" },
    { period: "Languages", title: "Fluent Spanish and upper-intermediate English", institution: "Rotary International (Coahuila de Zaragoza, Mexico) and Upper Maddison College (Toronto, Canada)" },
  ],
  projectsHeading: {
    eyebrow: "Projects",
    title: "Selected work",
    intro: "Real projects where I turned business needs into functional digital experiences.",
  },
  projectUi: {
    production: "Live Website",
    comingSoon: "Coming Soon",
    visit: "Visit project",
    repository: "Repository",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about technology, backend engineering, and system evolution.",
    labels: { email: "Email", linkedin: "LinkedIn", whatsapp: "WhatsApp", github: "GitHub" },
  },
  footer: { backToTop: "Back to top" },
  dock: { resume: "Resume", email: "Email", linkedin: "LinkedIn", whatsapp: "WhatsApp" },
};

export const portfolioContent = { pt: portuguese, en: english };

// Para adicionar um projeto, inclua outro objeto com esta mesma estrutura. A grade e os cards se ajustam automaticamente.
export const projectCatalog = [
  {
    title: "Insulfrio Refrigeração",
    description: {
      pt: "Site institucional desenvolvido para apresentar as soluções de refrigeração industrial e comercial da Insulfrio, com experiência responsiva e contato comercial direto.",
      en: "Corporate website developed to showcase Insulfrio's industrial and commercial refrigeration solutions, with a responsive experience and direct sales contact.",
    },
    stack: {
      pt: ["React", "Vite", "Design Responsivo", "SEO"],
      en: ["React", "Vite", "Responsive Design", "SEO"],
    },
    status: { pt: "Projeto Publicado", en: "Published Project" },
    accent: "aqua",
    imageUrl: "/assets/insulfrio-project.jpeg",
    imageAlt: {
      pt: "Fachada da Insulfrio Refrigeração em Joinville",
      en: "Insulfrio Refrigeração building in Joinville, Brazil",
    },
    liveUrl: "https://insulfrio.com.br/",
    repoUrl: "https://github.com/Lamim07/LandingPageInsulfrio",
  },
];

export function getProjects(language) {
  return projectCatalog.map((project) => ({
    ...project,
    description: project.description[language],
    stack: project.stack[language],
    status: project.status[language],
    imageAlt: project.imageAlt[language],
  }));
}
