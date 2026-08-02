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
      "Portfólio profissional de Luis Eduardo Lamim Cardoso, desenvolvedor backend .NET com foco em arquitetura, SQL, modelagem de dados e sistemas corporativos.",
  },
  skipLink: "Ir para o conteúdo",
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
    statement: "Construo o backend que ninguém vê, mas todo produto precisa:",
    statementStrong: " organizado, performático e pronto para evoluir.",
    explore: "Explorar trajetória",
    resume: "Ver currículo",
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
  experienceHeading: { eyebrow: "Experiência", title: "Trajetória profissional" },
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
      skills: [".NET", "C#", "WinForms", "Arquitetura em camadas", "Refatoração"],
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
      skills: ["SQL", "Modelagem de dados", "Microsoft Access", "Consultas", "Bancos relacionais", "Performance"],
      metric: 84,
    },
    {
      title: "Qualidade profissional",
      description: "Rotina orientada por clareza, documentação, colaboração e melhoria contínua.",
      skills: ["Documentação técnica", "Organização", "Qualidade", "Colaboração", "Análise", "Aprendizado contínuo"],
      metric: 91,
    },
  ],
  cedapHeading: {
    eyebrow: "Caso real · CEDAP HUB FRAMEWORK",
    title: "Engenharia aplicada em um sistema corporativo real",
    practical: "Aplicação prática",
    competenciesTitle: "Principais competências demonstradas",
    competenciesIntro:
      "Esse trabalho demonstra minha capacidade de combinar arquitetura, dados e experiência operacional em uma solução corporativa que evolui de forma contínua.",
    nextSteps: "Próximos passos",
    evolutionTitle: "Evolução técnica",
    evolutionIntro:
      "Estou direcionando as próximas melhorias para ampliar segurança, previsibilidade e capacidade de diagnóstico do sistema.",
  },
  cedapFramework: {
    intro:
      "No CEDAP HUB FRAMEWORK, desenvolvo uma aplicação desktop corporativa em C# e .NET Framework 4.8. Organizei a solução como um monólito modular com 17 projetos, atendendo diferentes domínios de negócio e integrando SQL Server a bases legadas em Microsoft Access.",
    highlights: [
      { value: "17", label: "projetos na solução" },
      { value: "8", label: "domínios de negócio" },
      { value: "2", label: "ecossistemas de dados" },
    ],
    categories: [
      {
        title: "Arquitetura e design",
        description:
          "Estruturei a solução em camadas de apresentação, negócio e dados, com módulos orientados a POP, Macroscopia, Pacientes, Requisições, Colaboradores, Convênios, Ramais e Pessoal. Interfaces, injeção de dependências e factories reduzem o acoplamento; DTOs, AutoMapper e estados explícitos tornam os fluxos mais previsíveis.",
        tags: ["Monólito modular", "POO", "Injeção de dependências", "Factory Pattern", "DTO + AutoMapper", "Estados de negócio"],
      },
      {
        title: "Backend e acesso a dados",
        description:
          "Implementei acesso a SQL Server e Access com ADO.NET e OLE DB por meio de providers abstraídos. Consultas parametrizadas, transações com commit e rollback, tratamento de DBNull e operações assíncronas protegem os dados e mantêm as regras de negócio separadas dos comandos de banco.",
        tags: ["C#", ".NET Framework 4.8", "ADO.NET", "SQL Server", "Access + OLE DB", "async/await", "LINQ"],
      },
      {
        title: "Desktop e experiência",
        description:
          "Construí fluxos operacionais em Windows Forms com uma biblioteca própria de componentes. Controles GDI+, DataGridViews padronizados, double buffering e formulários adaptáveis melhoram consistência e fluidez; navegação desacoplada e ApplicationContext controlam abertura, estado e ciclo de vida das telas.",
        tags: ["Windows Forms", "Componentes reutilizáveis", "GDI+", "DataGridView", "ApplicationContext", "Dashboards e filtros"],
      },
      {
        title: "Implantação e integrações",
        description:
          "Organizei atualização e versionamento com ClickOnce e usei Mutex para garantir uma única instância da aplicação. A solução integra Crystal Reports e opera simultaneamente com SQL Server e sistemas legados em Access, com o histórico de evolução controlado por Git.",
        tags: ["ClickOnce", "Mutex", "Crystal Reports", "SQL + Access", "Git"],
      },
      {
        title: "Qualidade e manutenção",
        description:
          "Apliquei guard clauses, validação de dependências e tratamento explícito de resultados nulos para antecipar falhas. Interfaces, implementations, mappings, factories e services organizam responsabilidades, enquanto documentação XML, nomes de domínio, helpers e recursos centralizados facilitam manutenção e evolução.",
        tags: ["Guard clauses", "ArgumentNullException", "Documentação XML", "Nomes de domínio", "Helpers compartilhados", "Recursos centralizados"],
      },
    ],
    competencies: [
      "Arquitetura e manutenção de sistemas desktop corporativos modulares",
      "Modelagem de domínios complexos e fluxos operacionais",
      "Integração transacional com SQL Server e Access legado",
      "Modernização gradual de WinForms e componentes reutilizáveis",
      "Programação assíncrona, dashboards e relatórios",
      "Evolução de uma solução com 17 projetos conectados",
    ],
    evolution: [
      "Testes automatizados",
      "Pipeline de CI",
      "Logging estruturado e observabilidade",
      "Autenticação e gestão de segredos",
      "Redução de hotspots de manutenção",
    ],
  },
  educationHeading: { eyebrow: "Formação", title: "Aprendizado em evolução constante" },
  education: [
    { period: "Fevereiro de 2025 - julho de 2029", title: "Engenharia de Software", institution: "Universidade da Região de Joinville" },
    { period: "2022 - 2024", title: "Ensino Médio", institution: "Exathum" },
    { period: "Fevereiro de 2018 - novembro de 2022", title: "Graduação na Língua Inglesa", institution: "Rockfeller Joinville America" },
    { period: "Idiomas", title: "Espanhol fluente e inglês intermediário-avançado", institution: "Certificações informadas no currículo." },
  ],
  projectsHeading: {
    eyebrow: "Projetos",
    title: "Trabalhos selecionados",
    intro: "Projetos reais nos quais transformei necessidades de negócio em experiências digitais funcionais.",
  },
  projectUi: {
    production: "Website em produção",
    comingSoon: "Projeto em breve",
    visit: "Visitar projeto",
    repository: "Repositório",
  },
  contact: {
    eyebrow: "Contato",
    title: "Vamos conversar sobre tecnologia, backend e evolução de sistemas.",
    labels: { email: "E-mail", linkedin: "LinkedIn", whatsapp: "WhatsApp", github: "GitHub" },
  },
  footer: { backToTop: "Voltar ao topo" },
  dock: { resume: "Currículo", email: "E-mail", linkedin: "LinkedIn", whatsapp: "WhatsApp" },
};

const english = {
  seo: {
    language: "en",
    title: "Luis Eduardo Lamim Cardoso | .NET Backend Developer",
    description:
      "Professional portfolio of Luis Eduardo Lamim Cardoso, a .NET backend developer focused on architecture, SQL, data modeling, and corporate systems.",
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
    solutionExplorer: "Solution explorer",
    output: "Output",
    readyOutput: "Build completed. Experience ready.",
    compilingOutput: "Compiling portfolio experience...",
    buildComplete: "Build completed",
    startPortfolio: "Start Portfolio",
    mobileReady: "Start portfolio",
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
    statement: "I build the backend no one sees, but every product needs:",
    statementStrong: " structured, performant, and ready to evolve.",
    explore: "Explore my journey",
    resume: "View résumé",
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
      period: "September 2025 - present",
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
      title: "Backend and architecture",
      description: "Building organized and traceable applications with clear responsibilities and sustainable maintenance.",
      skills: [".NET", "C#", "WinForms", "Layered architecture", "Refactoring"],
      metric: 88,
    },
    {
      title: "Modern frontend",
      description: "Developing responsive interfaces with reusable components, modern build tooling, and utility-first styling.",
      skills: ["JavaScript", "React", "Vite", "Tailwind CSS", "HTML", "Responsive design"],
      metric: 78,
    },
    {
      title: "SQL and modeling",
      description: "Modeling business rules and integrating relational databases, including legacy environments.",
      skills: ["SQL", "Data modeling", "Microsoft Access", "Queries", "Relational databases", "Performance"],
      metric: 84,
    },
    {
      title: "Professional quality",
      description: "A work routine guided by clarity, documentation, collaboration, and continuous improvement.",
      skills: ["Technical documentation", "Organization", "Quality", "Collaboration", "Analysis", "Continuous learning"],
      metric: 91,
    },
  ],
  cedapHeading: {
    eyebrow: "Real-world case · CEDAP HUB FRAMEWORK",
    title: "Engineering applied to a real corporate system",
    practical: "Practical application",
    competenciesTitle: "Core competencies demonstrated",
    competenciesIntro:
      "This work demonstrates my ability to combine architecture, data, and operational experience in a corporate solution that continues to evolve.",
    nextSteps: "Next steps",
    evolutionTitle: "Technical evolution",
    evolutionIntro:
      "I am directing the next improvements toward stronger security, predictability, and system diagnostics.",
  },
  cedapFramework: {
    intro:
      "In the CEDAP HUB FRAMEWORK, I develop a corporate desktop application using C# and .NET Framework 4.8. I organized the solution as a modular monolith with 17 projects, supporting multiple business domains and integrating SQL Server with legacy Microsoft Access databases.",
    highlights: [
      { value: "17", label: "projects in the solution" },
      { value: "8", label: "business domains" },
      { value: "2", label: "data ecosystems" },
    ],
    categories: [
      {
        title: "Architecture and design",
        description:
          "I structured the solution into presentation, business, and data layers, with modules aligned to SOPs, Gross Examination, Patients, Requests, Employees, Insurance Providers, Extensions, and HR. Interfaces, dependency injection, and factories reduce coupling, while DTOs, AutoMapper, and explicit states make workflows more predictable.",
        tags: ["Modular monolith", "OOP", "Dependency injection", "Factory Pattern", "DTO + AutoMapper", "Business states"],
      },
      {
        title: "Backend and data access",
        description:
          "I implemented SQL Server and Access integration with ADO.NET and OLE DB through abstracted providers. Parameterized queries, commit and rollback transactions, DBNull handling, and asynchronous operations protect data while keeping business rules separate from database commands.",
        tags: ["C#", ".NET Framework 4.8", "ADO.NET", "SQL Server", "Access + OLE DB", "async/await", "LINQ"],
      },
      {
        title: "Desktop and user experience",
        description:
          "I built operational workflows in Windows Forms with a custom component library. GDI+ controls, standardized DataGridViews, double buffering, and adaptive forms improve consistency and responsiveness, while decoupled navigation and ApplicationContext manage screen state and lifecycle.",
        tags: ["Windows Forms", "Reusable components", "GDI+", "DataGridView", "ApplicationContext", "Dashboards and filters"],
      },
      {
        title: "Deployment and integrations",
        description:
          "I organized updates and versioning with ClickOnce and used Mutex to enforce a single application instance. The solution integrates Crystal Reports and works with SQL Server and legacy Access systems simultaneously, with its evolution tracked through Git.",
        tags: ["ClickOnce", "Mutex", "Crystal Reports", "SQL + Access", "Git"],
      },
      {
        title: "Quality and maintenance",
        description:
          "I applied guard clauses, dependency validation, and explicit null-result handling to anticipate failures. Interfaces, implementations, mappings, factories, and services organize responsibilities, while XML documentation, domain-oriented names, helpers, and centralized resources support maintenance and evolution.",
        tags: ["Guard clauses", "ArgumentNullException", "XML documentation", "Domain naming", "Shared helpers", "Centralized resources"],
      },
    ],
    competencies: [
      "Architecture and maintenance of modular corporate desktop systems",
      "Complex domain and operational workflow modeling",
      "Transactional integration with SQL Server and legacy Access",
      "Gradual WinForms modernization and reusable components",
      "Asynchronous programming, dashboards, and reports",
      "Evolution of an interconnected 17-project solution",
    ],
    evolution: [
      "Automated tests",
      "CI pipeline",
      "Structured logging and observability",
      "Authentication and secrets management",
      "Progressive reduction of maintenance hotspots",
    ],
  },
  educationHeading: { eyebrow: "Education", title: "Continuous learning and growth" },
  education: [
    { period: "February 2025 - July 2029", title: "Software Engineering", institution: "Universidade da Região de Joinville" },
    { period: "2022 - 2024", title: "High School", institution: "Exathum" },
    { period: "February 2018 - November 2022", title: "English Language Program", institution: "Rockfeller Joinville America" },
    { period: "Languages", title: "Fluent Spanish and upper-intermediate English", institution: "Language qualifications listed in my résumé." },
  ],
  projectsHeading: {
    eyebrow: "Projects",
    title: "Selected work",
    intro: "Real projects where I turned business needs into functional digital experiences.",
  },
  projectUi: {
    production: "Live website",
    comingSoon: "Coming soon",
    visit: "Visit project",
    repository: "Repository",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about technology, backend engineering, and system evolution.",
    labels: { email: "Email", linkedin: "LinkedIn", whatsapp: "WhatsApp", github: "GitHub" },
  },
  footer: { backToTop: "Back to top" },
  dock: { resume: "Résumé", email: "Email", linkedin: "LinkedIn", whatsapp: "WhatsApp" },
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
      pt: ["React", "Vite", "Design responsivo", "SEO"],
      en: ["React", "Vite", "Responsive design", "SEO"],
    },
    status: { pt: "Projeto publicado", en: "Published project" },
    accent: "aqua",
    imageUrl: "/assets/insulfrio-project.jpeg",
    imageAlt: {
      pt: "Fachada da Insulfrio Refrigeração em Joinville",
      en: "Insulfrio Refrigeração building in Joinville, Brazil",
    },
    liveUrl: "https://insulfrio.com.br/",
    repoUrl: "#", // Substitua pelo repositório quando ele for publicado.
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
