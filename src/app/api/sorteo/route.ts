import { NextResponse } from 'next/server'
import { sendSorteoConfirmation } from '@/lib/email-service'
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

    // TODO: Guardar datos en base de datos
    // Por ahora simularemos el guardado
    console.log('Guardando datos del sorteo:', data)

    // Enviar email de confirmación
    const emailResult = await sendSorteoConfirmation({
      to: data.email,
      participantName: data.name,
      businessName: data.business
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