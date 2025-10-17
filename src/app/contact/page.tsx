"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/ui/contact-form"
import { Mail, Phone, MapPin } from "lucide-react"

function ContactClient() {
  // Handlers para el formulario
  const handleFormSuccess = () => {
    // Analytics event para conversión exitosa
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_form_success', {
        event_category: 'engagement',
        event_label: 'contact_form',
        value: 1
      })
    }
  }

  const handleFormError = (error: string) => {
    // Analytics event para error en formulario
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_form_error', {
        event_category: 'engagement',
        event_label: 'contact_form_error',
        value: 0
      })
    }
    console.error('Error en formulario de contacto:', error)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contact@fdleon.dev",
      href: "mailto:contact@fdleon.dev"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Ciudad, País",
      href: "#"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <div className="py-12 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
              Trabajemos juntos
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto px-4">
              ¿Tienes un proyecto en mente? Me encantaría escuchar sobre tu idea y cómo puedo ayudarte a hacerla realidad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4 sm:mb-6">
                  Información de contacto
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start sm:items-center space-x-3 sm:space-x-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                            {info.title}
                          </h3>
                          <a
                            href={info.href}
                            className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.content}
                          </a>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl border bg-card p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3 sm:mb-4">
                  Tiempo de respuesta
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Normalmente respondo a todos los emails en menos de 24 horas.
                  Para proyectos urgentes, no dudes en contactarme por teléfono.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border bg-card p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-4 sm:mb-6">
                Envíame un mensaje
              </h2>

              <ContactForm
                onSuccess={handleFormSuccess}
                onError={handleFormError}
                className=""
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return <ContactClient />
}
