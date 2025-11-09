import { createTransport } from 'nodemailer'

// Configuración del transportador de email
export const emailConfig = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}

// Crear transportador de nodemailer
export const transporter = createTransport(emailConfig)

// Templates de email
export const emailTemplates = {
  sorteo: {
    subject: '¡Gracias por participar en nuestro sorteo!',
    createBody: (name: string) => `
      Hola ${name},
      
      Gracias por participar en nuestro sorteo. Te confirmamos que tu participación ha sido registrada correctamente.
      
      ¡Mucha suerte!
      
      Saludos,
      Equipo fdLeon.dev
    `,
  },
  contacto: {
    subject: 'Gracias por contactarte con nosotros',
    createBody: (name: string) => `
      Hola ${name},
      
      Recibimos tu mensaje y te responderemos pronto. Gracias por comunicarte con nosotros.
      
      Saludos,
      Equipo fdLeon.dev
    `,
  },
}