import { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "portafolio-fdleon-3",
    title: "Portafolio fdLeon-dev v3.0",
    description: "Portafolio personal moderno y profesional construido con Next.js 15, TypeScript y TailwindCSS. Incluye diseño responsive, modo oscuro, animaciones con Framer Motion y optimización SEO completa.",
    image: "/multimedia/proyecto1/main.jpg",
    images: [
      "/multimedia/proyecto1/main.jpg",
      "/multimedia/proyecto1/dark-mode.jpg",
      "/multimedia/proyecto1/mobile.jpg",
      "/multimedia/proyecto1/animations.jpg"
    ],
    technologies: ["Next.js 15", "TypeScript", "TailwindCSS v4", "Framer Motion", "React 19", "next-themes"],
    category: "web",
    liveUrl: "https://fdleon.dev",
    githubUrl: "https://github.com/fdleon/fdleon-dev",
    featured: true,
    completed: "2024-12-15",
    client: "Personal"
  },
  {
    id: "sistema-gestion-barberia",
    title: "Sistema de Gestión de Barbería",
    description: "Sistema completo de gestión para barbería con reservas online, control de citas, gestión de clientes, inventario y reportes de ventas. Incluye panel de administración y app móvil para clientes.",
    image: "/multimedia/proyecto2/main.jpg",
    images: [
      "/multimedia/proyecto2/main.jpg",
      "/multimedia/proyecto2/booking.jpg",
      "/multimedia/proyecto2/admin.jpg",
      "/multimedia/proyecto2/reports.jpg"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Socket.io", "Bootstrap"],
    category: "software",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    completed: "2024-08-15",
    client: "Barbería Local"
  },
  {
    id: "landing-page-devices",
    title: "Landing Page para Devices",
    description: "Landing page moderna y responsive para empresa de dispositivos tecnológicos. Incluye catálogo interactivo, comparador de productos, integración con sistemas de inventario y diseño optimizado para conversión.",
    image: "/multimedia/proyecto3/main.jpg",
    images: [
      "/multimedia/proyecto3/main.jpg",
      "/multimedia/proyecto3/catalog.jpg",
      "/multimedia/proyecto3/compare.jpg",
      "/multimedia/proyecto3/mobile.jpg"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery", "PHP", "MySQL"],
    category: "design",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    completed: "2024-06-20",
    client: "TechDevices S.A."
  },
  {
    id: "ecommerce-plan-ceibal",
    title: "E-commerce Plan Ceibal",
    description: "Proyecto colaborativo desarrollado durante Jóvenes a Programar. E-commerce completo para productos educativos con carrito de compras, sistema de pagos, gestión de usuarios y panel administrativo.",
    image: "/multimedia/proyecto4/main.jpg",
    images: [
      "/multimedia/proyecto4/main.jpg",
      "/multimedia/proyecto4/products.jpg",
      "/multimedia/proyecto4/checkout.jpg",
      "/multimedia/proyecto4/admin.jpg"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT", "Material-UI"],
    category: "web",
    liveUrl: "#",
    githubUrl: "#",
    completed: "2024-04-30",
    client: "Plan Ceibal - Jóvenes a Programar"
  },
  {
    id: "portafolio-v2",
    title: "Portafolio fdLeon-dev v2.0",
    description: "Segunda versión del portafolio personal desarrollada con React y estilos personalizados. Incluía galería de proyectos, blog integrado y formulario de contacto funcional.",
    image: "/multimedia/proyecto5/main.jpg",
    images: [
      "/multimedia/proyecto5/main.jpg",
      "/multimedia/proyecto5/projects.jpg",
      "/multimedia/proyecto5/blog.jpg",
      "/multimedia/proyecto5/contact.jpg"
    ],
    technologies: ["React", "JavaScript", "CSS3", "Node.js", "Express", "MongoDB", "Netlify"],
    category: "web",
    liveUrl: "#",
    githubUrl: "#",
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
