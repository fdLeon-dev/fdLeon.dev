"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Download,
  CheckCircle,
  Clock,
  Users,
  Star,
  ArrowRight,
  FileText,
  Code,
  Palette,
  Zap
} from "lucide-react"
import { ContactForm } from "@/components/ui/contact-form-enhanced"

export default function EbookPage() {
  const [isDownloaded, setIsDownloaded] = useState(false)

  const handleDownload = () => {
    setIsDownloaded(true)
    // Aquí podrías implementar la descarga real del PDF
    // Por ahora simulamos la descarga
    setTimeout(() => {
      window.open('/ebook/guia-landing-pages.pdf', '_blank')
    }, 1000)
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

  if (isDownloaded) {
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
            ¡Descarga Iniciada! 📚
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            El ebook se está descargando. Si no se abre automáticamente,
            revisa tu carpeta de descargas.
          </p>

          <div className="bg-primary/10 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-primary mb-2">¿Qué sigue?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Lee el ebook completo</li>
              <li>• Aplica los consejos en tu proyecto</li>
              <li>• Contáctanos si necesitas ayuda</li>
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
            <BookOpen className="h-4 w-4" />
            EBOOK GRATUITO
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Guía Completa para{" "}
            <span className="cyber-gradient neon-pulse">
              Landing Pages
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Aprende a crear landing pages que convierten visitantes en clientes.
            Desde el diseño hasta la optimización, todo lo que necesitas saber.
          </p>
        </motion.div>

        {/* Ebook Details */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-2xl border p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">¿Qué incluye el ebook?</h2>
            </div>

            <div className="space-y-4">
              {[
                "Fundamentos de landing pages efectivas",
                "Psicología del diseño y conversión",
                "Elementos clave para alta conversión",
                "Optimización para móviles",
                "Herramientas y tecnologías recomendadas",
                "Casos de estudio reales",
                "Checklist de lanzamiento",
                "Estrategias de testing y mejora"
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
              <Clock className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Detalles del ebook</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Formato</p>
                  <p className="text-muted-foreground">PDF de alta calidad</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Tiempo de lectura</p>
                  <p className="text-muted-foreground">45-60 minutos</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Nivel</p>
                  <p className="text-muted-foreground">Principiante a intermedio</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Valor del ebook: <span className="text-primary">$97 USD</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Descárgalo completamente GRATIS hoy
            </p>

            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Sin costo oculto</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Acceso inmediato</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Contenido actualizado</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download Form */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl border p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Descarga tu ebook gratis
              </h2>
              <p className="text-muted-foreground">
                Completa el formulario y obtén acceso inmediato
              </p>
            </div>

            <ContactForm
              onSuccess={handleDownload}
              className="space-y-6"
              showSubject={false}
              showMessage={false}
              submitText="Descargar Ebook Gratis"
              successMessage="¡Ebook descargado correctamente!"
              customFields={[
                {
                  name: "empresa",
                  label: "Nombre de tu empresa o proyecto",
                  type: "text",
                  placeholder: "Ej: Mi Negocio SRL",
                  required: false
                }
              ]}
            />
          </div>
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            ¿Por qué este ebook?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Code,
                title: "Técnico",
                description: "Código limpio y optimizado"
              },
              {
                icon: Palette,
                title: "Diseño",
                description: "Principios de UX/UI efectivos"
              },
              {
                icon: Zap,
                title: "Rápido",
                description: "Optimización de performance"
              },
              {
                icon: Users,
                title: "Conversión",
                description: "Estrategias probadas"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-xl border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <Button asChild size="lg" className="mr-4">
            <a href="#download">Descargar Ahora</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/portfolio">Ver Portfolio</a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

