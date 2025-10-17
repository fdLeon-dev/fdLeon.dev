import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md mx-auto px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl sm:text-9xl font-bold text-primary/20 mb-4">
            404
          </div>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Página no encontrada
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida.
          Verifica la URL o regresa a la página principal.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="group">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Link>
          </Button>

          <Button asChild variant="outline" className="group">
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver atrás
            </Link>
          </Button>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Enlaces populares
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/portfolio"
              className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Portafolio
            </Link>
            <Link
              href="/blog"
              className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Contacto
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8">
          <p className="text-xs text-muted-foreground mb-2">
            ¿Buscas algo específico?
          </p>
          <Button asChild variant="ghost" size="sm" className="group">
            <Link href="/blog">
              <Search className="w-3 h-3 mr-1" />
              Explorar blog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

