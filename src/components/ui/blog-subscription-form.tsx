"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, AlertCircle, Loader2, User } from "lucide-react"
import { addBlogSubscriber } from "@/lib/supabase"
import { trackBlogSubscription } from "@/lib/analytics"

interface BlogSubscriptionFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  source?: string
}

export function BlogSubscriptionForm({ 
  onSuccess, 
  onError, 
  source = "blog_page" 
}: BlogSubscriptionFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("El email es requerido")
      return
    }

    if (!validateEmail(email)) {
      setError("El email no es válido")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Obtener información del usuario
      const userAgent = navigator.userAgent
      const ipAddress = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => data.ip)
        .catch(() => 'unknown')

      // Preparar datos para la base de datos
      const subscriberData = {
        email: email.trim().toLowerCase(),
        source,
        is_active: true,
        ip_address: ipAddress,
        user_agent: userAgent
      }

      // Agregar suscriptor a la base de datos
      const result = await addBlogSubscriber(subscriberData)

      if (result.success) {
        // Track subscription
        trackBlogSubscription({
          email: subscriberData.email,
          source: subscriberData.source
        })
        
        setIsSubmitted(true)
        onSuccess?.()
      } else {
        if (result.error?.includes('duplicate') || result.error?.includes('unique')) {
          setError("Este email ya está suscrito a nuestras notificaciones")
        } else {
          throw new Error(result.error || "Error al suscribirse")
        }
      }
    } catch (error) {
      const errorMessage = "Hubo un error al suscribirse. Por favor, inténtalo de nuevo."
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
      >
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
          ¡Suscripción Exitosa!
        </h3>
        <p className="text-green-600 dark:text-green-400">
          Te has suscrito exitosamente a nuestras notificaciones de blog.
        </p>
        <p className="text-sm text-green-500 dark:text-green-400 mt-2">
          Recibirás un email cada vez que publiquemos un nuevo artículo.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          📧 Mantente al Día
        </h3>
        <p className="text-muted-foreground">
          Suscríbete para recibir notificaciones de nuevos artículos sobre desarrollo web, 
          mejores prácticas y las últimas tecnologías.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(null)
            }}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
              error ? 'border-red-500' : 'border-input'
            }`}
            placeholder="tu@email.com"
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="w-full py-3 text-base font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Suscribiendo...
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Suscribirse al Blog
            </>
          )}
        </Button>

        <div className="text-center text-xs text-muted-foreground">
          <p>
            Al suscribirte, recibirás notificaciones de nuevos artículos.
            <br />
            Puedes cancelar tu suscripción en cualquier momento.
          </p>
        </div>
      </div>
    </motion.form>
  )
}


