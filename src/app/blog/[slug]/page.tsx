import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/data/blog-posts'
import Link from 'next/link'
import { BlogPostContent } from '@/components/sections/blog-post-content'
import { BlogPostNavigation } from '@/components/sections/blog-post-navigation'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post no encontrado',
      description: 'El artículo que buscas no existe o ha sido movido.',
    }
  }

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    authors: [{ name: post.author.name, email: post.author.email }],
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export async function generateStaticParams() {
  // En una implementación real, esto vendría de una base de datos o CMS
  const slugs = ['nextjs-15-features', 'tailwindcss-v4-guide', 'typescript-best-practices', 'performance-optimization-web']

  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="py-12 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8 sm:mb-12">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                  <span>{post.author.name}</span>
                </div>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span>{post.readingTime} min de lectura</span>
              </div>

              {post.updatedAt && (
                <div className="text-xs">
                  Actualizado: {new Date(post.updatedAt).toLocaleDateString('es-ES')}
                </div>
              )}
            </div>
          </header>

          {/* Article Content */}
          <BlogPostContent post={post} />

          {/* Tags */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <BlogPostNavigation currentSlug={post.slug} />

          {/* Related Posts */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold text-foreground mb-6">Artículos Relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aquí irían posts relacionados */}
              <div className="rounded-lg border bg-card p-6">
                <h4 className="font-semibold text-card-foreground mb-2">
                  Próximamente: Más artículos
                </h4>
                <p className="text-sm text-muted-foreground">
                  Estamos preparando más contenido interesante para ti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

