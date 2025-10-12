import type { Metadata } from "next"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"

export const metadata: Metadata = generateSEOMetadata("contact")

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
