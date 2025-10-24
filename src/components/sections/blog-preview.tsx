"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react"
import { getRecentPosts, getAllTags, getAllCategories } from "@/data/blog-posts"
import { trackEvent } from "@/lib/analytics"
import { BlogImage } from "@/components/ui/blog-image"
// import { BlogImageGenerator } from "@/components/ui/blog-image-generator"

export function BlogPreview() {
  const recentPosts = getRecentPosts(3)
  const allTags = getAllTags()
  const allCategories = getAllCategories()

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const handlePostClick = (postTitle: string) => {
    try {
      trackEvent('blog_post_click', 'engagement', postTitle)
    } catch (error) {
      console.warn('Error tracking post click:', error)
    }
  }

  const handleTagClick = (tag: string) => {
    try {
      trackEvent('blog_tag_click', 'engagement', tag)
    } catch (error) {
      console.warn('Error tracking tag click:', error)
    }
  }

  const handleCategoryClick = (category: string) => {
    try {
      trackEvent('blog_category_click', 'engagement', category)
    } catch (error) {
      console.warn('Error tracking category click:', error)
    }
  }

  return (
    <div className="space-y-12">
      {/* Posts Recientes */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recentPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full neon-hover neon-bg"
            >
              {/* Featured Image */}
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 relative">
                <BlogImage
                  src={post.featuredImage || '/images/blog/placeholder.svg'}
                  alt={post.title}
                  className="w-full h-full"
                />
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTime} min</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </button>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{post.tags.length - 3} más
                    </span>
                  )}
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  onClick={() => handlePostClick(post.title)}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                >
                  Leer más
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* Categories and Tags */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Categories */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-6 sm:p-8">
          <h3 className="text-xl font-bold text-card-foreground mb-4">Categorías</h3>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div variants={itemVariants} className="rounded-2xl border bg-card p-6 sm:p-8">
          <h3 className="text-xl font-bold text-card-foreground mb-4">Tags Populares</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 12).map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </button>
            ))}
          </div>
          {allTags.length > 12 && (
            <p className="text-xs text-muted-foreground mt-3">
              Y {allTags.length - 12} tags más...
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-2xl border bg-gradient-to-r from-primary/5 to-primary/10 p-6 sm:p-8 text-center"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Mantente al día
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
          Suscríbete para recibir los últimos artículos sobre desarrollo web, diseño y tecnología directamente en tu inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Tu email"
            className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <button className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Suscribirse
          </button>
        </div>
      </motion.div>
    </div>
  )
}

