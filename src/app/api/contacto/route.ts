import { NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email-service'
import { addContactMessage } from '@/lib/supabase'
import { ContactFormData, ApiResponse } from '@/types/forms'

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const data: ContactFormData = await request.json()

    // Validar datos requeridos
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Guardar datos en base de datos
    const userAgent = request.headers.get('user-agent') ?? ''
    const forwardedFor = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? ''

    const saveResult = await addContactMessage({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      ip_address: forwardedFor,
      user_agent: userAgent
    })

    if (!saveResult || !saveResult.success) {
      console.error('Error guardando mensaje de contacto:', saveResult)
      return NextResponse.json({ success: false, error: 'No se pudo guardar el mensaje' }, { status: 500 })
    }

    // Enviar email de confirmación
    const emailResult = await sendContactFormEmail({
      to: data.email,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    })

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente',
    })
  } catch (error) {
    console.error('Error en el endpoint de contacto:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al procesar el mensaje',
      },
      { status: 500 }
    )
  }
}