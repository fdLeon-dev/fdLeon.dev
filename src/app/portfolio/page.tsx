"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProjectImage } from "@/components/ui/project-image"
import { ExternalLink, Github, Filter } from "lucide-react"
import { projects, projectsByCategory } from "@/data/projects"

function PortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "Todos" },
    { id: "web", label: "Desarrollo Web" },
    { id: "software", label: "Software" },
    { id: "design", label: "Diseño" }
  ]

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projectsByCategory[selectedCategory as keyof typeof projectsByCategory] || []

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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  }

  return (
    <div className="py-12 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
              Mi Portafolio
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto px-4">
              Una selección de proyectos que muestran mi experiencia y pasión por crear soluciones digitales excepcionales.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="group text-xs sm:text-sm"
              >
                <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {category.label}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-video overflow-hidden bg-muted relative">
                  <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                    {/* Imagen del proyecto */}
                    <ProjectImage
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                      fallbackText={project.title}
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
                        <Button size="sm" variant="outline" asChild className="text-xs sm:text-sm">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            Live
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" asChild className="text-xs sm:text-sm">
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

          {filteredProjects.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No hay proyectos disponibles en esta categoría.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
