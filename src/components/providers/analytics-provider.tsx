"use client"

import { useEffect } from "react"

interface AnalyticsProviderProps {
  children: React.ReactNode
}

/**
 * Provider para analytics con valores temporales
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Solo inicializar en el cliente
    if (typeof window !== 'undefined') {
      console.log('Analytics inicializado con valores temporales')

      // Inicializar gtag básico para evitar errores
      window.dataLayer = window.dataLayer || []
      window.gtag = window.gtag || function (...args: unknown[]) {
        window.dataLayer.push(args)
      }
    }
  }, [])

  return <>{children}</>
}
