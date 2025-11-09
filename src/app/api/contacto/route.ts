import { NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email-service'
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

    // TODO: Guardar datos en base de datos
    // Por ahora simularemos el guardado
    console.log('Guardando datos del contacto:', data)

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