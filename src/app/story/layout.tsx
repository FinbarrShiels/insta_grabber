import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Story Downloader - Download HD Stories Without Watermark',
  description: 'Download Instagram Stories in HD quality without watermarks. Free, fast, and easy to use Instagram Story downloader.',
  keywords: 'instagram story downloader, download instagram stories, instagram story saver, save instagram stories, instagram story download',
  openGraph: {
    title: 'Instagram Story Downloader - Download HD Stories Without Watermark',
    description: 'Download Instagram Stories in HD quality without watermarks. Free, fast, and easy to use Instagram Story downloader.',
    url: 'https://www.instagrab.download/story',
    siteName: 'InstaGrab',
    images: [
      {
        url: 'https://www.instagrab.download/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Story Downloader',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.instagrab.download/story',
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

export default function StoryLayout({
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