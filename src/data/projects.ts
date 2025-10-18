import { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "portafolio-fdleon-3",
    title: "Portafolio fdLeon-dev v3.0",
    description: "Portafolio personal moderno y profesional construido con Next.js 15, TypeScript y TailwindCSS. Incluye diseño responsive, modo oscuro, animaciones con Framer Motion y optimización SEO completa.",
    image: "/multimedia/proyecto1/principal.png",
    images: [
      "/multimedia/proyecto1/principal.png",
      "/multimedia/proyecto1/habilidades.png",
      "/multimedia/proyecto1/proyectos.png",
      "/multimedia/proyecto1/blog.png",
      "/multimedia/proyecto1/contacto.png",
      "/multimedia/proyecto1/sobre-mi.png"
    ],
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "React 19", "next-themes", "Vercel"],
    category: "web",
    liveUrl: "https://fdleon.dev",
    githubUrl: "https://github.com/fdleon/fdleon-dev",
    featured: false,
    completed: "2025-01-17",
    client: "Personal"
  },
  {
    id: "sistema-gestion-barberia",
    title: "BLESSED Studio - Sistema de Gestión de Barbería",
    description: "Sistema completo de gestión para BLESSED Studio con reservas online, control de citas, gestión de clientes, inventario y reportes de ventas. Incluye panel de administración y app móvil para clientes. Barbería premium con servicios especializados.",
    image: "/multimedia/proyecto2/pagina-principal.png",
    images: [
      "/multimedia/proyecto2/pagina-principal.png",
      "/multimedia/proyecto2/reservar-cita.png",
      "/multimedia/proyecto2/panel-admin.png",
      "/multimedia/proyecto2/calendario.png",
      "/multimedia/proyecto2/admin-login.png",
      "/multimedia/proyecto2/servicios.png",
      "/multimedia/proyecto2/Disponibilidad.png"
    ],
    technologies: ["Next.js 13.5.6", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion", "Resend API"],
    category: "software",
    liveUrl: "https://blessed-studio.vercel.app/",
    githubUrl: "https://github.com/fdLeon-dev/Barberia-Sistema",
    featured: true,
    completed: "2024-08-15",
    client: "BLESSED Studio"
  },
  {
    id: "onix-barberia",
    title: "Onix Barbería - Landing Page",
    description: "Landing page profesional para Onix Barbería con diseño moderno y funcionalidades completas. Incluye galería de servicios, reservas online, información de barberos y sistema de contacto integrado.",
    image: "/multimedia/proyecto4/pincipal.png",
    images: [
      "/multimedia/proyecto4/pincipal.png",
      "/multimedia/proyecto4/servicios.png",
      "/multimedia/proyecto4/barberos.png",
      "/multimedia/proyecto4/galeria.png",
      "/multimedia/proyecto4/reserva.png",
      "/multimedia/proyecto4/contacto.png",
      "/multimedia/proyecto4/login.png",
      "/multimedia/proyecto4/panel-admin.png"
    ],
    technologies: ["React", "Vite", "JavaScript", "CSS3", "Vercel"],
    category: "web",
    liveUrl: "https://onix-web.vercel.app/",
    githubUrl: "https://github.com/fdLeon-dev/onix-web",
    featured: true,
    completed: "2024-07-10",
    client: "Onix Barbería"
  },
  {
    id: "landing-page-devices",
    title: "Devices F2 - Servicio Técnico",
    description: "Sitio web moderno y profesional para servicio técnico de reparación y ensamblaje de computadoras. Incluye formulario de cotización con WhatsApp, galería de trabajos, modo oscuro/claro, diseño responsive y optimizado para SEO. PWA ready con lazy loading de imágenes.",
    image: "/multimedia/proyecto6/pagina.png",
    images: [
      "/multimedia/proyecto6/pagina.png"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Google Analytics"],
    category: "web",
    liveUrl: "https://fdleon-dev.github.io/devices/",
    githubUrl: "https://github.com/fdLeon-dev/devices",
    featured: true,
    completed: "2024-06-20",
    client: "Devices F2"
  },
  {
    id: "ecommerce-plan-ceibal",
    title: "E-commerce Plan Ceibal",
    description: "Proyecto colaborativo desarrollado durante Jóvenes a Programar. E-commerce completo para productos educativos con carrito de compras, sistema de pagos, gestión de usuarios y panel administrativo.",
    image: "/multimedia/proyecto3/inicio-ecommerce.png",
    images: [
      "/multimedia/proyecto3/inicio-ecommerce.png",
      "/multimedia/proyecto3/categorias.png",
      "/multimedia/proyecto3/login.png",
      "/multimedia/proyecto3/vender.png"
    ],
    technologies: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "GitHub Pages"],
    category: "web",
    liveUrl: "https://andresmgm0.github.io/proyecto-final/index.html",
    githubUrl: "https://github.com/andresmgm0/proyecto-final",
    completed: "2024-04-30",
    client: "Plan Ceibal - Jóvenes a Programar"
  },
  {
    id: "proyecto5-landing",
    title: "FdLeon.dev - Landing Page Profesional",
    description: "Landing page moderna y profesional con diseño responsive, sección de servicios destacados, portafolio interactivo y formulario de contacto optimizado. Diseño enfocado en conversión y experiencia de usuario. Sitio web personal optimizado para SEO y performance.",
    image: "/multimedia/proyecto5/pagina-inicial.png",
    images: [
      "/multimedia/proyecto5/pagina-inicial.png",
      "/multimedia/proyecto5/servicios.png",
      "/multimedia/proyecto5/portafolio.png",
      "/multimedia/proyecto5/contacto.png"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "web",
    liveUrl: "#",
    githubUrl: "https://github.com/fdLeon-dev/fdLeon.dev",
    featured: true,
    completed: "2024-05-10",
    client: "Personal"
  },
  {
    id: "portafolio-v2",
    title: "Portafolio fdLeon-dev v2.0",
    description: "Segunda versión del portafolio personal desarrollada con React y estilos personalizados. Incluye galería de proyectos, blog integrado con documentación técnica, sección de habilidades interactiva y formulario de contacto funcional. Diseño responsive con experiencia de usuario optimizada.",
    image: "/multimedia/proyecto1/principal.png",
    images: [
      "/multimedia/proyecto1/principal.png",
      "/multimedia/proyecto1/proyectos.png",
      "/multimedia/proyecto1/blog.png",
      "/multimedia/proyecto1/contacto.png",
      "/multimedia/proyecto1/habilidades.png",
      "/multimedia/proyecto1/sobre-mi.png"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    category: "web",
    liveUrl: "https://fdleon-dev.github.io/Portafolio-2.0/",
    githubUrl: "https://github.com/fdLeon-dev/Portafolio-2.0",
    completed: "2024-02-15",
    client: "Personal"
  }
]

// Proyectos destacados para la página principal
export const featuredProjects: Project[] = projects.filter(project => project.featured)

// Proyectos por categoría
export const projectsByCategory = {
  web: projects.filter(project => project.category === "web"),
  design: projects.filter(project => project.category === "design"),
  software: projects.filter(project => project.category === "software")
}
