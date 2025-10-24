"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  BookOpen,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon
} from 'lucide-react'
import { BlogPost } from '@/data/blog-posts'
// import { BlogImageGenerator } from '@/components/ui/blog-image-generator'
import { BlogImage } from '@/components/ui/blog-image'
import { CodeBlock } from '@/components/ui/code-block'
import { MarkdownRenderer } from '@/components/ui/markdown-renderer'

interface BlogPostFullProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export function BlogPostFull({ post, relatedPosts }: BlogPostFullProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <motion.nav variants={itemVariants} className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" />
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium line-clamp-1" aria-current="page">
              {post.title}
            </li>
          </ol>
        </motion.nav>

        {/* Category Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20">
            <Tag className="h-4 w-4" />
            {post.category}
          </span>
        </motion.div>

        {/* Article Header */}
        <motion.header variants={itemVariants} className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author and Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-6 border-b">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">Desarrollador Web</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              <time dateTime={post.publishedAt} className="text-sm">
                {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm">{post.readingTime} min de lectura</span>
            </div>

            {/* Word Count */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm">{post.content.split(' ').length} palabras</span>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <div className="aspect-video overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl shadow-primary/10 relative group">
            <BlogImage
              src={post.featuredImage || '/images/blog/placeholder.svg'}
              alt={post.title}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          variants={itemVariants}
          className="prose prose-lg max-w-none mb-12"
        >
          <div className="rounded-2xl border bg-card p-6 sm:p-8 lg:p-10 shadow-lg">
            <MarkdownRenderer
              content={post.content}
              className="text-foreground leading-relaxed"
            />
          </div>
        </motion.article>

        {/* Tags */}
        <motion.div variants={itemVariants} className="mb-8 p-6 rounded-2xl border bg-gradient-to-br from-card to-card/50">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          variants={itemVariants}
          className="mb-12 p-6 sm:p-8 rounded-2xl border bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Share2 className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Compartir artículo</h3>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${post.title}&url=${shareUrl}`, '_blank')}
                className="p-3 rounded-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 text-white transition-all hover:scale-110 shadow-lg"
                aria-label="Compartir en Twitter"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
                className="p-3 rounded-full bg-[#1877F2] hover:bg-[#1877F2]/80 text-white transition-all hover:scale-110 shadow-lg"
                aria-label="Compartir en Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
                className="p-3 rounded-full bg-[#0A66C2] hover:bg-[#0A66C2]/80 text-white transition-all hover:scale-110 shadow-lg"
                aria-label="Compartir en LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-all hover:scale-110 shadow-lg"
                aria-label="Copiar enlace"
              >
                <LinkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Artículos relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 2).map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group rounded-xl border bg-card p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(relatedPost.publishedAt).toLocaleDateString('es-ES', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {relatedPost.readingTime} min
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div variants={itemVariants} className="pt-8 border-t">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:gap-3 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver al Blog
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

