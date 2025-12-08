import { NextResponse } from 'next/server'
import { sendSorteoConfirmation } from '@/lib/email-service'
import { addSorteoParticipant } from '@/lib/supabase'
import { SorteoFormData, ApiResponse } from '@/types/forms'

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const data: SorteoFormData = await request.json()

    // Validar datos requeridos
    if (!data.name || !data.email) {
      return NextResponse.json(
        { success: false, error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    // Guardar datos en base de datos
    const userAgent = request.headers.get('user-agent') ?? ''
    const forwardedFor = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? ''

    const saveResult = await addSorteoParticipant({
      name: data.name,
      email: data.email,
      business: data.business ?? '',
      phone: data.phone ?? '',
      ip_address: forwardedFor,
      user_agent: userAgent,
    })

    if (!saveResult || !saveResult.success) {
      console.error('Error guardando participante del sorteo:', saveResult)
      // Manejar caso de email duplicado
      if (saveResult && (saveResult as any).code === 'DUPLICATE') {
        return NextResponse.json(
          { success: false, error: 'El email ya está registrado' },
          { status: 409 }
        )
      }

      return NextResponse.json(
        { success: false, error: 'No se pudo guardar la participación' },
        { status: 500 }
      )
    }

    // Enviar email de confirmación
    const emailResult = await sendSorteoConfirmation({
      to: data.email,
      participantName: data.name,
      businessName: data.business ?? ''
    })

    return NextResponse.json({
      success: true,
      message: 'Participación registrada correctamente',
    })
  } catch (error) {
    console.error('Error en el endpoint de sorteo:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al procesar la participación',
      },
      { status: 500 }
    )
  }
}