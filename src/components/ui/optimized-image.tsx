import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  style?: React.CSSProperties
}

/**
 * Componente optimizado para imágenes con lazy loading automático
 * y formatos modernos (WebP/AVIF) cuando sea posible
 */
export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  fill = false,
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generar un placeholder blur simple si no se proporciona
  const defaultBlurDataURL = blurDataURL || `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui" font-size="14">
        Cargando...
      </text>
    </svg>`
  ).toString('base64')}`

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-primary/60",
          className
        )}
        style={fill ? undefined : { width, height }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold mb-1">
            {alt.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs">Imagen no disponible</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? defaultBlurDataURL : undefined}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={handleLoad}
        onError={handleError}
        style={style}
        {...props}
      />

      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
          style={fill ? undefined : { width, height }}
        >
          <div className="text-center text-primary/60">
            <div className="text-lg font-bold mb-1">
              {alt.charAt(0).toUpperCase()}
            </div>
            <div className="text-xs animate-pulse">Cargando...</div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Hook para generar blur data URL dinámicamente
 */
export function useBlurDataURL(width: number, height: number, color: string = '#f3f4f6') {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>`
  ).toString('base64')}`
}

