import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InstaGrab Video Downloader - Save Instagram Videos in HD',
  description: 'Download Instagram videos in high quality for free. Save IG videos directly to your device without watermarks. Fast and easy to use.',
  keywords: 'instagram video downloader, download instagram videos, save instagram videos, download IG videos, HD instagram videos',
  alternates: {
    canonical: 'https://www.instagrab.download/video',
  },
  openGraph: {
    title: 'InstaGrab Video Downloader - Save Instagram Videos in HD',
    description: 'Download Instagram videos in high quality for free. Save IG videos directly to your device without watermarks. Fast and easy to use.',
    url: 'https://www.instagrab.download/video',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-video.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab Video Downloader',
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

export default function VideoLayout({
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