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

// Debug: Verificar variables de entorno
console.log('Variables de entorno EmailJS:', {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? '✅ Cargada' : '❌ No encontrada',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? '✅ Cargada' : '❌ No encontrada',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? '✅ Cargada' : '❌ No encontrada',
  nodeEnv: process.env.NODE_ENV
})

// Inicializar EmailJS
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.publicKey) {
    emailjs.init(EMAILJS_CONFIG.publicKey)
  }
}

// Enviar email
export const sendEmail = async (templateParams: Record<string, string>) => {
  try {
    // Debug: Mostrar configuración completa
    console.log('🔧 EmailJS Config:', {
      serviceId: EMAILJS_CONFIG.serviceId,
      templateId: EMAILJS_CONFIG.templateId,
      publicKey: EMAILJS_CONFIG.publicKey ? `${EMAILJS_CONFIG.publicKey.substring(0, 8)}...` : 'No configurado'
    })

    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      throw new Error('EmailJS no está configurado correctamente. Verifica las variables de entorno en Vercel')
    }

    console.log('📧 Enviando email con parámetros:', templateParams)

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    console.log('✅ Email enviado exitosamente:', result)
    return { success: true, result }
  } catch (error) {
    console.error('❌ Error enviando email:', error)

    if (isEmailJSError(error)) {
      console.error('🔍 Detalles del error:', {
        status: error.status,
        text: error.text,
        message: error.message,
        serviceId: EMAILJS_CONFIG.serviceId,
        templateId: EMAILJS_CONFIG.templateId
      })

      // Error específico para 412
      if (error.status === 412) {
        console.error('🚨 Error 412: Precondition Failed - Verifica la configuración de la plantilla en EmailJS')
      }
    } else {
      console.error('🔍 Error desconocido:', String(error))
    }

    return { success: false, error }
  }
}
