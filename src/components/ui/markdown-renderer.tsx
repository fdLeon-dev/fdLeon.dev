'use client'

import { useState, useEffect } from 'react'
import { CodeBlock, InlineCode } from './code-block'
import { highlightCode, detectLanguage, getThemeFromContext } from '@/lib/syntax-highlighter'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [processedContent, setProcessedContent] = useState<string>('')

  useEffect(() => {
    let processed = content

    // Procesar bloques de código
    processed = processed.replace(
      /```(\w+)?\n([\s\S]*?)\n```/g,
      (match, language, code) => {
        const detectedLanguage = language || detectLanguage(code.trim())
        const theme = getThemeFromContext()
        const highlighted = highlightCode(code.trim(), detectedLanguage, theme)

        return `
          <div class="code-block-wrapper rounded-xl border bg-card shadow-lg overflow-hidden my-6">
            <div class="flex items-center justify-between px-4 py-3 border-b bg-muted/50" style="background-color: ${theme === 'dark' ? '#1e1e1e' : '#f8fafc'};">
              <div class="flex items-center gap-3">
                <span class="px-2 py-1 rounded text-xs font-medium" style="background-color: ${theme === 'dark' ? '#569cd620' : '#3b82f620'}; color: ${theme === 'dark' ? '#569cd6' : '#3b82f6'};">
                  ${detectedLanguage.toUpperCase()}
                </span>
              </div>
            </div>
            <pre class="overflow-x-auto p-4 text-sm leading-relaxed" style="background: ${theme === 'dark' ? '#1e1e1e' : '#ffffff'}; color: ${theme === 'dark' ? '#d4d4d4' : '#000000'}; font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;">
              <code class="block">${highlighted}</code>
            </pre>
          </div>
        `
      }
    )

    // Procesar código inline
    processed = processed.replace(
      /`([^`]+)`/g,
      '<code class="px-2 py-1 rounded bg-muted text-sm font-mono border" style="background-color: #f1f5f9; color: #1e293b; font-family: \'JetBrains Mono\', \'Consolas\', \'Monaco\', monospace;">$1</code>'
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

// Componente para código inline mejorado
export function InlineCodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <InlineCode className="bg-muted/50 text-foreground border border-border">
      {children}
    </InlineCode>
  )
}

