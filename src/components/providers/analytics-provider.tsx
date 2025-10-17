"use client"

import { useEffect } from "react"
import { initGA, trackPerformance } from "@/lib/analytics"

interface AnalyticsProviderProps {
  children: React.ReactNode
}

/**
 * Provider para inicializar Google Analytics
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Inicializar Google Analytics
    initGA()

    // Inicializar tracking de performance
    trackPerformance()
  }, [])

  return <>{children}</>
}
