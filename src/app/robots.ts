import { DOMAIN } from '@/global/constants';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/moje-konto/wylogowano'],
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
