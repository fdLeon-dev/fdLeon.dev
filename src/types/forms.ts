// Tipos para el formulario de sorteo
export interface SorteoFormData {
  name: string
  email: string
  business?: string
  phone?: string
  message?: string
}

// Tipos para el formulario de contacto
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Tipo para petición de ebook
export interface EbookRequestBody {
  name?: string
  email: string
  empresa?: string
}

// Respuesta de la API
export interface ApiResponse {
  success: boolean
  message?: string
  error?: string
}