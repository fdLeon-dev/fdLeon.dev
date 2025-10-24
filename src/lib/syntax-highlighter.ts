/**
 * Resaltador de sintaxis avanzado para código
 */

// Paleta de colores VS Code Dark
export const VS_CODE_COLORS = {
  background: '#1e1e1e',
  foreground: '#d4d4d4',
  keyword: '#569cd6',
  string: '#ce9178',
  comment: '#6a9955',
  number: '#b5cea8',
  function: '#dcdcaa',
  variable: '#9cdcfe',
  operator: '#d4d4d4',
  type: '#4ec9b0',
  tag: '#569cd6',
  attribute: '#92c5f4',
  selector: '#d7ba7d',
  property: '#9cdcfe',
  boolean: '#569cd6',
  null: '#569cd6',
  regex: '#d16969',
  escape: '#d7ba7d'
}

// Paleta de colores VS Code Light
export const VS_CODE_LIGHT_COLORS = {
  background: '#ffffff',
  foreground: '#000000',
  keyword: '#0000ff',
  string: '#a31515',
  comment: '#008000',
  number: '#098658',
  function: '#795e26',
  variable: '#001080',
  operator: '#000000',
  type: '#267f99',
  tag: '#800000',
  attribute: '#ff0000',
  selector: '#800000',
  property: '#0451a5',
  boolean: '#0000ff',
  null: '#0000ff',
  regex: '#811f3f',
  escape: '#0000ff'
}

// Keywords por lenguaje
export const LANGUAGE_KEYWORDS = {
  javascript: [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
    'do', 'switch', 'case', 'default', 'break', 'continue', 'try', 'catch',
    'finally', 'throw', 'new', 'this', 'super', 'class', 'extends', 'import',
    'export', 'from', 'async', 'await', 'Promise', 'true', 'false', 'null',
    'undefined', 'typeof', 'instanceof', 'in', 'of', 'delete', 'void'
  ],
  typescript: [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
    'do', 'switch', 'case', 'default', 'break', 'continue', 'try', 'catch',
    'finally', 'throw', 'new', 'this', 'super', 'class', 'extends', 'import',
    'export', 'from', 'async', 'await', 'Promise', 'true', 'false', 'null',
    'undefined', 'typeof', 'instanceof', 'in', 'of', 'delete', 'void',
    'interface', 'type', 'enum', 'namespace', 'module', 'declare', 'public',
    'private', 'protected', 'static', 'readonly', 'abstract', 'override',
    'implements', 'extends', 'keyof', 'typeof', 'infer', 'extends', 'as',
    'satisfies', 'const', 'asserts', 'is', 'never', 'unknown', 'any', 'void'
  ],
  html: [
    'html', 'head', 'body', 'title', 'meta', 'link', 'script', 'style',
    'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img',
    'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'form', 'input', 'button',
    'textarea', 'select', 'option', 'label', 'fieldset', 'legend'
  ],
  css: [
    'margin', 'padding', 'border', 'width', 'height', 'color', 'background',
    'font', 'text', 'display', 'position', 'top', 'right', 'bottom', 'left',
    'float', 'clear', 'overflow', 'z-index', 'opacity', 'visibility', 'cursor',
    'pointer-events', 'user-select', 'box-sizing', 'flex', 'grid', 'transform',
    'transition', 'animation', 'keyframes', 'media', 'import', 'url', 'calc',
    'var', 'attr', 'counter', 'counters', 'content', 'quotes', 'list-style'
  ]
}

// Función principal de resaltado
export const highlightCode = (
  code: string,
  language: string,
  theme: 'dark' | 'light' = 'dark'
): string => {
  const colors = theme === 'dark' ? VS_CODE_COLORS : VS_CODE_LIGHT_COLORS
  const keywords = LANGUAGE_KEYWORDS[language as keyof typeof LANGUAGE_KEYWORDS] || []

  let highlighted = code

  // Comentarios de línea y bloque
  highlighted = highlighted.replace(
    /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    `<span style="color: ${colors.comment}">$1</span>`
  )

  // Strings (simples, dobles y template literals)
  highlighted = highlighted.replace(
    /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
    `<span style="color: ${colors.string}">$1$2$1</span>`
  )

  // Números (enteros, decimales, hexadecimales, binarios)
  highlighted = highlighted.replace(
    /\b(0x[0-9a-fA-F]+|0b[01]+|\d+\.?\d*)\b/g,
    `<span style="color: ${colors.number}">$1</span>`
  )

  // Booleanos y null
  highlighted = highlighted.replace(
    /\b(true|false|null|undefined)\b/g,
    `<span style="color: ${colors.boolean}">$1</span>`
  )

  // Keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g')
    highlighted = highlighted.replace(regex, `<span style="color: ${colors.keyword}">${keyword}</span>`)
  })

  // Funciones
  highlighted = highlighted.replace(
    /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,
    `<span style="color: ${colors.function}">$1</span>(`
  )

  // Variables y propiedades
  highlighted = highlighted.replace(
    /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*[:=]/g,
    `<span style="color: ${colors.variable}">$1</span>$2`
  )

  // Operadores
  highlighted = highlighted.replace(
    /([+\-*/%=<>!&|^~?:;,])/g,
    `<span style="color: ${colors.operator}">$1</span>`
  )

  // HTML específico
  if (language === 'html') {
    // Tags
    highlighted = highlighted.replace(
      /<(\/?)([a-zA-Z][a-zA-Z0-9]*)/g,
      `<$1<span style="color: ${colors.tag}">$2</span>`
    )

    // Atributos
    highlighted = highlighted.replace(
      /\s([a-zA-Z-]+)=/g,
      ` <span style="color: ${colors.attribute}">$1</span>=`
    )
  }

  // CSS específico
  if (language === 'css') {
    // Selectores
    highlighted = highlighted.replace(
      /^([^{]+){/gm,
      `<span style="color: ${colors.selector}">$1</span>{`
    )

    // Propiedades
    highlighted = highlighted.replace(
      /\s([a-zA-Z-]+):/g,
      ` <span style="color: ${colors.property}">$1</span>:`
    )
  }

  return highlighted
}

// Función para detectar el lenguaje automáticamente
export const detectLanguage = (code: string): string => {
  // Detectar por patrones específicos
  if (code.includes('import ') || code.includes('export ') || code.includes('const ') || code.includes('let ')) {
    if (code.includes('interface ') || code.includes('type ') || code.includes(': string') || code.includes(': number')) {
      return 'typescript'
    }
    return 'javascript'
  }

  if (code.includes('<html') || code.includes('<div') || code.includes('<span')) {
    return 'html'
  }

  if (code.includes('margin:') || code.includes('padding:') || code.includes('color:')) {
    return 'css'
  }

  if (code.includes('{') && code.includes('"') && code.includes(':')) {
    return 'json'
  }

  if (code.includes('# ') || code.includes('## ') || code.includes('### ')) {
    return 'markdown'
  }

  return 'javascript' // Default
}

// Función para obtener el tema basado en el modo oscuro
export const getThemeFromContext = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined') {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }
  return 'dark'
}

