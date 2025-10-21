"use client"

import { cn } from "@/lib/utils"

interface BlogImageProps {
  src: string
  alt: string
  className?: string
  fallbackText?: string
}

/**
 * Componente simple para placeholders del blog
 */
export function BlogImage({
  alt,
  className,
  fallbackText
}: BlogImageProps) {
  // Siempre mostrar el placeholder CSS
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
