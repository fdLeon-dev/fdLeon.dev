"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Laptop,
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
  Code,
  Server,
  Cloud,
  Settings
} from "lucide-react"
import Link from "next/link"

export default function DesarrolloSoftwarePage() {
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
      id: "automation",
      name: "Automatización",
      price: "$2,500",
      originalPrice: "$3,500",
      description: "Automatiza procesos repetitivos y optimiza tu productividad",
      duration: "3-4 semanas",
      features: [
        "Análisis de procesos actuales",
        "Scripts de automatización personalizados",
        "Integración con herramientas existentes",
        "Dashboard de monitoreo",
        "Documentación técnica completa",
        "Capacitación del equipo",
        "Soporte técnico por 2 meses",
        "2 revisiones incluidas"
      ],
      notIncluded: [
        "Desarrollo de aplicaciones complejas",
        "Integración con sistemas legacy",
        "Mantenimiento a largo plazo"
      ],
      popular: false,
      color: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
    },
    {
      id: "custom-app",
      name: "Aplicación Personalizada",
      price: "$8,500",
      originalPrice: "$12,000",
      description: "Desarrollo de software a medida para tu negocio",
      duration: "8-12 semanas",
      features: [
        "Análisis de requerimientos detallado",
        "Arquitectura de software escalable",
        "Desarrollo full-stack completo",
        "Base de datos optimizada",
        "API RESTful documentada",
        "Interfaz de usuario intuitiva",
        "Testing y QA completo",
        "Deployment en la nube",
        "Documentación técnica y de usuario",
        "Capacitación completa del equipo",
        "Soporte técnico por 6 meses",
        "3 revisiones incluidas",
        "Código fuente incluido"
      ],
      notIncluded: [
        "Mantenimiento a largo plazo",
        "Integración con sistemas externos complejos",
        "Funcionalidades adicionales futuras"
      ],
      popular: true,
      color: "border-primary bg-primary/5 dark:border-primary/50 dark:bg-primary/10"
    },
    {
      id: "enterprise",
      name: "Solución Enterprise",
      price: "$15,000",
      originalPrice: "$25,000",
      description: "Solución completa para empresas grandes",
      duration: "12-16 semanas",
      features: [
        "Análisis de negocio completo",
        "Arquitectura enterprise escalable",
        "Microservicios y APIs",
        "Base de datos distribuida",
        "Seguridad avanzada",
        "Integración con sistemas existentes",
        "Dashboard ejecutivo",
        "Reportes y analytics",
        "Testing automatizado",
        "CI/CD pipeline",
        "Deployment en múltiples ambientes",
        "Documentación completa",
        "Capacitación ejecutiva y técnica",
        "Soporte técnico por 1 año",
        "5 revisiones incluidas",
        "Código fuente y documentación",
        "Plan de mantenimiento incluido"
      ],
      notIncluded: [
        "Hardware específico",
        "Licencias de software externo",
        "Servicios de terceros"
      ],
      popular: false,
      color: "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20"
    }
  ]

  const technologies = [
    { name: "Node.js & Python", icon: Code, description: "Backend robusto y escalable" },
    { name: "React & Vue.js", icon: Globe, description: "Frontend moderno y responsive" },
    { name: "PostgreSQL & MongoDB", icon: Database, description: "Bases de datos optimizadas" },
    { name: "AWS & Azure", icon: Cloud, description: "Cloud computing profesional" },
    { name: "Docker & Kubernetes", icon: Server, description: "Contenedores y orquestación" },
    { name: "CI/CD", icon: Settings, description: "Automatización de despliegues" }
  ]

  const softwareTypes = [
    {
      title: "Aplicaciones Web",
      description: "Sistemas web completos con frontend y backend",
      features: ["Responsive Design", "APIs RESTful", "Autenticación", "Base de datos"]
    },
    {
      title: "Automatización",
      description: "Scripts y herramientas para automatizar procesos",
      features: ["Workflows", "Integraciones", "Monitoreo", "Reportes"]
    },
    {
      title: "APIs y Microservicios",
      description: "Servicios backend escalables y modulares",
      features: ["REST APIs", "GraphQL", "Autenticación", "Documentación"]
    },
    {
      title: "Dashboards y Analytics",
      description: "Paneles de control y análisis de datos",
      features: ["Visualizaciones", "Reportes", "Alertas", "Exportación"]
    }
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
            <Laptop className="h-4 w-4" />
            DESARROLLO DE SOFTWARE
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Planes de{" "}
            <span className="cyber-gradient neon-pulse">
              Desarrollo de Software
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Desarrollamos soluciones de software personalizadas que automatizan,
            optimizan y transforman tu negocio digital.
          </p>
        </motion.div>

        {/* Software Types */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Tipos de Software que Desarrollamos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {softwareTypes.map((type, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">{type.title}</h3>
                <p className="text-muted-foreground mb-4">{type.description}</p>
                <div className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
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

        {/* Development Process */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Nuestro Proceso de Desarrollo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Análisis",
                description: "Entendemos tus necesidades y objetivos"
              },
              {
                step: "02",
                title: "Diseño",
                description: "Arquitectura y planificación técnica"
              },
              {
                step: "03",
                title: "Desarrollo",
                description: "Código limpio y documentado"
              },
              {
                step: "04",
                title: "Testing",
                description: "Pruebas exhaustivas y optimización"
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

        {/* Benefits */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Beneficios del Software Personalizado
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Eficiencia",
                description: "Automatiza procesos y reduce errores manuales"
              },
              {
                icon: Shield,
                title: "Seguridad",
                description: "Datos protegidos con las mejores prácticas"
              },
              {
                icon: Users,
                title: "Escalabilidad",
                description: "Crece con tu negocio sin limitaciones"
              },
              {
                icon: Search,
                title: "Analytics",
                description: "Insights valiosos sobre tu operación"
              },
              {
                icon: Settings,
                title: "Integración",
                description: "Conecta con tus herramientas existentes"
              },
              {
                icon: Clock,
                title: "Ahorro de Tiempo",
                description: "Procesos más rápidos y eficientes"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-xl border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ¿Listo para Automatizar tu Negocio?
            </h2>
            <p className="text-muted-foreground mb-6">
              Desarrollamos la solución perfecta para optimizar tus procesos
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
