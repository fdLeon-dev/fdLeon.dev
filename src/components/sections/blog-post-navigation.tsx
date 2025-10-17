"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface BlogPostNavigationProps {
  currentSlug: string
}

export function BlogPostNavigation({ currentSlug }: BlogPostNavigationProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = currentSlug
  const handleNavigationClick = (destination: string) => {
    trackEvent('blog_navigation', 'engagement', destination)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 pt-8 border-t"
      aria-label="Navegación del artículo"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous Post */}
        <Link
          href="/blog"
          onClick={() => handleNavigationClick('blog_list')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Todos los artículos</span>
        </Link>

        {/* Home */}
        <Link
          href="/"
          onClick={() => handleNavigationClick('home')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm font-medium">Inicio</span>
        </Link>

        {/* Next Post - Placeholder */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-50">
          <span>Próximo artículo</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      {/* Share Section */}
      <div className="mt-6 pt-6 border-t">
        <h4 className="text-sm font-medium text-foreground mb-3">Compartir este artículo</h4>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Artículo del blog',
                  url: window.location.href,
                })
              } else {
                navigator.clipboard.writeText(window.location.href)
              }
              handleNavigationClick('share')
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-sm"
          >
            <span>🔗</span>
            Copiar enlace
          </button>

          <button
            onClick={() => {
              const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Artículo interesante')}&url=${encodeURIComponent(window.location.href)}`
              window.open(twitterUrl, '_blank')
              handleNavigationClick('twitter_share')
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-sm"
          >
            <span>🐦</span>
            Twitter
          </button>

          <button
            onClick={() => {
              const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
              window.open(linkedinUrl, '_blank')
              handleNavigationClick('linkedin_share')
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-sm"
          >
            <span>💼</span>
            LinkedIn
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

