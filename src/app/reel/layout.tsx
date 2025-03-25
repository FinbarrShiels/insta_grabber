import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InstaGrab – Download Instagram Reels & Videos Free | No Watermark',
  description: 'InstaGrab is the easiest way to download Instagram Reels quickly and for free. Save high-quality Reels videos without a watermark—no login required. Try our fast and secure Instagram video downloader today!',
  keywords: 'Instagram Reels Downloader, Download Instagram Reels, Save Reels Video, Fast Reels Download, Reels Video Saver, IG Reels Downloader, Download Reels Without Watermark, Instagram Video Downloader, Save IG Videos Online, Free Reels Downloader',
  openGraph: {
    title: 'InstaGrab – Download Instagram Reels & Videos Free | No Watermark',
    description: 'InstaGrab is the easiest way to download Instagram Reels quickly and for free. Save high-quality Reels videos without a watermark—no login required. Try our fast and secure Instagram video downloader today!',
    url: 'https://igrab.com/reel',
    siteName: 'iGrab - Instagram Downloader',
    images: [
      {
        url: 'https://igrab.com/og-reel.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Reel Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ReelLayout({
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