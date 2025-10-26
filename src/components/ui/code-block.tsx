'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
  showLineNumbers?: boolean
  className?: string
}

// Paleta de colores para diferentes lenguajes
const languageColors = {
  javascript: {
    background: '#1e1e1e',
    text: '#d4d4d4',
    keyword: '#569cd6',
    string: '#ce9178',
    comment: '#6a9955',
    number: '#b5cea8',
    function: '#dcdcaa',
    variable: '#9cdcfe',
    operator: '#d4d4d4'
  },
  typescript: {
    background: '#1e1e1e',
    text: '#d4d4d4',
    keyword: '#569cd6',
    string: '#ce9178',
    comment: '#6a9955',
    number: '#b5cea8',
    function: '#dcdcaa',
    variable: '#9cdcfe',
    operator: '#d4d4d4',
    type: '#4ec9b0'
  },
  html: {
    background: '#1e1e1e',
    text: '#d4d4d4',
    tag: '#569cd6',
    attribute: '#92c5f4',
    value: '#ce9178',
    comment: '#6a9955'
  },
  css: {
    background: '#1e1e1e',
    text: '#d4d4d4',
    selector: '#d7ba7d',
    property: '#9cdcfe',
    value: '#ce9178',
    comment: '#6a9955'
  },
  json: {
    background: '#1e1e1e',
    text: '#d4d4d4',
    key: '#9cdcfe',
    string: '#ce9178',
    number: '#b5cea8',
    boolean: '#569cd6'
  },
  markdown: {
    background: '#1e1e1e',
    text: '#d4d4d4',
    heading: '#569cd6',
    bold: '#dcdcaa',
    italic: '#dcdcaa',
    code: '#ce9178',
    link: '#4ec9b0'
  }
}

// Función para resaltar sintaxis básica
const highlightSyntax = (code: string, language: string): string => {
  const colors = languageColors[language as keyof typeof languageColors] || languageColors.javascript

  let highlighted = code

  // Comentarios
  if ('comment' in colors) {
    highlighted = highlighted.replace(
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      `<span style="color: ${colors.comment}">$1</span>`
    )
  }

  // Strings
  if ('string' in colors) {
    highlighted = highlighted.replace(
      /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
      `<span style="color: ${colors.string}">$1$2$1</span>`
    )
  }

  // Números
  if ('number' in colors) {
    highlighted = highlighted.replace(
      /\b(\d+\.?\d*)\b/g,
      `<span style="color: ${colors.number}">$1</span>`
    )
  }

  if (language === 'javascript' || language === 'typescript') {
    // Keywords
    if ('keyword' in colors) {
      const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'extends', 'implements', 'interface', 'type', 'enum', 'namespace', 'module', 'declare', 'public', 'private', 'protected', 'static', 'readonly', 'abstract', 'override']

      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g')
        highlighted = highlighted.replace(regex, `<span style="color: ${colors.keyword}">${keyword}</span>`)
      })
    }

    // Funciones
    if ('function' in colors) {
      highlighted = highlighted.replace(
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,
        `<span style="color: ${colors.function}">$1</span>(`
      )
    }

    // Variables (básico)
    if ('variable' in colors) {
      highlighted = highlighted.replace(
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g,
        `<span style="color: ${colors.variable}">$1</span>=`
      )
    }
  }

  if (language === 'html') {
    // Tags
    if ('tag' in colors) {
      highlighted = highlighted.replace(
        /<(\/?)([a-zA-Z][a-zA-Z0-9]*)/g,
        `<$1<span style="color: ${colors.tag}">$2</span>`
      )
    }

    // Atributos
    if ('attribute' in colors) {
      highlighted = highlighted.replace(
        /\s([a-zA-Z-]+)=/g,
        ` <span style="color: ${colors.attribute}">$1</span>=`
      )
    }
  }

  if (language === 'css') {
    // Selectores
    if ('selector' in colors) {
      highlighted = highlighted.replace(
        /^([^{]+){/gm,
        `<span style="color: ${colors.selector}">$1</span>{`
      )
    }

    // Propiedades
    if ('property' in colors) {
      highlighted = highlighted.replace(
        /\s([a-zA-Z-]+):/g,
        ` <span style="color: ${colors.property}">$1</span>:`
      )
    }
  }

  return highlighted
}

export function CodeBlock({
  code,
  language,
  title,
  showLineNumbers = true,
  className = ""
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const colors = languageColors[language as keyof typeof languageColors] || languageColors.javascript
  const highlightedCode = highlightSyntax(code, language)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying code:', err)
    }
  }

  const lines = code.split('\n')
  const isLongCode = lines.length > 10

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-xl border bg-card shadow-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
        <div className="flex items-center gap-3">
          {title && (
            <h4 className="font-semibold text-sm text-foreground">
              {title}
            </h4>
          )}
          <span className="px-2 py-1 rounded text-xs font-medium bg-primary/20 text-primary">
            {language.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isLongCode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed bg-card text-foreground" style={{ fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace' }}>
          <code
            className="block"
            dangerouslySetInnerHTML={{
              __html: isExpanded || !isLongCode
                ? highlightedCode
                : highlightedCode.split('\n').slice(0, 10).join('\n') + '\n...'
            }}
          />
        </pre>

        {isLongCode && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>
    </motion.div>
  )
}

// Componente para código inline
export function InlineCode({
  children,
  className = ""
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <code
      className={`px-2 py-1 rounded bg-muted text-sm font-mono border text-foreground ${className}`}
      style={{
        fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace'
      }}
    >
      {children}
    </code>
  )
}

