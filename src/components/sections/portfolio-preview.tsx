"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Project } from "@/types"
import { featuredProjects } from "@/data/projects"

export function PortfolioPreview() {

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
    <section className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
            <span className="cyber-gradient neon-pulse">
              Proyectos destacados
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground px-4">
            Algunos de los proyectos en los que he trabajado, mostrando mi experiencia y habilidades.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full neon-hover neon-bg"
            >
              <div className="aspect-video overflow-hidden bg-muted relative">
                <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                  {/* Imagen del proyecto */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                    onError={(e) => {
                      // Fallback si la imagen no existe
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  {/* Overlay con información del proyecto */}
                  <div className="relative z-10 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-primary/80 mb-2">
                      {project.title.charAt(0)}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {project.category === "web" && "Desarrollo Web"}
                      {project.category === "design" && "Diseño"}
                      {project.category === "software" && "Software"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-primary/10 px-2 sm:px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.liveUrl && (
                      <Button size="sm" variant="outline" asChild className="text-xs sm:text-sm neon-hover neon-border">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Live
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" asChild className="text-xs sm:text-sm neon-hover neon-border">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button asChild size="lg" variant="outline" className="group w-full sm:w-auto neon-hover neon-border">
            <Link href="/portfolio">
              Ver todos los proyectos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Cyber Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden cyber-grid">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-primary/30 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <pattern
                id="cyber-portfolio-pattern"
                width={100}
                height={100}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M0 100L100 0M100 100L0 0" stroke="hsl(120 60% 50% / 0.05)" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-primary/5">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#cyber-portfolio-pattern)" />
          </svg>
        </div>
      </div>
    </section>
  )
}
