"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle, AlertCircle, Loader2, LucideIcon } from "lucide-react"
import { initEmailJS, sendEmail } from "@/lib/emailjs"

interface CustomField {
  name: string
  label: string
  type: "text" | "email" | "tel" | "textarea"
  placeholder?: string
  required?: boolean
  icon?: LucideIcon
}

interface ContactFormData {
  name: string
  email: string
  subject?: string
  message?: string
  [key: string]: string | undefined
}

interface FormErrors {
  [key: string]: string | undefined
}

interface ContactFormEnhancedProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  className?: string
  showSubject?: boolean
  showMessage?: boolean
  customFields?: CustomField[]
  submitText?: string
  successMessage?: string
}

export function ContactForm({
  onSuccess,
  onError,
  className,
  showSubject = true,
  showMessage = true,
  customFields = [],
  submitText = "Enviar mensaje",
  successMessage = "¡Mensaje enviado correctamente!"
}: ContactFormEnhancedProps) {
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
  }, [])

  // Inicializar campos personalizados
  useEffect(() => {
    const initialData: ContactFormData = {
      name: "",
      email: "",
      subject: "",
      message: ""
    }

    customFields.forEach(field => {
      initialData[field.name] = ""
    })

    setFormData(initialData)
  }, [customFields])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

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

    // Validar subject si está habilitado
    if (showSubject && !formData.subject?.trim()) {
      newErrors.subject = "El asunto es requerido"
    }

    // Validar message si está habilitado
    if (showMessage && !formData.message?.trim()) {
      newErrors.message = "El mensaje es requerido"
    }

    // Validar campos personalizados
    customFields.forEach(field => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} es requerido`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
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
      // Enfocar el primer campo con error
      const firstErrorField = Object.keys(errors)[0]
      if (firstErrorField && formRef.current) {
        const errorElement = formRef.current.querySelector(`[name="${firstErrorField}"]`) as HTMLElement
        errorElement?.focus()
      }
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Preparar datos para EmailJS
      const emailData: Record<string, string> = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || "Nuevo mensaje desde el sitio web",
        message: formData.message || "Formulario de contacto completado"
      }

      // Agregar campos personalizados
      customFields.forEach(field => {
        emailData[field.name] = formData[field.name] || ""
      })

      const result = await sendEmail(emailData)

      if (result.success) {
        setIsSubmitted(true)
        onSuccess?.()
      } else {
        throw new Error("Error al enviar el mensaje")
      }
    } catch (error) {
      const errorMessage = "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo."
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
        className="text-center p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="h-8 w-8 text-green-600" />
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {successMessage}
        </h3>
        <p className="text-muted-foreground">
          Te contactaremos pronto
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-6 ${className || ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Nombre completo *
        </label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.name
            ? "border-red-500 focus:border-red-500"
            : "border-input focus:border-primary"
            }`}
          placeholder="Tu nombre completo"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.email
            ? "border-red-500 focus:border-red-500"
            : "border-input focus:border-primary"
            }`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Campos personalizados */}
      {customFields.map((field) => {
        const IconComponent = field.icon
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-2">
              {field.label} {field.required && "*"}
            </label>
            <div className="relative">
              {IconComponent && (
                <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              )}
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${IconComponent ? "pl-10" : ""
                    } ${errors[field.name]
                      ? "border-red-500 focus:border-red-500"
                      : "border-input focus:border-primary"
                    }`}
                  placeholder={field.placeholder}
                  rows={4}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${IconComponent ? "pl-10" : ""
                    } ${errors[field.name]
                      ? "border-red-500 focus:border-red-500"
                      : "border-input focus:border-primary"
                    }`}
                  placeholder={field.placeholder}
                />
              )}
            </div>
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        )
      })}

      {/* Subject (opcional) */}
      {showSubject && (
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
            Asunto *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.subject
              ? "border-red-500 focus:border-red-500"
              : "border-input focus:border-primary"
              }`}
            placeholder="¿En qué podemos ayudarte?"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
          )}
        </div>
      )}

      {/* Message (opcional) */}
      {showMessage && (
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.message
              ? "border-red-500 focus:border-red-500"
              : "border-input focus:border-primary"
              }`}
            placeholder="Cuéntanos más detalles..."
            rows={4}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>
      )}

      {/* Error message */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400"
        >
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{submitError}</span>
        </motion.div>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 text-base font-medium"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            {submitText}
          </>
        )}
      </Button>
    </motion.form>
  )
}
