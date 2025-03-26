import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Reel Downloader | Save IG Reels in HD Quality',
  description: 'Download Instagram Reels in high quality for free. Save IG Reels directly to your device without watermarks. Fast and easy to use.',
  keywords: 'instagram reel downloader, download instagram reels, save instagram reels, download IG reels, HD quality instagram reels',
  alternates: {
    canonical: 'https://instagrab.download/reel',
  },
  openGraph: {
    title: 'Instagram Reel Downloader | Save IG Reels in HD Quality',
    description: 'Download Instagram Reels in high quality for free. Save IG Reels directly to your device without watermarks. Fast and easy to use.',
    url: 'https://instagrab.download/reel',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://instagrab.download/og-reel.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Reel Downloader',
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