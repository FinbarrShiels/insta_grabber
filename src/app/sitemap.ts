import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://instagrab.download';
  
  // All application routes
  const routes = [
    '',
    '/photo',
    '/video',
    '/reel',
    '/story',
    '/carousel',
    '/profile',
    '/faq',
    '/terms',
    '/privacy',
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/terms' || route === '/privacy' ? 'monthly' : 'daily',
    priority: route === '' ? 1.0 : route === '/terms' || route === '/privacy' ? 0.5 : 0.8,
  }));
} 