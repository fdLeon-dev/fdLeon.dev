import { Resend } from 'resend'
import { getBlogSubscribers } from './supabase'

// Configuración de Resend
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key')

// Leer IDs de templates desde variables de entorno si están disponibles
const TEMPLATES = {
  SORTEO: process.env.RESEND_RAFFLE_TEMPLATE_ID || process.env.RESEND_RAFFLE_TEMPLATE || 'raffle-participation-confirmation',
  CONTACT: process.env.RESEND_CONTACT_TEMPLATE_ID || process.env.RESEND_CONTACT_TEMPLATE || 'contact-confirmation'
}

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

export interface ContactFormEmail {
  to: string
  name: string
  email: string
  subject: string
  message: string
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

    const { data, error } = await (resend.emails as any).send({
      from: `fdLeon-dev <noreply@${process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') ?? 'fdleon.dev'}>`,
      to: [emailData.to],
      subject: '🎉 ¡Participación en el Sorteo Confirmada!',
      template: TEMPLATES.SORTEO,
      data: {
        name: emailData.participantName,
        business: emailData.businessName
      }
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

// Enviar enlace/archivo del ebook al usuario
export const sendEbookDeliveryEmail = async (to: string, name?: string) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no está configurada. Simulando envío de email del ebook.')
      return { success: true, data: { id: 'simulated-email-id' } }
    }

    const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://fdleon.dev'}/ebook/guia-landing-pages.pdf`

    // Usar template si está configurado
    const templateId = process.env.RESEND_EBOOK_TEMPLATE_ID || process.env.RESEND_EBOOK_TEMPLATE

    if (templateId) {
      const result = await (resend.emails as any).send({
        from: `fdLeon-dev <noreply@${process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') ?? 'fdleon.dev'}>`,
        to: [to],
        subject: 'Tu guía: Landing Pages — descarga aquí',
        template: templateId,
        data: {
          name: name ?? '',
          downloadUrl
        }
      })

      if ((result as any).error) {
        console.error('Error sending ebook via template:', result)
        return { success: false, error: (result as any).error }
      }

      return { success: true, data: (result as any).data }
    }

    // Fallback: enviar HTML simple con enlace al PDF
    const { data, error } = await resend.emails.send({
      from: `fdLeon-dev <noreply@${process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') ?? 'fdleon.dev'}>`,
      to: [to],
      subject: 'Tu guía: Landing Pages — descarga aquí',
      html: `
        <p>Hola ${name ?? ''},</p>
        <p>Gracias por interesarte en la guía. Puedes descargarla desde el siguiente enlace:</p>
        <p><a href="${downloadUrl}">Descargar Guía: Landing Pages</a></p>
        <p>Si no solicitaste este archivo, ignora este mensaje.</p>
      `
    })

    if (error) {
      console.error('Error sending ebook email:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending ebook email:', error)
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

// Template para formulario de contacto
export const sendContactFormEmail = async (emailData: ContactFormEmail) => {
  try {
    // Verificar si la API key está configurada
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no está configurada. Simulando envío de email.')
      return { success: true, data: { id: 'simulated-email-id' } }
    }

    // Enviar email al usuario usando el template
    const userConfirmation = await (resend.emails as any).send({
      from: `fdLeon-dev <noreply@${process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') ?? 'fdleon.dev'}>`,
      to: [emailData.to],
      subject: 'Gracias por contactarte con nosotros',
      template: TEMPLATES.CONTACT,
      data: {
        name: emailData.name,
        subject: emailData.subject,
        message: emailData.message
      }
    })

    // Enviar notificación al administrador
    const adminNotification = await resend.emails.send({
      from: `fdLeon-dev <noreply@${process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') ?? 'fdleon.dev'}>`,
      to: [process.env.ADMIN_EMAIL || 'facudeleon92@gmail.com'],
      subject: `Nuevo mensaje de contacto: ${emailData.subject}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${emailData.name}</p>
        <p><strong>Email:</strong> ${emailData.email}</p>
        <p><strong>Asunto:</strong> ${emailData.subject}</p>
        <p><strong>Mensaje:</strong><br>${emailData.message}</p>
      `
    })

    if (userConfirmation.error || adminNotification.error) {
      console.error('Error sending contact emails:', { userConfirmation, adminNotification })
      return { success: false, error: 'Error al enviar los emails' }
    }

    return { success: true, data: { userEmail: userConfirmation.data, adminEmail: adminNotification.data } }
  } catch (error) {
    console.error('Error sending contact form emails:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}
