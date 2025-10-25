"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gift, ArrowRight, Calendar, Users, Trophy } from "lucide-react"
import { featuredProjects } from "@/data/projects"

export function SorteoBanner() {
  // Verificar que featuredProjects esté disponible y tenga al menos 3 elementos
  if (!featuredProjects || featuredProjects.length < 3) {
    return null
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <motion.section
      className="relative py-12 sm:py-16 lg:py-20 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-card rounded-2xl border shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left side - Content */}
              <div className="p-8 sm:p-12 lg:p-16">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2 mb-6"
                >
                  <div className="w-10 h-10 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center">
                    <Gift className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
                    SORTEO ESPECIAL
                  </span>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
                >
                  Gana una{" "}
                  <span className="cyber-gradient neon-pulse">
                    Landing Page GRATIS
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-muted-foreground mb-8 leading-relaxed"
                >
                  ¿Tienes un negocio que necesita más clientes? Participa en nuestro sorteo
                  y podrías ganar una landing page profesional valorada en{" "}
                  <strong className="text-foreground">$1,000 USD</strong>
                </motion.p>

                {/* Features */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                >
                  {[
                    "Diseño profesional",
                    "Responsive completo",
                    "SEO optimizado",
                    "Formulario de contacto",
                    "Hosting 1 año",
                    "Soporte técnico"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="flex-1">
                    <Link href="/sorteo" className="flex items-center gap-2">
                      Participar Ahora
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/portfolio">Ver Portfolio</Link>
                  </Button>
                </motion.div>
              </div>

              {/* Right side - Visual */}
              <div className="relative p-8 sm:p-12 lg:p-16 flex items-center justify-center overflow-hidden">
                {/* Background with 3 sections */}
                <div className="absolute inset-0">
                  {/* Top section - First project */}
                  <div
                    className="absolute top-0 left-0 w-full h-1/3 bg-cover bg-center bg-no-repeat opacity-30"
                    style={{
                      backgroundImage: `url(${featuredProjects[0]?.image || '/images/placeholder.png'})`,
                    }}
                  />

                  {/* Middle section - Second project */}
                  <div
                    className="absolute top-1/3 left-0 w-full h-1/3 bg-cover bg-center bg-no-repeat opacity-30"
                    style={{
                      backgroundImage: `url(${featuredProjects[1]?.image || '/images/placeholder.png'})`,
                    }}
                  />

                  {/* Bottom section - Third project */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-1/3 bg-cover bg-center bg-no-repeat opacity-30"
                    style={{
                      backgroundImage: `url(${featuredProjects[2]?.image || '/images/placeholder.png'})`,
                    }}
                  />

                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                </div>

                <motion.div
                  variants={itemVariants}
                  className="text-center relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="w-32 h-32 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/30"
                  >
                    <Trophy className="h-16 w-16 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                    Valor: $1,000 USD
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 text-sm text-white/90">
                      <Calendar className="h-4 w-4" />
                      <span>Cierre: 15 de abril</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-sm text-white/90">
                      <Users className="h-4 w-4" />
                      <span>Máximo 200 participantes</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-sm text-white/90">
                      <Trophy className="h-4 w-4" />
                      <span>1 ganador seleccionado</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-muted-foreground/20 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <pattern
                id="sorteo-pattern"
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
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#sorteo-pattern)" />
          </svg>
        </div>
      </div>
    </motion.section>
  )
}
