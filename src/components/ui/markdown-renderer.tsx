'use client'

import { useState, useEffect } from 'react'
import { CodeBlock, InlineCode } from './code-block'
import { CodeExplanation, InlineCodeExplanation } from './code-explanation'
import { ModernCodeBlock, ModernInlineCode } from './modern-code-block'
import { SimpleCodeBlock, SimpleInlineCode } from './simple-code-block'
import { BriefCodeBlock, BriefInlineCode } from './brief-code-block'
import { highlightCode, detectLanguage, getThemeFromContext } from '@/lib/syntax-highlighter'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [processedContent, setProcessedContent] = useState<string>('')

  useEffect(() => {
    let processed = content

    // Procesar bloques de código ultra breves
    processed = processed.replace(
      /```(\w+)?\n([\s\S]*?)\n```/g,
      (match, language, code) => {
        const detectedLanguage = language || detectLanguage(code.trim())
        const theme = getThemeFromContext()
        const highlighted = highlightCode(code.trim(), detectedLanguage, theme)

        return `
          <div class="my-4">
            <div class="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <div class="flex items-center justify-between px-3 py-1 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <span class="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  ${detectedLanguage}
                </span>
              </div>
              <div class="p-3">
                <pre class="text-sm leading-relaxed overflow-x-auto">
                  <code class="text-gray-800 dark:text-gray-200" style="font-family: 'Monaco', 'Consolas', monospace;">${highlighted}</code>
                </pre>
              </div>
            </div>
          </div>
        `
      }
    )

    // Procesar código inline ultra simple
    processed = processed.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-mono rounded border border-gray-200 dark:border-gray-700" style="font-family: \'Monaco\', \'Consolas\', monospace;">$1</code>'
    )

    // Procesar títulos
    processed = processed.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-foreground mb-4 mt-6">$1</h3>')
    processed = processed.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-foreground mb-6 mt-8">$1</h2>')
    processed = processed.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-foreground mb-8 mt-10">$1</h1>')

    // Procesar listas
    processed = processed.replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2">• $1</li>')
    processed = processed.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')

    // Procesar enlaces
    processed = processed.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary hover:text-primary/80 underline" target="_blank" rel="noopener noreferrer">$1</a>'
    )

    // Procesar texto en negrita
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')

    // Procesar texto en cursiva
    processed = processed.replace(/\*(.*?)\*/g, '<em class="italic text-muted-foreground">$1</em>')

    // Procesar párrafos
    processed = processed.replace(/^(?!<[h1-6]|<li|<div|<pre|<code)(.+)$/gim, '<p class="text-base sm:text-lg text-foreground leading-relaxed mb-4">$1</p>')

    setProcessedContent(processed)
  }, [content])

  return (
    <div
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}

// Componente específico para bloques de código
export function CodeSection({
  code,
  language = 'javascript',
  title
}: {
  code: string
  language?: string
  title?: string
}) {
  return (
    <div className="my-6">
      <CodeBlock
        code={code}
        language={language}
        title={title}
        showLineNumbers={true}
        className="shadow-lg"
      />
    </div>
  )
}

// Componente ultra breve para código
export function BriefCodeSection({
  code,
  language = 'javascript',
  note
}: {
  code: string
  language?: string
  note?: string
}) {
  return (
    <BriefCodeBlock
      code={code}
      language={language}
      note={note}
    />
  )
}

// Componente para código inline mejorado
export function InlineCodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <InlineCode className="bg-muted/50 text-foreground border border-border">
      {children}
    </InlineCode>
  )
}

