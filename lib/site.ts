export const site = {
  name: "Minoru Isisola",
  domain: "minoruisisola.com",
  url: process.env.SITE_URL || "https://minoruisisola.com",
  email: "hola@minoruisisola.com",
  description:
    "Construyo negocios con IA y lo documento todo en público.",
  youtubeUrl: process.env.YOUTUBE_URL || "https://www.youtube.com/@minoruisisola",
  instagramUrl: process.env.INSTAGRAM_URL || "#",
  tiktokUrl: process.env.TIKTOK_URL || "#",
};

export const navItems = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#youtube", label: "YouTube" },
  { href: "#newsletter", label: "Newsletter" },
];

export const about = [
  "Nací en Japón, crecí entre culturas y empecé a construir negocios online sin saber lo que hacía.",
  "Lo que empezó como una búsqueda de libertad se convirtió en más de 3 millones de euros generados y más de 1.700 alumnos en 37 países.",
  "En 2025 cerré esa etapa y aposté por la inteligencia artificial. Me instalé en Dubai y empecé desde cero probando, invirtiendo y equivocándome.",
  "Ahora construyo negocios con IA y lo documento todo en público. Lo que funciona, lo que no y cuánto cuesta cada decisión.",
];

export const timeline = [
  {
    year: "2019",
    text: "Empieza a vender en Amazon desde cero. Sin capital, sin experiencia. Solo un ordenador y ganas de no depender de nadie.",
  },
  {
    year: "2022",
    text: "Lanza su formación en Amazon FBA. Más de 1.700 alumnos en 37 países. Convierte años de errores en algo que otros pueden replicar.",
  },
  {
    year: "2025",
    text: "Cierra la etapa de Amazon. Pivota hacia la inteligencia artificial y empieza a construir desde cero.",
  },
  {
    year: "2026",
    text: "Invierte 60.000 dólares probando herramientas y modelos de negocio. Documenta todo el proceso en público.",
  },
];

export const contactBlocks = [
  {
    title: "Email",
    body: "Para colaboraciones, patrocinios y propuestas estratégicas.",
    cta: "Enviar mensaje",
    href: `mailto:${site.email}`,
  },
  {
    title: "YouTube",
    body: "Vídeos sobre IA, negocios y lo que estoy construyendo en tiempo real.",
    cta: "Abrir canal",
    href: site.youtubeUrl,
  },
  {
    title: "Instagram",
    body: "El día a día del proceso. Sin filtro y sin producción.",
    cta: "Abrir perfil",
    href: site.instagramUrl,
  },
];
