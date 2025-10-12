import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "fdLeon-dev | Desarrollador Web y Diseñador",
  description: "Desarrollador web, diseñador y creador de software especializado en soluciones modernas y escalables. Transformo ideas en experiencias digitales excepcionales.",
  keywords: ["desarrollo web", "diseño web", "software", "programador", "freelancer"],
  authors: [{ name: "fdLeon-dev" }],
  creator: "fdLeon-dev",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://fdleon.dev",
    title: "fdLeon-dev | Desarrollador Web y Diseñador",
    description: "Desarrollador web, diseñador y creador de software especializado en soluciones modernas y escalables.",
    siteName: "fdLeon-dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "fdLeon-dev | Desarrollador Web y Diseñador",
    description: "Desarrollador web, diseñador y creador de software especializado en soluciones modernas y escalables.",
    creator: "@fdleon_dev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
