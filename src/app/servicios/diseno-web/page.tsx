"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Palette,
  Check,
  ArrowRight,
  Clock,
  Users,
  Star,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Database,
  Search,
  Eye,
  PenTool,
  Layers
} from "lucide-react"
import Link from "next/link"

export default function DisenoWebPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

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

  const plans = [
    {
      id: "branding",
      name: "Branding Básico",
      price: "$800",
      originalPrice: "$1,200",
      description: "Identidad visual completa para tu marca",
      duration: "1-2 semanas",
      features: [
        "Logo principal + 2 variaciones",
        "Paleta de colores corporativa",
        "Tipografía seleccionada",
        "Tarjetas de presentación (diseño)",
        "Papelería básica (hoja membretada, sobre)",
        "Guía de marca básica (PDF)",
        "Archivos en formatos vectoriales",
        "2 revisiones incluidas"
      ],
      notIncluded: [
        "Diseño de sitio web",
        "Redes sociales",
        "Material publicitario"
      ],
      popular: false,
      color: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
    },
    {
      id: "ui-design",
      name: "UI/UX Design",
      price: "$2,500",
      originalPrice: "$3,500",
      description: "Diseño completo de interfaz y experiencia de usuario",
      duration: "3-4 semanas",
      features: [
        "Research y análisis de usuarios",
        "Wireframes y prototipos",
        "Diseño de interfaz completa",
        "Sistema de diseño (Design System)",
        "Componentes reutilizables",
        "Diseño responsive (móvil, tablet, desktop)",
        "Prototipo interactivo en Figma",
        "Guía de estilo completa",
        "3 revisiones incluidas",
        "Handoff para desarrollo"
      ],
      notIncluded: [
        "Desarrollo del sitio",
        "Animaciones complejas",
        "Ilustraciones personalizadas"
      ],
      popular: true,
      color: "border-primary bg-primary/5 dark:border-primary/50 dark:bg-primary/10"
    },
    {
      id: "complete",
      name: "Diseño Completo",
      price: "$4,500",
      originalPrice: "$6,000",
      description: "Solución integral de diseño para empresas",
      duration: "5-6 semanas",
      features: [
        "Branding completo (logo, colores, tipografía)",
        "Diseño de sitio web completo",
        "Diseño para redes sociales",
        "Material publicitario básico",
        "Sistema de diseño completo",
        "Prototipos interactivos",
        "Diseño responsive",
        "Guías de marca detalladas",
        "5 revisiones incluidas",
        "Soporte post-entrega por 1 mes",
        "Archivos organizados y etiquetados"
      ],
      notIncluded: [
        "Desarrollo del sitio",
        "Fotografía profesional",
        "Ilustraciones complejas"
      ],
      popular: false,
      color: "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20"
    }
  ]

  const designServices = [
    { name: "UI/UX Design", icon: Eye, description: "Interfaces intuitivas y atractivas" },
    { name: "Branding", icon: PenTool, description: "Identidad visual completa" },
    { name: "Design Systems", icon: Layers, description: "Sistemas de diseño escalables" },
    { name: "Prototipado", icon: Smartphone, description: "Prototipos interactivos" },
    { name: "Figma", icon: Palette, description: "Herramientas profesionales" },
    { name: "Responsive Design", icon: Globe, description: "Diseño adaptable" }
  ]

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
            <Palette className="h-4 w-4" />
            DISEÑO WEB
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Planes de{" "}
            <span className="cyber-gradient neon-pulse">
              Diseño Web
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Creo experiencias visuales que conectan con tu audiencia.
            Desde branding hasta interfaces de usuario, todo diseñado para convertir.
          </p>
        </motion.div>

        {/* Design Services */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Servicios de Diseño
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-xl border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Elige tu Plan
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className={`relative bg-card rounded-2xl border-2 p-8 shadow-lg hover:shadow-xl transition-all ${plan.popular ? 'border-primary scale-105' : 'border-border'
                  } ${plan.color}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{plan.duration}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Incluye:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-foreground mb-3">No incluye:</h4>
                  {plan.notIncluded.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <span className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground">✗</span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Elegir Plan
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Design Process */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Nuestro Proceso de Diseño
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Research",
                description: "Analizamos tu marca, competencia y audiencia"
              },
              {
                step: "02",
                title: "Concepto",
                description: "Desarrollamos ideas y direcciones creativas"
              },
              {
                step: "03",
                title: "Diseño",
                description: "Creamos las soluciones visuales finales"
              },
              {
                step: "04",
                title: "Entrega",
                description: "Archivos organizados y guías de uso"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-xl border p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">{step.step}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Preview */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Nuestro Trabajo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "E-commerce Moderno",
                description: "Diseño de tienda online con UX optimizada",
                category: "UI/UX Design"
              },
              {
                title: "Branding Corporativo",
                description: "Identidad visual completa para empresa",
                category: "Branding"
              },
              {
                title: "App Mobile",
                description: "Diseño de aplicación móvil intuitiva",
                category: "Mobile Design"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center">
                  <Palette className="h-16 w-16 text-primary/60" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {project.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ¿Listo para Impresionar a tus Clientes?
            </h2>
            <p className="text-muted-foreground mb-6">
              Creemos juntos el diseño perfecto para tu proyecto
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Consultar Gratis</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/portfolio">Ver Portfolio</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
