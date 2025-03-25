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
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));
} 