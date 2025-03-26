import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Video Downloader | Download IG Videos in HD Quality',
  description: 'Download Instagram videos in HD quality without watermarks. Save IG videos directly to your device for free.',
  keywords: 'instagram video downloader, download instagram videos, save instagram videos, download IG videos, HD instagram videos',
  alternates: {
    canonical: 'https://www.instagrab.download/video',
  },
  openGraph: {
    title: 'Instagram Video Downloader | Save IG Videos in HD Quality',
    description: 'Download Instagram videos in high quality for free. Save IG videos directly to your device without watermarks. Fast and easy to use.',
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