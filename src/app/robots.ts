import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/reel',
        '/photo',
        '/video',
        '/story',
        '/carousel',
        '/faq',
        '/privacy',
        '/terms',
      ],
    },
    sitemap: 'https://www.instagrab.download/sitemap.xml',
  };
} 