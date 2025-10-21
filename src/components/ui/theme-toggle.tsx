"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={handleThemeToggle}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      aria-label="Cambiar tema"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </button>
  )
}

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)

  // useEffect solo se ejecuta en el cliente, evitando el error de hidratación
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Mostrar placeholder mientras se monta
  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-md border border-input bg-background" aria-hidden="true" />
    )
  }

  return <ThemeToggleButton />
}
