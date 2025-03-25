import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Carousel Downloader | Save Multiple IG Photos & Videos',
  description: 'Download Instagram carousel posts with multiple photos and videos. Save entire Instagram slideshows in original quality for free.',
  keywords: 'instagram carousel downloader, download instagram slideshows, save instagram carousels, download IG album, instagram album saver',
  openGraph: {
    title: 'Instagram Carousel Downloader | Save Multiple IG Photos & Videos',
    description: 'Download Instagram carousel posts with multiple photos and videos. Save entire Instagram slideshows in original quality for free.',
    url: 'https://instagrab.download/carousel',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://instagrab.download/og-carousel.jpg',
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