import { NextRequest, NextResponse } from 'next/server'
import { sendBlogNotificationsToAll } from '@/lib/email-service'
import { getBlogSubscribers } from '@/lib/supabase'

// Verificar que la API key sea válida
const isValidApiKey = (apiKey: string): boolean => {
  return apiKey === process.env.API_SECRET_KEY
}

export async function POST(request: NextRequest) {
  try {
    // Verificar API key
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || !isValidApiKey(apiKey)) {
      return NextResponse.json(
        { error: 'API key inválida' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, excerpt, url, publishedAt } = body

    // Validar datos requeridos
    if (!title || !excerpt || !url || !publishedAt) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos: title, excerpt, url, publishedAt' },
        { status: 400 }
      )
    }

    // Enviar notificaciones a todos los suscriptores
    const result = await sendBlogNotificationsToAll({
      title,
      excerpt,
      url,
      publishedAt
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Notificaciones enviadas exitosamente',
      data: result.data
    })

  } catch (error) {
    console.error('Error in blog notification API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Obtener estadísticas de suscriptores
    const subscribersResult = await getBlogSubscribers()
    
    if (!subscribersResult.success) {
      return NextResponse.json(
        { error: 'Error al obtener suscriptores' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        totalSubscribers: subscribersResult.data?.length || 0,
        subscribers: subscribersResult.data
      }
    })

  } catch (error) {
    console.error('Error getting subscribers:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}





