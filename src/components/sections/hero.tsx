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
    <section className="relative min-h-screen flex items-center overflow-hidden py-16 sm:py-24 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Badge Section */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-sm" style={{ backgroundColor: 'hsl(120 60% 50% / 0.1)', borderColor: 'hsl(120 60% 50% / 0.3)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'hsl(120 60% 50%)' }}></span>
              <span className="text-sm font-semibold" style={{ color: 'hsl(120 60% 35%)' }}>Transformando negocios digitalmente</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-8 text-foreground"
          >
            Tu negocio merece{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, hsl(120 60% 50%), hsl(120 50% 40%))' }}>
              destacar
            </span>
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-1 rounded-full" style={{ backgroundImage: 'linear-gradient(to right, hsl(120 60% 50%), hsl(120 50% 40%))' }}></div>
          </motion.div>

          {/* Subheading */}
          <motion.div
            variants={fadeInUp}
            className="mx-auto max-w-3xl mb-10 sm:mb-14"
          >
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-foreground/75 font-light mb-8">
              Desarrollo sitios web{" "}
              <span className="font-semibold text-foreground">modernos y funcionales</span> que{" "}
              <span className="font-semibold text-foreground">conectan con tus clientes</span>
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex flex-col items-center p-4 rounded-lg border" style={{ backgroundColor: 'hsl(120 60% 50% / 0.08)', borderColor: 'hsl(120 60% 50% / 0.25)' }}>
                <span className="text-2xl sm:text-3xl font-bold text-foreground mb-2">+300%</span>
                <span className="text-sm font-semibold" style={{ color: 'hsl(0 0% 45%)' }}>Más Visibilidad</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg border" style={{ backgroundColor: 'hsl(120 60% 50% / 0.08)', borderColor: 'hsl(120 60% 50% / 0.25)' }}>
                <span className="text-2xl sm:text-3xl font-bold text-foreground mb-2">+150%</span>
                <span className="text-sm font-semibold" style={{ color: 'hsl(0 0% 45%)' }}>Más Conversiones</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg border" style={{ backgroundColor: 'hsl(120 60% 50% / 0.08)', borderColor: 'hsl(120 60% 50% / 0.25)' }}>
                <span className="text-2xl sm:text-3xl font-bold text-foreground mb-2">100%</span>
                <span className="text-sm font-semibold" style={{ color: 'hsl(0 0% 45%)' }}>Responsive</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 sm:mb-10"
          >
            <Button asChild size="lg" className="group w-full sm:w-auto text-white rounded-lg px-8 py-6 text-base font-semibold border-0 hover:opacity-90 transition-opacity" style={{ backgroundColor: 'hsl(120 60% 50%)' }}>
              <Link href="#servicios" className="flex items-center justify-center">
                Empezar mi transformación
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-lg px-8 py-6 text-base font-semibold text-foreground" style={{ borderColor: 'hsl(120 60% 50% / 0.4)' }}>
              <Link href="/portfolio">
                Ver casos de éxito
              </Link>
            </Button>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border neon-hover neon-border neon-bg"
            >
              <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: 'hsl(120 60% 50% / 0.15)' }}>
                <Code className="h-7 w-7" style={{ color: 'hsl(120 70% 40%)' }} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                Desarrollo Web
              </h3>
              <p className="text-base text-foreground/70 leading-relaxed font-medium">
                Sitios web que convierten visitantes en clientes
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border neon-hover neon-border neon-bg"
            >
              <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: 'hsl(120 60% 50% / 0.15)' }}>
                <Palette className="h-7 w-7" style={{ color: 'hsl(120 70% 40%)' }} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                Diseño Web
              </h3>
              <p className="text-base text-foreground/70 leading-relaxed font-medium">
                Diseños que captan atención y generan confianza
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border neon-hover neon-border neon-bg sm:col-span-2 lg:col-span-1"
            >
              <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: 'hsl(120 60% 50% / 0.15)' }}>
                <Laptop className="h-7 w-7" style={{ color: 'hsl(120 70% 40%)' }} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                Software
              </h3>
              <p className="text-base text-foreground/70 leading-relaxed font-medium">
                Sistemas que automatizan y optimizan tu negocio
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Green gradient blobs - using the project's neon green */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'hsl(120 60% 50% / 0.15)' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500" style={{ backgroundColor: 'hsl(120 60% 50% / 0.1)' }}></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <pattern
                id="hero-pattern"
                width={40}
                height={40}
                patternUnits="userSpaceOnUse"
              >
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" className="text-foreground/10" />
          </svg>
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>
    </section>
  )
}
