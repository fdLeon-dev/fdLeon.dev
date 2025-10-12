import { MetadataRoute } from 'next'
import { SEO_CONFIG } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_CONFIG.siteUrl

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
