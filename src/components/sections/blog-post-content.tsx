"use client"

import { motion } from "framer-motion"
import { BlogPost } from "@/data/blog-posts"

interface BlogPostContentProps {
  post: BlogPost
}

/**
 * Componente para renderizar el contenido de un post del blog
 * Con soporte para Markdown y componentes personalizados
 */
export function BlogPostContent({ post }: BlogPostContentProps) {
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
        duration: 0.6
      }
    }
  }

  // Función simple para convertir Markdown básico a HTML
  const parseMarkdown = (content: string) => {
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-foreground mb-6 mt-8 first:mt-0">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-foreground mb-4 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-foreground mb-3 mt-5">$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-foreground">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic text-foreground">$1</em>')
      .replace(/`(.*?)`/gim, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">$1</code>')
      .replace(/\n\n/gim, '</p><p class="text-base text-muted-foreground leading-relaxed mb-4">')
      .replace(/^(?!<[h1-6]|<\/p>|<code|<\/code>|<strong|<\/strong>|<em|<\/em>)(.*)$/gim, '<p class="text-base text-muted-foreground leading-relaxed mb-4">$1</p>')
  }

  const htmlContent = parseMarkdown(post.content)

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="prose prose-lg max-w-none"
    >
      {/* Featured Image */}
      {post.featuredImage && (
        <motion.div variants={itemVariants} className="mb-8">
          <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="h-full w-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary/80 mb-2">
                  {post.title.charAt(0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Imagen destacada
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        variants={itemVariants}
        className="space-y-6"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Author Bio */}
      <motion.div
        variants={itemVariants}
        className="mt-12 pt-8 border-t"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-medium text-primary">
              {post.author.name.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              Escrito por {post.author.name}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Desarrollador web y diseñador con pasión por crear experiencias digitales excepcionales.
              Especializado en tecnologías modernas como React, Next.js y TypeScript.
            </p>
            <div className="mt-3">
              <a
                href={`mailto:${post.author.email}`}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                {post.author.email}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

