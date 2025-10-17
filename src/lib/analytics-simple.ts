// Google Analytics 4 utilities simplificado
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

/**
 * Configuración de Google Analytics 4
 */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Inicializar Google Analytics
 */
export const initGA = () => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || typeof document === 'undefined') return

  try {
    // Verificar si ya está inicializado
    if (window.gtag) return

    // Cargar el script de Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    // Inicializar gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }

    window.gtag('js', new Date())
    window.gtag('config', GA_TRACKING_ID, {
      page_location: window.location.href,
      page_title: document.title,
      send_page_view: true,
    })
  } catch (error) {
    console.warn('Error inicializando Google Analytics:', error)
  }
}

/**
 * Track performance metrics básico
 */
export const trackPerformance = () => {
  if (typeof window === 'undefined') return

  // Solo trackear eventos básicos por ahora
  window.addEventListener('load', () => {
    console.log('Page loaded, performance tracking initialized')
  })
}

