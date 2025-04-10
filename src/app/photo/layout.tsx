import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Photo Downloader - Download HD Photos Without Watermark',
  description: 'Download Instagram photos in HD quality without watermarks. Free, fast, and easy to use Instagram photo downloader.',
  keywords: 'instagram photo downloader, download instagram photos, instagram photo saver, save instagram photos, instagram photo download',
  openGraph: {
    title: 'Instagram Photo Downloader - Download HD Photos Without Watermark',
    description: 'Download Instagram photos in HD quality without watermarks. Free, fast, and easy to use Instagram photo downloader.',
    url: 'https://www.instagrab.download/photo',
    siteName: 'InstaGrab',
    images: [
      {
        url: 'https://www.instagrab.download/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Photo Downloader',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.instagrab.download/photo',
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

export default function PhotoLayout({
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