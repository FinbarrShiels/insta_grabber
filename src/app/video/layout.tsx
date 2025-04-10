import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Video Downloader - Download HD Videos Without Watermark',
  description: 'Download Instagram videos in HD quality without watermarks. Free, fast, and easy to use Instagram video downloader.',
  keywords: 'instagram video downloader, download instagram videos, instagram video saver, save instagram videos, instagram video download',
  openGraph: {
    title: 'Instagram Video Downloader - Download HD Videos Without Watermark',
    description: 'Download Instagram videos in HD quality without watermarks. Free, fast, and easy to use Instagram video downloader.',
    url: 'https://www.instagrab.download/video',
    siteName: 'InstaGrab',
    images: [
      {
        url: 'https://www.instagrab.download/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Video Downloader',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.instagrab.download/video',
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

export default function VideoLayout({
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