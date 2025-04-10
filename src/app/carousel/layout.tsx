import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Carousel Downloader - Download HD Carousels Without Watermark',
  description: 'Download Instagram Carousels in HD quality without watermarks. Free, fast, and easy to use Instagram Carousel downloader.',
  keywords: 'instagram carousel downloader, download instagram carousels, instagram carousel saver, save instagram carousels, instagram carousel download',
  openGraph: {
    title: 'Instagram Carousel Downloader - Download HD Carousels Without Watermark',
    description: 'Download Instagram Carousels in HD quality without watermarks. Free, fast, and easy to use Instagram Carousel downloader.',
    url: 'https://www.instagrab.download/carousel',
    siteName: 'InstaGrab',
    images: [
      {
        url: 'https://www.instagrab.download/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Carousel Downloader',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.instagrab.download/carousel',
  },
};

export default function CarouselLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 