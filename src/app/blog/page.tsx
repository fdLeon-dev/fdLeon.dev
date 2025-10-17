import { Metadata } from 'next'
import { BlogPreview } from '@/components/sections/blog-preview'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata("blog")

export default function BlogPage() {
  return (
    <div className="py-12 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
              Blog & <span className="cyber-gradient neon-pulse">Artículos</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto px-4">
              Comparto conocimientos sobre desarrollo web, diseño, y las últimas tendencias tecnológicas.
            </p>
          </div>

          {/* Blog Preview Component */}
          <BlogPreview />
        </div>
      </div>
    </div>
  )
}

