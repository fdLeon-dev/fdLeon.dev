/**
 * Resaltador de sintaxis avanzado para código
 */

// Paleta de colores minimalista para modo oscuro
export const VS_CODE_COLORS = {
  background: '#ffffff',
  foreground: '#1e293b',
  keyword: '#3b82f6',      // Azul vibrante para keywords
  string: '#dc2626',       // Rojo para strings
  comment: '#059669',      // Verde para comentarios
  number: '#7c3aed',       // Púrpura para números
  function: '#ea580c',     // Naranja para funciones
  variable: '#0891b2',     // Cian para variables
  operator: '#64748b',     // Gris para operadores
  type: '#0d9488',         // Verde azulado para tipos
  tag: '#dc2626',          // Rojo para tags HTML
  attribute: '#2563eb',    // Azul para atributos
  selector: '#ca8a04',     // Amarillo para selectores CSS
  property: '#0891b2',     // Cian para propiedades
  boolean: '#3b82f6',      // Azul para booleanos
  null: '#64748b',         // Gris para null
  regex: '#dc2626',        // Rojo para regex
  escape: '#ca8a04'       // Amarillo para escapes
}

// Paleta de colores minimalista para modo claro
export const VS_CODE_LIGHT_COLORS = {
  background: '#ffffff',
  foreground: '#1e293b',
  keyword: '#3b82f6',      // Azul vibrante para keywords
  string: '#dc2626',       // Rojo para strings
  comment: '#059669',      // Verde para comentarios
  number: '#7c3aed',       // Púrpura para números
  function: '#ea580c',     // Naranja para funciones
  variable: '#0891b2',     // Cian para variables
  operator: '#64748b',     // Gris para operadores
  type: '#0d9488',         // Verde azulado para tipos
  tag: '#dc2626',          // Rojo para tags HTML
  attribute: '#2563eb',    // Azul para atributos
  selector: '#ca8a04',     // Amarillo para selectores CSS
  property: '#0891b2',     // Cian para propiedades
  boolean: '#3b82f6',      // Azul para booleanos
  null: '#64748b',         // Gris para null
  regex: '#dc2626',        // Rojo para regex
  escape: '#ca8a04'        // Amarillo para escapes
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
    'implements', 'keyof', 'infer', 'as', 'satisfies', 'asserts', 'is',
    'never', 'unknown', 'any', 'string', 'number', 'boolean', 'object',
    'array', 'Record', 'Partial', 'Required', 'Pick', 'Omit', 'Exclude',
    'Extract', 'NonNullable', 'ReturnType', 'Parameters', 'ConstructorParameters',
    'InstanceType', 'ThisParameterType', 'OmitThisParameter', 'ThisType',
    'Uppercase', 'Lowercase', 'Capitalize', 'Uncapitalize', 'Awaited'
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
  const trimmedCode = code.trim()

  // Detectar TypeScript
  if (trimmedCode.includes('interface ') ||
    trimmedCode.includes('type ') ||
    trimmedCode.includes(': string') ||
    trimmedCode.includes(': number') ||
    trimmedCode.includes(': boolean') ||
    trimmedCode.includes(': any') ||
    trimmedCode.includes('extends ') ||
    trimmedCode.includes('implements ')) {
    return 'typescript'
  }

  // Detectar JavaScript
  if (trimmedCode.includes('import ') ||
    trimmedCode.includes('export ') ||
    trimmedCode.includes('const ') ||
    trimmedCode.includes('let ') ||
    trimmedCode.includes('function ') ||
    trimmedCode.includes('=>') ||
    trimmedCode.includes('async ') ||
    trimmedCode.includes('await ')) {
    return 'javascript'
  }

  // Detectar HTML
  if (trimmedCode.includes('<html') ||
    trimmedCode.includes('<div') ||
    trimmedCode.includes('<span') ||
    trimmedCode.includes('<head') ||
    trimmedCode.includes('<body') ||
    trimmedCode.includes('<script') ||
    trimmedCode.includes('<style')) {
    return 'html'
  }

  // Detectar CSS
  if (trimmedCode.includes('margin:') ||
    trimmedCode.includes('padding:') ||
    trimmedCode.includes('color:') ||
    trimmedCode.includes('background:') ||
    trimmedCode.includes('font-') ||
    trimmedCode.includes('display:') ||
    trimmedCode.includes('position:')) {
    return 'css'
  }

  // Detectar JSON
  if (trimmedCode.startsWith('{') && trimmedCode.endsWith('}') &&
    trimmedCode.includes('"') && trimmedCode.includes(':')) {
    return 'json'
  }

  // Detectar Markdown
  if (trimmedCode.includes('# ') ||
    trimmedCode.includes('## ') ||
    trimmedCode.includes('### ') ||
    trimmedCode.includes('**') ||
    trimmedCode.includes('*') ||
    trimmedCode.includes('```')) {
    return 'markdown'
  }

  // Detectar por extensión de archivo en comentarios
  if (trimmedCode.includes('// next.config.js') || trimmedCode.includes('// next.config.ts')) {
    return 'javascript'
  }

  if (trimmedCode.includes('// tsconfig.json')) {
    return 'json'
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

