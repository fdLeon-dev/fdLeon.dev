// TODO: Case studies se implementarán más adelante
// Este archivo contiene la estructura y datos para los case studies
// que se implementarán en una futura actualización

// export interface CaseStudy {
//   id: string;
//   title: string;
//   client: string;
//   category: 'web' | 'ecommerce' | 'software';
//   challenge: string;
//   solution: string;
//   technologies: string[];
//   results: {
//     metric: string;
//     value: string;
//     improvement: string;
//   }[];
//   screenshots: string[];
//   videos: {
//     title: string;
//     description: string;
//     duration: string;
//     url: string;
//   }[];
//   testimonial: {
//     text: string;
//     author: string;
//     position: string;
//     company: string;
//   };
//   liveUrl?: string;
//   githubUrl?: string;
//   featured: boolean;
//   completed: string;
// }

// export const caseStudies: CaseStudy[] = [
//   // Los case studies se agregarán aquí en una futura actualización
// ]

// export const getCaseStudyById = (id: string): CaseStudy | undefined => {
//   return caseStudies.find(caseStudy => caseStudy.id === id)
// }

// export const getCaseStudiesByCategory = (category: string): CaseStudy[] => {
//   if (category === "all") return caseStudies
//   return caseStudies.filter(caseStudy => caseStudy.category === category)
// }

// export const getFeaturedCaseStudies = (): CaseStudy[] => {
//   return caseStudies.filter(caseStudy => caseStudy.featured)
// }