"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { initEmailJS, sendEmail } from "@/lib/emailjs"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

interface ContactFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  className?: string
}

/**
 * Formulario de contacto optimizado con validación avanzada,
 * accesibilidad y feedback visual
 */
export function ContactForm({ onSuccess, onError, className }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Inicializar EmailJS al cargar el componente
  useEffect(() => {
    initEmailJS()
    // Focus en el primer campo para mejor UX
    nameInputRef.current?.focus()
  }, [])

  // Validaciones
  const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'El nombre es requerido'
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres'
        if (value.trim().length > 50) return 'El nombre no puede exceder 50 caracteres'
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
          return 'El nombre solo puede contener letras y espacios'
        }
        break

      case 'email':
        if (!value.trim()) return 'El email es requerido'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Por favor ingresa un email válido'
        }
        break

      case 'subject':
        if (!value.trim()) return 'El asunto es requerido'
        if (value.trim().length < 5) return 'El asunto debe tener al menos 5 caracteres'
        if (value.trim().length > 100) return 'El asunto no puede exceder 100 caracteres'
        break

      case 'message':
        if (!value.trim()) return 'El mensaje es requerido'
        if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres'
        if (value.trim().length > 1000) return 'El mensaje no puede exceder 1000 caracteres'
        break
    }
    return undefined
  }

  // Validar campo individual
  const handleFieldBlur = (name: keyof ContactFormData) => {
    const error = validateField(name, formData[name])
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  // Validar todo el formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof ContactFormData
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar formulario
    if (!validateForm()) {
      // Focus en el primer campo con error
      const firstErrorField = Object.keys(errors)[0] as keyof FormErrors
      if (firstErrorField) {
        const element = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement
        element?.focus()
      }
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        to_name: "fdLeon-dev",
        timestamp: new Date().toLocaleString('es-ES', {
          timeZone: 'America/Montevideo',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      const result = await sendEmail(templateParams)

      if (result.success) {
        setIsSubmitted(true)
        onSuccess?.()

        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
          })
          setErrors({})
        }, 5000)
      } else {
        const errorMessage = "Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctame directamente por email."
        setSubmitError(errorMessage)
        onError?.(errorMessage)
      }
    } catch {
      const errorMessage = "Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo."
      setSubmitError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Estados del formulario
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-8 sm:py-12 ${className}`}
      >
        <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          ¡Mensaje enviado con éxito!
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-4">
          Gracias por contactarme. Te responderé pronto.
        </p>
        <p className="text-xs text-muted-foreground">
          Este formulario se reseteará automáticamente en unos segundos.
        </p>
      </motion.div>
    )
  }

  if (submitError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-8 sm:py-12 ${className}`}
      >
        <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          Error al enviar
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-4">
          {submitError}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            onClick={() => setSubmitError(null)}
            variant="outline"
            size="sm"
            className="neon-hover neon-border"
          >
            Intentar de nuevo
          </Button>
          <Button
            onClick={() => window.location.href = 'mailto:contact@fdleon.dev'}
            variant="outline"
            size="sm"
            className="neon-hover neon-border"
          >
            Enviar por email
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-4 sm:space-y-6 ${className}`}
      noValidate
      aria-label="Formulario de contacto"
    >
      {/* Nombre y Email */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Nombre completo *
          </label>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={() => handleFieldBlur('name')}
            required
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={errors.name ? "true" : "false"}
            className={`w-full rounded-lg border px-3 sm:px-4 py-2 sm:py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.name
              ? "border-red-500 bg-red-50 dark:bg-red-950"
              : "border-input bg-background"
              }`}
            placeholder="Tu nombre completo"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleFieldBlur('email')}
            required
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={errors.email ? "true" : "false"}
            className={`w-full rounded-lg border px-3 sm:px-4 py-2 sm:py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.email
              ? "border-red-500 bg-red-50 dark:bg-red-950"
              : "border-input bg-background"
              }`}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Asunto */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Asunto *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          onBlur={() => handleFieldBlur('subject')}
          required
          aria-describedby={errors.subject ? "subject-error" : undefined}
          aria-invalid={errors.subject ? "true" : "false"}
          className={`w-full rounded-lg border px-3 sm:px-4 py-2 sm:py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.subject
            ? "border-red-500 bg-red-50 dark:bg-red-950"
            : "border-input bg-background"
            }`}
          placeholder="¿En qué puedo ayudarte?"
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          onBlur={() => handleFieldBlur('message')}
          required
          rows={5}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          aria-invalid={errors.message ? "true" : "false"}
          className={`w-full rounded-lg border px-3 sm:px-4 py-2 sm:py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${errors.message
            ? "border-red-500 bg-red-50 dark:bg-red-950"
            : "border-input bg-background"
            }`}
          placeholder="Cuéntame sobre tu proyecto, ideas o cualquier consulta que tengas..."
        />
        <div className="flex justify-between items-center mt-1">
          <div>
            {errors.message ? (
              <p id="message-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.message}
              </p>
            ) : (
              <p id="message-help" className="text-sm text-muted-foreground">
                Mínimo 10 caracteres, máximo 1000
              </p>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {formData.message.length}/1000
          </span>
        </div>
      </div>

      {/* Botón de envío */}
      <Button
        type="submit"
        disabled={isSubmitting || Object.values(errors).some(error => error !== undefined)}
        className="w-full group"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando mensaje...
          </>
        ) : (
          <>
            Enviar mensaje
            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>

      {/* Información adicional */}
      <p className="text-xs text-muted-foreground text-center">
        Al enviar este formulario, aceptas que procese tu información de contacto para responder a tu consulta.
        No compartiré tu información con terceros.
      </p>
    </form>
  )
}

