import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InstaGrab Reel Downloader - Save Instagram Reels in HD',
  description: 'Download Instagram reels in high quality for free. Save IG reels directly to your device without watermarks. Fast and easy to use.',
  keywords: 'instagram reel downloader, download instagram reels, save instagram reels, download IG reels, HD instagram reels',
  alternates: {
    canonical: 'https://www.instagrab.download/reel',
  },
  openGraph: {
    title: 'InstaGrab Reel Downloader - Save Instagram Reels in HD',
    description: 'Download Instagram reels in high quality for free. Save IG reels directly to your device without watermarks. Fast and easy to use.',
    url: 'https://www.instagrab.download/reel',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-reel.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab Reel Downloader',
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

export default function ReelLayout({
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