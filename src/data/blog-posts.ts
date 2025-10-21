export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  updatedAt?: string
  author: {
    name: string
    email: string
    avatar?: string
  }
  tags: string[]
  category: string
  featuredImage?: string
  readingTime: number // in minutes
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
  featured: boolean
  published: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: "nextjs-15-features",
    title: "Nuevas Características de Next.js 15: Una Guía Completa",
    slug: "nextjs-15-features",
    excerpt: "Explora las nuevas características de Next.js 15, incluyendo mejoras en performance, nuevas APIs y optimizaciones para desarrolladores.",
    content: `# Nuevas Características de Next.js 15

Next.js 15 ha llegado con una serie de mejoras significativas que hacen que el desarrollo web sea aún más eficiente y agradable.

## Características Principales

### 1. Turbopack Mejorado
Turbopack ha recibido mejoras significativas en velocidad de compilación, especialmente para proyectos grandes.

### 2. App Router Estabilizado
El App Router ahora está completamente estabilizado con mejor soporte para SSR y SSG.

### 3. Optimizaciones de Imagen
Nuevas optimizaciones automáticas para imágenes con mejor soporte para WebP y AVIF.

## Conclusión

Next.js 15 representa un paso importante hacia un desarrollo web más eficiente y moderno.`,
    publishedAt: "2025-03-15T10:00:00Z",
    author: {
      name: "fdLeon-dev",
      email: "contact@fdleon.dev",
    },
    tags: ["Next.js", "React", "JavaScript", "Web Development"],
    category: "Tutorial",
    featuredImage: "/multimedia/blog/nextjs-15-features.svg",
    readingTime: 8,
    seo: {
      metaTitle: "Nuevas Características de Next.js 15: Guía Completa 2025",
      metaDescription: "Descubre las nuevas características de Next.js 15, incluyendo Turbopack mejorado, App Router estabilizado y optimizaciones de performance.",
      keywords: ["Next.js 15", "React", "JavaScript", "Web Development", "Tutorial"]
    },
    featured: true,
    published: true
  },
  {
    id: "tailwindcss-v4-guide",
    title: "Guía Completa de TailwindCSS v4: Nuevas Características y Mejores Prácticas",
    slug: "tailwindcss-v4-guide",
    excerpt: "Una guía completa sobre TailwindCSS v4, sus nuevas características, mejoras de performance y mejores prácticas para desarrollo moderno.",
    content: `# Guía Completa de TailwindCSS v4

TailwindCSS v4 ha revolucionado la forma en que construimos interfaces de usuario modernas.

## Nuevas Características

### 1. CSS nativo
TailwindCSS v4 utiliza CSS nativo para mejor performance.

### 2. Mejor Tree Shaking
Optimizaciones mejoradas para reducir el tamaño del bundle final.

### 3. Nuevas Utilidades
Más utilidades CSS para cubrir casos de uso comunes.

## Mejores Prácticas

1. Usa el sistema de diseño consistente
2. Optimiza para performance
3. Mantén la accesibilidad en mente

## Conclusión

TailwindCSS v4 es una herramienta poderosa para crear interfaces modernas y eficientes.`,
    publishedAt: "2025-03-12T14:30:00Z",
    author: {
      name: "fdLeon-dev",
      email: "contact@fdleon.dev",
    },
    tags: ["TailwindCSS", "CSS", "Frontend", "Design System"],
    category: "Tutorial",
    featuredImage: "/multimedia/blog/tailwindcss-v4-guide.svg",
    readingTime: 12,
    seo: {
      metaTitle: "TailwindCSS v4: Guía Completa y Mejores Prácticas 2025",
      metaDescription: "Aprende todo sobre TailwindCSS v4, sus nuevas características, mejoras de performance y mejores prácticas para desarrollo frontend.",
      keywords: ["TailwindCSS v4", "CSS", "Frontend", "Design System", "Tutorial"]
    },
    featured: true,
    published: true
  },
  {
    id: "typescript-best-practices",
    title: "Mejores Prácticas de TypeScript para Desarrollo Web Moderno",
    slug: "typescript-best-practices",
    excerpt: "Descubre las mejores prácticas de TypeScript para escribir código más seguro, mantenible y escalable en aplicaciones web modernas.",
    content: `# Mejores Prácticas de TypeScript

TypeScript se ha convertido en el estándar para desarrollo web moderno.

## Configuración Recomendada

### 1. tsconfig.json Optimizado
Configuración estricta para mejor type safety.

### 2. ESLint y Prettier
Integración con herramientas de linting y formateo.

### 3. Tipos Estrictos
Uso de tipos estrictos para evitar errores en runtime.

## Patrones Avanzados

1. **Generic Types**: Para código reutilizable
2. **Utility Types**: Para transformar tipos existentes
3. **Conditional Types**: Para lógica compleja de tipos

## Conclusión

TypeScript mejora significativamente la calidad y mantenibilidad del código.`,
    publishedAt: "2025-03-08T09:15:00Z",
    author: {
      name: "fdLeon-dev",
      email: "contact@fdleon.dev",
    },
    tags: ["TypeScript", "JavaScript", "Web Development", "Best Practices"],
    category: "Tutorial",
    featuredImage: "/multimedia/blog/typescript-best-practices.svg",
    readingTime: 15,
    seo: {
      metaTitle: "TypeScript Mejores Prácticas: Guía Completa para Desarrollo Web",
      metaDescription: "Aprende las mejores prácticas de TypeScript para desarrollo web moderno. Configuración, patrones avanzados y tips para código más seguro.",
      keywords: ["TypeScript", "JavaScript", "Web Development", "Best Practices", "Programming"]
    },
    featured: false,
    published: true
  },
  {
    id: "performance-optimization-web",
    title: "Optimización de Performance Web: Guía Completa para Desarrolladores",
    slug: "performance-optimization-web",
    excerpt: "Una guía completa sobre optimización de performance web, incluyendo Core Web Vitals, técnicas de optimización y herramientas de medición.",
    content: `# Optimización de Performance Web

La performance web es crucial para el éxito de cualquier aplicación.

## Core Web Vitals

### 1. Largest Contentful Paint (LCP)
Mide la velocidad de carga del contenido principal.

### 2. First Input Delay (FID)
Mide la interactividad de la página.

### 3. Cumulative Layout Shift (CLS)
Mide la estabilidad visual.

## Técnicas de Optimización

1. **Code Splitting**: Dividir el código en chunks más pequeños
2. **Lazy Loading**: Cargar recursos solo cuando se necesiten
3. **Image Optimization**: Optimizar imágenes para web

## Herramientas de Medición

- Lighthouse
- WebPageTest
- Chrome DevTools

## Conclusión

La optimización de performance es un proceso continuo que requiere monitoreo constante.`,
    publishedAt: "2025-03-05T16:45:00Z",
    author: {
      name: "fdLeon-dev",
      email: "contact@fdleon.dev",
    },
    tags: ["Performance", "Web Development", "Optimization", "Core Web Vitals"],
    category: "Tutorial",
    featuredImage: "/multimedia/blog/performance-optimization.svg",
    readingTime: 20,
    seo: {
      metaTitle: "Optimización de Performance Web: Guía Completa 2025",
      metaDescription: "Aprende a optimizar la performance web con esta guía completa. Core Web Vitals, técnicas de optimización y herramientas de medición.",
      keywords: ["Web Performance", "Core Web Vitals", "Optimization", "Web Development", "Lighthouse"]
    },
    featured: true,
    published: true
  }
]

// Funciones de utilidad
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured && post.published)
}

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category && post.published)
}

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug && post.published)
}

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export const getAllTags = (): string[] => {
  const allTags = blogPosts
    .filter(post => post.published)
    .flatMap(post => post.tags)

  return Array.from(new Set(allTags)).sort()
}

export const getAllCategories = (): string[] => {
  const allCategories = blogPosts
    .filter(post => post.published)
    .map(post => post.category)

  return Array.from(new Set(allCategories)).sort()
}

