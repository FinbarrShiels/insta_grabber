import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Video Downloader - Save Full HD IG Videos',
  description: 'Download Instagram videos in full HD quality. Save IG videos without watermarks. Fast, free, and no registration needed. Perfect for saving your favorite Instagram video content.',
  alternates: {
    canonical: 'https://www.instagrab.download/video',
  },
  openGraph: {
    title: 'Instagram Video Downloader - Save Full HD IG Videos',
    description: 'Download Instagram videos in full HD quality. Save IG videos without watermarks. Fast, free, and no registration needed. Perfect for saving your favorite Instagram video content.',
    url: 'https://www.instagrab.download/video',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-video.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Video Downloader',
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