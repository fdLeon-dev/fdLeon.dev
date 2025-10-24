/**
 * Generador de imágenes representativas para artículos del blog
 */

// Configuración de colores por categoría
const categoryColors = {
  'Tutorial': {
    primary: '#3B82F6', // Blue
    secondary: '#1E40AF',
    accent: '#60A5FA'
  },
  'Guía': {
    primary: '#10B981', // Green
    secondary: '#047857',
    accent: '#34D399'
  },
  'Noticias': {
    primary: '#F59E0B', // Orange
    secondary: '#D97706',
    accent: '#FBBF24'
  },
  'Opinión': {
    primary: '#8B5CF6', // Purple
    secondary: '#7C3AED',
    accent: '#A78BFA'
  }
}

// Iconos por tema/tag
const themeIcons = {
  'Next.js': '⚡',
  'React': '⚛️',
  'JavaScript': '🟨',
  'TypeScript': '🔷',
  'TailwindCSS': '🎨',
  'CSS': '🎨',
  'Performance': '⚡',
  'SEO': '🔍',
  'Web Development': '🌐',
  'Frontend': '💻',
  'Backend': '⚙️',
  'Design': '🎨',
  'Marketing': '📈',
  'Freelancing': '💼',
  'Business': '💼',
  'Tutorial': '📚',
  'Guía': '🗺️',
  'Optimization': '⚡',
  'Landing Pages': '📄',
  'E-commerce': '🛒',
  'Mobile': '📱',
  'Desktop': '🖥️'
}

// Generar imagen SVG dinámica
export const generateBlogImage = (
  title: string,
  category: string,
  tags: string[],
  author: string = 'fdLeon-dev'
): string => {
  const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors['Tutorial']

  // Seleccionar icono basado en tags
  const primaryTag = tags[0] || 'Web Development'
  const icon = themeIcons[primaryTag as keyof typeof themeIcons] || '📝'

  // Truncar título si es muy largo
  const truncatedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title

  // Generar SVG
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Pattern overlay -->
      <circle cx="100" cy="100" r="50" fill="${colors.accent}" opacity="0.1"/>
      <circle cx="1100" cy="530" r="80" fill="${colors.accent}" opacity="0.1"/>
      <circle cx="200" cy="500" r="30" fill="${colors.accent}" opacity="0.15"/>
      
      <!-- Content area -->
      <rect x="80" y="80" width="1040" height="470" fill="white" fill-opacity="0.95" rx="20"/>
      
      <!-- Icon -->
      <text x="120" y="180" font-size="80" fill="${colors.primary}">${icon}</text>
      
      <!-- Category badge -->
      <rect x="120" y="200" width="120" height="35" fill="url(#accent)" rx="8"/>
      <text x="180" y="222" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">${category}</text>
      
      <!-- Title -->
      <text x="120" y="300" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#1F2937" text-anchor="start">
        ${truncatedTitle.split(' ').slice(0, 6).join(' ')}
      </text>
      ${truncatedTitle.split(' ').length > 6 ? `
        <text x="120" y="350" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#1F2937" text-anchor="start">
          ${truncatedTitle.split(' ').slice(6).join(' ')}
        </text>
      ` : ''}
      
      <!-- Author -->
      <text x="120" y="450" font-family="Arial, sans-serif" font-size="18" fill="#6B7280" text-anchor="start">Por ${author}</text>
      
      <!-- Tags -->
      <text x="120" y="480" font-family="Arial, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="start">
        ${tags.slice(0, 3).join(' • ')}
      </text>
      
      <!-- Decorative elements -->
      <rect x="1000" y="120" width="4" height="100" fill="${colors.accent}" opacity="0.6"/>
      <rect x="1000" y="250" width="4" height="60" fill="${colors.primary}" opacity="0.4"/>
      <rect x="1000" y="350" width="4" height="80" fill="${colors.accent}" opacity="0.5"/>
    </svg>
  `

  // Usar Buffer en Node.js o btoa en el navegador
  const encodedSvg = typeof window !== 'undefined'
    ? btoa(svg)
    : Buffer.from(svg, 'utf8').toString('base64')

  return `data:image/svg+xml;base64,${encodedSvg}`
}

// Generar imagen usando Unsplash API (alternativa)
export const generateUnsplashImage = async (
  title: string,
  tags: string[]
): Promise<string> => {
  const searchTerm = tags[0] || 'web development'
  const encodedTerm = encodeURIComponent(searchTerm)

  // Usar Unsplash Source API (gratuita)
  return `https://source.unsplash.com/1200x630/?${encodedTerm}&sig=${Date.now()}`
}

// Generar imagen usando placeholder
export const generatePlaceholderImage = (
  title: string,
  category: string
): string => {
  const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors['Tutorial']

  return `https://via.placeholder.com/1200x630/${colors.primary.replace('#', '')}/ffffff?text=${encodeURIComponent(title)}`
}

// Función principal para obtener imagen del blog
export const getBlogImage = async (
  post: {
    title: string
    category: string
    tags: string[]
    author?: string
    featuredImage?: string
  }
): Promise<string> => {
  // Si ya tiene imagen, usarla
  if (post.featuredImage) {
    return post.featuredImage
  }

  // Generar imagen dinámica
  return generateBlogImage(post.title, post.category, post.tags, post.author)
}

