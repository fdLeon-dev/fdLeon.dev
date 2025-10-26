'use client'

import { useState } from 'react'
import { Copy, Check, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { highlightCode, detectLanguage, getThemeFromContext } from '@/lib/syntax-highlighter'

interface SimpleCodeBlockProps {
  code: string
  language?: string
  title?: string
  description?: string
  className?: string
}

export function SimpleCodeBlock({
  code,
  language = 'javascript',
  title,
  description,
  className = ""
}: SimpleCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const detectedLanguage = language || detectLanguage(code.trim())
  const theme = getThemeFromContext()
  const highlightedCode = highlightCode(code.trim(), detectedLanguage, theme)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying code:', err)
    }
  }

  return (
    <div className={`my-6 ${className}`}>
      {/* Descripción breve */}
      {description && (
        <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      )}

      {/* Bloque de código simple */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Header simple */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {title}
              </span>
            )}
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
              {detectedLanguage}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 w-7 p-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>

        {/* Código */}
        <div className="p-4">
          <pre className="text-sm leading-relaxed overflow-x-auto">
            <code
              className="text-gray-800 dark:text-gray-200"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
              style={{ fontFamily: 'Monaco, Consolas, monospace' }}
            />
          </pre>
        </div>
      </div>
    </div>
  )
}

// Componente para código inline simple
export function SimpleInlineCode({
  children,
  description,
  className = ""
}: {
  children: React.ReactNode
  description?: string
  className?: string
}) {
  return (
    <span className="relative group">
      <code
        className={`px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-mono rounded border border-gray-200 dark:border-gray-700 ${className}`}
        style={{ fontFamily: 'Monaco, Consolas, monospace' }}
      >
        {children}
      </code>

      {description && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-gray-100 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
          {description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </span>
  )
}
