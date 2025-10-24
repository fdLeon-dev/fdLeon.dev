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
  },
  {
    id: "landing-page-conversion",
    title: "Cómo Crear Landing Pages que Convierten: Guía Completa 2025",
    slug: "landing-page-conversion",
    excerpt: "Aprende los secretos para crear landing pages que convierten visitantes en clientes. Desde el diseño hasta la optimización, todo lo que necesitas saber.",
    content: `# Cómo Crear Landing Pages que Convierten: Guía Completa 2025

Las landing pages son la puerta de entrada a tu negocio digital. Una landing page bien diseñada puede aumentar tus conversiones hasta un 300%. En esta guía completa, te enseñaré todo lo que necesitas saber.

## 1. Fundamentos de una Landing Page Efectiva

### Elementos Clave

Una landing page exitosa debe incluir:

- **Headline claro y convincente**
- **Beneficios, no características**
- **Call-to-Action prominente**
- **Prueba social**
- **Formulario optimizado**

### Psicología del Diseño

\`\`\`css
/* Jerarquía visual clara */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 4rem 0;
}

.cta-button {
  background: #ff6b6b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
}
\`\`\`

## 2. Optimización Técnica

### Performance

\`\`\`javascript
// Lazy loading de imágenes
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
\`\`\`

### SEO Técnico

\`\`\`html
<!-- Meta tags optimizados -->
<meta name="description" content="Descripción clara de tu oferta">
<meta property="og:title" content="Título atractivo">
<meta property="og:description" content="Descripción para redes sociales">
<meta property="og:image" content="URL de imagen destacada">

<!-- Schema markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Tu Landing Page",
  "description": "Descripción de tu oferta"
}
</script>
\`\`\`

## 3. Testing y Optimización

### A/B Testing

\`\`\`javascript
// Ejemplo de A/B test simple
const variant = Math.random() < 0.5 ? 'A' : 'B';

if (variant === 'A') {
  document.querySelector('.headline').textContent = 'Versión A del headline';
} else {
  document.querySelector('.headline').textContent = 'Versión B del headline';
}

// Tracking de conversiones
function trackConversion(variant) {
  gtag('event', 'conversion', {
    'event_category': 'landing_page',
    'event_label': variant
  });
}
\`\`\`

## 4. Herramientas Recomendadas

### Diseño
- **Figma** - Diseño colaborativo
- **Adobe XD** - Prototipado
- **Sketch** - Diseño para Mac

### Desarrollo
- **Next.js** - Framework React
- **Tailwind CSS** - Estilos utilitarios
- **Framer Motion** - Animaciones

### Analytics
- **Google Analytics 4** - Métricas básicas
- **Hotjar** - Heatmaps y grabaciones
- **Google Optimize** - A/B testing

## 5. Casos de Estudio

### Caso 1: E-commerce
- **Antes**: 2.3% conversión
- **Después**: 7.8% conversión
- **Cambios**: Headline más claro, CTA más prominente

### Caso 2: SaaS
- **Antes**: 1.5% conversión
- **Después**: 4.2% conversión
- **Cambios**: Formulario simplificado, prueba social

## Conclusión

Crear landing pages que convierten es una combinación de arte y ciencia. Implementa estos consejos, mide los resultados y optimiza continuamente. Recuerda: cada pequeño cambio puede tener un gran impacto en tus conversiones.`,
    publishedAt: "2025-03-25T10:00:00Z",
    author: {
      name: "fdLeon-dev",
      email: "contact@fdleon.dev",
    },
    tags: ["Landing Pages", "Conversión", "Marketing", "Diseño", "SEO"],
    category: "Tutorial",
    featuredImage: "/multimedia/blog/landing-page-conversion.svg",
    readingTime: 15,
    seo: {
      metaTitle: "Cómo Crear Landing Pages que Convierten: Guía 2025",
      metaDescription: "Aprende a crear landing pages que convierten visitantes en clientes. Diseño, optimización y casos de estudio incluidos.",
      keywords: ["Landing Pages", "Conversión", "Marketing Digital", "Diseño Web", "SEO"]
    },
    featured: true,
    published: true
  },
  {
    id: "freelancer-guide",
    title: "Guía Completa para Empezar como Freelancer en Desarrollo Web",
    slug: "freelancer-guide",
    excerpt: "Todo lo que necesitas saber para comenzar tu carrera como freelancer en desarrollo web. Desde encontrar clientes hasta fijar precios.",
    content: `# Guía Completa para Empezar como Freelancer en Desarrollo Web

¿Sueñas con trabajar desde casa, ser tu propio jefe y tener libertad financiera? El freelancing en desarrollo web puede ser tu camino. En esta guía completa, te mostraré todo lo que necesitas saber.

## 1. Preparación Inicial

### Habilidades Técnicas Esenciales

**Frontend:**
- HTML5, CSS3, JavaScript
- React, Vue.js o Angular
- Responsive Design
- SEO básico

**Backend (opcional pero recomendado):**
- Node.js, Python o PHP
- Bases de datos (MySQL, MongoDB)
- APIs REST

**Herramientas:**
- Git y GitHub
- Figma o Adobe XD
- Vercel, Netlify (hosting)

### Portfolio Profesional

\`\`\`html
<!-- Ejemplo de estructura de portfolio -->
<section class="project-showcase">
  <div class="project-card">
    <img src="project-screenshot.jpg" alt="Proyecto">
    <h3>E-commerce Moderno</h3>
    <p>Tienda online con React y Node.js</p>
    <div class="tech-stack">
      <span class="tech-tag">React</span>
      <span class="tech-tag">Node.js</span>
      <span class="tech-tag">MongoDB</span>
    </div>
    <a href="#" class="project-link">Ver Proyecto</a>
  </div>
</section>
\`\`\`

## 2. Encontrar Clientes

### Plataformas de Freelancing

**Upwork:**
- Pros: Muchos proyectos, pago garantizado
- Contras: Competencia alta, comisiones altas
- Estrategia: Perfil optimizado, propuestas personalizadas

**Fiverr:**
- Pros: Fácil de empezar, sistema de reviews
- Contras: Precios bajos, competencia por precio
- Estrategia: Gigs específicos, precios competitivos

**Freelancer:**
- Pros: Variedad de proyectos
- Contras: Mucha competencia de países con costos bajos
- Estrategia: Enfocarse en calidad, no precio

### Networking Local

\`\`\`javascript
// Ejemplo de email de networking
const networkingEmail = \`
Asunto: Desarrollador web local disponible para proyectos

Hola [Nombre],

Soy [Tu nombre], desarrollador web con [X] años de experiencia.
Vi tu empresa [Nombre empresa] y me gustaría ofrecer mis servicios.

Especialidades:
- Sitios web responsivos
- E-commerce
- Aplicaciones web

¿Te interesaría una consulta gratuita de 30 minutos?

Saludos,
[Tu nombre]
\`;
\`\`\`

## 3. Fijar Precios

### Estrategias de Precios

**Por Proyecto:**
- Landing page: $500-2000
- Sitio web corporativo: $1500-5000
- E-commerce: $3000-10000

**Por Hora:**
- Junior: $25-50/hora
- Mid-level: $50-100/hora
- Senior: $100-200/hora

**Por Valor:**
- Calcular ROI del cliente
- Precio basado en resultados
- Proyectos de alto valor

### Calculadora de Precios

\`\`\`javascript
function calculateProjectPrice(complexity, hours, hourlyRate) {
  const basePrice = hours * hourlyRate;
  const complexityMultiplier = {
    'simple': 1.0,
    'medium': 1.5,
    'complex': 2.0
  };
  
  return basePrice * complexityMultiplier[complexity];
}

// Ejemplo: Proyecto complejo, 40 horas, $75/hora
const price = calculateProjectPrice('complex', 40, 75);
console.log(\`Precio sugerido: $\${price}\`); // $6,000
\`\`\`

## 4. Gestión de Proyectos

### Herramientas Esenciales

**Gestión:**
- Trello o Asana
- Slack para comunicación
- Google Drive para archivos

**Desarrollo:**
- GitHub para código
- Vercel para deployment
- Figma para diseño

**Facturación:**
- FreshBooks o QuickBooks
- PayPal o Stripe para pagos
- Contratos en DocuSign

### Proceso de Trabajo

\`\`\`markdown
## Flujo de Trabajo Estándar

1. **Consulta inicial** (30 min gratis)
2. **Propuesta detallada** (1-2 días)
3. **Contrato y pago inicial** (50%)
4. **Diseño y aprobación** (1 semana)
5. **Desarrollo** (2-4 semanas)
6. **Testing y ajustes** (1 semana)
7. **Entrega y pago final** (50%)
8. **Soporte post-entrega** (30 días)
\`\`\`

## 5. Marketing Personal

### Redes Sociales

**LinkedIn:**
- Perfil profesional completo
- Contenido técnico regular
- Networking con otros freelancers

**Twitter:**
- Compartir proyectos
- Participar en conversaciones técnicas
- Seguir a líderes de la industria

**Instagram:**
- Behind the scenes
- Procesos de trabajo
- Resultados visuales

### Contenido y Autoridad

\`\`\`javascript
// Ejemplo de post técnico
const blogPost = \`
# Cómo Optimizar el Performance de tu Sitio Web

## 1. Compresión de Imágenes
- Usar WebP cuando sea posible
- Lazy loading implementado
- CDN para assets estáticos

## 2. Código Optimizado
- Minificación de CSS/JS
- Tree shaking en React
- Code splitting

## 3. Herramientas de Medición
- Google PageSpeed Insights
- Lighthouse
- WebPageTest
\`;
\`\`\`

## 6. Escalamiento

### De Freelancer a Agencia

**Fase 1: Establecimiento**
- 3-5 clientes recurrentes
- Proceso estandarizado
- Herramientas implementadas

**Fase 2: Crecimiento**
- Contratar desarrolladores
- Especialización en nichos
- Precios premium

**Fase 3: Escalamiento**
- Equipo de 5-10 personas
- Múltiples servicios
- Clientes enterprise

### Automatización

\`\`\`javascript
// Ejemplo de automatización de propuestas
const autoProposal = {
  template: \`
Hola [Cliente],

Vi tu proyecto de [Tipo de proyecto] y me interesa ayudarte.

Mi experiencia:
- [X] años desarrollando [Tecnología]
- [Número] proyectos similares completados
- Portfolio: [URL]

¿Te gustaría una consulta gratuita de 30 minutos?

Saludos,
[Tu nombre]
\`,
  
  personalize: (clientName, projectType) => {
    return this.template
      .replace('[Cliente]', clientName)
      .replace('[Tipo de proyecto]', projectType);
  }
};
\`\`\`

## Conclusión

El freelancing en desarrollo web es una carrera viable y gratificante. Requiere preparación, paciencia y persistencia, pero los resultados pueden ser extraordinarios. Comienza con un plan sólido, mantén la calidad alta y nunca dejes de aprender.

**Próximos pasos:**
1. Crea tu portfolio
2. Establece tu presencia online
3. Comienza a hacer networking
4. Aplica a proyectos pequeños
5. Construye tu reputación

¡El éxito como freelancer está a tu alcance!`,
    publishedAt: "2025-03-28T10:00:00Z",
    author: {
      name: "fdLeon-dev",
      email: "contact@fdleon.dev",
    },
    tags: ["Freelancing", "Desarrollo Web", "Negocios", "Carrera", "Emprendimiento"],
    category: "Guía",
    featuredImage: "/multimedia/blog/freelancer-guide.svg",
    readingTime: 18,
    seo: {
      metaTitle: "Guía Completa para Empezar como Freelancer en Desarrollo Web 2025",
      metaDescription: "Aprende todo lo necesario para comenzar tu carrera como freelancer en desarrollo web. Desde habilidades hasta encontrar clientes.",
      keywords: ["Freelancing", "Desarrollo Web", "Trabajo Remoto", "Emprendimiento", "Carrera"]
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

