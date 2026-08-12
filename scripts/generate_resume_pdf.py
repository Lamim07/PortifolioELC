from __future__ import annotations

from pathlib import Path
from xml.sax.saxutils import escape

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "luis-eduardo-lamim-cardoso-curriculo.pdf"

PAGE_WIDTH, PAGE_HEIGHT = A4
LEFT = 16.5 * mm
RIGHT = 16.5 * mm
BODY_WIDTH = PAGE_WIDTH - LEFT - RIGHT

INK = colors.HexColor("#10201C")
GRAPHITE = colors.HexColor("#0A1210")
GRAPHITE_2 = colors.HexColor("#15211E")
MINT = colors.HexColor("#19A974")
MINT_BRIGHT = colors.HexColor("#42F2A8")
AQUA = colors.HexColor("#3188A6")
AMBER = colors.HexColor("#C98320")
MUTED = colors.HexColor("#53635E")
PALE = colors.HexColor("#F3F7F5")
PALE_BLUE = colors.HexColor("#EDF5F7")
LINE = colors.HexColor("#D8E3DE")
WHITE = colors.white

REGULAR = "ResumeRegular"
SEMIBOLD = "ResumeSemibold"
BOLD = "ResumeBold"
MONO = "ResumeMono"


PROFILE = {
    "name": "Luis Eduardo Lamim Cardoso",
    "role": "Software Developer | Backend .NET",
    "location": "Joinville, Santa Catarina",
    "phone": "+55 47 99927-0044",
    "email": "luiseduardolamimcardoso@gmail.com",
    "linkedin": "https://www.linkedin.com/in/luis-eduardo-lamim-cardoso-4a1411314",
    "github": "https://github.com/Lamim07",
}

SUMMARY = (
    "Desenvolvedor com foco em backend .NET e experiência prática na evolução de sistemas "
    "corporativos. Atua com arquitetura em camadas, separação de responsabilidades, refatoração "
    "orientada à arquitetura, integração com bancos relacionais e otimização de consultas SQL. "
    "Combina visão técnica e cuidado com o produto para transformar sistemas legados em bases mais "
    "claras, performáticas e sustentáveis."
)

EXPERIENCES = [
    {
        "period": "Setembro de 2025 - atual",
        "title": "Software Developer",
        "company": "Laboratório CEDAP",
        "location": "Joinville, SC",
        "summary": (
            "Desenvolvimento de aplicações desktop com WinForms e backend .NET, atuando na "
            "modernização de sistema corporativo interno e na melhoria de fluxos críticos."
        ),
        "highlights": [
            "Aplicação de princípios de arquitetura e reorganização de camadas.",
            "Modelagem de regras de negócio com foco em manutenção e clareza.",
            "Otimização de consultas SQL e melhorias de performance.",
            "Refatoração de trechos críticos para reduzir acoplamento.",
            "Integração com banco relacional legado em Microsoft Access.",
            "Documentação técnica e organização estrutural do sistema.",
        ],
    },
    {
        "period": "Março de 2025 - agosto de 2025",
        "title": "Estágio de Assistente de Laboratório",
        "company": "Laboratório CEDAP",
        "location": "Joinville, SC",
        "summary": (
            "Atuação no setor de Gestão da Qualidade, desenvolvendo e apoiando o método de site "
            "assessment para acompanhamento da estrutura física do laboratório."
        ),
        "highlights": [
            "Organização de relatórios sobre condição e estrutura física.",
            "Colaboração com Gestão da Qualidade e comissão interna de prevenção de acidentes.",
            "Contato direto com processos, indicadores e melhoria de rotinas internas.",
        ],
    },
]

SKILL_GROUPS = [
    {
        "title": "Backend e arquitetura",
        "description": (
            "Aplicações organizadas e rastreáveis, com separação de responsabilidades e manutenção sustentável."
        ),
        "skills": [
            ".NET", "C#", ".NET Framework 4.8", "WinForms", "Arquitetura em camadas",
            "Injeção de dependências", "Factory Pattern", "DTOs", "AutoMapper", "async/await",
            "LINQ", "Refatoração",
        ],
        "tone": MINT,
    },
    {
        "title": "Frontend moderno",
        "description": (
            "Interfaces responsivas com componentes reutilizáveis, build moderno e estilização utilitária."
        ),
        "skills": ["JavaScript", "React", "Vite", "Tailwind CSS", "HTML", "Design responsivo"],
        "tone": AQUA,
    },
    {
        "title": "SQL e modelagem",
        "description": (
            "Modelagem de regras e integração com bancos relacionais, incluindo contextos legados."
        ),
        "skills": [
            "SQL", "SQL Server", "ADO.NET", "OLE DB", "Microsoft Access", "Consultas parametrizadas",
            "Transações", "Modelagem de dados", "Performance",
        ],
        "tone": AQUA,
    },
    {
        "title": "Qualidade, desktop e entrega",
        "description": (
            "Qualidade, componentização de interfaces desktop, versionamento e distribuição corporativa."
        ),
        "skills": [
            "Git", "ClickOnce", "Crystal Reports", "GDI+", "DataGridView", "ApplicationContext",
            "Mutex", "Documentação XML", "Guard clauses", "Componentes reutilizáveis", "Organização",
            "Qualidade", "Colaboração",
        ],
        "tone": AMBER,
    },
]

EDUCATION = [
    {
        "period": "Fevereiro de 2025 - julho de 2029",
        "title": "Engenharia de Software",
        "institution": "Universidade da Região de Joinville",
    },
    {"period": "2022 - 2024", "title": "Ensino Médio", "institution": "Exathum"},
    {
        "period": "Fevereiro de 2018 - novembro de 2022",
        "title": "Graduação na Língua Inglesa",
        "institution": "Rockfeller Joinville America",
    },
    {
        "period": "Idiomas",
        "title": "Espanhol fluente e inglês intermediário-avançado",
        "institution": "Rotary International e Upper Maddison College",
    },
]

PROJECT = {
    "title": "Insulfrio Refrigeração",
    "status": "Projeto publicado",
    "description": (
        "Site institucional desenvolvido para apresentar soluções de refrigeração industrial e comercial, "
        "com experiência responsiva e contato comercial direto."
    ),
    "stack": "React, Vite, Design responsivo e SEO",
    "live": "https://insulfrio.com.br/",
    "repository": "https://github.com/Lamim07/LandingPageInsulfrio",
}


def register_fonts() -> None:
    fonts_dir = Path("C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont(REGULAR, str(fonts_dir / "segoeui.ttf")))
    pdfmetrics.registerFont(TTFont(SEMIBOLD, str(fonts_dir / "seguisb.ttf")))
    pdfmetrics.registerFont(TTFont(BOLD, str(fonts_dir / "segoeuib.ttf")))
    pdfmetrics.registerFont(TTFont(MONO, str(fonts_dir / "CascadiaMono.ttf")))


def paragraph_styles() -> dict[str, ParagraphStyle]:
    return {
        "body": ParagraphStyle(
            "body",
            fontName=REGULAR,
            fontSize=9.1,
            leading=13.7,
            textColor=INK,
            spaceAfter=0,
        ),
        "experience_title": ParagraphStyle(
            "experience_title",
            fontName=BOLD,
            fontSize=11.2,
            leading=13.6,
            textColor=INK,
        ),
        "period": ParagraphStyle(
            "period",
            fontName=SEMIBOLD,
            fontSize=7.6,
            leading=9.2,
            alignment=TA_RIGHT,
            textColor=colors.HexColor("#16865F"),
            splitLongWords=False,
        ),
        "meta": ParagraphStyle(
            "meta",
            fontName=SEMIBOLD,
            fontSize=8.5,
            leading=11,
            textColor=MUTED,
        ),
        "small_body": ParagraphStyle(
            "small_body",
            fontName=REGULAR,
            fontSize=8.2,
            leading=11.4,
            textColor=INK,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            fontName=REGULAR,
            fontSize=8.05,
            leading=10.7,
            textColor=INK,
            leftIndent=0,
        ),
        "card_title": ParagraphStyle(
            "card_title",
            fontName=BOLD,
            fontSize=9.4,
            leading=11.6,
            textColor=INK,
        ),
        "card_desc": ParagraphStyle(
            "card_desc",
            fontName=REGULAR,
            fontSize=7.45,
            leading=9.7,
            textColor=MUTED,
        ),
        "card_skills": ParagraphStyle(
            "card_skills",
            fontName=SEMIBOLD,
            fontSize=7.25,
            leading=9.5,
            textColor=INK,
        ),
        "education_period": ParagraphStyle(
            "education_period",
            fontName=MONO,
            fontSize=6.9,
            leading=8.8,
            textColor=AQUA,
        ),
        "education_title": ParagraphStyle(
            "education_title",
            fontName=BOLD,
            fontSize=8.7,
            leading=10.6,
            textColor=INK,
        ),
        "education_meta": ParagraphStyle(
            "education_meta",
            fontName=REGULAR,
            fontSize=7.35,
            leading=9.5,
            textColor=MUTED,
        ),
        "project_title": ParagraphStyle(
            "project_title",
            fontName=BOLD,
            fontSize=11,
            leading=13,
            textColor=INK,
        ),
        "project_status": ParagraphStyle(
            "project_status",
            fontName=MONO,
            fontSize=7.1,
            leading=9,
            alignment=TA_RIGHT,
            textColor=MINT,
        ),
        "links": ParagraphStyle(
            "links",
            fontName=SEMIBOLD,
            fontSize=7.8,
            leading=10.5,
            textColor=AQUA,
        ),
    }


class SectionHeading(Flowable):
    def __init__(self, label: str, accent: colors.Color = MINT):
        super().__init__()
        self.label = label
        self.accent = accent
        self.height = 25

    def wrap(self, avail_width: float, avail_height: float) -> tuple[float, float]:
        self.width = avail_width
        return avail_width, self.height

    def draw(self) -> None:
        canvas = self.canv
        canvas.saveState()
        canvas.setFillColor(self.accent)
        canvas.roundRect(0, 9, 3.5, 12, 1.75, fill=1, stroke=0)
        canvas.setFont(MONO, 8.1)
        canvas.drawString(10, 11, self.label.upper())
        text_width = pdfmetrics.stringWidth(self.label.upper(), MONO, 8.1)
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.65)
        canvas.line(20 + text_width, 15, self.width, 15)
        canvas.restoreState()


def draw_contact_line(canvas, items: list[tuple[str, str | None]], y: float) -> None:
    x = LEFT
    font_size = 8.1
    separator = "   |   "
    for index, (label, url) in enumerate(items):
        canvas.setFont(REGULAR, font_size)
        canvas.setFillColor(colors.HexColor("#D9E6E1"))
        canvas.drawString(x, y, label)
        width = pdfmetrics.stringWidth(label, REGULAR, font_size)
        if url:
            canvas.linkURL(url, (x, y - 2, x + width, y + font_size + 2), relative=0)
        x += width
        if index < len(items) - 1:
            canvas.setFillColor(colors.HexColor("#678079"))
            canvas.drawString(x, y, separator)
            x += pdfmetrics.stringWidth(separator, REGULAR, font_size)


def draw_first_page(canvas, doc) -> None:
    canvas.saveState()
    canvas.setTitle("Currículo - Luis Eduardo Lamim Cardoso")
    canvas.setAuthor(PROFILE["name"])
    canvas.setSubject("Currículo profissional - Software Developer e Backend .NET")
    canvas.setKeywords(".NET, C#, WinForms, SQL, Backend, Software Developer, Joinville")

    header_height = 176
    canvas.setFillColor(GRAPHITE)
    canvas.rect(0, PAGE_HEIGHT - header_height, PAGE_WIDTH, header_height, fill=1, stroke=0)
    canvas.setFillColor(MINT_BRIGHT)
    canvas.rect(0, PAGE_HEIGHT - header_height, 4, header_height, fill=1, stroke=0)
    canvas.setStrokeColor(colors.HexColor("#1C302A"))
    canvas.setLineWidth(1)
    canvas.line(PAGE_WIDTH - RIGHT - 76, PAGE_HEIGHT - 25, PAGE_WIDTH - RIGHT, PAGE_HEIGHT - 25)

    canvas.setFont(BOLD, 25)
    canvas.setFillColor(WHITE)
    canvas.drawString(LEFT, PAGE_HEIGHT - 50, PROFILE["name"])

    canvas.setFont(MONO, 9.2)
    canvas.setFillColor(MINT_BRIGHT)
    canvas.drawString(LEFT, PAGE_HEIGHT - 75, PROFILE["role"].upper())

    canvas.setFont(REGULAR, 9)
    canvas.setFillColor(colors.HexColor("#AFC0BA"))
    canvas.drawString(
        LEFT,
        PAGE_HEIGHT - 99,
        "Arquitetura, performance e manutenção como prioridades.",
    )

    canvas.setStrokeColor(colors.HexColor("#2B3A36"))
    canvas.setLineWidth(0.7)
    canvas.line(LEFT, PAGE_HEIGHT - 116, PAGE_WIDTH - RIGHT, PAGE_HEIGHT - 116)

    draw_contact_line(
        canvas,
        [
            (PROFILE["location"], None),
            (PROFILE["phone"], "tel:+5547999270044"),
            (PROFILE["email"], f"mailto:{PROFILE['email']}"),
        ],
        PAGE_HEIGHT - 138,
    )
    draw_contact_line(
        canvas,
        [
            ("linkedin.com/in/luis-eduardo-lamim-cardoso", PROFILE["linkedin"]),
            ("github.com/Lamim07", PROFILE["github"]),
        ],
        PAGE_HEIGHT - 158,
    )

    draw_footer(canvas, doc)
    canvas.restoreState()


def draw_later_page(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFillColor(GRAPHITE)
    canvas.rect(0, PAGE_HEIGHT - 43, PAGE_WIDTH, 43, fill=1, stroke=0)
    canvas.setFillColor(MINT_BRIGHT)
    canvas.rect(0, PAGE_HEIGHT - 43, 4, 43, fill=1, stroke=0)
    canvas.setFont(BOLD, 9.4)
    canvas.setFillColor(WHITE)
    canvas.drawString(LEFT, PAGE_HEIGHT - 27, PROFILE["name"])
    canvas.setFont(MONO, 7.2)
    canvas.setFillColor(MINT_BRIGHT)
    role = "SOFTWARE DEVELOPER | BACKEND .NET"
    role_width = pdfmetrics.stringWidth(role, MONO, 7.2)
    canvas.drawString(PAGE_WIDTH - RIGHT - role_width, PAGE_HEIGHT - 27, role)
    draw_footer(canvas, doc)
    canvas.restoreState()


def draw_footer(canvas, doc) -> None:
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.55)
    canvas.line(LEFT, 28, PAGE_WIDTH - RIGHT, 28)
    canvas.setFont(REGULAR, 6.9)
    canvas.setFillColor(MUTED)
    canvas.drawString(LEFT, 17, "Currículo profissional | Atualizado em agosto de 2026")
    page_label = f"{doc.page} / 2"
    page_width = pdfmetrics.stringWidth(page_label, MONO, 6.9)
    canvas.setFont(MONO, 6.9)
    canvas.drawString(PAGE_WIDTH - RIGHT - page_width, 17, page_label)


def experience_card(item: dict, styles: dict[str, ParagraphStyle]) -> KeepTogether:
    period_label = escape(item["period"]).replace(" - ", " -<br/>")
    card_inner_width = BODY_WIDTH - 26
    heading = Table(
        [
            [
                Paragraph(escape(item["title"]), styles["experience_title"]),
                Paragraph(period_label, styles["period"]),
            ],
            [
                Paragraph(
                    f"{escape(item['company'])}  |  {escape(item['location'])}",
                    styles["meta"],
                ),
                "",
            ],
        ],
        colWidths=[card_inner_width * 0.70, card_inner_width * 0.30],
    )
    heading.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("SPAN", (0, 1), (1, 1)),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
            ]
        )
    )

    bullets = ListFlowable(
        [
            ListItem(Paragraph(escape(highlight), styles["bullet"]), leftIndent=0)
            for highlight in item["highlights"]
        ],
        bulletType="bullet",
        bulletChar="•",
        bulletFontName=REGULAR,
        bulletFontSize=5.5,
        bulletColor=MINT,
        leftIndent=10,
        bulletOffsetY=1.5,
        spaceBefore=3,
    )

    content = [
        heading,
        Spacer(1, 5),
        Paragraph(escape(item["summary"]), styles["small_body"]),
        Spacer(1, 2),
        bullets,
    ]
    table = Table([[content]], colWidths=[BODY_WIDTH])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("LINEBEFORE", (0, 0), (0, 0), 2.2, MINT),
                ("LEFTPADDING", (0, 0), (-1, -1), 13),
                ("RIGHTPADDING", (0, 0), (-1, -1), 13),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return KeepTogether([table])


def skill_card(group: dict, styles: dict[str, ParagraphStyle]) -> list[Flowable]:
    tone = group["tone"].hexval().lstrip("#")
    return [
        Paragraph(
            f'<font color="#{tone}">{escape(group["title"])}</font>',
            styles["card_title"],
        ),
        Spacer(1, 3),
        Paragraph(escape(group["description"]), styles["card_desc"]),
        Spacer(1, 5),
        Paragraph(escape("  •  ".join(group["skills"])), styles["card_skills"]),
    ]


def skills_grid(styles: dict[str, ParagraphStyle]) -> Table:
    card_width = (BODY_WIDTH - 9) / 2
    rows = []
    for index in range(0, len(SKILL_GROUPS), 2):
        rows.append(
            [
                skill_card(SKILL_GROUPS[index], styles),
                skill_card(SKILL_GROUPS[index + 1], styles),
            ]
        )
    table = Table(rows, colWidths=[card_width, card_width], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE),
                ("BOX", (0, 0), (-1, -1), 0.55, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.55, WHITE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    return table


def education_card(item: dict, styles: dict[str, ParagraphStyle]) -> list[Flowable]:
    return [
        Paragraph(escape(item["period"]).upper(), styles["education_period"]),
        Spacer(1, 2.5),
        Paragraph(escape(item["title"]), styles["education_title"]),
        Spacer(1, 2),
        Paragraph(escape(item["institution"]), styles["education_meta"]),
    ]


def education_grid(styles: dict[str, ParagraphStyle]) -> Table:
    card_width = (BODY_WIDTH - 9) / 2
    rows = []
    for index in range(0, len(EDUCATION), 2):
        rows.append(
            [
                education_card(EDUCATION[index], styles),
                education_card(EDUCATION[index + 1], styles),
            ]
        )
    table = Table(rows, colWidths=[card_width, card_width], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE),
                ("BOX", (0, 0), (-1, -1), 0.55, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.55, WHITE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8.5),
            ]
        )
    )
    return table


def project_card(styles: dict[str, ParagraphStyle]) -> Table:
    card_inner_width = BODY_WIDTH - 26
    heading = Table(
        [
            [
                Paragraph(escape(PROJECT["title"]), styles["project_title"]),
                Paragraph(escape(PROJECT["status"]).upper(), styles["project_status"]),
            ]
        ],
        colWidths=[card_inner_width * 0.68, card_inner_width * 0.32],
    )
    heading.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )

    stack = Paragraph(
        f'<font name="{SEMIBOLD}" color="#10201C">Stack:</font> {escape(PROJECT["stack"])}',
        styles["small_body"],
    )
    links = Paragraph(
        (
            f'<link href="{PROJECT["live"]}" color="#3188A6"><u>Site em produção</u></link>'
            "   |   "
            f'<link href="{PROJECT["repository"]}" color="#3188A6"><u>Repositório no GitHub</u></link>'
        ),
        styles["links"],
    )
    content = [
        heading,
        Spacer(1, 5),
        Paragraph(escape(PROJECT["description"]), styles["small_body"]),
        Spacer(1, 4),
        stack,
        Spacer(1, 5),
        links,
    ]
    table = Table([[content]], colWidths=[BODY_WIDTH])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("LINEBEFORE", (0, 0), (0, 0), 3.2, AQUA),
                ("LEFTPADDING", (0, 0), (-1, -1), 13),
                ("RIGHTPADDING", (0, 0), (-1, -1), 13),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return table


def build_pdf() -> None:
    register_fonts()
    styles = paragraph_styles()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    first_frame = Frame(
        LEFT,
        35,
        BODY_WIDTH,
        PAGE_HEIGHT - 176 - 35 - 15,
        id="first_body",
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    later_frame = Frame(
        LEFT,
        35,
        BODY_WIDTH,
        PAGE_HEIGHT - 43 - 35 - 16,
        id="later_body",
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )

    document = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=LEFT,
        rightMargin=RIGHT,
        topMargin=0,
        bottomMargin=35,
        title="Currículo - Luis Eduardo Lamim Cardoso",
        author=PROFILE["name"],
        subject="Currículo profissional - Software Developer e Backend .NET",
        creator="ReportLab",
    )
    document.addPageTemplates(
        [
            PageTemplate(
                id="First",
                frames=[first_frame],
                onPage=draw_first_page,
                autoNextPageTemplate="Later",
            ),
            PageTemplate(id="Later", frames=[later_frame], onPage=draw_later_page),
        ]
    )

    story: list[Flowable] = [
        SectionHeading("Perfil profissional", MINT),
        Paragraph(escape(SUMMARY), styles["body"]),
        Spacer(1, 9),
        SectionHeading("Experiência profissional", AQUA),
        experience_card(EXPERIENCES[0], styles),
        Spacer(1, 8),
        experience_card(EXPERIENCES[1], styles),
        PageBreak(),
        SectionHeading("Competências técnicas", MINT),
        skills_grid(styles),
        Spacer(1, 10),
        SectionHeading("Formação e idiomas", AQUA),
        education_grid(styles),
        Spacer(1, 10),
        SectionHeading("Projeto selecionado", AMBER),
        project_card(styles),
    ]

    document.build(story)


def validate_pdf() -> None:
    reader = PdfReader(str(OUTPUT))
    if len(reader.pages) != 2:
        raise RuntimeError(f"O currículo deveria ter 2 páginas, mas tem {len(reader.pages)}.")

    extracted = "\n".join(page.extract_text() or "" for page in reader.pages)
    required_terms = [
        "luiseduardolamimcardoso@gmail.com",
        "Software Developer",
        "Estágio de Assistente de Laboratório",
        ".NET Framework 4.8",
        "Microsoft Access",
        "Engenharia de Software",
        "Insulfrio Refrigeração",
        "Upper Maddison College",
    ]
    missing = [term for term in required_terms if term not in extracted]
    if missing:
        raise RuntimeError(f"Termos ausentes no PDF gerado: {missing}")

    link_count = 0
    for page in reader.pages:
        annotations = page.get("/Annots", [])
        for annotation_ref in annotations:
            annotation = annotation_ref.get_object()
            if annotation.get("/Subtype") == "/Link":
                link_count += 1
    if link_count < 6:
        raise RuntimeError(f"Esperava ao menos 6 links clicáveis, mas encontrei {link_count}.")

    print(f"Gerado: {OUTPUT}")
    print(f"Páginas: {len(reader.pages)} | Links clicáveis: {link_count}")


if __name__ == "__main__":
    build_pdf()
    validate_pdf()
