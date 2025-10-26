'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ChevronDown, ChevronRight, Code2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { highlightCode, detectLanguage, getThemeFromContext } from '@/lib/syntax-highlighter'

interface ModernCodeBlockProps {
  code: string
  language?: string
  title?: string
  explanation?: string
  showLineNumbers?: boolean
  className?: string
}

export function ModernCodeBlock({
  code,
  language = 'javascript',
  title,
  explanation,
  showLineNumbers = true,
  className = ""
}: ModernCodeBlockProps) {
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
  const isLongCode = lines.length > 12

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative my-8 ${className}`}
    >
      {/* Container principal con diseño minimalista */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-1 shadow-xl border border-slate-200 dark:border-slate-700">

        {/* Header minimalista */}
        <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 rounded-xl border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              {title && (
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                  {title}
                </h4>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full border border-slate-200 dark:border-slate-600">
                {detectedLanguage.toUpperCase()}
              </span>
              {explanation && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="h-7 px-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  {showExplanation ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLongCode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
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
              className="h-8 w-8 p-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Código con diseño minimalista */}
        <div className="relative bg-white dark:bg-slate-800 rounded-b-xl overflow-hidden">
          <pre
            className="overflow-x-auto p-6 text-sm leading-relaxed"
            style={{
              fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, Consolas, monospace',
              fontSize: '14px',
              lineHeight: '1.7'
            }}
          >
            <code
              className="block text-slate-800 dark:text-slate-200"
              dangerouslySetInnerHTML={{
                __html: isExpanded || !isLongCode
                  ? highlightedCode
                  : highlightedCode.split('\n').slice(0, 12).join('\n') + '\n...'
              }}
            />
          </pre>

          {isLongCode && !isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-slate-800 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Explicación con diseño moderno */}
        {explanation && showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-t border-blue-200 dark:border-blue-800"
          >
            <div className="px-6 py-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <div className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                    Explicación:
                  </div>
                  <div className="prose prose-sm max-w-none dark:prose-invert prose-slate">
                    <div dangerouslySetInnerHTML={{ __html: explanation }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Componente para código inline con estilo minimalista
export function ModernInlineCode({
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
        className={`px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-mono rounded-md border border-slate-200 dark:border-slate-600 cursor-help transition-colors hover:bg-slate-200 dark:hover:bg-slate-600 ${className}`}
        style={{ fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, Consolas, monospace' }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </code>

      {explanation && showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-slate-100 text-xs rounded-lg shadow-lg border border-slate-700 z-50 max-w-xs">
          <div className="font-medium mb-1 text-blue-300">💡 Explicación:</div>
          <div>{explanation}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </span>
  )
}
