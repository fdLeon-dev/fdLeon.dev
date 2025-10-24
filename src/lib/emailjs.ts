'use client'

import emailjs from '@emailjs/browser'
import { sanitizeInput, checkRateLimit } from './security'

// Tipo para errores de EmailJS
interface EmailJSError {
  status?: number
  text?: string
  message?: string
}

// Type guard para verificar si es un error de EmailJS
function isEmailJSError(error: unknown): error is EmailJSError {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('status' in error || 'text' in error || 'message' in error)
  )
}

// Configuración de EmailJS
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
}

// Validar configuración de EmailJS
const validateEmailJSConfig = (): boolean => {
  return !!(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey &&
    EMAILJS_CONFIG.serviceId.length > 0 &&
    EMAILJS_CONFIG.templateId.length > 0 &&
    EMAILJS_CONFIG.publicKey.length > 0
  )
}

// Inicializar EmailJS
export const initEmailJS = () => {
  if (validateEmailJSConfig()) {
    emailjs.init(EMAILJS_CONFIG.publicKey)
  }
}

// Sanitizar parámetros del template
const sanitizeTemplateParams = (params: Record<string, string>): Record<string, string> => {
  const sanitized: Record<string, string> = {}

  for (const [key, value] of Object.entries(params)) {
    // Solo permitir claves específicas
    if (['name', 'email', 'subject', 'message', 'to_name'].includes(key)) {
      sanitized[key] = sanitizeInput(value)
    }
  }

  return sanitized
}

// Enviar email con validaciones de seguridad
export const sendEmail = async (templateParams: Record<string, string>) => {
  try {
    // Verificar configuración
    if (!validateEmailJSConfig()) {
      throw new Error('EmailJS no está configurado correctamente. Verifica las variables de entorno')
    }

    // Verificar rate limiting
    if (!checkRateLimit('email_send', 3, 300000)) { // 3 intentos cada 5 minutos
      throw new Error('Demasiados intentos. Por favor espera antes de enviar otro email.')
    }

    // Sanitizar parámetros
    const sanitizedParams = sanitizeTemplateParams(templateParams)

    // Validar parámetros requeridos
    if (!sanitizedParams.name || !sanitizedParams.email || !sanitizedParams.message) {
      throw new Error('Faltan campos requeridos')
    }

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      sanitizedParams,
      EMAILJS_CONFIG.publicKey
    )

    return { success: true, result }
  } catch (error) {
    console.error('Error enviando email:', error)

    if (isEmailJSError(error)) {
      console.error('Detalles del error:', {
        status: error.status,
        text: error.text,
        message: error.message
      })
    }

    return { success: false, error }
  }
}
