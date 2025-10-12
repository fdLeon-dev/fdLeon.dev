# fdLeon-dev Portfolio

Portfolio personal moderno y profesional construido con Next.js 15, TailwindCSS y TypeScript.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con modo oscuro
- **Responsive**: Optimizado para todos los dispositivos
- **Animaciones Suaves**: Implementadas con Framer Motion
- **SEO Optimizado**: Meta tags y estructura semántica
- **Performance**: Optimizado para Core Web Vitals
- **Accesibilidad**: Cumple con estándares WCAG

## 🛠️ Tecnologías

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS v4
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Temas**: next-themes para modo oscuro
- **Deploy**: Vercel

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── contact/           # Página de contacto
│   ├── portfolio/         # Página de portafolio
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   ├── sections/          # Secciones de la página
│   └── ui/                # Componentes de UI base
├── lib/                   # Utilidades y configuraciones
├── types/                 # Definiciones de TypeScript
└── ...
```

## 🚀 Instalación y Desarrollo

1. **Clonar el repositorio**:
```bash
git clone https://github.com/fdleon/fdleon-dev.git
cd fdleon-dev
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
```bash
cp env.example .env.local
# Editar .env.local con tus datos
```

4. **Ejecutar en desarrollo**:
```bash
npm run dev
```

5. **Abrir en el navegador**:
```
http://localhost:3000
```

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Verificar código con ESLint
- `npm run lint:fix` - Corregir errores de ESLint
- `npm run type-check` - Verificar tipos de TypeScript

## 🌐 Despliegue en Vercel

1. **Conectar repositorio**:
   - Ve a [Vercel](https://vercel.com)
   - Importa tu repositorio de GitHub

2. **Configuración automática**:
   - Vercel detectará automáticamente Next.js
   - Usará la configuración de `vercel.json`

3. **Variables de entorno**:
   - Configura las variables en el dashboard de Vercel
   - Usa los valores de `env.example` como referencia

4. **Deploy**:
   - El deploy se ejecuta automáticamente en cada push
   - URL de producción: `https://fdleon-dev.vercel.app`

## 🎨 Personalización

### Cambiar Información Personal
- Edita `src/app/layout.tsx` para metadata
- Actualiza `src/components/sections/hero.tsx` para el hero
- Modifica `src/components/sections/services.tsx` para servicios

### Cambiar Proyectos
- Edita el array `projects` en `src/app/portfolio/page.tsx`
- Actualiza `src/components/sections/portfolio-preview.tsx`

### Cambiar Colores y Temas
- Modifica `tailwind.config.ts` para colores personalizados
- Actualiza `src/app/globals.css` para variables CSS

## 📱 Páginas Incluidas

- **Inicio** (`/`) - Landing page con hero, servicios y preview de portafolio
- **Portafolio** (`/portfolio`) - Galería completa de proyectos
- **Contacto** (`/contact`) - Formulario de contacto e información

## 🔧 Configuración Adicional

### Analytics
Para agregar Google Analytics o Google Tag Manager:
1. Configura las variables `NEXT_PUBLIC_GA_ID` o `NEXT_PUBLIC_GTM_ID`
2. Agrega el script en `src/app/layout.tsx`

### Formulario de Contacto
El formulario actual es simulado. Para funcionalidad real:
1. Integra con servicios como Formspree, Netlify Forms o EmailJS
2. O implementa un endpoint API en `src/app/api/contact/`

## 📄 Licencia

Este proyecto es de uso personal. Todos los derechos reservados.

## 🤝 Contacto

- **Email**: contact@fdleon.dev
- **Website**: https://fdleon.dev
- **GitHub**: https://github.com/fdleon

---

Desarrollado con ❤️ por fdLeon-dev
