"use client"

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error para debugging
    console.error('Error en la aplicación:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          ¡Ups! Algo salió mal
        </h1>
        <p className="text-muted-foreground mb-6">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo o regresa a la página principal.
        </p>

        {/* Error Details (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 rounded-lg bg-muted text-left">
            <p className="text-xs text-muted-foreground mb-2">Error details:</p>
            <code className="text-xs text-red-600 dark:text-red-400 break-all">
              {error.message}
            </code>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="outline"
            className="group"
          >
            <RefreshCw className="w-4 h-4 mr-2 group-hover:animate-spin" />
            Intentar de nuevo
          </Button>

          <Button asChild>
            <Link href="/" className="group">
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t">
          <p className="text-xs text-muted-foreground">
            Si el problema persiste, puedes{' '}
            <a
              href="/contact"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              contactarme
            </a>{' '}
            para reportar el error.
          </p>
        </div>
      </div>
    </div>
  )
}

