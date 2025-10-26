'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ChevronDown, ChevronRight, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { highlightCode, detectLanguage, getThemeFromContext } from '@/lib/syntax-highlighter'

interface CodeExplanationProps {
  code: string
  language?: string
  title?: string
  explanation?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeExplanation({
  code,
  language = 'javascript',
  title,
  explanation,
  showLineNumbers = true,
  className = ""
}: CodeExplanationProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [showExplanation, setShowExplanation] = useState(true)

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

  const lines = code.split('\n')
  const isLongCode = lines.length > 15

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-xl border bg-card shadow-lg overflow-hidden my-8 ${className}`}
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
            {detectedLanguage.toUpperCase()}
          </span>
          {explanation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExplanation(!showExplanation)}
              className="h-8 px-2 text-xs"
            >
              <Info className="h-3 w-3 mr-1" />
              {showExplanation ? 'Ocultar explicación' : 'Mostrar explicación'}
            </Button>
          )}
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
        <pre
          className="overflow-x-auto p-4 text-sm leading-relaxed bg-card text-foreground"
          style={{
            fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
            backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'
          }}
        >
          <code
            className="block"
            dangerouslySetInnerHTML={{
              __html: isExpanded || !isLongCode
                ? highlightedCode
                : highlightedCode.split('\n').slice(0, 15).join('\n') + '\n...'
            }}
          />
        </pre>

        {isLongCode && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>

      {/* Explanation Section */}
      {explanation && showExplanation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t bg-muted/30 px-4 py-3"
        >
          <div className="text-sm text-foreground leading-relaxed">
            <div className="font-medium text-primary mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Explicación del código:
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: explanation }} />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Componente para código inline con mejor estilo
export function InlineCodeExplanation({
  children,
  explanation,
  className = ""
}: {
  children: React.ReactNode
  explanation?: string
  className?: string
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span className="relative inline-block">
      <code
        className={`px-2 py-1 rounded bg-muted text-sm font-mono border text-foreground cursor-help ${className}`}
        style={{ fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace' }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </code>

      {explanation && showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-md shadow-lg border z-50 max-w-xs">
          <div className="font-medium mb-1">Explicación:</div>
          <div>{explanation}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
        </div>
      )}
    </span>
  )
}
