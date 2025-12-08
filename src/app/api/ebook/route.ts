import { NextResponse } from 'next/server'
import { sendEbookDeliveryEmail } from '@/lib/email-service'
import { EbookRequestBody } from '@/types/forms'

export async function POST(request: Request) {
  try {
    const body: EbookRequestBody = await request.json()

    if (!body.email) {
      return NextResponse.json({ success: false, error: 'Email es requerido' }, { status: 400 })
    }

    // Enviar email con enlace al ebook
    const result = await sendEbookDeliveryEmail(body.email, body.name ?? '')

    if (!result || !result.success) {
      console.error('Error enviando ebook:', result)
      return NextResponse.json({ success: false, error: 'No se pudo enviar el ebook' }, { status: 500 })
    }

    const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://fdleon.dev'}/ebook/guia-landing-pages.pdf`

    return NextResponse.json({ success: true, downloadUrl })
  } catch (error) {
    console.error('Error en /api/ebook:', error)
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 })
  }
}
