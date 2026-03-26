export const site = {
  name: "Minoru Isisola",
  domain: "minoruisisola.com",
  url: process.env.SITE_URL || "https://minoruisisola.com",
  email: "hola@minoruisisola.com",
  description:
    "Web oficial de Minoru Isisola: negocio, IA, contenido educativo y newsletter.",
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
  "Minoru Isisola es un emprendedor online que creció entre diferentes culturas. Lo que empezó como una búsqueda de libertad se convirtió en algo más grande: negocios, formación y una audiencia global.",
  "Tras años construyendo en ecommerce, abrió una nueva etapa centrada en inteligencia artificial, sistemas y creación de productos digitales.",
  "Ahora documenta el proceso, comparte aprendizajes y construye en público con un enfoque más simple, más estratégico y más libre.",
];

export const timeline = [
  {
    year: "2019",
    text: "Empieza a vender en Amazon desde cero y entra de lleno en el juego digital.",
  },
  {
    year: "2022",
    text: "Lanza su universidad y convierte experiencia práctica en metodología replicable.",
  },
  {
    year: "2024",
    text: "Escala el negocio, amplía su alcance internacional y consolida una comunidad global.",
  },
  {
    year: "2025",
    text: "Cierra una etapa y empieza a construir nuevos negocios con IA mientras documenta todo en YouTube.",
  },
];

export const contactBlocks = [
  {
    title: "Email",
    body: "Para colaboraciones, prensa o propuestas estratégicas.",
    cta: "Escribir email",
    href: `mailto:${site.email}`,
  },
  {
    title: "YouTube",
    body: "Contenido sobre negocio, sistemas y nuevas ideas.",
    cta: "Abrir canal",
    href: site.youtubeUrl,
  },
  {
    title: "Instagram",
    body: "Actualizaciones breves, contexto diario y momentos detrás del proceso.",
    cta: "Abrir perfil",
    href: site.instagramUrl,
  },
];
