/**
 * Validaciones de seguridad para formularios y datos de usuario
 */

// Validación de entrada de usuario
export const validateUserInput = {
  // Validar nombre
  name: (name: string): { isValid: boolean; error?: string } => {
    if (!name || typeof name !== 'string') {
      return { isValid: false, error: 'El nombre es requerido' }
    }

    const trimmed = name.trim()
    if (trimmed.length < 2) {
      return { isValid: false, error: 'El nombre debe tener al menos 2 caracteres' }
    }

    if (trimmed.length > 50) {
      return { isValid: false, error: 'El nombre no puede exceder 50 caracteres' }
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(trimmed)) {
      return { isValid: false, error: 'El nombre solo puede contener letras y espacios' }
    }

    return { isValid: true }
  },

  // Validar email
  email: (email: string): { isValid: boolean; error?: string } => {
    if (!email || typeof email !== 'string') {
      return { isValid: false, error: 'El email es requerido' }
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Por favor ingresa un email válido' }
    }

    if (email.length > 254) {
      return { isValid: false, error: 'El email es demasiado largo' }
    }

    return { isValid: true }
  },

  // Validar asunto
  subject: (subject: string): { isValid: boolean; error?: string } => {
    if (!subject || typeof subject !== 'string') {
      return { isValid: false, error: 'El asunto es requerido' }
    }

    const trimmed = subject.trim()
    if (trimmed.length < 5) {
      return { isValid: false, error: 'El asunto debe tener al menos 5 caracteres' }
    }

    if (trimmed.length > 100) {
      return { isValid: false, error: 'El asunto no puede exceder 100 caracteres' }
    }

    return { isValid: true }
  },

  // Validar mensaje
  message: (message: string): { isValid: boolean; error?: string } => {
    if (!message || typeof message !== 'string') {
      return { isValid: false, error: 'El mensaje es requerido' }
    }

    const trimmed = message.trim()
    if (trimmed.length < 10) {
      return { isValid: false, error: 'El mensaje debe tener al menos 10 caracteres' }
    }

    if (trimmed.length > 1000) {
      return { isValid: false, error: 'El mensaje no puede exceder 1000 caracteres' }
    }

    return { isValid: true }
  }
}

// Validar URL externa
export const validateExternalUrl = (url: string): boolean => {
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
      'vimeo.com',
      'fdleon.dev'
    ]

    return allowedDomains.some(domain =>
      urlObj.hostname === domain ||
      urlObj.hostname.endsWith(`.${domain}`)
    )
  } catch {
    return false
  }
}

// Sanitizar HTML básico
export const sanitizeHtml = (html: string): string => {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '')
}

// Validar datos de formulario completo
export const validateFormData = (data: Record<string, string>) => {
  const errors: Record<string, string> = {}

  // Validar cada campo
  if (data.name) {
    const nameValidation = validateUserInput.name(data.name)
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error!
    }
  }

  if (data.email) {
    const emailValidation = validateUserInput.email(data.email)
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error!
    }
  }

  if (data.subject) {
    const subjectValidation = validateUserInput.subject(data.subject)
    if (!subjectValidation.isValid) {
      errors.subject = subjectValidation.error!
    }
  }

  if (data.message) {
    const messageValidation = validateUserInput.message(data.message)
    if (!messageValidation.isValid) {
      errors.message = messageValidation.error!
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

