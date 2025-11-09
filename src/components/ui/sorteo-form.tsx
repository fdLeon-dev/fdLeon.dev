"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { User, Mail, Building, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { addSorteoParticipant } from "@/lib/supabase"
import { trackSorteoParticipation } from "@/lib/analytics"

interface SorteoFormData {
  name: string
  email: string
  business: string
}

interface SorteoFormErrors {
  name?: string
  email?: string
  business?: string
}

interface SorteoFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function SorteoForm({ onSuccess, onError }: SorteoFormProps) {
  const [formData, setFormData] = useState<SorteoFormData>({
    name: "",
    email: "",
    business: ""
  })

  const [errors, setErrors] = useState<SorteoFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: SorteoFormErrors = {}

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    // Validar negocio
    if (!formData.business.trim()) {
      newErrors.business = "El nombre del negocio es requerido"
    } else if (formData.business.trim().length < 2) {
      newErrors.business = "El nombre del negocio debe tener al menos 2 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof SorteoFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Enviar datos al endpoint
      const response = await fetch('/api/sorteo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          business: formData.business.trim(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Track participation si es necesario
        trackSorteoParticipation({
          name: formData.name,
          email: formData.email,
          business: formData.business
        })

        setIsSubmitted(true)
        onSuccess?.()
      } else {
        throw new Error(result.error || "Error al registrar la participación")
      }
    } catch (error) {
      const errorMessage = "Hubo un error al registrar tu participación. Por favor, inténtalo de nuevo."
      setSubmitError(errorMessage)
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
        className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
      >
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
          ¡Participación Registrada!
        </h3>
        <p className="text-green-600 dark:text-green-400 mb-4">
          Tu participación en el sorteo ha sido registrada exitosamente.
        </p>
        <p className="text-sm text-green-500 dark:text-green-400">
          Te contactaremos si resultas ganador. ¡Buena suerte!
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
      className="space-y-6"
    >
      <div className="space-y-6">
        {/* Nombre */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Nombre *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.name ? 'border-red-500' : 'border-input'
                }`}
              placeholder="Tu nombre"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-input'
                }`}
              placeholder="tu@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Negocio */}
        <div className="space-y-2">
          <label htmlFor="business" className="text-sm font-medium text-foreground">
            Nombre del Negocio *
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="business"
              name="business"
              type="text"
              value={formData.business}
              onChange={(e) => handleInputChange('business', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.business ? 'border-red-500' : 'border-input'
                }`}
              placeholder="Nombre de tu negocio"
            />
          </div>
          {errors.business && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.business}
            </p>
          )}
        </div>
      </div>

      {/* Error de envío */}
      {submitError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {submitError}
          </p>
        </div>
      )}

      {/* Botón de envío */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 text-lg font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Registrando...
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 mr-2" />
            Participar en el Sorteo
          </>
        )}
      </Button>

      {/* Información adicional */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Al participar, aceptas nuestros términos y condiciones.
          <br />
          Solo se permite una participación por persona.
        </p>
      </div>
    </motion.form>
  )
}
