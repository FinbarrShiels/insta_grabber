import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InstaGrab Carousel Downloader - Save Instagram Multiple Posts',
  description: 'Download Instagram carousel posts in high quality for free. Save multiple IG posts directly to your device without watermarks. Fast and easy to use.',
  keywords: 'instagram carousel downloader, download instagram slideshows, save instagram carousels, download IG album, instagram album saver',
  alternates: {
    canonical: 'https://www.instagrab.download/carousel',
  },
  openGraph: {
    title: 'InstaGrab Carousel Downloader - Save Instagram Multiple Posts',
    description: 'Download Instagram carousel posts in high quality for free. Save multiple IG posts directly to your device without watermarks. Fast and easy to use.',
    url: 'https://www.instagrab.download/carousel',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-carousel.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab Carousel Downloader',
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