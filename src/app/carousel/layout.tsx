import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Carousel Downloader | Download IG Multi-Post Slideshows',
  description: 'Download Instagram carousel posts with multiple photos and videos. Save complete Instagram slideshows with all images.',
  keywords: 'instagram carousel downloader, download instagram slideshows, save instagram multiple photos, download IG carousel, instagram album downloader',
  openGraph: {
    title: 'Instagram Carousel Downloader | Download IG Multi-Post Slideshows',
    description: 'Download Instagram carousel posts with multiple photos and videos. Save complete Instagram slideshows with all images.',
    url: 'https://igrab.com/carousel',
    siteName: 'iGrab - Instagram Downloader',
    images: [
      {
        url: 'https://igrab.com/og-carousel.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Carousel Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
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