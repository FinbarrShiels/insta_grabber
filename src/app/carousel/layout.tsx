import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Carousel Downloader - Save Multiple IG Posts',
  description: 'Download Instagram carousel posts with multiple photos and videos. Save entire IG slideshows without watermarks. Fast, free, and no registration needed. Perfect for saving your favorite Instagram albums.',
  keywords: 'instagram carousel downloader, download instagram slideshows, save instagram carousels, download IG album, instagram album saver',
  alternates: {
    canonical: 'https://www.instagrab.download/carousel',
  },
  openGraph: {
    title: 'Instagram Carousel Downloader - Save Multiple IG Posts',
    description: 'Download Instagram carousel posts with multiple photos and videos. Save entire IG slideshows without watermarks. Fast, free, and no registration needed. Perfect for saving your favorite Instagram albums.',
    url: 'https://www.instagrab.download/carousel',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-carousel.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Carousel Downloader',
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

export default function CarouselLayout({
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