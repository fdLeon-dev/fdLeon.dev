import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración experimental para resolver problemas de Webpack
  experimental: {
    // esmExternals: 'loose', // Comentado porque causa problemas con Turbopack
  },

  // Configuración de Turbopack para silenciar advertencias
  turbopack: {},

  // Configuración de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ]
  },

  // Configuración básica
  compress: true,
  poweredByHeader: false,

  // Configuración de paquetes externos
  serverExternalPackages: ['@emailjs/browser'],

  // Configuración simplificada de Webpack
  webpack: (config, { isServer }) => {
    // Solo aplicar fallbacks en el cliente
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        assert: false,
        http: false,
        https: false,
        os: false,
        path: false,
        zlib: false,
        querystring: false,
      }
    }

    // Configuración adicional para resolver problemas de módulos
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    return config
  }
};

export default nextConfig;
