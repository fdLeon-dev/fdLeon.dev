import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { PortfolioPreview } from "@/components/sections/portfolio-preview"
import { BlogPreview } from "@/components/sections/blog-preview"
import { SorteoBanner } from "@/components/sections/sorteo-banner"
// import { CaseStudiesPreview } from "@/components/sections/case-studies-preview" // TODO: Activar en futura actualización

export default function Home() {
  return (
    <>
      <Hero />
      <SorteoBanner />
      <Services />
      {/* <CaseStudiesPreview /> TODO: Activar sección de Case Studies en futura actualización */}
      <PortfolioPreview />
      <section id="blog" className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold cyber-gradient mb-4">
              Blog & Artículos
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Comparto conocimientos sobre desarrollo web, mejores prácticas y las últimas tecnologías
            </p>
          </div>
          <BlogPreview />
        </div>
      </section>
    </>
  )
}
