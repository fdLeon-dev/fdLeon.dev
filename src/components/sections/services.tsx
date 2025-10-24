"use client"

import { motion } from "framer-motion"
import { Code, Palette, Laptop, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Services() {
  const services = [
    {
      id: "desarrollo-web",
      title: "Desarrollo Web",
      description: "Creo aplicaciones web modernas, rápidas y escalables usando las últimas tecnologías.",
      icon: Code,
      features: [
        "React & Next.js",
        "TypeScript & JavaScript",
        "APIs RESTful",
        "Bases de datos",
        "Optimización SEO",
        "Responsive Design"
      ]
    },
    {
      id: "diseno-web",
      title: "Diseño Web",
      description: "Diseño interfaces atractivas y funcionales que mejoran la experiencia del usuario.",
      icon: Palette,
      features: [
        "UI/UX Design",
        "Prototipado",
        "Design Systems",
        "Wireframing",
        "Branding Digital",
        "Figma & Adobe Creative"
      ]
    },
    {
      id: "desarrollo-software",
      title: "Desarrollo de Software",
      description: "Desarrollo soluciones de software personalizadas para automatizar y optimizar procesos.",
      icon: Laptop,
      features: [
        "Aplicaciones Desktop",
        "Automatización",
        "Integración de APIs",
        "Microservicios",
        "Cloud Computing",
        "DevOps & CI/CD"
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  }

  return (
    <section id="servicios" className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
            Servicios que{" "}
            <span className="cyber-gradient neon-pulse">
              transforman tu negocio
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground px-4">
            Ofrezco soluciones completas de desarrollo y diseño para llevar tu visión digital al siguiente nivel.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="relative rounded-2xl border bg-card p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col neon-hover neon-bg"
              >
                <div className="mb-6 flex-grow">
                  <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-card-foreground mb-3 sm:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm sm:text-base">
                        <Check className="mr-3 h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-card-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild variant="outline" className="w-full group mt-auto neon-hover neon-border">
                  <a href={`/servicios/${service.id}`}>
                    Conocer más
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button size="lg" className="group w-full sm:w-auto cyber-button">
            <a href="/contact">
              Trabajemos juntos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-muted-foreground/20 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <pattern
                id="services-pattern"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-muted-foreground/20">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#services-pattern)" />
          </svg>
        </div>
      </div>
    </section>
  )
}
