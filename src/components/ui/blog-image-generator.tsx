'use client'

import { useState, useEffect } from 'react'
import { generateBlogImage, getBlogImage } from '@/lib/blog-image-generator'
import { BlogPost } from '@/data/blog-posts'

interface BlogImageGeneratorProps {
  post: BlogPost
  className?: string
  showGenerator?: boolean
}

export function BlogImageGenerator({
  post,
  className = "",
  showGenerator = false
}: BlogImageGeneratorProps) {
  const [generatedImage, setGeneratedImage] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const generateImage = async () => {
      if (post.featuredImage) {
        setGeneratedImage(post.featuredImage)
        return
      }

      setIsGenerating(true)
      setError(null)

      try {
        const image = await getBlogImage({
          title: post.title,
          category: post.category,
          tags: post.tags,
          author: post.author.name,
          featuredImage: post.featuredImage
        })
        setGeneratedImage(image)
      } catch (err) {
        setError('Error generando imagen')
        console.error('Error generating blog image:', err)
      } finally {
        setIsGenerating(false)
      }
    }

    generateImage()
  }, [post])

  const handleRegenerate = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const image = generateBlogImage(
        post.title,
        post.category,
        post.tags,
        post.author.name
      )
      setGeneratedImage(image)
    } catch (err) {
      setError('Error regenerando imagen')
      console.error('Error regenerating image:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  if (isGenerating) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Generando imagen...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-lg ${className}`}>
        <div className="text-center p-8">
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRegenerate}
            className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative group ${className}`}>
      {generatedImage && (
        <img
          src={generatedImage}
          alt={`Imagen representativa: ${post.title}`}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      )}

      {showGenerator && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isGenerating ? 'Generando...' : 'Regenerar Imagen'}
          </button>
        </div>
      )}
    </div>
  )
}

// Componente para previsualizar imagen generada
export function BlogImagePreview({
  title,
  category,
  tags,
  author = 'fdLeon-dev'
}: {
  title: string
  category: string
  tags: string[]
  author?: string
}) {
  const [previewImage, setPreviewImage] = useState<string>('')

  useEffect(() => {
    const image = generateBlogImage(title, category, tags, author)
    setPreviewImage(image)
  }, [title, category, tags, author])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Vista previa de la imagen:</h3>
      {previewImage && (
        <img
          src={previewImage}
          alt="Vista previa de imagen generada"
          className="w-full rounded-lg shadow-lg"
        />
      )}
    </div>
  )
}

