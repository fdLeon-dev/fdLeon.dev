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
 * Componente para imágenes del blog con fallback
 */
export function BlogImage({
  src,
  alt,
  className,
  fallbackText
}: BlogImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  if (error) {
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
            {fallbackText || alt}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center animate-pulse z-10">
          <div className="text-center text-primary/60">
            <div className="text-2xl font-bold">
              {alt.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true)
          setLoading(false)
        }}
        loading="lazy"
      />
    </div>
  )
}
