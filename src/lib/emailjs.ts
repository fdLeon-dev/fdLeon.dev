import emailjs from '@emailjs/browser'

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

// Inicializar EmailJS
export const initEmailJS = () => {
  if (typeof window !== 'undefined' && EMAILJS_CONFIG.publicKey) {
    emailjs.init(EMAILJS_CONFIG.publicKey)
  }
}

// Enviar email
export const sendEmail = async (templateParams: Record<string, string>) => {
  try {
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      throw new Error('EmailJS no está configurado correctamente. Verifica las variables de entorno')
    }

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    return { success: true, result }
  } catch (error) {
    if (typeof window !== 'undefined') {
      // Solo loguear en el cliente
      console.error('Error enviando email:', error)
      
      if (isEmailJSError(error)) {
        console.error('Detalles del error:', {
          status: error.status,
          text: error.text,
          message: error.message
        })
      }
    }

    return { success: false, error }
  }
}
