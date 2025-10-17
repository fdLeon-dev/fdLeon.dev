// Google Analytics 4 utilities
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
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
    window.gtag = function gtag(...args: unknown[]) {
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
 * Enviar evento personalizado
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

/**
 * Enviar evento de página vista
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_location: url,
      page_title: title || document.title,
    })
  }
}

/**
 * Eventos específicos del portafolio
 */
export const analytics = {
  // Eventos de navegación
  trackNavigation: (destination: string) => {
    trackEvent('navigation', 'user_interaction', destination)
  },

  // Eventos de formulario
  trackFormStart: (formName: string) => {
    trackEvent('form_start', 'engagement', formName)
  },

  trackFormSubmit: (formName: string, success: boolean) => {
    trackEvent(
      success ? 'form_submit' : 'form_error',
      'engagement',
      formName,
      success ? 1 : 0
    )
  },

  // Eventos de portafolio
  trackProjectView: (projectName: string, projectCategory: string) => {
    trackEvent('project_view', 'portfolio', `${projectCategory}_${projectName}`)
  },

  trackProjectClick: (projectName: string, linkType: 'live' | 'github') => {
    trackEvent('project_click', 'portfolio', `${projectName}_${linkType}`)
  },

  // Eventos de contacto
  trackContactClick: (method: 'email' | 'phone' | 'form') => {
    trackEvent('contact_click', 'engagement', method)
  },

  trackContactSuccess: () => {
    trackEvent('contact_success', 'conversion', 'contact_form', 1)
  },

  // Eventos de tema
  trackThemeToggle: (theme: 'light' | 'dark') => {
    trackEvent('theme_toggle', 'user_preference', theme)
  },

  // Eventos de scroll
  trackScroll: (section: string) => {
    trackEvent('scroll_to_section', 'engagement', section)
  },

  // Eventos de tiempo en página
  trackTimeOnPage: (timeInSeconds: number, page: string) => {
    trackEvent('time_on_page', 'engagement', page, timeInSeconds)
  },

  // Eventos de conversión
  trackConversion: (conversionType: string, value?: number) => {
    trackEvent('conversion', 'business', conversionType, value)
  },

  // Eventos de error
  trackError: (errorType: string, errorMessage?: string) => {
    trackEvent('error', 'technical', `${errorType}_${errorMessage || 'unknown'}`)
  }
}

/**
 * Hook para tracking automático de tiempo en página
 */
export const usePageTracking = () => {
  if (typeof window === 'undefined') return

  const startTime = Date.now()

  // Track time on page when user leaves
  const handleBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    analytics.trackTimeOnPage(timeSpent, window.location.pathname)
  }

  // Track scroll depth
  let maxScrollDepth = 0
  const handleScroll = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )

    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth

      // Track milestone scroll depths
      if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
        analytics.trackScroll('25%')
      } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
        analytics.trackScroll('50%')
      } else if (maxScrollDepth >= 75 && maxScrollDepth < 90) {
        analytics.trackScroll('75%')
      } else if (maxScrollDepth >= 90) {
        analytics.trackScroll('90%')
      }
    }
  }

  // Add event listeners
  window.addEventListener('beforeunload', handleBeforeUnload)
  window.addEventListener('scroll', handleScroll, { passive: true })

  // Cleanup function
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    window.removeEventListener('scroll', handleScroll)
  }
}

/**
 * Track performance metrics
 */
export const trackPerformance = () => {
  if (typeof window === 'undefined') return

  // Track Core Web Vitals
  window.addEventListener('load', () => {
    // First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          analytics.trackTimeOnPage(Math.round(entry.startTime), 'fcp')
        }
      }
    }).observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        analytics.trackTimeOnPage(Math.round(entry.startTime), 'lcp')
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number }
        if (!layoutShiftEntry.hadRecentInput) {
          analytics.trackTimeOnPage(Math.round((layoutShiftEntry.value || 0) * 1000), 'cls')
        }
      }
    }).observe({ entryTypes: ['layout-shift'] })
  })
}