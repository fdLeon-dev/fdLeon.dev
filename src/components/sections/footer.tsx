import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "Email", href: "mailto:contact@fdleon.dev", icon: Mail },
  ]

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold cyber-gradient">fdLeon-dev</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
              Desarrollador web, diseñador y creador de software especializado en soluciones modernas y escalables.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base font-semibold text-foreground">Servicios</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="#servicios" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Diseño Web
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Desarrollo de Software
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base font-semibold text-foreground">Enlaces</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/portfolio" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h4 className="text-sm sm:text-base font-semibold text-foreground">Sígueme</h4>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar ${item.name}`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 border-t pt-6 sm:pt-8">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            © 2024 fdLeon-dev. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
