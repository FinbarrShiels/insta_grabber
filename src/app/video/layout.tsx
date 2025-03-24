import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Video Downloader | Download IG Videos in HD',
  description: 'Download Instagram videos in high quality for free. Save public and private IG videos without watermarks or quality loss.',
  keywords: 'instagram video downloader, download instagram videos, save instagram videos, download IG videos, HD instagram videos',
  openGraph: {
    title: 'Instagram Video Downloader | Download IG Videos in HD',
    description: 'Download Instagram videos in high quality for free. Save public and private IG videos without watermarks or quality loss.',
    url: 'https://igrab.com/video',
    siteName: 'iGrab - Instagram Downloader',
    images: [
      {
        url: 'https://igrab.com/og-video.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Video Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
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