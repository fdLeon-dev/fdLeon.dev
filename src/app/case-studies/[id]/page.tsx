// TODO: Case studies se implementarán más adelante
// import { getCaseStudyById } from "@/data/case-studies"
// import { notFound } from "next/navigation"
// import { CaseStudyContent } from "./case-study-content"

// interface CaseStudyPageProps {
//   params: Promise<{
//     id: string;
//   }>;
// }

// export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
//   const { id } = await params
//   const caseStudy = getCaseStudyById(id)

//   if (!caseStudy) {
//     notFound()
//   }

//   return <CaseStudyContent caseStudy={caseStudy} />
// }

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Case Studies</h1>
        <p className="text-muted-foreground">Esta sección estará disponible próximamente.</p>
      </div>
    </div>
  )
}

