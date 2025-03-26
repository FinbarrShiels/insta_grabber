import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Reel Downloader - Save Viral IG Reels in HD',
  description: 'Download Instagram reels in high quality. Save viral IG reels without watermarks. Fast, free, and no registration needed. Perfect for saving your favorite Instagram reels.',
  keywords: 'instagram reel downloader, download instagram reels, save instagram reels, download IG reels, HD instagram reels',
  alternates: {
    canonical: 'https://www.instagrab.download/reel',
  },
  openGraph: {
    title: 'Instagram Reel Downloader - Save Viral IG Reels in HD',
    description: 'Download Instagram reels in high quality. Save viral IG reels without watermarks. Fast, free, and no registration needed. Perfect for saving your favorite Instagram reels.',
    url: 'https://www.instagrab.download/reel',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-reel.jpg',
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