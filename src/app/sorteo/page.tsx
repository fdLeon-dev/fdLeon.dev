"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Gift,
  Calendar,
  Users,
  Trophy,
  CheckCircle,
  Star,
  ArrowRight,
  Mail,
  User,
  Building
} from "lucide-react"
import { ContactForm } from "@/components/ui/contact-form-enhanced"

export default function SorteoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFormSuccess = () => {
    setIsSubmitted(true)
  }

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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center bg-card rounded-2xl border p-8 shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            ¡Participación Confirmada! 🎉
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            ¡Excelente! Ya estás participando en el sorteo. Te contactaremos el <strong>15 de abril</strong> si resultas ganador.
          </p>

          <div className="bg-primary/10 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-primary mb-2">¿Qué sigue ahora?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Te notificaremos por email si ganas</li>
              <li>• Mientras tanto, síguenos en redes sociales</li>
              <li>• Revisa nuestros otros servicios</li>
            </ul>
          </div>

          <Button asChild className="w-full">
            <Link href="/">Volver al Inicio</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Gift className="h-4 w-4" />
            SORTEO ESPECIAL
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Gana una{" "}
            <span className="cyber-gradient neon-pulse">
              Landing Page GRATIS
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ¿Tienes un negocio que necesita más clientes? Participa y podrías ganar
            una landing page profesional valorada en <strong>$1000</strong>
          </p>
        </motion.div>

        {/* Prize Details */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-2xl border p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">¿Qué incluye el premio?</h2>
            </div>

            <div className="space-y-4">
              {[
                "Landing page profesional de 1 página",
                "Diseño responsive (móvil, tablet, desktop)",
                "Formulario de contacto funcional",
                "Optimización SEO básica",
                "Hosting por 1 año",
                "Soporte técnico por 1 mes"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Detalles del sorteo</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Fecha de cierre</p>
                  <p className="text-muted-foreground">15 de abril de 2025</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Participantes</p>
                  <p className="text-muted-foreground">Máximo 200 personas</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Ganadores</p>
                  <p className="text-muted-foreground">1 persona seleccionada al azar</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Valor total del premio: <span className="text-primary">$1,000 USD</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Incluye diseño, desarrollo, hosting y soporte técnico
            </p>

            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Diseño profesional</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Desarrollo moderno</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Soporte incluido</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl border p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Participa en el sorteo
              </h2>
              <p className="text-muted-foreground">
                Completa el formulario y automáticamente estarás participando
              </p>
            </div>

            <ContactForm
              onSuccess={handleFormSuccess}
              className="space-y-6"
              showSubject={false}
              showMessage={false}
              customFields={[
                {
                  name: "empresa",
                  label: "Nombre de tu empresa",
                  type: "text",
                  placeholder: "Ej: Mi Negocio SRL",
                  icon: Building
                }
              ]}
            />
          </div>
        </motion.div>

        {/* Terms */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Al participar aceptas nuestros términos y condiciones.
            El ganador será seleccionado al azar y notificado por email.
            No se requiere compra. Válido solo para nuevos clientes.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
