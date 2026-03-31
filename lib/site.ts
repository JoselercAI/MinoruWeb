export const site = {
  name: "Minoru Isisola",
  domain: "minoruisisola.com",
  url: process.env.SITE_URL || "https://minoruisisola.com",
  email: "hola@minoruisisola.com",
  description:
    "Construyo negocios con IA y lo documento todo en publico.",
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
  "Naci en Japon, creci entre culturas y empece a construir negocios online sin saber lo que hacia.",
  "Lo que empezo como una busqueda de libertad se convirtio en mas de 3 millones de euros generados y mas de 1.700 alumnos en 37 paises.",
  "En 2025 cerre esa etapa y aposte por la inteligencia artificial. Me instale en Dubai y empece desde cero probando, invirtiendo y equivocandome.",
  "Ahora construyo negocios con IA y lo documento todo en publico. Lo que funciona, lo que no y cuanto cuesta cada decision.",
];

export const timeline = [
  {
    year: "2019",
    text: "Empieza a vender en Amazon desde cero. Sin capital, sin experiencia. Solo un ordenador y ganas de no depender de nadie.",
  },
  {
    year: "2022",
    text: "Lanza su formacion sobre Amazon FBA. Mas de 1.700 alumnos en 37 paises. Convierte anos de errores en algo que otros pueden replicar.",
  },
  {
    year: "2025",
    text: "Cierra la etapa de Amazon. Pivota hacia la inteligencia artificial y empieza a construir desde cero.",
  },
  {
    year: "2026",
    text: "Invierte 60.000 dolares probando herramientas y modelos de negocio. Documenta todo el proceso en publico.",
  },
];

export const contactBlocks = [
  {
    title: "Email",
    body: "Para colaboraciones, patrocinios y propuestas estrategicas.",
    cta: "Enviar mensaje",
    href: `mailto:${site.email}`,
  },
  {
    title: "YouTube",
    body: "Videos sobre IA, negocios y lo que estoy construyendo en tiempo real.",
    cta: "Abrir canal",
    href: site.youtubeUrl,
  },
  {
    title: "Instagram",
    body: "El dia a dia del proceso. Sin filtro y sin produccion.",
    cta: "Abrir perfil",
    href: site.instagramUrl,
  },
];
