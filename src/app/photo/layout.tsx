import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Photo Downloader - Save High Resolution IG Photos',
  description: 'Download Instagram photos in original resolution. Save high-quality IG photos without watermarks. Fast, free, and no registration needed. Perfect for saving your favorite Instagram moments.',
  alternates: {
    canonical: 'https://www.instagrab.download/photo',
  },
  openGraph: {
    title: 'Instagram Photo Downloader - Save High Resolution IG Photos',
    description: 'Download Instagram photos in original resolution. Save high-quality IG photos without watermarks. Fast, free, and no registration needed. Perfect for saving your favorite Instagram moments.',
    url: 'https://www.instagrab.download/photo',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Photo Downloader',
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