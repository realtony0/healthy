import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mmb22115/', '/compte/', '/api/'], // Cacher l'admin secret et les données privées
    },
    sitemap: 'https://healthy.sn/sitemap.xml',
  }
}
