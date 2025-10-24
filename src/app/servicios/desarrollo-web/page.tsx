"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Code,
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
  Palette
} from "lucide-react"
import Link from "next/link"

export default function DesarrolloWebPage() {
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
      id: "starter",
      name: "Starter",
      price: "$1,500",
      originalPrice: "$2,000",
      description: "Perfecto para pequeñas empresas que necesitan presencia web básica",
      duration: "2-3 semanas",
      features: [
        "Sitio web de 5 páginas máximo",
        "Diseño responsive (móvil, tablet, desktop)",
        "Formulario de contacto",
        "SEO básico optimizado",
        "Hosting por 1 año incluido",
        "Certificado SSL gratuito",
        "Soporte técnico por 1 mes",
        "1 revisión de diseño incluida"
      ],
      notIncluded: [
        "E-commerce",
        "Panel de administración",
        "Integración con redes sociales",
        "Analytics avanzado"
      ],
      popular: false,
      color: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
    },
    {
      id: "business",
      name: "Business",
      price: "$3,500",
      originalPrice: "$4,500",
      description: "Ideal para empresas en crecimiento que necesitan funcionalidades avanzadas",
      duration: "4-6 semanas",
      features: [
        "Sitio web de hasta 10 páginas",
        "Diseño responsive premium",
        "Panel de administración básico",
        "Blog integrado",
        "SEO avanzado optimizado",
        "Integración con Google Analytics",
        "Formularios avanzados",
        "Hosting por 1 año incluido",
        "Certificado SSL gratuito",
        "Soporte técnico por 3 meses",
        "2 revisiones de diseño incluidas",
        "Optimización de velocidad"
      ],
      notIncluded: [
        "E-commerce completo",
        "Integración con CRM",
        "Funcionalidades personalizadas complejas"
      ],
      popular: true,
      color: "border-primary bg-primary/5 dark:border-primary/50 dark:bg-primary/10"
    },
    {
      id: "premium",
      name: "Premium",
      price: "$6,500",
      originalPrice: "$8,500",
      description: "Solución completa para empresas que buscan la excelencia digital",
      duration: "6-8 semanas",
      features: [
        "Sitio web ilimitado de páginas",
        "Diseño responsive premium",
        "Panel de administración completo",
        "Blog con categorías y tags",
        "SEO avanzado + Schema markup",
        "Google Analytics 4 configurado",
        "Integración con redes sociales",
        "Formularios avanzados + validación",
        "Sistema de notificaciones",
        "Hosting premium por 1 año",
        "Certificado SSL gratuito",
        "Soporte técnico por 6 meses",
        "3 revisiones de diseño incluidas",
        "Optimización de velocidad avanzada",
        "Backup automático diario",
        "Monitoreo de uptime"
      ],
      notIncluded: [
        "E-commerce con pagos",
        "Integración con sistemas externos complejos"
      ],
      popular: false,
      color: "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20"
    }
  ]

  const technologies = [
    { name: "React & Next.js", icon: Code, description: "Framework moderno para aplicaciones web" },
    { name: "TypeScript", icon: Code, description: "JavaScript con tipos para mayor seguridad" },
    { name: "Tailwind CSS", icon: Palette, description: "Framework CSS para diseño rápido" },
    { name: "Node.js", icon: Database, description: "Backend escalable y eficiente" },
    { name: "MongoDB/PostgreSQL", icon: Database, description: "Bases de datos modernas" },
    { name: "Vercel/Netlify", icon: Globe, description: "Deployment automático" }
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
            <Code className="h-4 w-4" />
            DESARROLLO WEB
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Planes de{" "}
            <span className="cyber-gradient neon-pulse">
              Desarrollo Web
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transforma tu idea en una aplicación web moderna, rápida y escalable.
            Desde sitios corporativos hasta aplicaciones complejas.
          </p>
        </motion.div>

        {/* Technologies */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Tecnologías que Utilizamos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-xl border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <tech.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
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

        {/* Process */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Nuestro Proceso
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Consulta",
                description: "Analizamos tus necesidades y objetivos"
              },
              {
                step: "02",
                title: "Propuesta",
                description: "Creamos un plan detallado y presupuesto"
              },
              {
                step: "03",
                title: "Desarrollo",
                description: "Construimos tu aplicación con las mejores prácticas"
              },
              {
                step: "04",
                title: "Entrega",
                description: "Testing, optimización y lanzamiento"
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

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ¿Listo para Transformar tu Negocio?
            </h2>
            <p className="text-muted-foreground mb-6">
              Agenda una consulta gratuita de 30 minutos y descubre cómo podemos ayudarte
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
