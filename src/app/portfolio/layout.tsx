import type { Metadata } from "next"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"

export const metadata: Metadata = generateSEOMetadata("portfolio")

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
