import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Reel Downloader | Download IG Reels Without Watermark',
  description: 'Download Instagram reels in HD quality without watermarks. Save IG reels in original quality for free.',
  keywords: 'instagram reel downloader, download instagram reels, save instagram reels, download IG reels, no watermark reels, hd reels download',
  openGraph: {
    title: 'Instagram Reel Downloader | Download IG Reels Without Watermark',
    description: 'Download Instagram reels in HD quality without watermarks. Save IG reels in original quality for free.',
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