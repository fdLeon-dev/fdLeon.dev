// TODO: Case studies se implementarán más adelante
// Este componente se usará para mostrar la vista previa de case studies
// en la página principal cuando se implemente la funcionalidad completa

// 'use client'

// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { CaseStudyCard } from "./case-study-card"
// import { getFeaturedCaseStudies } from "@/data/case-studies"
// import { ArrowRight, Trophy, TrendingUp, Users } from "lucide-react"
// import Link from "next/link"

// export function CaseStudiesPreview() {
//   const featuredCaseStudies = getFeaturedCaseStudies()

//   return (
//     <section className="py-16 sm:py-20 lg:py-24 bg-background">
//       {/* Componente comentado - se implementará más adelante */}
//     </section>
//   )
// }

export function CaseStudiesPreview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Case Studies
          </h2>
          <p className="text-muted-foreground mb-8">
            Esta sección estará disponible próximamente.
          </p>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Próximamente</h3>
            <p className="text-sm text-muted-foreground">
              Estoy trabajando en una sección completa de case studies que mostrará
              proyectos detallados con resultados y testimonios de clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}