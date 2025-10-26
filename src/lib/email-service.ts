import { Resend } from 'resend'
import { getBlogSubscribers } from './supabase'

// Configuración de Resend
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key')

// Tipos para emails
export interface BlogNotificationEmail {
  to: string
  subject: string
  title: string
  excerpt: string
  url: string
  publishedAt: string
}

export interface SorteoNotificationEmail {
  to: string
  participantName: string
  businessName: string
}

// Template para notificación de nuevo artículo
export const sendBlogNotification = async (emailData: BlogNotificationEmail) => {
  try {
    // Verificar si la API key está configurada
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no está configurada. Simulando envío de email.')
      return { success: true, data: { id: 'simulated-email-id' } }
    }

    const { data, error } = await resend.emails.send({
      from: 'fdLeon-dev <noreply@fdleon.dev>',
      to: [emailData.to],
      subject: emailData.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${emailData.subject}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .article-card { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin: 20px 0; }
            .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .unsubscribe { color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 Nuevo Artículo en fdLeon-dev</h1>
              <p>Mantente al día con las últimas tecnologías y mejores prácticas</p>
            </div>
            
            <div class="content">
              <div class="article-card">
                <h2>${emailData.title}</h2>
                <p>${emailData.excerpt}</p>
                <p><strong>Publicado:</strong> ${new Date(emailData.publishedAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}</p>
                <a href="${emailData.url}" class="btn">Leer Artículo Completo</a>
              </div>
              
              <div class="footer">
                <p>Gracias por suscribirte a fdLeon-dev</p>
                <p class="unsubscribe">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(emailData.to)}">Cancelar suscripción</a>
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    })

    if (error) {
      console.error('Error sending blog notification:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending blog notification:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}

// Template para confirmación de participación en sorteo
export const sendSorteoConfirmation = async (emailData: SorteoNotificationEmail) => {
  try {
    // Verificar si la API key está configurada
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no está configurada. Simulando envío de email.')
      return { success: true, data: { id: 'simulated-email-id' } }
    }

    const { data, error } = await resend.emails.send({
      from: 'fdLeon-dev <noreply@fdleon.dev>',
      to: [emailData.to],
      subject: '🎉 ¡Participación en el Sorteo Confirmada!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Participación en Sorteo Confirmada</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .prize-card { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin: 20px 0; text-align: center; }
            .prize-value { font-size: 2em; font-weight: bold; color: #f5576c; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 ¡Participación Confirmada!</h1>
              <p>Tu participación en el sorteo ha sido registrada exitosamente</p>
            </div>
            
            <div class="content">
              <div class="prize-card">
                <h2>¡Hola ${emailData.participantName}!</h2>
                <p>Tu participación en el sorteo de <strong>${emailData.businessName}</strong> ha sido registrada exitosamente.</p>
                
                <div class="prize-value">$1,000 USD</div>
                <p><strong>Valor del premio:</strong> Landing Page Profesional</p>
                
                <h3>¿Qué incluye el premio?</h3>
                <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                  <li>✅ Diseño profesional y moderno</li>
                  <li>✅ Desarrollo responsive completo</li>
                  <li>✅ Optimización SEO</li>
                  <li>✅ Formulario de contacto</li>
                  <li>✅ Hosting por 1 año</li>
                  <li>✅ Soporte técnico incluido</li>
                </ul>
                
                <p><strong>Fecha de cierre:</strong> 15 de abril de 2025</p>
                <p><strong>Máximo de participantes:</strong> 200</p>
              </div>
              
              <div class="footer">
                <p>¡Buena suerte! Te contactaremos si resultas ganador.</p>
                <p>fdLeon-dev - Desarrollador Web Profesional</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    })

    if (error) {
      console.error('Error sending sorteo confirmation:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending sorteo confirmation:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}

// Función para enviar notificaciones masivas de nuevo artículo
export const sendBlogNotificationsToAll = async (articleData: {
  title: string
  excerpt: string
  url: string
  publishedAt: string
}) => {
  try {
    // Obtener todos los suscriptores activos
    const subscribersResult = await getBlogSubscribers()

    if (!subscribersResult.success || !subscribersResult.data) {
      return { success: false, error: 'No se pudieron obtener los suscriptores' }
    }

    const subscribers = subscribersResult.data
    const results = []

    // Enviar email a cada suscriptor
    for (const subscriber of subscribers) {
      const emailData: BlogNotificationEmail = {
        to: subscriber.email,
        subject: `🚀 Nuevo artículo: ${articleData.title}`,
        title: articleData.title,
        excerpt: articleData.excerpt,
        url: articleData.url,
        publishedAt: articleData.publishedAt
      }

      const result = await sendBlogNotification(emailData)
      results.push({ email: subscriber.email, success: result.success })
    }

    return {
      success: true,
      data: {
        totalSent: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results
      }
    }
  } catch (error) {
    console.error('Error sending blog notifications:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}

