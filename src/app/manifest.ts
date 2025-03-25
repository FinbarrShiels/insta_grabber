import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'InstaGrab - Instagram Content Downloader',
    short_name: 'InstaGrab',
    description: 'Download Instagram photos, videos, reels, stories and more with InstaGrab',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#9333ea',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
} 