import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InstaGrab Photo Downloader - Save Instagram Photos in HD',
  description: 'Download Instagram photos in high quality for free. Save IG photos directly to your device without watermarks. Fast and easy to use.',
  keywords: 'instagram photo downloader, download instagram photos, save instagram photos, download IG photos, HD instagram photos',
  alternates: {
    canonical: 'https://www.instagrab.download/photo',
  },
  openGraph: {
    title: 'InstaGrab Photo Downloader - Save Instagram Photos in HD',
    description: 'Download Instagram photos in high quality for free. Save IG photos directly to your device without watermarks. Fast and easy to use.',
    url: 'https://www.instagrab.download/photo',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab Photo Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PhotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 