'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { highlightCode, detectLanguage, getThemeFromContext } from '@/lib/syntax-highlighter'

interface BriefCodeBlockProps {
  code: string
  language?: string
  note?: string
  className?: string
}

export function BriefCodeBlock({
  code,
  language = 'javascript',
  note,
  className = ""
}: BriefCodeBlockProps) {
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
    <div className={`my-4 ${className}`}>
      {/* Nota breve */}
      {note && (
        <div className="mb-2 text-sm text-gray-600 dark:text-gray-400 italic">
          💡 {note}
        </div>
      )}

      {/* Bloque de código ultra simple */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        {/* Header mínimo */}
        <div className="flex items-center justify-between px-3 py-1 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            {detectedLanguage}
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>

        {/* Código */}
        <div className="p-3">
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

// Componente para código inline ultra simple
export function BriefInlineCode({
  children,
  className = ""
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <code
      className={`px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-mono rounded border border-gray-200 dark:border-gray-700 ${className}`}
      style={{ fontFamily: 'Monaco, Consolas, monospace' }}
    >
      {children}
    </code>
  )
}
