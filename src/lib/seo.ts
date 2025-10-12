// Configuración SEO centralizada
export const SEO_CONFIG = {
  defaultTitle: "fdLeon-dev | Desarrollador Web y Diseñador",
  defaultDescription: "Desarrollador web, diseñador y creador de software especializado en transformar negocios a través de soluciones digitales modernas que aumentan tu visibilidad y potencian tus ventas.",
  defaultKeywords: [
    "desarrollo web",
    "diseñador web",
    "programador",
    "freelancer",
    "software",
    "aplicaciones web",
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Uruguay",
    "Montevideo"
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://fdleon.dev",
  siteName: "fdLeon-dev",
  author: "fdLeon-dev",
  social: {
    twitter: "@fdleon_dev",
    github: "fdleon",
    linkedin: "fdleon"
  }
}

// Generar meta tags para diferentes páginas
export const generateMetadata = (page: string, customData?: any) => {
  const baseUrl = SEO_CONFIG.siteUrl

  switch (page) {
    case "home":
      return {
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        keywords: SEO_CONFIG.defaultKeywords.join(", "),
        openGraph: {
          title: SEO_CONFIG.defaultTitle,
          description: SEO_CONFIG.defaultDescription,
          url: baseUrl,
          siteName: SEO_CONFIG.siteName,
          type: "website",
          locale: "es_ES",
        },
        twitter: {
          card: "summary_large_image",
          title: SEO_CONFIG.defaultTitle,
          description: SEO_CONFIG.defaultDescription,
          creator: SEO_CONFIG.social.twitter,
        },
        robots: {
          index: true,
          follow: true,
        },
      }

    case "portfolio":
      return {
        title: "Portafolio | fdLeon-dev - Proyectos de Desarrollo Web",
        description: "Explora mi portafolio de proyectos de desarrollo web, diseño y software. Incluye e-commerce, sistemas de gestión, dashboards y aplicaciones móviles desarrolladas con las últimas tecnologías.",
        keywords: [...SEO_CONFIG.defaultKeywords, "portafolio", "proyectos", "casos de éxito", "e-commerce", "dashboard", "sistema gestión"],
        openGraph: {
          title: "Portafolio | fdLeon-dev",
          description: "Explora mi portafolio de proyectos de desarrollo web y diseño",
          url: `${baseUrl}/portfolio`,
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: "Portafolio | fdLeon-dev",
          description: "Explora mi portafolio de proyectos de desarrollo web y diseño",
        },
      }

    case "contact":
      return {
        title: "Contacto | fdLeon-dev - Trabajemos Juntos",
        description: "¿Tienes un proyecto en mente? Contacta conmigo para transformar tu negocio digitalmente. Desarrollo web, diseño y software personalizado.",
        keywords: [...SEO_CONFIG.defaultKeywords, "contacto", "presupuesto", "consulta", "proyecto"],
        openGraph: {
          title: "Contacto | fdLeon-dev",
          description: "Contacta conmigo para transformar tu negocio digitalmente",
          url: `${baseUrl}/contact`,
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: "Contacto | fdLeon-dev",
          description: "Contacta conmigo para transformar tu negocio digitalmente",
        },
      }

    default:
      return generateMetadata("home")
  }
}
