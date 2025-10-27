/**
 * Utilidades de seguridad para la aplicación
 */

// Sanitización de entrada de usuario
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return ''

  return input
    .trim()
    .replace(/[<>]/g, '') // Remover caracteres HTML básicos
    .replace(/javascript:/gi, '') // Remover javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remover event handlers
    .slice(0, 1000) // Limitar longitud
}

// Validación de email más estricta
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

// Validación de URL externa
export const isValidExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    // Solo permitir HTTPS
    if (urlObj.protocol !== 'https:') return false

    // Lista de dominios permitidos
    const allowedDomains = [
      'github.com',
      'netlify.app',
      'vercel.app',
      'loom.com',
      'youtube.com',
      'vimeo.com'
    ]

    return allowedDomains.some(domain => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`))
  } catch {
    return false
  }
}

// Rate limiting simple (localStorage)
export const checkRateLimit = (key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean => {
  if (typeof window === 'undefined') return true

  const now = Date.now()
  const attempts = JSON.parse(localStorage.getItem(`rate_limit_${key}`) || '[]')

  // Limpiar intentos antiguos
  const recentAttempts = attempts.filter((timestamp: number) => now - timestamp < windowMs)

  if (recentAttempts.length >= maxAttempts) {
    return false
  }

  // Agregar intento actual
  recentAttempts.push(now)
  localStorage.setItem(`rate_limit_${key}`, JSON.stringify(recentAttempts))

  return true
}

// Validación de contenido HTML
export const sanitizeHtml = (html: string): string => {
  // Lista de tags permitidos
  const allowedTags = ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a']
  const allowedAttributes = ['href', 'target', 'rel']

  // Implementación básica - en producción usar una librería como DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
}

// Generación de nonce para CSP
export const generateNonce = (): string => {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Validación de datos de formulario
export interface FormValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export const validateFormData = (data: Record<string, string>): FormValidationResult => {
  const errors: Record<string, string> = {}

  // Validar nombre
  if (data.name) {
    const name = sanitizeInput(data.name)
    if (name.length < 2) errors.name = 'El nombre debe tener al menos 2 caracteres'
    if (name.length > 50) errors.name = 'El nombre no puede exceder 50 caracteres'
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
      errors.name = 'El nombre solo puede contener letras y espacios'
    }
  }

  // Validar email
  if (data.email) {
    if (!isValidEmail(data.email)) {
      errors.email = 'Por favor ingresa un email válido'
    }
  }

  // Validar mensaje
  if (data.message) {
    const message = sanitizeInput(data.message)
    if (message.length < 10) errors.message = 'El mensaje debe tener al menos 10 caracteres'
    if (message.length > 1000) errors.message = 'El mensaje no puede exceder 1000 caracteres'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}






