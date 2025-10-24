// TODO: Case studies se implementarán más adelante
// 'use client'

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { CaseStudyCard } from "@/components/sections/case-study-card"
// import { caseStudies, getCaseStudiesByCategory } from "@/data/case-studies"
// import {
//   Filter,
//   Trophy,
//   TrendingUp,
//   Users,
//   ArrowRight,
//   Star
// } from "lucide-react"
// import Link from "next/link"

export default function CaseStudiesPage() {
  // const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // const categories = [
  //   { id: "all", label: "Todos" },
  //   { id: "web", label: "Desarrollo Web" },
  //   { id: "ecommerce", label: "E-commerce" },
  //   { id: "software", label: "Software" }
  // ]

  // const filteredCaseStudies = selectedCategory === "all"
  //   ? caseStudies
  //   : getCaseStudiesByCategory(selectedCategory)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
        <p className="text-muted-foreground mb-8">Esta sección estará disponible próximamente.</p>
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 max-w-md">
          <h3 className="text-xl font-semibold mb-4">Próximamente</h3>
          <p className="text-sm text-muted-foreground">
            Estoy trabajando en una sección completa de case studies que mostrará
            proyectos detallados con resultados y testimonios de clientes.
          </p>
        </div>
      </div>
    </div>
  )
}

