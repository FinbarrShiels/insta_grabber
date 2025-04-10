import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Reel Downloader - Download HD Reels Without Watermark',
  description: 'Download Instagram Reels in HD quality without watermarks. Free, fast, and easy to use Instagram Reel downloader.',
  keywords: 'instagram reel downloader, download instagram reels, instagram reel saver, save instagram reels, instagram reel download',
  openGraph: {
    title: 'Instagram Reel Downloader - Download HD Reels Without Watermark',
    description: 'Download Instagram Reels in HD quality without watermarks. Free, fast, and easy to use Instagram Reel downloader.',
    url: 'https://www.instagrab.download/reel',
    siteName: 'InstaGrab',
    images: [
      {
        url: 'https://www.instagrab.download/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Reel Downloader',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.instagrab.download/reel',
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