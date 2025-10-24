"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Palette, Laptop } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-6xl text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-8 sm:mb-12"
          >
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                Transformando negocios digitalmente
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6">
              Tu negocio merece{" "}
              <span className="cyber-gradient neon-pulse">
                destacar
              </span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full neon-glow"></div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mx-auto max-w-4xl mb-12"
          >
            <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed text-muted-foreground mb-6 font-light">
              Desarrollo sitios web <span className="font-semibold text-foreground">modernos y funcionales</span> que
              <span className="font-semibold text-foreground"> conectan con tus clientes</span>
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="font-medium">+300% Visibilidad</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="font-medium">+150% Conversiones</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="font-medium">100% Responsive</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-20"
          >
            <Button asChild size="lg" className="group w-full sm:w-auto cyber-button">
              <Link href="#servicios">
                Empezar mi transformación
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto neon-hover neon-border">
              <Link href="/portfolio">
                Ver casos de éxito
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12"
          >
            <div className="flex flex-col items-center text-center p-4 sm:p-6 neon-hover neon-border rounded-xl neon-bg">
              <div className="mb-4 sm:mb-6 rounded-full bg-primary/10 p-3 sm:p-4">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Desarrollo Web</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Sitios web que convierten visitantes en clientes
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 sm:p-6 neon-hover neon-border rounded-xl neon-bg">
              <div className="mb-4 sm:mb-6 rounded-full bg-primary/10 p-3 sm:p-4">
                <Palette className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Diseño Web</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Diseños que captan atención y generan confianza
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1 neon-hover neon-border rounded-xl neon-bg">
              <div className="mb-4 sm:mb-6 rounded-full bg-primary/10 p-3 sm:p-4">
                <Laptop className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Software</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Sistemas que automatizan y optimizan tu negocio
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Cyber Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden cyber-grid">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-primary/30 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <pattern
                id="cyber-hero-pattern"
                width={100}
                height={100}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M0 100L100 0M100 100L0 0" stroke="hsl(120 100% 50% / 0.1)" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-primary/10">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#cyber-hero-pattern)" />
          </svg>
        </div>
      </div>
    </section>
  )
}
