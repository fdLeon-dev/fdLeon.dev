import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'

// Crear cliente de Supabase (público)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Crear cliente con Service Role (uso en server-side para operaciones de escritura segura)
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
export const getServiceRoleClient = () => {
  if (!supabaseServiceRoleKey) return null
  return createClient(supabaseUrl, supabaseServiceRoleKey)
}

// Tipos para el sorteo
export interface SorteoParticipant {
  id?: string
  name: string
  email: string
  business?: string
  phone?: string
  created_at?: string
  ip_address?: string
  user_agent?: string
}

export interface BlogSubscriber {
  id?: string
  email: string
  source: string
  subscribed_at?: string
  is_active: boolean
  ip_address?: string
  user_agent?: string
}

// Funciones para el sorteo
export const addSorteoParticipant = async (participant: Omit<SorteoParticipant, 'id' | 'created_at'>) => {
  try {
    // Si no está configurado, simular
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase no está configurado. Simulando inserción de participante.')
      return { success: true, data: { id: 'simulated-id', ...participant, created_at: new Date().toISOString() } }
    }

    // Preferir client con service role para operaciones de escritura si está disponible
    const serviceClient = getServiceRoleClient()
    const clientToUse = serviceClient ?? supabase

    // verificar si el email ya existe
    const { data: existing, error: fetchError } = await clientToUse
      .from('sorteo_participants')
      .select('id')
      .eq('email', participant.email)
      .limit(1)

    if (fetchError) {
      console.error('Error checking existing participant:', fetchError)
      return { success: false, error: fetchError.message }
    }

    if (existing && (existing as any).length > 0) {
      return { success: false, error: 'El email ya está registrado', code: 'DUPLICATE' }
    }

    const { data, error } = await clientToUse
      .from('sorteo_participants')
      .insert([participant])
      .select()
      .single()

    if (error) {
      console.error('Error adding sorteo participant:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error adding sorteo participant:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}

export const getSorteoParticipants = async () => {
  try {
    // Verificar si Supabase está configurado
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase no está configurado. Simulando obtención de participantes.')
      return { success: true, data: [] }
    }

    const { data, error } = await supabase
      .from('sorteo_participants')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching sorteo participants:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching sorteo participants:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}

export const getSorteoParticipantCount = async () => {
  try {
    // Verificar si Supabase está configurado
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase no está configurado. Simulando conteo de participantes.')
      return { success: true, count: 0 }
    }

    const { count, error } = await supabase
      .from('sorteo_participants')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error getting sorteo participant count:', error)
      return { success: false, error: error.message }
    }

    return { success: true, count: count || 0 }
  } catch (error) {
    console.error('Error getting sorteo participant count:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}

// Funciones para suscriptores del blog
export const addBlogSubscriber = async (subscriber: Omit<BlogSubscriber, 'id' | 'subscribed_at'>) => {
  try {
    // Verificar si Supabase está configurado
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase no está configurado. Simulando inserción de suscriptor.')
      return { success: true, data: { id: 'simulated-id', ...subscriber, subscribed_at: new Date().toISOString() } }
    }

    // Preferir service role client para escritura
    const serviceClient = getServiceRoleClient()
    const clientToUse = serviceClient ?? supabase

    const { data, error } = await clientToUse
      .from('blog_subscribers')
      .insert([subscriber])
      .select()
      .single()

    if (error) {
      console.error('Error adding blog subscriber:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error adding blog subscriber:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}

export const getBlogSubscribers = async () => {
  try {
    // Verificar si Supabase está configurado
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase no está configurado. Simulando obtención de suscriptores.')
      return { success: true, data: [] }
    }

    const { data, error } = await supabase
      .from('blog_subscribers')
      .select('*')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false })

    if (error) {
      console.error('Error fetching blog subscribers:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching blog subscribers:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}

export const unsubscribeBlogSubscriber = async (email: string) => {
  try {
    // Verificar si Supabase está configurado
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase no está configurado. Simulando desuscripción.')
      return { success: true }
    }

    // Preferir service role client para escritura
    const serviceClient = getServiceRoleClient()
    const clientToUse = serviceClient ?? supabase

    const { error } = await clientToUse
      .from('blog_subscribers')
      .update({ is_active: false })
      .eq('email', email)

    if (error) {
      console.error('Error unsubscribing blog subscriber:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error unsubscribing blog subscriber:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}

// Guardar mensajes de contacto
export const addContactMessage = async (message: {
  name: string
  email: string
  subject: string
  message: string
  ip_address?: string
  user_agent?: string
}) => {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase no está configurado. Simulando inserción de mensaje de contacto.')
      return { success: true, data: { id: 'simulated-id', ...message, created_at: new Date().toISOString() } }
    }

    const serviceClient = getServiceRoleClient()
    const clientToUse = serviceClient ?? supabase

    const { data, error } = await clientToUse
      .from('contact_messages')
      .insert([message])
      .select()
      .single()

    if (error) {
      console.error('Error adding contact message:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error adding contact message:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}
