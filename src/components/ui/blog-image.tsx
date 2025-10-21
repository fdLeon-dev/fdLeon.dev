"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface BlogImageProps {
  src: string
  alt: string
  className?: string
  fallbackText?: string
}

/**
 * Componente especializado para imágenes del blog
 * con fallback robusto y manejo de errores mejorado
 */
export function BlogImage({
  src,
  alt,
  className,
  fallbackText
}: BlogImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const imageSrc = src

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    console.warn('Error cargando imagen:', imageSrc)
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError && imageSrc === src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-primary/60",
          className
        )}
      >
        <div className="text-center">
          <div className="text-3xl sm:text-4xl font-bold mb-2">
            {alt.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm text-muted-foreground">
            {fallbackText || "Cargando imagen..."}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center z-10">
          <div className="text-center text-primary/60">
            <div className="text-2xl font-bold mb-1 animate-pulse">
              {alt.charAt(0).toUpperCase()}
            </div>
            <div className="text-xs">Cargando...</div>
          </div>
        </div>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  )
}
