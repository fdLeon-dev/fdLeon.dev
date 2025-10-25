import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
    const { data, error } = await supabase
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
    const { data, error } = await supabase
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
    const { error } = await supabase
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
