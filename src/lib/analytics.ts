'use client'

// Google Analytics 4 utilities
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
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
  if (!GA_TRACKING_ID || typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  try {
    // Verificar si ya está inicializado
    if (window.dataLayer && window.dataLayer.length > 0) {
      return
    }

    // Inicializar dataLayer
    window.dataLayer = window.dataLayer || []

    // Definir gtag de forma segura
    window.gtag = function gtag(...args: unknown[]) {
      if (window.dataLayer) {
        window.dataLayer.push(args)
      }
    }

    // Cargar el script de Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    // Configurar gtag
    if (window.gtag) {
      window.gtag('js', new Date())
      window.gtag('config', GA_TRACKING_ID, {
        page_location: window.location.href,
        page_title: document.title,
        send_page_view: true,
      })
    }
  } catch (error) {
    console.warn('Error inicializando Google Analytics:', error)
  }
}

/**
 * Enviar evento personalizado
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params)
  } else {
    console.log("Analytics event:", eventName, params)
  }
}

export const handleContactForm = (formData: {
  name: string
  email: string
  subject: string
}) => {
  trackEvent('contact_form_submission', {
    form_name: formData.name,
    form_email: formData.email,
    form_subject: formData.subject,
    timestamp: new Date().toISOString()
  })
}

/**
 * Enviar evento de página vista
 */
export const trackPageView = (url: string, title?: string) => {
  try {
    if (typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function') {
      window.gtag('config', GA_TRACKING_ID!, {
        page_location: url,
        page_title: title || document.title,
      })
    }
  } catch (error) {
    console.warn('Error tracking page view:', error)
  }
}

/**
 * Eventos específicos del portafolio
 */
export const analytics = {
  /**
   * Trackea clics en proyectos del portafolio.
   * @param projectName - nombre del proyecto clickeado
   * @param linkType - tipo de enlace ('live' o 'github')
   */
  trackProjectClick: (projectName: string, linkType?: "live" | "github") => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "project_click", {
        project_name: projectName,
        link_type: linkType || "unknown",
      })
    } else {
      trackEvent("project_click", {
        category: "portfolio",
        project_name: projectName,
        link_type: linkType || "unknown",
      })
    }
  },

  /**
   * Trackea la navegación a secciones del sitio.
   */
  trackNavigation: (section: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "navigation", {
        section,
      })
    } else {
      trackEvent("navigation", { section })
    }
  },

  /**
   * Trackea cuando el usuario hace clic en el botón de “Ver todos los proyectos”.
   */
  trackViewAllProjects: () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "view_all_projects")
    } else {
      trackEvent("view_all_projects")
    }
  },

  // Eventos de formulario
  trackFormStart: (formName: string) => {
    trackEvent('form_start', {
      category: 'engagement',
      form_name: formName
    })
  },

  trackFormSubmit: (formName: string, success: boolean) => {
    trackEvent(success ? 'form_submit' : 'form_error', {
      category: 'engagement',
      form_name: formName,
      success: success
    })
  },


  // Eventos de contacto
  trackContactClick: (contactMethod: string) => {
    trackEvent('contact_click', {
      category: 'engagement',
      contact_method: contactMethod
    })
  },

  trackContactSuccess: () => {
    trackEvent('contact_success', {
      category: 'conversion',
      contact_method: 'contact_form'
    })
  },

  // Eventos de tema
  trackThemeToggle: (themeName: string) => {
    trackEvent('theme_toggle', {
      category: 'user_preference',
      theme_name: themeName
    })
  },

  // Eventos de scroll
  trackScroll: (section: string) => {
    trackEvent('scroll_to_section', {
      category: 'engagement',
      section_name: section
    })
  },

  // Eventos de tiempo en página
  trackTimeOnPage: (timeInSeconds: number, metricName?: string) => {
    trackEvent('time_on_page', {
      category: 'engagement',
      time_in_seconds: timeInSeconds,
      metric_name: metricName || 'general'
    })
  },


  // Eventos de conversión
  trackConversion: (conversionName: string) => {
    trackEvent('conversion', {
      category: 'business',
      conversion_name: conversionName
    })
  },

  // Eventos de error
  trackError: (errorName: string) => {
    trackEvent('error', {
      category: 'technical',
      error_name: errorName
    })
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
    analytics.trackTimeOnPage(timeSpent)

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

/**
 * Track contact form submission
 */
export const trackContactFormSubmission = (formData: {
  name: string
  email: string
  subject: string
}) => {
  trackEvent('contact_form_submission', {
    form_name: formData.name,
    form_email: formData.email,
    form_subject: formData.subject,
    timestamp: new Date().toISOString()
  })
}

/**
 * Track contact form success
 */
export const trackContactFormSuccess = (formData: {
  name: string
  email: string
  subject: string
}) => {
  trackEvent('contact_form_success', {
    form_name: formData.name,
    form_email: formData.email,
    form_subject: formData.subject,
    timestamp: new Date().toISOString()
  })
}

/**
 * Track contact form error
 */
export const trackContactFormError = (error: string, formData?: {
  name?: string
  email?: string
  subject?: string
}) => {
  trackEvent('contact_form_error', {
    error_message: error,
    form_name: formData?.name || 'unknown',
    form_email: formData?.email || 'unknown',
    form_subject: formData?.subject || 'unknown',
    timestamp: new Date().toISOString()
  })
}

/**
 * Track sorteo participation
 */
export const trackSorteoParticipation = (participantData: {
  name: string
  email: string
  business?: string
}) => {
  trackEvent('sorteo_participation', {
    participant_name: participantData.name,
    participant_email: participantData.email,
    participant_business: participantData.business || 'unknown',
    timestamp: new Date().toISOString()
  })
}

/**
 * Track blog subscription
 */
export const trackBlogSubscription = (subscriberData: {
  email: string
  source: string
}) => {
  trackEvent('blog_subscription', {
    subscriber_email: subscriberData.email,
    subscription_source: subscriberData.source,
    timestamp: new Date().toISOString()
  })
}

export default analytics