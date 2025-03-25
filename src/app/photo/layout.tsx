import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Photo Downloader | Save IG Photos in Original Quality',
  description: 'Download Instagram photos in original quality for free. Save high-resolution IG photos directly to your device without watermarks.',
  keywords: 'instagram photo downloader, download instagram photos, save instagram photos, download IG photos, original quality instagram photos',
  openGraph: {
    title: 'Instagram Photo Downloader | Save IG Photos in Original Quality',
    description: 'Download Instagram photos in original quality for free. Save high-resolution IG photos directly to your device without watermarks.',
    url: 'https://instagrab.io/photo',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://instagrab.io/og-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Photo Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
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